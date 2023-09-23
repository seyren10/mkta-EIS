<?php

namespace App\Http\Controllers;

use App\Http\Resources\ItemCollection;
use App\Http\Resources\ItemResource;
use App\Models\Category;
use App\Models\Item;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\Enum;

class ItemController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return ItemResource::collection(Item::with(['category', 'ownedByEmployee', 'employeeInventories.byLocation'])->orderByDesc('created_at')->get());
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
        $item = Item::create(
            [
                ...$request->all(),
                ...$request->validate([
                    'model' => ['required'],
                    'brand' => 'required',
                    'accountability_no' => 'required'
                ])
            ]
        );

        return response()->json([
            'data' => $item
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Item $item)
    {
        return response()->json([
            'data' => $item->load(['category', 'ownedByEmployee'])
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Item $item)
    {

        $item->update([
            ...$request->all(),
            ...$request->validate([
                'model' => 'required',
                'brand' => 'required',
                'date_purchased' => 'date|required',
                'accountability_no' => 'integer|required',
                'status' => ['required', Rule::in(['good', 'fair', 'bad', 'for disposal', 'disponsed'])]
            ])
        ]);

        return response()->noContent();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Item $item)
    {
        $item->delete();

        return to_route('item.index')->with('success', 'Item successfully Deleted');
    }
}
