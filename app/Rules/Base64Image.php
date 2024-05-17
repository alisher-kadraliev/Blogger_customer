<?php

namespace App\Rules;

use Closure;
use Illuminate\Contracts\Validation\ValidationRule;

class Base64Image implements ValidationRule
{
    /**
     * Run the validation rule.
     *
     * @param  \Closure(string): \Illuminate\Translation\PotentiallyTranslatedString  $fail
     */
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        if (preg_match('/^data:image\/(\w+);base64,/', $value, $type)) {
            $data = substr($value, strpos($value, ',') + 1);
            $type = strtolower($type[1]); // jpg, png, gif

            if (!in_array($type, ['jpg', 'jpeg', 'png', 'gif'])) {
                $fail('The ' . $attribute . ' must be a file of type: jpg, jpeg, png, gif.');
                return;
            }

            $data = base64_decode($data, true);

            if (!$data) {
                $fail('The ' . $attribute . ' is not a valid base64 encoded image.');
                return;
            }

            return;
        }

        $fail('The ' . $attribute . ' is not a valid base64 image.');
    }
}
