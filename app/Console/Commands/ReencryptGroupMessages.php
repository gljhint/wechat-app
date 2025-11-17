<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\ChatMessage;
use App\Services\ChatEncryptionService;
use Illuminate\Support\Facades\DB;

class ReencryptGroupMessages extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'chat:reencrypt-group-messages {--dry-run : 仅预览,不实际修改数据}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = '重新加密群聊消息(修复旧版加密错误)';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $isDryRun = $this->option('dry-run');

        if ($isDryRun) {
            $this->warn('⚠️  干运行模式: 仅预览,不会修改数据');
        } else {
            $this->warn('⚠️  警告: 即将重新加密所有群聊消息!');
            if (!$this->confirm('确认继续吗?')) {
                $this->info('操作已取消');
                return 0;
            }
        }

        $this->info('开始处理群聊消息...');

        // 查找所有已加密的群聊消息
        $messages = ChatMessage::whereNotNull('group_id')
            ->where('is_encrypted', true)
            ->where('message_type', ChatMessage::TYPE_TEXT)
            ->whereNotNull('content')
            ->whereNotNull('encryption_key')
            ->whereNotNull('encryption_iv')
            ->get();

        $total = $messages->count();
        $this->info("找到 {$total} 条需要重新加密的群聊消息");

        if ($total === 0) {
            $this->info('没有需要处理的消息');
            return 0;
        }

        $encryptionService = app(ChatEncryptionService::class);
        $successCount = 0;
        $failCount = 0;
        $skipCount = 0;

        $progressBar = $this->output->createProgressBar($total);
        $progressBar->start();

        foreach ($messages as $message) {
            try {
                // 1. 尝试用旧逻辑解密(无'private:'前缀的密钥)
                $decrypted = null;
                try {
                    // 使用兼容的旧版解密方法
                    $decrypted = $encryptionService->decryptMessageLegacy(
                        $message->content,
                        $message->encryption_key,
                        $message->encryption_iv,
                        $message->from_user_id,
                        $message->group_id
                    );
                } catch (\Exception $e) {
                    // 解密失败,可能已经是新格式,尝试用新群聊逻辑解密
                    try {
                        $decrypted = $encryptionService->decryptMessage(
                            $message->content,
                            $message->encryption_key,
                            $message->encryption_iv,
                            $message->from_user_id,
                            $message->group_id,
                            true  // 群聊模式
                        );
                        // 如果成功,说明已经是新格式,跳过
                        $skipCount++;
                        $progressBar->advance();
                        continue;
                    } catch (\Exception $e2) {
                        // 两种方式都失败,记录错误
                        $this->newLine();
                        $this->warn("消息 ID={$message->id} 两种解密方式都失败: " . $e->getMessage());
                        $skipCount++;
                        $progressBar->advance();
                        continue;
                    }
                }

                if (!$decrypted) {
                    $skipCount++;
                    $progressBar->advance();
                    continue;
                }

                // 2. 用新逻辑重新加密
                if (!$isDryRun) {
                    $encrypted = $encryptionService->encryptMessage(
                        $decrypted,
                        $message->from_user_id,
                        $message->group_id,
                        true  // 群聊模式
                    );

                    // 3. 直接更新数据库(绕过模型事件,避免重复加密)
                    DB::table('chat_messages')
                        ->where('id', $message->id)
                        ->update([
                            'content' => $encrypted['encrypted_content'],
                            'encryption_key' => $encrypted['encryption_key'],
                            'encryption_iv' => $encrypted['encryption_iv'],
                            'is_encrypted' => true,
                            'updated_at' => now(),
                        ]);
                }

                $successCount++;

            } catch (\Exception $e) {
                $failCount++;
                $this->newLine();
                $this->error("消息 ID={$message->id} 处理失败: " . $e->getMessage());
            }

            $progressBar->advance();
        }

        $progressBar->finish();
        $this->newLine(2);

        // 输出统计
        $this->info('处理完成!');
        $this->table(
            ['状态', '数量'],
            [
                ['成功', $successCount],
                ['失败', $failCount],
                ['跳过(已是新格式)', $skipCount],
                ['总计', $total],
            ]
        );

        if ($isDryRun) {
            $this->warn('⚠️  这是干运行模式,未实际修改数据');
            $this->info('执行以下命令进行实际加密: php artisan chat:reencrypt-group-messages');
        }

        return 0;
    }
}
