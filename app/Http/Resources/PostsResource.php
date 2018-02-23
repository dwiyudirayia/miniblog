<?php

namespace App\Http\Resources;

use App\User;
use App\Comment;
use Illuminate\Http\Resources\Json\ResourceCollection;
use Illuminate\Support\Collection;

class PostsResource extends ResourceCollection
{
    /**
     * Transform the resource collection into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'data' => PostResource::collection($this->collection),
        ];
    }

    public function with($request)
    {
        $users  = $this->collection->map(
            function ($post) {
                return $post->user;
            }
        );

        $comments = $this->collection->flatMap(
            function ($post) {
                return $post->comments;
            }
        );

        $included = $users->merge($comments)->unique();
        
        return [
            'links'    => [
                'self' => route('posts.index'),
            ],
            'included' => $this->withIncluded($included),
        ];
    }

    private function withIncluded(Collection $included)
    {
        return $included->map(
            function ($include) {
                if ($include instanceof User) {
                    return new UserResource($include);
                }
                if ($include instanceof Comment) {
                    return new CommentResource($include);
                }
            }
        );
    }
}
