<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Post;
use Carbon\Carbon;
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
        $posts->getCollection()->transform(function ($post) {
            $post->image_url = $post->image ? asset('storage/' . $post->image) : null;
            return $post;
        });
        return Inertia::render('Front/Pages/Blogs',['posts' => $posts,'cats' => $cats]);
    }
    public function blog($slug)
    {
        $cats = Category::all();
        $post = Post::where('slug', $slug)->first();

        if($post){
            $post->image_url = $post->image ? asset('storage/' . $post->image) : null;
            Carbon::setLocale('tr');
            $post->formatted_created_at = Carbon::parse($post->created_at)->isoFormat('LL');
        }
        return Inertia::render('Front/Pages/Blog',['post' => $post,'cats' => $cats]);
    }
}
