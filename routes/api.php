<?php

use App\Http\Controllers\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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

// Route::post('login', [AuthController::class, 'login']);
// Route::middleware('auth:sanctum')->group(function () {
// });
Route::apiResource('category', \App\Http\Controllers\CategoryController::class);
Route::apiResource('item', \App\Http\Controllers\ItemController::class);
Route::apiResource('employee', \App\Http\Controllers\EmployeeController::class);


Route::prefix('/employee-inventory')->group(function () {
    Route::get('',[\App\Http\Controllers\EmployeeInventoryController::class, 'index'])->name('employeeInventory.index');
    Route::post('',[\App\Http\Controllers\EmployeeInventoryController::class, 'associate'])->name('employeeInventory.associate');
    Route::delete('{employeeInventory}',[\App\Http\Controllers\EmployeeInventoryController::class, 'disassociate'])->name('employeeInventory.disassociate');
});
