<?php

namespace App\Http\Controllers\WeChat;

use App\Http\Controllers\Controller;
use App\Models\DailyTask;
use App\Models\BibleReadingExplanation;
use App\Models\BibleExplanationVote;
use App\Services\OpenRouterService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;

class BibleExplanationController extends Controller
{
    /**
     * 获取解释内容和投票状态
     */
    public function show(Request $request, $dailyTaskId)
    {
        try {
            $userId = Session::get('wechat_user_id');

            $explanation = BibleReadingExplanation::where('daily_task_id', $dailyTaskId)
                ->where('status', 1)
                ->first();

            if (!$explanation) {
                return response()->json([
                    'success' => false,
                    'message' => '该任务暂无AI解释'
                ], 404);
            }

            // 获取用户的投票状态
            $userVote = null;
            if ($userId) {
                $vote = BibleExplanationVote::where('explanation_id', $explanation->id)
                    ->where('user_id', $userId)
                    ->first();
                $userVote = $vote ? $vote->vote_type : null;
            }

            return response()->json([
                'success' => true,
                'data' => [
                    'id' => $explanation->id,
                    'explanation' => $explanation->explanation,
                    'model_used' => $explanation->model_used,
                    'likes_count' => $explanation->likes_count,
                    'dislikes_count' => $explanation->dislikes_count,
                    'user_vote' => $userVote,
                    'created_at' => $explanation->created_at->format('Y-m-d H:i:s'),
                ]
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => '获取解释失败：' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * 对AI解释投票（点赞或踩）
     */
    public function vote(Request $request, BibleReadingExplanation $explanation)
    {
        try {
            $userId = Session::get('wechat_user_id');

            if (!$userId) {
                return response()->json([
                    'success' => false,
                    'message' => '请先登录'
                ], 401);
            }

            $validated = $request->validate([
                'vote_type' => 'required|in:1,-1', // 1=点赞, -1=踩
            ]);

            DB::beginTransaction();

            // 检查用户是否已经投过票
            $existingVote = BibleExplanationVote::where('explanation_id', $explanation->id)
                ->where('user_id', $userId)
                ->first();

            if ($existingVote) {
                // 如果已经投过相同的票，取消投票
                if ($existingVote->vote_type == $validated['vote_type']) {
                    // 更新统计
                    if ($existingVote->vote_type == 1) {
                        $explanation->decrement('likes_count');
                    } else {
                        $explanation->decrement('dislikes_count');
                    }
                    $existingVote->delete();

                    DB::commit();
                    return response()->json([
                        'success' => true,
                        'message' => '取消投票成功',
                        'data' => [
                            'likes_count' => $explanation->fresh()->likes_count,
                            'dislikes_count' => $explanation->fresh()->dislikes_count,
                            'user_vote' => null,
                        ]
                    ]);
                } else {
                    // 如果投了不同的票，更换投票
                    // 减少旧的计数
                    if ($existingVote->vote_type == 1) {
                        $explanation->decrement('likes_count');
                    } else {
                        $explanation->decrement('dislikes_count');
                    }

                    // 增加新的计数
                    if ($validated['vote_type'] == 1) {
                        $explanation->increment('likes_count');
                    } else {
                        $explanation->increment('dislikes_count');
                    }

                    // 更新投票记录
                    $existingVote->update(['vote_type' => $validated['vote_type']]);
                }
            } else {
                // 创建新的投票
                BibleExplanationVote::create([
                    'explanation_id' => $explanation->id,
                    'user_id' => $userId,
                    'vote_type' => $validated['vote_type'],
                ]);

                // 更新统计
                if ($validated['vote_type'] == 1) {
                    $explanation->increment('likes_count');
                } else {
                    $explanation->increment('dislikes_count');
                }
            }

            $explanation = $explanation->fresh();

            // 检查是否需要自动重新生成（踩的数量超过5）
            $shouldRegenerate = $explanation->shouldRegenerate();
            if ($shouldRegenerate) {
                // 可以在这里触发自动重新生成的逻辑
                // 比如发送队列任务等
            }

            DB::commit();

            return response()->json([
                'success' => true,
                'message' => '投票成功',
                'data' => [
                    'likes_count' => $explanation->likes_count,
                    'dislikes_count' => $explanation->dislikes_count,
                    'user_vote' => $validated['vote_type'],
                    'should_regenerate' => $shouldRegenerate,
                ]
            ]);

        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'success' => false,
                'message' => '投票失败：' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * 生成AI解释
     */
    public function generate(Request $request, $dailyTaskId, OpenRouterService $openRouterService)
    {
        try {
            $dailyTask = DailyTask::findOrFail($dailyTaskId);

            // 检查是否已经有解释
            $existingExplanation = BibleReadingExplanation::where('daily_task_id', $dailyTaskId)
                ->where('status', 1)
                ->first();

            if ($existingExplanation) {
                return response()->json([
                    'success' => false,
                    'message' => '该任务已有AI解释'
                ], 400);
            }

            // 调用OpenRouter API生成解释
            $result = $openRouterService->generateBibleExplanation($dailyTask->bible_reading);

            if (!$result['success']) {
                return response()->json([
                    'success' => false,
                    'message' => 'AI解释生成失败：' . $result['error_message']
                ], 500);
            }

            // 保存解释到数据库
            $explanation = BibleReadingExplanation::create([
                'daily_task_id' => $dailyTask->id,
                'explanation' => $result['explanation'],
                'model_used' => $result['model_used'],
                'status' => 1,
            ]);

            return response()->json([
                'success' => true,
                'message' => 'AI解释生成成功',
                'data' => [
                    'id' => $explanation->id,
                    'explanation' => $explanation->explanation,
                    'model_used' => $explanation->model_used,
                    'likes_count' => 0,
                    'dislikes_count' => 0,
                    'user_vote' => null,
                ]
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => '生成AI解释时发生错误：' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * 重新生成AI解释
     */
    public function regenerate(Request $request, $dailyTaskId, OpenRouterService $openRouterService)
    {
        try {
            $dailyTask = DailyTask::findOrFail($dailyTaskId);

            // 删除旧的解释和投票记录
            $oldExplanation = BibleReadingExplanation::where('daily_task_id', $dailyTaskId)->first();
            if ($oldExplanation) {
                $oldExplanation->delete(); // 级联删除投票记录
            }

            // 调用OpenRouter API生成解释
            $result = $openRouterService->generateBibleExplanation($dailyTask->bible_reading);

            if (!$result['success']) {
                // 保存失败记录
                BibleReadingExplanation::create([
                    'daily_task_id' => $dailyTask->id,
                    'status' => 0,
                    'error_message' => $result['error_message'],
                ]);

                return response()->json([
                    'success' => false,
                    'message' => 'AI解释生成失败：' . $result['error_message']
                ], 500);
            }

            // 保存新的解释
            $explanation = BibleReadingExplanation::create([
                'daily_task_id' => $dailyTask->id,
                'explanation' => $result['explanation'],
                'model_used' => $result['model_used'],
                'status' => 1,
            ]);

            return response()->json([
                'success' => true,
                'message' => 'AI解释重新生成成功',
                'data' => [
                    'id' => $explanation->id,
                    'explanation' => $explanation->explanation,
                    'model_used' => $explanation->model_used,
                    'likes_count' => 0,
                    'dislikes_count' => 0,
                    'user_vote' => null,
                ]
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => '重新生成AI解释时发生错误：' . $e->getMessage()
            ], 500);
        }
    }
}
