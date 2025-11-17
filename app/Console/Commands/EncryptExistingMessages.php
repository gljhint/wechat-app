<?php

namespace App\Console\Commands;

use App\Models\ChatMessage;
use App\Services\ChatEncryptionService;
use Illuminate\Console\Command;

class EncryptExistingMessages extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'chat:encrypt-messages {--force : 强制加密所有消息,包括已加密的}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = '加密现有的聊天消息记录 (端到端加密)';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $this->info('🔐 开始加密聊天消息...');

        $encryptionService = app(ChatEncryptionService::class);

        // 获取未加密的消息
        $query = ChatMessage::query();

        if (!$this->option('force')) {
            $query->where('is_encrypted', false);
        }

        $totalMessages = $query->count();

        if ($totalMessages === 0) {
            $this->info('✅ 没有需要加密的消息');
            return 0;
        }

        $this->info("📊 找到 {$totalMessages} 条消息需要加密");

        $progressBar = $this->output->createProgressBar($totalMessages);
        $progressBar->start();

        $successCount = 0;
        $errorCount = 0;

        // 分块处理,避免内存溢出
        $query->chunk(100, function ($messages) use ($encryptionService, $progressBar, &$successCount, &$errorCount) {
            foreach ($messages as $message) {
                try {
                    // 跳过已撤回或空内容的消息
                    if ($message->is_recalled || empty($message->content)) {
                        $progressBar->advance();
                        continue;
                    }

                    // 临时保存原始内容(因为模型会自动加密)
                    $originalContent = $message->getAttributes()['content'];
                    $originalMediaUrl = $message->getAttributes()['media_url'] ?? null;

                    // 加密文本内容
                    if (!empty($originalContent) && (!$message->is_encrypted || $this->option('force'))) {
                        $encrypted = $encryptionService->encryptMessage(
                            $originalContent,
                            $message->from_user_id,
                            $message->to_user_id
                        );

                        $message->content = $encrypted['encrypted_content'];
                        $message->encryption_key = $encrypted['encryption_key'];
                        $message->encryption_iv = $encrypted['encryption_iv'];
                        $message->is_encrypted = true;
                    }

                    // 加密媒体URL
                    if (!empty($originalMediaUrl) && (!$message->is_encrypted || $this->option('force'))) {
                        $message->media_url = $encryptionService->encryptMediaUrl($originalMediaUrl);
                    }

                    // 使用 saveQuietly 避免触发 boot 事件
                    $message->saveQuietly();

                    $successCount++;
                } catch (\Exception $e) {
                    $errorCount++;
                    $this->error("\n❌ 消息ID {$message->id} 加密失败: " . $e->getMessage());
                }

                $progressBar->advance();
            }
        });

        $progressBar->finish();
        $this->newLine(2);

        $this->info("✅ 加密完成!");
        $this->info("   成功: {$successCount} 条");
        if ($errorCount > 0) {
            $this->error("   失败: {$errorCount} 条");
        }

        return 0;
    }
}
