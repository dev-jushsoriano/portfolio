<?php

namespace App\Http\Controllers;

use App\Models\Project;
use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{
    private const CV_PATH = 'cv/Justine-Soriano-CV.pdf';

    // One large card plus a 2x2 grid keeps the section balanced.
    private const HOMEPAGE_LIMIT = 5;

    public function __invoke(): Response
    {
        $published = Project::query()->where('is_published', true);

        $projects = (clone $published)
            ->orderByDesc('is_featured')
            ->orderBy('sort_order')
            ->limit(self::HOMEPAGE_LIMIT)
            ->get()
            ->map(fn (Project $project) => $project->toCard());

        // Only show the CV button once the PDF has actually been uploaded.
        $cvUrl = file_exists(public_path(self::CV_PATH)) ? asset(self::CV_PATH) : null;

        return Inertia::render('home', [
            'projects' => $projects,
            'totalProjects' => $published->count(),
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
