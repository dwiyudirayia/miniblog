<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class CommentRelationshipResource extends JsonResource
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
                'data'  => new UserIdentifierResource($this->user),
            ],
        ];
    }

    public function with($request)
    {
        return [
            'links' => [
                'self' => route('comments.index'),
            ],
        ];
    }
}
