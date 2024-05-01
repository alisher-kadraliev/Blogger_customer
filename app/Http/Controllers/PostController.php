<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;
use Inertia\Inertia;
use SebastianBergmann\CodeCoverage\Report\Xml\Project;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $query = Post::query()->with('category');
        $posts = $query->paginate(5)->onEachSide(1);
        $statuses = Post::select('status')->distinct()->pluck('status');

        return Inertia::render('Post/Index',
            ['posts' => $posts,
                'statuses' => $statuses,
                ]);
    }
    public function PostTable()
    {
        $query = Post::query()->with('category');
        $posts = $query->paginate(5)->onEachSide(1);
        $statuses = Post::select('status')->distinct()->pluck('status');

        return Inertia::render('Post/PostTable',
            ['posts' => $posts,
                'statuses' => $statuses,
                ]);
    }
public function updatePost(Request $request, Post $post){
        $validatedData = $request->validate([
            'status' => 'sometimes|required|string',
            'title' => 'sometimes|required|string'
        ]);
        if($request->has('title')){
            $post->title =$validatedData["title"];
        }
        if($request->has('status')){
            $post->status = $validatedData['status'];
        }
        $post->save();
        return redirect()->back();
}

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
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
        //
    }
}
