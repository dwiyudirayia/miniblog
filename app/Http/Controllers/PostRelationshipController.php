<?php
namespace App\Http\Controllers;

use App\Post;
use App\Http\Resources\UserResource;

class PostRelationshipController extends Controller
{
    public function user(Post $post)
    {
        return new UserResource($post->user);
    }
}