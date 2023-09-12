<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('employee_inventories', function (Blueprint $table) {
            $table->foreignIdFor(\App\Models\Employee::class)->nullable()->constrained('employees')->nullOnDelete()->cascadeOnUpdate();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('employee_inventories', function (Blueprint $table) {
            //
        });
    }
};
