<?php

namespace App\Http\Controllers;

use App\Models\Project;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{
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
                'live_url' => $project->live_url,
                'is_confidential' => $project->is_confidential,
                'is_featured' => $project->is_featured,
            ]);

        return Inertia::render('home', [
            'projects' => $projects,
        ]);
    }
}
