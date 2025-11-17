<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

/**
 * Cloudflare RealtimeKit 集成服务
 *
 * 文档: https://developers.cloudflare.com/realtime/realtimekit/
 * API: https://docs.realtime.cloudflare.com/api?v=v2
 *
 * 核心概念:
 * - Meeting: 对应一个直播间,可以有多个 Session (每次开播)
 * - Participant: 参与者(主播或观众),通过 Token 加入
 * - Preset: 权限模板,需在 Developer Portal 预创建
 *   * host: 主播权限 (可推流、控制会议)
 *   * viewer: 观众权限 (只能观看)
 * - Stage: 音视频推流区,观众需要"上麦"才能推流
 */
class CloudflareRealtimeService
{
    protected string $organizationId;
    protected string $apiKey;
    protected string $apiBaseUrl;

    public function __construct()
    {
        $this->organizationId = config('services.cloudflare.realtime_org_id');
        $this->apiKey = config('services.cloudflare.realtime_api_key');
        $this->apiBaseUrl = 'https://api.realtime.cloudflare.com/v2';
    }

    /**
     * 获取 HTTP 基础认证头
     */
    protected function getAuthHeaders(): array
    {
        $credentials = base64_encode("{$this->organizationId}:{$this->apiKey}");

        return [
            'Authorization' => "Basic {$credentials}",
            'Content-Type' => 'application/json',
        ];
    }

    /**
     * 创建新的 Meeting (直播间)
     *
     * @param array $options {
     *   @type string $title Meeting 标题 (必需)
     *   @type string $preferred_region 首选区域 (可选,默认 ap-south-1)
     *   @type bool $record_on_start 开始时自动录制 (可选,默认 false)
     *   @type bool $live_stream_on_start 开始时自动直播推流 (可选,默认 false)
     *   @type bool $persist_chat 持久化聊天记录 (可选,默认 false)
     *   @type bool $summarize_on_end 结束时生成摘要 (可选,默认 false)
     *   @type array $recording_config 录制配置 (可选)
     *   @type array $ai_config AI 配置 (可选)
     * }
     * @return array|null {
     *   @type bool $success 是否成功
     *   @type array $data {
     *     @type string $id Meeting ID
     *     @type string $title Meeting 标题
     *     @type string $preferred_region 区域
     *     @type string $created_at 创建时间
     *     @type string $status 状态
     *   }
     * }
     */
    public function createMeeting(array $options): ?array
    {
        try {
            $payload = [
                'title' => $options['title'] ?? 'Untitled Meeting',
                'preferred_region' => $options['preferred_region'] ?? 'ap-south-1', // 亚太区域
            ];

            // 可选参数
            if (isset($options['record_on_start'])) {
                $payload['record_on_start'] = $options['record_on_start'];
            }
            if (isset($options['live_stream_on_start'])) {
                $payload['live_stream_on_start'] = $options['live_stream_on_start'];
            }
            if (isset($options['persist_chat'])) {
                $payload['persist_chat'] = $options['persist_chat'];
            }
            if (isset($options['summarize_on_end'])) {
                $payload['summarize_on_end'] = $options['summarize_on_end'];
            }
            if (isset($options['recording_config'])) {
                $payload['recording_config'] = $options['recording_config'];
            }
            if (isset($options['ai_config'])) {
                $payload['ai_config'] = $options['ai_config'];
            }

            $response = Http::withHeaders($this->getAuthHeaders())
                ->post("{$this->apiBaseUrl}/meetings", $payload);

            if ($response->successful()) {
                $result = $response->json();

                // 返回格式: { "success": true, "data": { "id": "...", ... } }
                if (isset($result['success']) && $result['success'] && isset($result['data'])) {
                    Log::info('RealtimeKit: 创建 Meeting 成功', [
                        'meeting_id' => $result['data']['id'] ?? null,
                        'title' => $result['data']['title'] ?? null,
                    ]);
                    return $result['data'];
                }

                Log::error('RealtimeKit: 创建 Meeting 响应格式异常', [
                    'response' => $result,
                ]);
                return null;
            }

            Log::error('RealtimeKit: 创建 Meeting 失败', [
                'status' => $response->status(),
                'body' => $response->body(),
            ]);
            return null;

        } catch (\Exception $e) {
            Log::error('RealtimeKit: 创建 Meeting 异常', [
                'error' => $e->getMessage(),
            ]);
            return null;
        }
    }

