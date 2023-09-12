<?php

namespace Database\Factories;

use App\Models\EmployeeInventory;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Employee>
 */
class EmployeeFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'employee_no' => fake()->unique()->numberBetween(1, 500),
            'full_name' => fake()->firstName() . " " . fake()->lastName(),
            'RFID_no' => fake()->unique()->swiftBicNumber(),
            'is_active' => fake()->boolean(80),
        ];
    }
}
