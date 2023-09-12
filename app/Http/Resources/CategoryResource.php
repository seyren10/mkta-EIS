<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CategoryResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        // $data = parent::toArray($request);
        // $data['status'] = $this->id === 1 ? 'admin' : 'user';
        // return $data;

        return  parent::toArray($request);
    }
}
