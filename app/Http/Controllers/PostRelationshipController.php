<?php
namespace App\Http\Controllers;

use App\Post;
use App\Http\Resources\UserResource;
use App\Http\Resources\CommentsResource;

class PostRelationshipController extends Controller
{
    public function user(Post $post)
    {
        return new UserResource($post->user);
    }
    
    public function comments(Post $post)
    {
        return new CommentsResource($post->comments);
    }
}