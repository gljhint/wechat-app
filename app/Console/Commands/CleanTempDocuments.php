<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Storage;
use Carbon\Carbon;

class CleanTempDocuments extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'documents:clean-temp {--hours=24 : 清理多少小时前的临时文件}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = '清理R2中超过指定时间的临时文档文件';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $hours = $this->option('hours');
        $this->info("开始清理 {$hours} 小时前的临时文件...");

        try {
            $disk = Storage::disk('r2');
            $tempPath = 'documents/temp/';

            // 获取临时目录下的所有文件
            $files = $disk->files($tempPath);

            $deletedCount = 0;
            $cutoffTime = Carbon::now()->subHours($hours)->timestamp;

            foreach ($files as $file) {
                // 获取文件的最后修改时间
                $lastModified = $disk->lastModified($file);

                // 如果文件超过指定时间，删除它
                if ($lastModified < $cutoffTime) {
                    $disk->delete($file);
                    $deletedCount++;
                    $this->line("已删除: {$file}");
                }
            }

            $this->info("清理完成！共删除 {$deletedCount} 个临时文件。");
            return Command::SUCCESS;

        } catch (\Exception $e) {
            $this->error("清理失败：" . $e->getMessage());
            return Command::FAILURE;
        }
    }
}
