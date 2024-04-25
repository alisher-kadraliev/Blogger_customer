<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Post extends Model
{
    use HasFactory,SoftDeletes;
    protected $fillable = [
        'title',
        'description',
        'slug',
        'content',
        'author_id',
        'category_id',
        'likes',
        'reading_time',
        'image',
        'image_alt',
        'published',
        'status',
        'views',
        'scheduled_at',
        'meta_title',
        'meta_description'
    ];

    protected $appends = [
        'last_updated',
        'created_at_for_humans',
        'update_status'
    ];

    public $timestamps = true;
    public function author()
    {
        return $this->belongsTo(User::class);
    }

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public  function getLastUpdatedAttribute(): string
    {
        return $this->updated_at ? $this->updated_at->diffForHumans(): 'Güncelenmedi';
    }
    public function getCreatedAtForHumansAttribute()
    {
        return $this->created_at ? $this->created_at->diffForHumans() : 'Bilgi yok';
    }
    public function getUpdateStatusAttribute()
    {
        // Check if both timestamps are not null
        if ($this->created_at && $this->updated_at) {
            if ($this->updated_at->gt($this->created_at)) {
                return $this->updated_at->diffForHumans() . " güncelendi";
            }
        }
        return ($this->created_at ? $this->created_at->diffForHumans() . ' kuruldu' : 'Bilgi yok');
    }



}
