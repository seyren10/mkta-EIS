<?php

namespace App\Http\Controllers;

use App\Models\EmployeeInventory;
use Illuminate\Http\Request;

class EmployeeInventoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return inertia('EmployeeInventory/Index', [
            'employeesInventory' => EmployeeInventory::with(['byEmployee', 'byItem'])->get()
            // ('id', 'transferred_date', 'transferred_to', 'surrendered_date', 'officer_in_charge', 'is_active', 'employee_id', 'item_id')
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(EmployeeInventory $employeeInventory)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(EmployeeInventory $employeeInventory)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, EmployeeInventory $employeeInventory)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(EmployeeInventory $employeeInventory)
    {
        //
    }
}
