<?php

namespace App\Http\Controllers;

use App\Models\Project;
use Inertia\Inertia;
use Inertia\Response;

class ProjectsController extends Controller
{
    private const CV_PATH = 'cv/Justine-Soriano-CV.pdf';

    public function __invoke(): Response
    {
        $projects = Project::query()
            ->where('is_published', true)
            ->orderByDesc('is_featured')
            ->orderBy('sort_order')
            ->get()
            ->map(fn (Project $project) => $project->toCard());

        $cvUrl = file_exists(public_path(self::CV_PATH)) ? asset(self::CV_PATH) : null;

        return Inertia::render('projects', [
            'projects' => $projects,
            'cvUrl' => $cvUrl,
        ])->withViewData([
            'meta' => [
                'title' => 'Projects - Justine Soriano',
                'description' => 'Websites and business systems built by Justine Soriano, including CRM, ticketing, HR, call center and event platforms.',
                'url' => url('/projects'),
                'image' => asset('og-image.png'),
                'schema' => [
                    '@context' => 'https://schema.org',
                    '@type' => 'CollectionPage',
                    'name' => 'Projects by Justine Soriano',
                    'url' => url('/projects'),
                ],
            ],
        ]);
    }
}
