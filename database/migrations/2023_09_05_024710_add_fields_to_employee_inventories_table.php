<?php

use App\Models\Employee;
use App\Models\Item;
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
            $table->date('transferred_date')->nullable();
            $table->date('surrendered_date')->nullable();
            $table->string('officer_in_charge');
            $table->boolean('is_active')->default(false)->comment('1=true; 0=false;');
            $table->json('json_attr')->nullable()->comment('json data');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('employee_inventories', function (Blueprint $table) {
            $table->dropColumn(['transferred_date', 'surrendered_date', 'officer_in_charge', 'is_active', 'json_attr']);
        });
    }
};
