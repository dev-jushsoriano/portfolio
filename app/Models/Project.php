<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    protected $fillable = [
        'title', 'slug', 'category', 'client', 'summary', 'problem',
        'solution', 'impact', 'users_scale', 'tech_stack', 'cover_image',
        'gallery', 'live_url', 'is_confidential', 'is_featured',
        'is_published', 'sort_order',
    ];

    protected function casts(): array
    {
        return [
            'tech_stack' => 'array',
            'gallery' => 'array',
            'is_confidential' => 'boolean',
            'is_featured' => 'boolean',
            'is_published' => 'boolean',
        ];
    }
}