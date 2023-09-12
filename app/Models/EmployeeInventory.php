<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EmployeeInventory extends Model
{
    use HasFactory;

    protected $fillable = [
        'transferred_date', 'surrendered_date', 'officer_in_charge', 'is_active', 'json_attr'
    ];

    public function byEmployee()
    {
        return $this->belongsTo(\App\Models\Employee::class, 'employee_id');
    }

    public function byItem()
    {
        return $this->belongsTo(\App\Models\Item::class, 'item_id');
    }
}
