<?php

namespace Database\Factories;

use App\Models\Category;
use App\Models\Post;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Post>
 */
class PostFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    protected $model = Post::class;
    public function definition(): array
    {
        $title = $this->faker->sentence;
        $slug = Str::slug($title, '-');
        return [
            'title' => $title,
            'slug' => $slug,
            'content' => $this->faker->paragraphs(asText:true),
            'description' => $this->faker->text(200),
            'author_id' => User::factory(),
            'category_id' => Category::factory(),
            'likes' => $this->faker->numberBetween(0,100),
            'reading_time' => $this->faker->randomDigitNotNull,
            'image' => $this->faker->imageUrl,
            'image_alt' => $this->faker->words(nb:3,asText: true),
            'published' => $this->faker->boolean,
            'status' => $this->faker->randomElement(['pending','in_progress','completed']),
            'views' => $this->faker->numberBetween(0,1000),
            'scheduled_at' => $this->faker->dateTimeBetween('-1 month','+1 month'),
            'meta_title' => $title,
            'meta_description' => $this->faker->text(160),
        ];
    }
}
