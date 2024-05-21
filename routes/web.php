<?php

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\FrontController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SettingController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/welcome', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');
Route::middleware(['auth'])->group(function () {
    Route::resource('post', PostController::class);
    Route::patch('posts/{post}/update', [PostController::class, 'updatePost']);
    Route::post('/posts/{post}/restore', [PostController::class, 'restore'])->name('posts.restore');
    Route::get('/posts/trashed', [PostController::class, 'trashedPosts'])->name('posts.trashed');
    Route::delete('/posts/{post}/delete-permanently', [PostController::class, 'deletePermanently'])->name('posts.delete-permanently');
    Route::get('/category', [CategoryController::class, 'index'])->name('category.index');
    Route::get('/category/create', [CategoryController::class, 'create'])->name('category.create');
    Route::post('/category/store', [CategoryController::class, 'store'])->name('category.store');
    Route::delete('/category/{category}/delete', [CategoryController::class, 'destroy'])->name('category.destroy');
    Route::get('/homepage',[SettingController::class,'index'])->name('homepage.index');
});
Route::get('/', [FrontController::class, 'index'])->name('front.index');
Route::get('/blogs', [FrontController::class, 'blogs'])->name('front.blogs');
Route::get('/blog/{slug}', [FrontController::class, 'blog'])->name('front.blog');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
