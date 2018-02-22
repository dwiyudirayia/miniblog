<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;
use JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;
use Validator;
use DB, Hash, Mail, Illuminate\Support\Facades\Password;

class AuthController extends Controller
{
    /**
     * API Register
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function register(Request $request)
    {
        $credentials = $request->only('name', 'username', 'email', 'password');

        $rules = [
            'name' => 'required|min:3|max:255',
            'username' => 'required|min:3|max:255|unique:users',
            'email' => 'required|email|max:255|unique:users',
            'password' => 'required|min:6|max:255',
        ];

        $validator = Validator::make($credentials, $rules);

        if($validator->fails()) {
            return response()->json(['success'=> false, 'error'=> $validator->messages()]);
        }

        User::create([
            'name' => $request->name,
            'username' => $request->username,
            'email' => $request->email,
            'password' => Hash::make($request->password)
        ]);

        return $this->login($request);
    }

    /**
     * API Login, on success return JWT Auth token
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');

        $rules = [
            'email' => 'required|email',
            'password' => 'required',
        ];

        $validator = Validator::make($credentials, $rules);

        if($validator->fails()) {
            return response()->json(['success'=> false, 'error'=> $validator->messages()]);
        }

        try {
            // Attempting to verify the credentials and create a token for the user
            if (!$token = JWTAuth::attempt($credentials)) {
                return response()->json([
                    'success' => false,
                    'error' => 'We cant find an account with this credentials.'
                ], 401);
            }
        } catch (JWTException $e) {
            // Handle error while attempting
            return response()->json([
                'success' => false,
                'error' => 'Failed to login, please try again.'
            ], 500);
        }

        // If all good so return the token
        return response()->json([
            'success' => true,
            'data'=> [ 'token' => $token ]
        ]);
    }

    /**
     * API Refresh Token, on success return JWT Auth token
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function refreshToken()
    {
        $token = JWTAuth::getToken();
    
        try {
            // Attempting to create new token
            $token = JWTAuth::refresh($token);
        } catch (JWTException $e) {
            // Handle error while attempting
            return response()->json([
                'success' => false,
                'error' => 'Failed to create new token.'
            ], 500);
        }
    
        return response()->json([
            'success' => true,
            'data'=> [ 'token' => $token ]
        ]);
    }

    /**
     * Api Log out
     * Invalidate the token, so user cannot use it anymore
     * They have to relogin to get a new token
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout(Request $request) {
        $this->validate($request, ['token' => 'required']);

        try {
            // Attempting to invalidate the token
            JWTAuth::invalidate($request->input('token'));
            return response()->json([
                'success' => true,
                'message'=> 'You have successfully logged out.'
            ]);
        } catch (JWTException $e) {
            // Handle error while attempting
            return response()->json([
                'success' => false,
                'error' => 'Failed to logout, please try again.'
            ], 500);
        }
    }

    /**
     * API Recover Password
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function recover(Request $request)
    {
        $user = User::where('email', $request->email)->first();

        if (!$user) {
            $error_message = "Your email address was not found.";
            return response()->json([
                'success' => false,
                'error' => ['email'=> $error_message]
            ], 401);
        }

        try {
            // Attempting to send the reset link via email
            Password::sendResetLink($request->only('email'), function (Message $message) {
                $message->subject('Your Password Reset Link');
            });
        } catch (\Exception $e) {
            // Handle error while attempting
            $error_message = $e->getMessage();
            return response()->json([
                'success' => false,
                'error' => $error_message
            ], 401);
        }

        // If all good, let's notify the user with response message
        return response()->json([
            'success' => true,
            'data'=> ['message'=> 'A reset email has been sent! Please check your email.']
        ]);
    }
}
