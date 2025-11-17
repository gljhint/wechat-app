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
        Schema::create('document_document_tag', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_document_id')->comment('文档ID');
            $table->unsignedBigInteger('document_tag_id')->comment('标签ID');
            $table->timestamps();

            $table->foreign('user_document_id')->references('id')->on('user_documents')->onDelete('cascade');
            $table->foreign('document_tag_id')->references('id')->on('document_tags')->onDelete('cascade');

            $table->unique(['user_document_id', 'document_tag_id'], 'doc_tag_unique');
            $table->index('user_document_id');
            $table->index('document_tag_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('document_document_tag');
    }
};
