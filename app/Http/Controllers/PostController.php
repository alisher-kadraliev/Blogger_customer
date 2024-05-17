<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Post;
use App\Rules\Base64Image;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $query = Post::query()->with('category')->orderBy('created_at','desc');
        $searchPost = request()->input('search');
        if ($searchPost) {
            $query->where('title', 'like', '%' . $searchPost . '%');
        }
        $posts = $query->paginate(5)->onEachSide(1);
        $posts->getCollection()->transform(function ($post) {
            $post->image_url = $post->image ? asset('storage/' . $post->image) : null;
            return $post;
        });
        $statuses = Post::select('status')->distinct()->pluck('status');
        $categories = Category::all();
        $totalPosts = Post::count();
        $trashedPosts = Post::onlyTrashed()->with('category')->get();

        return Inertia::render('Post/Index',
            ['posts' => $posts,
                'statuses' => $statuses,
                'categories' => $categories,
                'trashedPosts' => $trashedPosts,
                'totalPost' => $totalPosts
            ]);
    }

    public function PostTable()
    {

        $query = Post::query()->with('category')->orderBy('created_at','desc');
        $searchPost = request()->input('search');
        if ($searchPost) {
            $query->where('title', 'like', '%' . 'searchPost' . '%');
        }
        $posts = $query->paginate(5)->onEachSide(1);
        $posts->getCollection()->transform(function ($post) {
            $post->image_url = $post->image ? asset('storage/' . $post->image) : null;
            return $post;
        });
        $statuses = Post::select('status')->distinct()->pluck('status');
        $categories = Category::all();
        $totalPosts = Post::count();
        $trashedPosts = Post::onlyTrashed()->with('category')->get();
        return Inertia::render('Post/PostTable',
            ['posts' => $posts,
                'statuses' => $statuses,
                'categories' => $categories,
                'trashedPosts' => $trashedPosts,
                'totalPost' => $totalPosts
            ]);
    }

    public function updatePost(Request $request, Post $post)
    {
        $validatedData = $request->validate([
            'status' => 'sometimes|required|string',
            'title' => 'sometimes|required|string',
            'slug' => 'sometimes|required|string|unique:posts,slug, ' . $post->id,
            'meta_title' => 'sometimes|nullable|string',
            'meta_description' => 'sometimes|nullable|string',
            'description' => 'sometimes|nullable|string',
            'content' => 'sometimes|nullable|string',
            'likes' => 'sometimes|nullable|integer',
            'reading_time' => 'sometimes|nullable|integer',
            'published' => 'sometimes|nullable|boolean',
            'views' => 'sometimes|nullable|integer',
            'image_alt' => 'sometimes|nullable|string',
            'category_id' => 'sometimes|required|exists:categories,id',
        ]);
        if ($request->has('title')) {
            $post->title = $validatedData["title"];
        }
        if ($request->has('image_alt')) {
            $post->image_alt = $validatedData["image_alt"];
        }
        if ($request->has('status')) {
            $post->status = $validatedData['status'];
        }
        if ($request->has('slug')) {
            $post->slug = $validatedData['slug'];
        }
        if ($request->has('meta_title')) {
            $post->meta_title = $validatedData['meta_title'];
        }
        if ($request->has('meta_description')) {
            $post->meta_description = $validatedData['meta_description'];
        }
        if ($request->has('content')) {
            $post->content = $validatedData['content'];
        }
        if ($request->has('likes')) {
            $post->likes = $validatedData['likes'];
        }
        if ($request->has('reading_time')) {
            $post->reading_time = $validatedData['reading_time'];
        }
        if ($request->has('published')) {
            $post->published = $validatedData['published'];
        }
        if ($request->has('views')) {
            $post->views = $validatedData['views'];
        }
        if ($request->has('description')) {
            $post->description = $validatedData['description'];
        }
        $post->fill($validatedData);
        $post->save();
        return redirect()->back();
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $categories = Category::all();
        return Inertia::render('Post/Create',
            ['categories' => $categories]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'title' => ['required', 'unique:posts'],
            'slug' => ['required', 'unique:posts'],
            'meta_title' => ['nullable'],
            'meta_description' => ['nullable'],
            'description' => ['nullable'],
            'content' => ['required'],
            'category_id' => 'required|string',
            'author_id' => 'required|integer|exists:users,id',
            'image' => ['sometimes', new Base64Image()],
            'reading_time' => 'nullable|integer',
            'image_alt' => 'nullable|string',
        ]);

        if ($request->has('image')) {
        $image = $request->input('image'); // Your base64 encoded image
        $image = str_replace('data:image/png;base64,', '', $image);
        $image = str_replace('data:image/png;base64,', '', $image);
        $image = str_replace(' ', '+', $image);
        $imageName = uniqid() . '.webp';
        Storage::disk('public')->put('posts/' . $imageName, base64_decode($image));
        $validatedData['image'] = 'posts/' . $imageName;
    }


//        if ($request->has('image')) {
//            $image = $request->input('image'); // Your base64 encoded image
//            $image = str_replace('data:image/png;base64,', '', $image);
//            $image = str_replace('data:image/png;base64,', '', $image);
//            $image = str_replace(' ', '+', $image);
//            $imageName = uniqid() . '.png';
//            Storage::disk('public')->put('posts/' . $imageName, base64_decode($image));
//            $validatedData['image'] = 'posts/' . $imageName;
//        }
        Post::create($validatedData);

        return redirect()->route('post.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(Post $post)
    {
        return inertia('Post/Show', [
            'post' => $post,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Post $post)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Post $post)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Post $post)
    {
        $post->delete();
        return redirect()->back();
    }

    public function restore($id)
    {
        $post = Post::withTrashed()->findOrFail($id);
        $post->restore();
        return redirect()->back();
    }

    public function trashedPosts()
    {
        $trashedPosts = Post::onlyTrashed()->with('category')->get();
        return Inertia::render('Post/TrashedPosts', ['trashedPosts' => $trashedPosts]);
    }

    public function deletePermanently($id)
    {
        $post = Post::onlyTrashed()->findOrFail($id);
        $post->forceDelete();
        return redirect()->back();
    }
}
