<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BibleExplanationVote extends Model
{
    use HasFactory;

    protected $fillable = [
        'explanation_id',
        'user_id',
        'vote_type',
    ];

    protected $casts = [
        'vote_type' => 'integer',
    ];

    /**
     * 关联解释
     */
    public function explanation()
    {
        return $this->belongsTo(BibleReadingExplanation::class, 'explanation_id');
    }

    /**
     * 关联用户
     */
    public function user()
    {
        return $this->belongsTo(WechatUser::class, 'user_id');
    }

}
