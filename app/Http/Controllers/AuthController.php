<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    //

    public function login(Request $request)
    {
        $validated = $request->validate([
            'email' => 'required|email',
            'password' => 'required'
        ]);

        if (!auth()->attempt($validated))
            return response()->json([
                'message' => 'Login credentials invalid.'
            ], 401);


        $user = User::where('email', $validated['email'])->first();
        $token = $request->user()->createToken('api_token');

        return ['token' => $token->plainTextToken, 'token_type' => 'Bearer'];
    }
}
