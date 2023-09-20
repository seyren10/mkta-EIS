<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EmployeeInventory extends Model
{
    use HasFactory;

    protected $fillable = [
        'transferred_date', 'officer_in_charge', 'is_active', 'json_attr', 'item_id', 'employee_id', 'location_id'
    ];

    protected $hidden = [
        'location_id'
    ];

    public function byEmployee()
    {
        return $this->belongsTo(\App\Models\Employee::class, 'employee_id');
    }

    public function byItem()
    {
        return $this->belongsTo(\App\Models\Item::class, 'item_id');
    }

    public function byLocation()
    {
        return $this->belongsTo(\App\Models\Location::class, 'location_id');
    }
}
