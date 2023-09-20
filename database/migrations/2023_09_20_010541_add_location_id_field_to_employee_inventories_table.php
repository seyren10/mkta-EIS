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
            $table->foreignIdFor(\App\Models\Location::class)->nullable()->constrained('locations')->cascadeOnUpdate()->nullOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('employee_inventories', function (Blueprint $table) {
            $table->dropForeignIdFor(\App\Models\Location::class);
        });
    }
};