    /**
     * 添加参与者并生成 Token
     *
     * @param string $meetingId Meeting ID
     * @param array $options {
     *   @type string $name 参与者名称 (可选)
     *   @type string $picture 参与者头像 URL (可选)
     *   @type string $preset_name Preset 名称 (必需,如 'group_call_host', 'group_call_viewer')
     *   @type string $custom_participant_id 自定义参与者 ID (可选)
     * }
     * @return array|null {
     *   @type bool $success 是否成功
     *   @type array $data {
     *     @type string $id 参与者 ID
     *     @type string $name 参与者名称
     *     @type string $picture 头像 URL
     *     @type string $custom_participant_id 自定义 ID
     *     @type string $preset_name Preset 名称
     *     @type string $token 参与者 Token (前端用此加入 Meeting)
     *     @type string $created_at 创建时间
     *     @type string $updated_at 更新时间
     *   }
     * }
     */
    public function addParticipant(string $meetingId, array $options): ?array
    {
        try {
            $payload = [
                'preset_name' => $options['preset_name'], // 必需
            ];

            // 可选参数
            if (isset($options['name'])) {
                $payload['name'] = $options['name'];
            }
            if (isset($options['picture'])) {
                $payload['picture'] = $options['picture'];
            }
            if (isset($options['custom_participant_id'])) {
                $payload['custom_participant_id'] = $options['custom_participant_id'];
            }

            $response = Http::withHeaders($this->getAuthHeaders())
                ->post("{$this->apiBaseUrl}/meetings/{$meetingId}/participants", $payload);

            if ($response->successful()) {
                $result = $response->json();

                // 返回格式: { "success": true, "data": { "id": "...", "token": "...", ... } }
                if (isset($result['success']) && $result['success'] && isset($result['data'])) {
                    // Log::info('RealtimeKit: 添加参与者成功', [
                    //     'meeting_id' => $meetingId,
                    //     'participant_id' => $result['data']['id'] ?? null,
                    //     'preset_name' => $payload['preset_name'],
                    // ]);
                    return $result['data'];
                }

                Log::error('RealtimeKit: 添加参与者响应格式异常', [
                    'response' => $result,
                ]);
                return null;
            }

            Log::error('RealtimeKit: 添加参与者失败', [
                'meeting_id' => $meetingId,
                'status' => $response->status(),
                'body' => $response->body(),
            ]);
            return null;

        } catch (\Exception $e) {
            Log::error('RealtimeKit: 添加参与者异常', [
                'error' => $e->getMessage(),
            ]);
            return null;
        }
    }

    /**
     * 获取 Meeting 信息
     *
     * @param string $meetingId Meeting ID
     * @return array|null {
     *   @type bool $success 是否成功
     *   @type array $data Meeting 详细信息
     * }
     */
    public function getMeeting(string $meetingId): ?array
    {
        try {
            $response = Http::withHeaders($this->getAuthHeaders())
                ->get("{$this->apiBaseUrl}/meetings/{$meetingId}");

            if ($response->successful()) {
                $result = $response->json();

                // 返回格式: { "success": true, "data": { "id": "...", ... } }
                if (isset($result['success']) && $result['success'] && isset($result['data'])) {
                    return $result['data'];
                }

                Log::error('RealtimeKit: 获取 Meeting 响应格式异常', [
                    'response' => $result,
                ]);
                return null;
            }

            Log::error('RealtimeKit: 获取 Meeting 失败', [
                'meeting_id' => $meetingId,
                'status' => $response->status(),
                'body' => $response->body(),
            ]);
            return null;

        } catch (\Exception $e) {
            Log::error('RealtimeKit: 获取 Meeting 异常', [
                'error' => $e->getMessage(),
            ]);
            return null;
        }
    }

