<?php

namespace App\Jobs;

use App\Models\ChatGroup;
use App\Services\GroupAvatarService;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;

class GenerateGroupAvatarJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public $timeout = 120; // 2分钟超时
    public $tries = 3; // 最多重试3次

    protected $groupId;

    /**
     * Create a new job instance.
     */
    public function __construct(int $groupId)
    {
        $this->groupId = $groupId;
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        try {
            $group = ChatGroup::with(['members.user'])->find($this->groupId);

            if (!$group) {
                Log::warning("群组不存在,无法生成头像: {$this->groupId}");
                return;
            }

            // 只为成员数<=9的群生成头像
            if (!GroupAvatarService::shouldRegenerate($group)) {
                Log::info("群组成员数>9,跳过头像生成: {$this->groupId}");
                return;
            }

            $result = GroupAvatarService::generateGroupAvatar($group);

            if ($result) {
                Log::info("群组头像生成成功: {$this->groupId}");
            } else {
                Log::error("群组头像生成失败: {$this->groupId}");
            }

        } catch (\Exception $e) {
            Log::error("群组头像生成异常: {$this->groupId}, " . $e->getMessage());
            throw $e; // 重新抛出异常以触发重试
        }
    }
}
