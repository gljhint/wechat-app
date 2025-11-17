<?php

namespace App\Console\Commands;

use App\Models\ChatMessage;
use Carbon\Carbon;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Log;

class CleanupChatMessages extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'chat:cleanup
                            {--days= : 清理指定天数之前的消息,不指定则使用配置文件的值}
                            {--dry-run : 试运行模式,只显示将要删除的数据,不实际删除}
                            {--force : 强制删除,不询问确认}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = '清理过期的聊天记录及关联的媒体文件';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        // 检查是否启用自动清理
        if (!config('chat.auto_cleanup_enabled')) {
            $this->warn('❌ 聊天记录自动清理功能已禁用');
            $this->info('💡 提示: 在 config/chat.php 中设置 auto_cleanup_enabled 为 true 以启用');
            return Command::FAILURE;
        }

        // 获取保存天数
        $retentionDays = $this->option('days') ?? config('chat.retention_days');

        // 如果设置为0或null,表示永久保存
        if (!$retentionDays || $retentionDays <= 0) {
            $this->info('✅ 聊天记录设置为永久保存,无需清理');
            return Command::SUCCESS;
        }

        $this->info("🗑️  开始清理 {$retentionDays} 天之前的聊天记录...");
        $this->newLine();

        // 计算截止日期
        $cutoffDate = Carbon::now()->subDays($retentionDays);
        $this->info("📅 截止日期: {$cutoffDate->toDateTimeString()}");

        // 查询需要删除的消息
        $query = ChatMessage::where('created_at', '<', $cutoffDate);
        $totalCount = $query->count();

        if ($totalCount === 0) {
            $this->info('✅ 没有需要清理的消息');
            return Command::SUCCESS;
        }

        // 统计各类型消息数量
        $this->info("📊 待清理消息统计:");
        $this->table(
            ['类型', '数量'],
            [
                ['文本消息', ChatMessage::where('created_at', '<', $cutoffDate)->where('message_type', ChatMessage::TYPE_TEXT)->count()],
                ['图片消息', ChatMessage::where('created_at', '<', $cutoffDate)->where('message_type', ChatMessage::TYPE_IMAGE)->count()],
                ['语音消息', ChatMessage::where('created_at', '<', $cutoffDate)->where('message_type', ChatMessage::TYPE_VOICE)->count()],
                ['视频消息', ChatMessage::where('created_at', '<', $cutoffDate)->where('message_type', ChatMessage::TYPE_VIDEO)->count()],
                ['文件消息', ChatMessage::where('created_at', '<', $cutoffDate)->where('message_type', ChatMessage::TYPE_FILE)->count()],
                ['总计', $totalCount],
            ]
        );

        // 试运行模式
        if ($this->option('dry-run')) {
            $this->warn('🔍 试运行模式: 以上消息将在正式运行时被删除');
            return Command::SUCCESS;
        }

        // 确认删除
        if (!$this->option('force')) {
            if (!$this->confirm("⚠️  确定要删除这 {$totalCount} 条消息吗? (此操作不可恢复)", false)) {
                $this->info('❌ 操作已取消');
                return Command::SUCCESS;
            }
        }

        // 开始删除
        $this->newLine();
        $this->info('🚀 开始删除过期消息...');

        $deletedCount = 0;
        $deletedFilesCount = 0;
        $batchSize = config('chat.cleanup_batch_size', 1000);

        $progressBar = $this->output->createProgressBar($totalCount);
        $progressBar->start();

        try {
            DB::beginTransaction();

            // 分批处理,避免内存溢出
            ChatMessage::where('created_at', '<', $cutoffDate)
                ->chunkById($batchSize, function ($messages) use (&$deletedCount, &$deletedFilesCount, $progressBar) {
                    foreach ($messages as $message) {
                        // 删除关联的媒体文件
                        if ($message->media_url) {
                            if ($this->deleteMediaFile($message->media_url)) {
                                $deletedFilesCount++;
                            }
                        }

                        // 删除消息记录
                        $message->delete();
                        $deletedCount++;
                        $progressBar->advance();
                    }
                });

            DB::commit();
            $progressBar->finish();

            $this->newLine(2);
            $this->info("✅ 清理完成!");
            $this->info("📝 删除消息: {$deletedCount} 条");
            $this->info("📁 删除文件: {$deletedFilesCount} 个");

            // 记录日志
            Log::info('聊天记录清理完成', [
                'retention_days' => $retentionDays,
                'cutoff_date' => $cutoffDate->toDateTimeString(),
                'deleted_messages' => $deletedCount,
                'deleted_files' => $deletedFilesCount,
            ]);

            return Command::SUCCESS;

        } catch (\Exception $e) {
            DB::rollBack();
            $progressBar->finish();

            $this->newLine(2);
            $this->error("❌ 清理失败: {$e->getMessage()}");
            Log::error('聊天记录清理失败', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);

            return Command::FAILURE;
        }
    }

    /**
     * 删除媒体文件 (支持R2/S3存储)
     *
     * @param string $mediaUrl
     * @return bool
     */
    protected function deleteMediaFile(string $mediaUrl): bool
    {
        try {
            // 如果是完整URL,需要提取文件路径
            if (str_starts_with($mediaUrl, 'http')) {
                // 从R2 URL中提取文件key
                // 例如: https://pub-xxx.r2.dev/chat/images/xxx.jpg -> chat/images/xxx.jpg
                $parsedUrl = parse_url($mediaUrl);
                $path = ltrim($parsedUrl['path'] ?? '', '/');
            } else {
                $path = $mediaUrl;
            }

            // 如果路径为空,返回false
            if (empty($path)) {
                return false;
            }

            // 获取存储磁盘 (默认使用r2)
            $disk = config('chat.storage.disk', 'r2');

            // 检查文件是否存在并删除
            if (Storage::disk($disk)->exists($path)) {
                $deleted = Storage::disk($disk)->delete($path);

                if ($deleted) {
                    Log::info('成功删除R2文件', ['path' => $path]);
                    return true;
                }
            }

            return false;
        } catch (\Exception $e) {
            Log::warning('删除R2文件失败', [
                'media_url' => $mediaUrl,
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);
            return false;
        }
    }
}
