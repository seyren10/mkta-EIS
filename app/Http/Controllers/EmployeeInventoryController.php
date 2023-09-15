<?php

namespace App\Http\Controllers;

use App\Models\EmployeeInventory;
use App\Models\Item;
use Illuminate\Http\Request;

class EmployeeInventoryController extends Controller
{
  /**
   * Display a listing of the resource.
   */
  public function index()
  {
    return response()->json([
      'data' => EmployeeInventory::all()
    ]);
  }
  public function show(Item $item)
  {
    return $item->employeesInventory()->get();
  }
  public function associate(Request $request)
  {
    EmployeeInventory::create([
      ...$request->all(),
      ...$request->validate([
        'transferred_date' => ['date'],
        'officer_in_charge' => ['required', 'string'],
        'item_id' => ['required', 'integer'],
        'employee_id' => ['required', 'integer'],
      ])
    ]);

  
    Item::find($request->get('item_id'))->update(
      $request->validate(['employee_id' => ['integer']])
    );
   

    return response()->noContent();
  }
  public function disassociate(Request $request)
  {
    
  }
}
