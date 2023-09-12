<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Category extends Model
{
    use HasFactory;


    protected $fillable = [
        'name', 'description'
    ];

    protected $hidden = ['updated_at'];
    public function items(): HasMany
    {
        return $this->hasMany(\App\Models\Item::class);
    }
}
