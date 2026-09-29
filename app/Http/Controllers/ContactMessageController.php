<?php

namespace App\Http\Controllers;

use App\Models\ContactMessage;
use App\Notifications\ContactMessageReceived;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Notification;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Validation\ValidationException;
use Throwable;

class ContactMessageController extends Controller
{
    public function store(Request $request): RedirectResponse
    {
        // Honeypot: real visitors never see or fill this field. Bots usually do.
        // Pretend it worked so the bot has no reason to try again.
        if (filled($request->input('website'))) {
            return back();
        }

        $key = 'contact-form:'.$request->ip();

        if (RateLimiter::tooManyAttempts($key, 3)) {
            $minutes = (int) ceil(RateLimiter::availableIn($key) / 60);

            throw ValidationException::withMessages([
                'message' => "You've sent several messages already. Please try again in {$minutes} minute(s).",
            ]);
        }

        $validated = $request->validate([
            'name' => ['required', 'string', 'max:120'],
            'email' => ['required', 'email', 'max:190'],
            'company' => ['nullable', 'string', 'max:150'],
            'message' => ['required', 'string', 'min:10', 'max:5000'],
        ]);

        RateLimiter::hit($key, 600);

        $contactMessage = ContactMessage::create($validated);

        // The message is already saved, so an email failure must not show
        // the visitor an error. It is logged and still visible in the admin.
        try {
            if ($adminEmail = config('admin.email')) {
                Notification::route('mail', $adminEmail)
                    ->notify(new ContactMessageReceived($contactMessage));
            }
        } catch (Throwable $exception) {
            report($exception);
        }

        return back();
    }
}
