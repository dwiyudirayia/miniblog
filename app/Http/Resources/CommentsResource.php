<?php

namespace App\Http\Resources;

use App\User;
use Illuminate\Http\Resources\Json\ResourceCollection;
use Illuminate\Support\Collection;

class CommentsResource extends ResourceCollection
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
            'data' => CommentResource::collection($this->collection),
        ];
    }
    
    public function with($request)
    {
        $included  = $this->collection->map(
            function ($post) {
                return $post->user;
            }
        )->unique();
        return [
            'links' => [
                'self' => route('comments.index'),
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
            }
        );
    }
}
