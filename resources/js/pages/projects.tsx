import { Head, Link } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';
import { useMemo, useState } from 'react';
import { ProjectCard } from '@/components/portfolio/featured-projects';
import { SiteFooter } from '@/components/portfolio/site-footer';
import { SiteHeader } from '@/components/portfolio/site-header';
import type { PortfolioProject, ProjectCategory } from '@/types/portfolio';

type Filter = 'all' | ProjectCategory;

const filterLabels: Record<Filter, string> = {
    all: 'All',
    system: 'Business systems',
    web: 'Websites',
    design: 'Design and multimedia',
};

export default function Projects({ projects, cvUrl }: { projects: PortfolioProject[]; cvUrl: string | null }) {
    const [filter, setFilter] = useState<Filter>('all');

    // Only offer filters for categories that actually have projects.
    const filters = useMemo(() => {
        const counts = projects.reduce<Record<string, number>>((acc, project) => {
            acc[project.category] = (acc[project.category] ?? 0) + 1;
            return acc;
        }, {});

        return (['all', 'system', 'web', 'design'] as Filter[])
            .filter((key) => key === 'all' || counts[key])
            .map((key) => ({ key, label: filterLabels[key], count: key === 'all' ? projects.length : counts[key] }));
    }, [projects]);

    const visible = filter === 'all' ? projects : projects.filter((project) => project.category === filter);

    return (
        <>
            <Head title="Projects" />
            <div className="min-h-screen bg-white font-body text-slate-900 antialiased selection:bg-blue-100">
                <SiteHeader cvUrl={cvUrl} />

                <main className="pt-32 pb-24 md:pt-40">
                    <div className="mx-auto max-w-6xl px-6">
                        <Link
                            href="/"
                            className="inline-flex items-center gap-2 text-sm text-slate-500 transition-colors hover:text-blue-700"
                        >
                            <ArrowLeft className="size-4" aria-hidden="true" />
                            Back to home
                        </Link>

                        <h1 className="mt-6 font-display text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
                            All projects
                        </h1>
                        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-slate-600">
                            Websites and business systems I’ve built. Many are internal company systems, so screenshots are
                            anonymized and there are no public links.
                        </p>

                        {filters.length > 2 && (
                            <div className="mt-10 flex flex-wrap gap-2" role="group" aria-label="Filter projects by category">
                                {filters.map((item) => {
                                    const active = filter === item.key;
                                    return (
                                        <button
                                            key={item.key}
                                            type="button"
                                            aria-pressed={active}
                                            onClick={() => setFilter(item.key)}
                                            className={`rounded-full border px-4 py-2 text-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 ${
                                                active
                                                    ? 'border-blue-600 bg-blue-600 text-white'
                                                    : 'border-slate-300 bg-white text-slate-700 hover:border-blue-600 hover:text-blue-700'
                                            }`}
                                        >
                                            {item.label}
                                            <span className={`ml-2 tabular-nums ${active ? 'text-blue-100' : 'text-slate-400'}`}>
                                                {item.count}
                                            </span>
                                        </button>
                                    );
                                })}
                            </div>
                        )}

                        {visible.length > 0 ? (
                            <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                                {visible.map((project, index) => (
                                    <ProjectCard key={project.id} project={project} index={index} />
                                ))}
                            </div>
                        ) : (
                            <p className="mt-10 rounded-2xl border border-dashed border-slate-300 p-10 text-slate-600">
                                No published projects in this category yet.
                            </p>
                        )}
                    </div>
                </main>

                <SiteFooter />
            </div>
        </>
    );
}
