<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class PostRelationshipResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'user' => [
                'links' => [
                    'self' => route('posts.relationships.user', ['post' => $this->id]),
                    'related' => route('posts.user', ['post' => $this->id]),
                ],
                'data' => new UserIdentifierResource($this->user),
            ],
            'comments' => (new PostCommentsRelationshipResource($this->comments))->additional(['post' => $this]),
        ];
    }

    public function with($request)
    {
        return [
            'links' => [
                'self' => route('posts.index'),
            ],
        ];
    }
}
