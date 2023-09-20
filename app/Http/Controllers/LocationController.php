<?php

namespace App\Http\Controllers;

use App\Models\Location;
use Illuminate\Http\Request;

class LocationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json([
            "data" => Location::with(['employeeInventories'])->orderByDesc('created_at')->get()
        ]);
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $location = Location::create(
            $request->validate([
                'name' => 'required'
            ])
        );

        return response()->json([
            'data' => $location
        ]);
    }



    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Location $location)
    {
        $location->update($request->validate(['name' => 'required']));

        return response()->json([
            'data' => $location->fresh()
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Location $location)
    {
        $res =  $location->delete();

        return response()->json([
            'data' => $res
        ]);
    }
}
