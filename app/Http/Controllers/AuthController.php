<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    //

    public function login(Request $request)
    {
        $credentials = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required'],
        ]);

        if (Auth::attempt($credentials)) {
            $request->session()->regenerate();

            return response()->noContent();
        }

        throw ValidationException::withMessages([
            'email' => 'Invalid Email or Password.'
        ]);
    }

    public function logout(Request $request)
    {
        Auth::logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return response()->json([
            'message' => 'logout'
        ]);
    }

    public function setPasswordFirstTime(Request $request)
    {
        $request->user()->update([
            ...$request->validate([
                'password' => ['required', 'confirmed', 'min:8']
            ]),
            'password_changed' => true
        ]);

        return response()->noContent();
    }

    public function updateName(Request $request)
    {
        $request->user()->update(
            $request->validate(
                ['name' => ['required']]
            )
        );

        return response()->noContent();
    }
}
