<?php

namespace App\Http\Controllers;

use App\Models\Project;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{
    private const CV_PATH = 'cv/Justine-Soriano-CV.pdf';

    public function __invoke(): Response
    {
        $projects = Project::query()
            ->where('is_published', true)
            ->orderByDesc('is_featured')
            ->orderBy('sort_order')
            ->limit(6)
            ->get()
            ->map(fn (Project $project) => [
                'id' => $project->id,
                'title' => $project->title,
                'slug' => $project->slug,
                'category' => $project->category,
                'client' => $project->client,
                'summary' => $project->summary,
                'users_scale' => $project->users_scale,
                'tech_stack' => $project->tech_stack ?? [],
                'cover_image_url' => $project->cover_image
                    ? Storage::disk('uploads')->url($project->cover_image)
                    : null,
                'icon' => $project->icon,
                'live_url' => $project->live_url,
                'is_confidential' => $project->is_confidential,
                'is_featured' => $project->is_featured,
            ]);

        // Only show the CV button once the PDF has actually been uploaded.
        $cvUrl = file_exists(public_path(self::CV_PATH)) ? asset(self::CV_PATH) : null;

        return Inertia::render('home', [
            'projects' => $projects,
            'cvUrl' => $cvUrl,
        ])->withViewData([
            // Rendered by app.blade.php on the server, so Google, LinkedIn and
            // Facebook see these tags without running any JavaScript.
            'meta' => [
                'title' => 'Full-Stack Web Developer - Justine Soriano',
                'description' => 'Full-stack web developer in Pampanga, Philippines. I build WordPress, Laravel and React websites and business systems used by 50+ departments.',
                'url' => url('/'),
                'image' => asset('og-image.png'),
                'schema' => [
                    '@context' => 'https://schema.org',
                    '@type' => 'Person',
                    'name' => 'Justine Gamboa Soriano',
                    'jobTitle' => 'Full-Stack Web Developer',
                    'url' => url('/'),
                    'address' => [
                        '@type' => 'PostalAddress',
                        'addressLocality' => 'City of San Fernando',
                        'addressRegion' => 'Pampanga',
                        'addressCountry' => 'PH',
                    ],
                    'sameAs' => ['https://github.com/dev-jushsoriano'],
                ],
            ],
        ]);
    }
}
