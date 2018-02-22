<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class CommentResource extends JsonResource
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
            'type' => 'comments',
            'id' => (string) $this->id,
            'attributes' => [
                'content' => $this->content,
                'created_at' => (string) $this->created_at,
                'updated_at' => (string) $this->updated_at
            ],
            'relationships' => new CommentRelationshipResource($this),
            'links' => [
                'self' => route('comments.show', ['comment' => $this->id]),
            ],
        ];
    }
}
