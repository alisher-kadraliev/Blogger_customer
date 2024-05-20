<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Post;
use Illuminate\Http\Request;
use Inertia\Inertia;

class FrontController extends Controller
{
    public function index()
    {
        return Inertia::render('Front/Pages/Index');
    }
    public function blogs()
    {
        $cats = Category::all();
        $posts = Post::latest()->paginate(6)->onEachSide(1);
        return Inertia::render('Front/Pages/Blogs',['posts' => $posts,'cats' => $cats]);
    }
    public function blog()
    {
        return Inertia::render('Front/Pages/Blog');
    }
}
