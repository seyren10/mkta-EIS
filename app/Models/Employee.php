<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Employee extends Model
{
    use HasFactory;

    protected $fillable = [
        'employee_no', 'full_name', 'RFID_no', 'json_attr', 'is_active'
    ];

    public function employeesInventory()
    {
        return $this->hasMany(\App\Models\EmployeeInventory::class);
    }

    public function items()
    {
        return $this->hasMany(\App\Models\Item::class)->with('category');
    }
}
