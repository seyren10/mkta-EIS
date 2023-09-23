<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::post('/login', [\App\Http\Controllers\AuthController::class, 'login']);
Route::delete('/logout', [\App\Http\Controllers\AuthController::class, 'logout']);
Route::put('/set-password-first-time', [\App\Http\Controllers\AuthController::class, 'setPasswordFirstTime']);
Route::put('/update-name', [\App\Http\Controllers\AuthController::class, 'updateName']);

Route::get('/', function () {
    return view('app');
})->name('application');

Route::fallback(function () {
    return view('app');
});
