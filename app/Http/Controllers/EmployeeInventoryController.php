<?php

namespace App\Http\Controllers;

use App\Http\Resources\EmployeeInventoryResource;
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
      'data' => EmployeeInventory::orderByDesc('created_at')
    ]);
  }

  public function show(Item $item)
  {
    return response()->json([
      'data' => Item::find($item)->first()->employeeInventories->load(['byEmployee'])
    ]);
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


    $item =   Item::find($request->get('item_id'));

    if ($request->is_active) {
      $item->update(
        $request->validate(['employee_id' => ['integer']])
      );
    } else {
      $item->update(
        ['employee_id' => null]
      );
    }

    return response()->noContent();
  }
}
