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
        Schema::table('items', function (Blueprint $table) {
            $table->string('brand');
            $table->string('model');
            $table->string('serial_no')->nullable();
            $table->string('mk_tag_no')->nullable();
            $table->date('date_purchased');
            $table->string('accountability_no');
            $table->json('json_attr')->nullable();
            $table->enum('status', ['good', 'fair', 'bad', 'for disposal', 'disposed'])->default('good');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropColumns('items', ['brand', 'model', 'serial_no', 'mk_tag_no', 'json_attr', 'status', 'date_purchased', 'accountability_no']);
    }
};
