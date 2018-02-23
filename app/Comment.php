<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\Traits\Uuids;

class Comment extends Model
{
    use Uuids;
    public $incrementing = false;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'content', 'user_id', 'post_id',
    ];

    public function user()
    {
        return $this->belongsTo('App\User');
    }
}
