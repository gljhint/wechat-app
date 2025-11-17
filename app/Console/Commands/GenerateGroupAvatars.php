<?php

namespace App\Console\Commands;

use App\Models\ChatGroup;
use App\Services\GroupAvatarService;
use Illuminate\Console\Command;

class GenerateGroupAvatars extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'group:generate-avatars {--force : 强制重新生成所有头像}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = '为群组批量生成9宫格头像(仅处理成员数<=9的群)';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $force = $this->option('force');

        $query = ChatGroup::where('status', ChatGroup::STATUS_ACTIVE)
            ->where('member_count', '<=', 9);

        // 如果不是强制模式,只处理没有头像或头像为默认的群
        if (!$force) {
            $query->where(function($q) {
                $q->whereNull('avatar')
                  ->orWhere('avatar', '')
                  ->orWhere('avatar', 'like', '%default-group-avatar%');
            });
        }

        $groups = $query->with(['members.user'])->get();

        if ($groups->isEmpty()) {
            $this->info('没有需要生成头像的群组');
            return 0;
        }

        $this->info("找到 {$groups->count()} 个群组需要生成头像");

        $bar = $this->output->createProgressBar($groups->count());
        $bar->start();

        $success = 0;
        $failed = 0;

        foreach ($groups as $group) {
            $result = GroupAvatarService::generateGroupAvatar($group);

            if ($result) {
                $success++;
                $this->newLine();
                $this->line("✓ 群组 [{$group->name}] (ID: {$group->id}) 头像生成成功");
            } else {
                $failed++;
                $this->newLine();
                $this->error("✗ 群组 [{$group->name}] (ID: {$group->id}) 头像生成失败");
            }

            $bar->advance();
        }

        $bar->finish();
        $this->newLine(2);

        $this->info("生成完成! 成功: {$success}, 失败: {$failed}");

        return 0;
    }
}
