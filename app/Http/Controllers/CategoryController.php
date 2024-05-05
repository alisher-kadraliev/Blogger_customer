<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CategoryController extends Controller
{
    public function index()
    {
        $search = request()->input('search');
        $query = Category::query();
        if($search){
            $query->where('name', 'like', '%' . $search . '%');
        }
        $categories = $query->get();

        return Inertia::render('Category/Index',[
            'categories' => $categories
        ]);
    }
    public function store(Request $request)
    {
        Category::create($request->validate([
            'name' => ['required', 'unique:categories'],
            'slug' => ['required', 'unique:categories'],
            'description' => ['nullable']
        ]));
        return redirect()->back();
    }
    public function destroy(Category $category)
    {
        $category->delete();
        return redirect()->back();
    }
}
