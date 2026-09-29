<?php

namespace App\Notifications;

use App\Models\ContactMessage;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

/**
 * Sent immediately (not queued), because shared hosting has no queue worker.
 */
class ContactMessageReceived extends Notification
{
    public function __construct(public ContactMessage $contactMessage)
    {
    }

    public function via(object $notifiable): array
    {
        return ['mail'];
    }

    public function toMail(object $notifiable): MailMessage
    {
        $message = $this->contactMessage;

        return (new MailMessage)
            ->subject("New portfolio message from {$message->name}")
            ->replyTo($message->email, $message->name)
            ->greeting('New message from your portfolio')
            ->line("**Name:** {$message->name}")
            ->line("**Email:** {$message->email}")
            ->line('**Company:** '.($message->company ?: 'Not provided'))
            ->line('**Message:**')
            ->line($message->message)
            ->action('Open in admin', url('/admin'))
            ->line('Reply to this email to respond directly to the sender.');
    }
}
