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
        Schema::table('employees', function (Blueprint $table) {
            $table->integer('employee_no');
            $table->string('full_name');
            $table->string('RFID_no');
            $table->boolean('is_active');
            $table->json('json_attr')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('employees', function (Blueprint $table) {
            $table->dropColumn(['employee_no', 'full_name', 'RFID_no', 'is_active', 'json_attr']);
        });
    }
};
