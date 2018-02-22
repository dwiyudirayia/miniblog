<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::post('register', 'AuthController@register');
Route::post('login', 'AuthController@login');
Route::get('refreshToken', 'AuthController@refreshToken');
Route::post('recover', 'AuthController@recover');

Route::group(['middleware' => ['jwt.auth']], function() {
    Route::get('logout', 'AuthController@logout');

    Route::resource('posts', 'PostController');
    Route::resource('users', 'UserController');

    Route::get('/me', [
      'uses' => 'UserController@me',
      'as'   => 'users.me',
    ]);

    Route::group(['prefix' => 'posts'], function() {
      Route::get('/{post}/relationships/user', [
        'uses' => 'PostRelationshipController@user',
        'as'   => 'posts.relationships.user',
      ]);
      Route::get('/{post}/user', [
        'uses' => 'PostRelationshipController@user',
        'as'   => 'posts.user',
      ]);
    });
});