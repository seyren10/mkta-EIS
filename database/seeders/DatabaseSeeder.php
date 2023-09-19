<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // \App\Models\User::factory(10)->create();

        \App\Models\User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
        ]);
        // \App\Models\Employee::factory()->create([
        //     'employee_no' => '1',
        //     'full_name' => "MIS Department",
        //     'RFID_no' => 1_000_000_001,
        //     'is_active' => 1
        // ]);

        $this->populateCategory();

        \App\Models\Location::factory()->create([
            'name' => 'MIS Office'
        ]);
        // \App\Models\Category::factory(5)->create();
        // \App\Models\Employee::factory(5)->create();
        // \App\Models\Item::factory(20)->create();
        // \App\Models\EmployeeInventory::factory(20)->create();
    }

    private function populateCategory()
    {
        \App\Models\Category::factory()->create([
            'name' => 'PC Set',
            'description' => 'Personal Computer'
        ]);
        \App\Models\Category::factory()->create([
            'name' => 'Tablet',
            'description' => 'Tablet'
        ]);
        \App\Models\Category::factory()->create([
            'name' => 'Mobile Phone',
            'description' => 'Mobile Phone'
        ]);
        \App\Models\Category::factory()->create([
            'name' => 'Laptop',
            'description' => 'Laptop'
        ]);
        \App\Models\Category::factory()->create([
            'name' => 'PC Set',
            'description' => 'Personal Computer'
        ]);
    }
}
