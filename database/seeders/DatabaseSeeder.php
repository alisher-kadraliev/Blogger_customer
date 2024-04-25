<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Post;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

//        User::factory()->create([
//            'name' => 'Editor',
//            'email' => 'editor@editor.com',
//            'password' => bcrypt('1122')
//        ]);
        Post::factory(10)->has(Category::factory())->create();
        Category::factory(5)->create();
    }
}
