<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Location extends Model
{
    use HasFactory;

    protected $fillable = [
        'name'
    ];

    public function employeeInventories()
    {
        return $this->hasMany(\App\Models\EmployeeInventory::class)->where('is_active', '=', 1);
    }
}
