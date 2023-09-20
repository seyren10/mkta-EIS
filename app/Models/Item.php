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
        'employee_id',
        'status',
        'accountability_no',
        'date_purchased',
        'json_attr',
        'location_id',
    ];

    protected $hidden = [
        'category_id',
        'employee_id',
        'location_id'
    ];

    public function category(): BelongsTo
    {
        return $this->belongsTo(\App\Models\Category::class, 'category_id');
    }

    public function employeeInventories()
    {
        return $this->hasMany(\App\Models\EmployeeInventory::class)->orderByDesc('created_at');
    }

    public function ownedByEmployee()
    {
        return $this->belongsTo(\App\Models\Employee::class, 'employee_id');
    }
}
