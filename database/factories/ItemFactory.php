<?php

namespace Database\Factories;

use App\Models\Category;
use App\Models\Employee;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Item>
 */
class ItemFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'brand' => fake()->word(),
            'model' => fake()->word(),
            'serial_no' => fake()->ean13(),
            'mk_tag_no' => fake()->uuid(),
            'condition' => fake()->randomElement(['working', 'broken', 'damaged']),
            'category_id' => Category::factory(),
            'employee_id' => Employee::factory(),
        ];
    }
}