    /**
     * 移除参与者
     *
     * @param string $meetingId Meeting ID
     * @param string $participantId Participant ID
     * @return array|null {
     *   @type bool $success 是否成功
     *   @type array $data {
     *     @type string $custom_participant_id 自定义参与者 ID
     *     @type string $preset_id Preset ID
     *     @type string $created_at 创建时间
     *     @type string $updated_at 更新时间
     *   }
     * }
     */
    public function removeParticipant(string $meetingId, string $participantId): ?array
    {
        try {
            $response = Http::withHeaders($this->getAuthHeaders())
                ->delete("{$this->apiBaseUrl}/meetings/{$meetingId}/participants/{$participantId}");

            if ($response->successful()) {
                $result = $response->json();

                // 返回格式: { "success": true, "data": { ... } }
                if (isset($result['success']) && $result['success']) {
                    Log::info('RealtimeKit: 移除参与者成功', [
                        'meeting_id' => $meetingId,
                        'participant_id' => $participantId,
                    ]);
                    return $result['data'] ?? [];
                }

                Log::error('RealtimeKit: 移除参与者响应格式异常', [
                    'response' => $result,
                ]);
                return null;
            }

            Log::error('RealtimeKit: 移除参与者失败', [
                'meeting_id' => $meetingId,
                'participant_id' => $participantId,
                'status' => $response->status(),
                'body' => $response->body(),
            ]);
            return null;

        } catch (\Exception $e) {
            Log::error('RealtimeKit: 移除参与者异常', [
                'error' => $e->getMessage(),
            ]);
            return null;
        }
    }

    /**
     * 结束 Meeting
     *
     * @param string $meetingId Meeting ID
     * @return bool
     */
    public function endMeeting(string $meetingId): bool
    {
        try {
            $response = Http::withHeaders($this->getAuthHeaders())
                ->post("{$this->apiBaseUrl}/meetings/{$meetingId}/end");

            if ($response->successful()) {
                Log::info('RealtimeKit: 结束 Meeting 成功', [
                    'meeting_id' => $meetingId,
                ]);
                return true;
            }

            Log::error('RealtimeKit: 结束 Meeting 失败', [
                'status' => $response->status(),
                'body' => $response->body(),
            ]);
            return false;

        } catch (\Exception $e) {
            Log::error('RealtimeKit: 结束 Meeting 异常', [
                'error' => $e->getMessage(),
            ]);
            return false;
        }
    }

    /**
     * 获取 Meeting 的所有参与者
     *
     * @param string $meetingId Meeting ID
     * @return array|null {
     *   @type array $data 参与者列表
     *   @type array $paging 分页信息 {
     *     @type int $total_count 总数
     *     @type int $start_offset 起始偏移
     *     @type int $end_offset 结束偏移
     *   }
     * }
     */
    public function getParticipants(string $meetingId): ?array
    {
        try {
            $response = Http::withHeaders($this->getAuthHeaders())
                ->get("{$this->apiBaseUrl}/meetings/{$meetingId}/participants");

            if ($response->successful()) {
                $result = $response->json();

                // 返回格式: { "success": true, "data": [...], "paging": {...} }
                if (isset($result['success']) && $result['success'] && isset($result['data'])) {
                    Log::info('RealtimeKit: 获取参与者列表成功', [
                        'meeting_id' => $meetingId,
                        'count' => count($result['data']),
                        'total_count' => $result['paging']['total_count'] ?? null,
                    ]);

                    return [
                        'data' => $result['data'],
                        'paging' => $result['paging'] ?? null,
                    ];
                }

                Log::error('RealtimeKit: 获取参与者列表响应格式异常', [
                    'response' => $result,
                ]);
                return null;
            }

            Log::error('RealtimeKit: 获取参与者列表失败', [
                'meeting_id' => $meetingId,
                'status' => $response->status(),
                'body' => $response->body(),
            ]);
            return null;

        } catch (\Exception $e) {
            Log::error('RealtimeKit: 获取参与者列表异常', [
                'error' => $e->getMessage(),
            ]);
            return null;
        }
    }

    /**
     * 获取 Meeting 的活跃 Session (实时状态)
     *
     * @param string $meetingId Meeting ID
     * @return array|null {
     *   @type string $id Session ID
     *   @type string $associated_id Meeting ID
     *   @type string $type Session 类型 (meeting)
     *   @type string $status 状态 (LIVE, ENDED)
     *   @type int $live_participants 实时在线人数 (关键字段)
     *   @type int $max_concurrent_participants 最大并发参与者数
     *   @type float $minutes_consumed 消耗分钟数
     *   @type string $started_at 开始时间
     *   @type string|null $ended_at 结束时间
     *   @type string $created_at 创建时间
     *   @type string $updated_at 更新时间
     * }
     */
    public function getActiveSession(string $meetingId): ?array
    {
        try {
            $response = Http::withHeaders($this->getAuthHeaders())
                ->get("{$this->apiBaseUrl}/meetings/{$meetingId}/active-session");

            if ($response->successful()) {
                $result = $response->json();

                // 返回格式: { "success": true, "data": { "live_participants": 1, ... } }
                if (isset($result['success']) && $result['success'] && isset($result['data'])) {
                    return $result['data'];
                }

                Log::error('RealtimeKit: 获取活跃 Session 响应格式异常', [
                    'response' => $result,
                ]);
                return null;
            }

            // 404 表示没有活跃的 Session (这是正常情况)
            if ($response->status() === 404) {
                // Log::debug('RealtimeKit: 没有活跃的 Session', [
                //     'meeting_id' => $meetingId,
                // ]);
                return null;
            }

            Log::error('RealtimeKit: 获取活跃 Session 失败', [
                'meeting_id' => $meetingId,
                'status' => $response->status(),
                'body' => $response->body(),
            ]);
            return null;

        } catch (\Exception $e) {
            Log::error('RealtimeKit: 获取活跃 Session 异常', [
                'error' => $e->getMessage(),
            ]);
            return null;
        }
    }

