<?php

namespace Database\Factories;

use App\Models\Employee;
use App\Models\Item;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\EmployeeInventory>
 */
class EmployeeInventoryFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'transferred_date' => fake()->date(),
            'officer_in_charge' => fake()->firstName(),
            'is_active' => fake()->boolean(80),
            'item_id' => Item::factory(),
            'employee_id' => Employee::factory()
        ];
    }
}
