<?php

namespace App\Http\Controllers;

use App\Http\Resources\ItemCollection;
use App\Http\Resources\ItemResource;
use App\Models\Category;
use App\Models\Item;
use Illuminate\Http\Request;

class ItemController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return ItemResource::collection(Item::with(['category', 'ownedByEmployee'])->orderByDesc('created_at')->get());
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
        $category = Category::find($request->category_id);
        $category->items()->create(
            [
                ...$request->all(),
                ...$request->validate([
                    'model' => ['required'],
                    'brand' => 'required',
                ])
            ]
        );

        return response()->noContent();
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
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
                'brand' => 'required'
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