    /**
     * 静音指定参与者
     *
     * @param string $meetingId Meeting ID
     * @param array $options {
     *   @type array $participant_ids 参与者 ID 数组 (可选)
     *   @type array $custom_participant_ids 自定义参与者 ID 数组 (可选)
     * }
     * @return array|null {
     *   @type bool $success 是否成功
     *   @type array $data {
     *     @type array $muted 已静音的参与者 ID 列表
     *   }
     * }
     */
    public function muteParticipants(string $meetingId, array $options): ?array
    {
        try {
            $payload = [];

            // 可选参数: participant_ids 或 custom_participant_ids (至少提供一个)
            if (isset($options['participant_ids'])) {
                $payload['participant_ids'] = $options['participant_ids'];
            }
            if (isset($options['custom_participant_ids'])) {
                $payload['custom_participant_ids'] = $options['custom_participant_ids'];
            }

            $response = Http::withHeaders($this->getAuthHeaders())
                ->post("{$this->apiBaseUrl}/meetings/{$meetingId}/mute", $payload);

            if ($response->successful()) {
                $result = $response->json();

                // 返回格式: { "success": true, "data": { "muted": [...] } }
                if (isset($result['success']) && $result['success'] && isset($result['data'])) {
                    Log::info('RealtimeKit: 静音参与者成功', [
                        'meeting_id' => $meetingId,
                        'muted_count' => count($result['data']['muted'] ?? []),
                    ]);
                    return $result['data'];
                }

                Log::error('RealtimeKit: 静音参与者响应格式异常', [
                    'response' => $result,
                ]);
                return null;
            }

            Log::error('RealtimeKit: 静音参与者失败', [
                'meeting_id' => $meetingId,
                'status' => $response->status(),
                'body' => $response->body(),
            ]);
            return null;

        } catch (\Exception $e) {
            Log::error('RealtimeKit: 静音参与者异常', [
                'error' => $e->getMessage(),
            ]);
            return null;
        }
    }

    /**
     * 静音所有参与者
     *
     * @param string $meetingId Meeting ID
     * @param bool $allowUnmute 是否允许参与者自行解除静音 (默认 true)
     * @return array|null {
     *   @type bool $success 是否成功
     *   @type array $data {
     *     @type array $muted 已静音的参与者 ID 列表
     *   }
     * }
     */
    public function muteAllParticipants(string $meetingId, bool $allowUnmute = true): ?array
    {
        try {
            $payload = [
                'allow_unmute' => $allowUnmute,
            ];

            $response = Http::withHeaders($this->getAuthHeaders())
                ->post("{$this->apiBaseUrl}/meetings/{$meetingId}/mute-all", $payload);

            if ($response->successful()) {
                $result = $response->json();

                // 返回格式: { "success": true, "data": { "muted": [...] } }
                if (isset($result['success']) && $result['success'] && isset($result['data'])) {
                    Log::info('RealtimeKit: 静音所有参与者成功', [
                        'meeting_id' => $meetingId,
                        'muted_count' => count($result['data']['muted'] ?? []),
                        'allow_unmute' => $allowUnmute,
                    ]);
                    return $result['data'];
                }

                Log::error('RealtimeKit: 静音所有参与者响应格式异常', [
                    'response' => $result,
                ]);
                return null;
            }

            Log::error('RealtimeKit: 静音所有参与者失败', [
                'meeting_id' => $meetingId,
                'status' => $response->status(),
                'body' => $response->body(),
            ]);
            return null;

        } catch (\Exception $e) {
            Log::error('RealtimeKit: 静音所有参与者异常', [
                'error' => $e->getMessage(),
            ]);
            return null;
        }
    }
}