<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\ContactMessageController;
use App\Http\Controllers\ProjectsController;

Route::get('/', HomeController::class)->name('home');
Route::get('/projects', ProjectsController::class)->name('projects');
Route::post('/contact', [ContactMessageController::class, 'store'])->name('contact.store');


Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');
});

require __DIR__.'/settings.php';