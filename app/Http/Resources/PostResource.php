<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class PostResource extends JsonResource
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
            'type' => 'posts',
            'id' => (string) $this->id,
            'relationships' => new PostRelationshipResource($this),
            'attributes' => [
                'title' => $this->title,
                'content' => $this->content,
                'created_at' => (string) $this->created_at,
                'updated_at' => (string) $this->updated_at
            ],
            'links' => [
                'self' => route('posts.show', ['post' => $this->id]),
            ],
        ];
    }
}
