<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});




Route::apiResource('category', \App\Http\Controllers\CategoryController::class);
Route::apiResource('item', \App\Http\Controllers\ItemController::class);
Route::apiResource('employee', \App\Http\Controllers\EmployeeController::class);
Route::apiResource('location', \App\Http\Controllers\LocationController::class)->except(['show']);


Route::prefix('/employee-inventory')->group(function () {
    Route::get('', [\App\Http\Controllers\EmployeeInventoryController::class, 'index'])->name('employeeInventory.index');
    Route::get('/{item}', [\App\Http\Controllers\EmployeeInventoryController::class, 'show'])->name('employeeInventory.show');
    Route::post('', [\App\Http\Controllers\EmployeeInventoryController::class, 'associate'])->name('employeeInventory.associate');
});
