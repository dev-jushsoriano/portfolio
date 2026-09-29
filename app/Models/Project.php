<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    /**
     * Thumbnail icons shown when a project has no cover image.
     * The keys must match resources/js/components/portfolio/project-icons.tsx.
     */
    public const ICONS = [
        'ticket' => 'Ticket (ticketing, support desk)',
        'crm' => 'Contact card (CRM, customers)',
        'headset' => 'Headset (call center)',
        'id-card' => 'ID card (HR, employees)',
        'briefcase' => 'Briefcase (recruitment, careers)',
        'monitor' => 'Monitor and phone (websites)',
        'qr-code' => 'QR code (events, verification)',
        'calendar' => 'Calendar (scheduling, appointments)',
        'file-check' => 'Document check (document tracking)',
        'calculator' => 'Calculator (pricing, costs)',
        'map-pin' => 'Map pin (venues, locations)',
        'gauge' => 'Gauge (operations, monitoring)',
        'chart' => 'Bar chart (analytics, reports)',
        'workflow' => 'Workflow (automation)',
        'message' => 'Message (SMS, chat)',
        'bot' => 'Bot (AI, chatbots)',
        'cart' => 'Shopping cart (e-commerce)',
        'database' => 'Database (data systems)',
        'car' => 'Car (automotive)',
        'palette' => 'Palette (design, branding)',
    ];

    protected $fillable = [
        'title', 'slug', 'category', 'client', 'summary', 'problem',
        'solution', 'impact', 'users_scale', 'tech_stack', 'cover_image',
        'icon', 'gallery', 'live_url', 'is_confidential', 'is_featured',
        'is_published', 'sort_order',
    ];

    protected function casts(): array
    {
        return [
            'tech_stack' => 'array',
            'gallery' => 'array',
            'is_confidential' => 'boolean',
            'is_featured' => 'boolean',
            'is_published' => 'boolean',
        ];
    }
}
