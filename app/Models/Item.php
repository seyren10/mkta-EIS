<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Item extends Model
{
    use HasFactory;

    protected $fillable = [
        'model',
        'brand',
        'serial_no',
        'mk_tag_no',
        'category_id',
    ];

    protected $hidden = [
        'category_id'
    ];

    public function category(): BelongsTo
    {
        return $this->belongsTo(\App\Models\Category::class, 'category_id');
    }

    public function employeesInventory()
    {
        return $this->hasMany(\App\Models\EmployeeInventory::class);
    }

    public function ownedByEmployee()
    {
        return $this->belongsTo(\App\Models\Employee::class, 'employee_id');
    }
}
