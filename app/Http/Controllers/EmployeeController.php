<?php

namespace App\Http\Controllers;

use App\Http\Resources\EmployeeResource;
use App\Models\Employee;
use Illuminate\Http\Request;

class EmployeeController extends Controller
{



    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return EmployeeResource::collection(Employee::orderByDesc('created_at')->get(['id', 'employee_no', 'full_name', 'is_active', 'RFID_no']));
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
        Employee::create([
            ...$request->all(),
            ...$request->validate([
                'employee_no' => 'required',
                'RFID_no' => 'required|min_digits:10',
                'full_name' => 'required',
                'is_active' => 'required'
            ])
        ]);
        return response()->noContent();
    }

    /**
     * Display the specified resource.
     */
    public function show(Employee $employee)
    {
        // dd($employee->items()->get());
        return response()->json([
            'data' => $employee->load('items')
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Employee $employee)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Employee $employee)
    {
        $employee->update([
            ...$request->all(),
            ...$request->validate([
                'employee_no' => 'required',
                'RFID_no' => 'required|min_digits:10',
                'full_name' => 'required',
                'is_active' => 'required'
            ])
        ]);


        return response()->noContent();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Employee $employee)
    {
        $employee->delete();

        return to_route('employee.index')->with('success', 'Employee has been deleted.');
    }
}
