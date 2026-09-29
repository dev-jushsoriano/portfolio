import { motion, useReducedMotion } from 'motion/react';
import { ArrowUpRight, Lock } from 'lucide-react';
import { resolveProjectIcon } from '@/components/portfolio/project-icons';
import type { PortfolioProject, ProjectCategory } from '@/types/portfolio';

const categoryLabel: Record<ProjectCategory, string> = {
    web: 'Website',
    system: 'Business system',
    design: 'Design and multimedia',
};

function Cover({ project, large }: { project: PortfolioProject; large: boolean }) {
    if (project.cover_image_url) {
        return (
            <img
                src={project.cover_image_url}
                alt={`Screenshot of ${project.title}`}
                loading="lazy"
                className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
            />
        );
    }

    const Icon = resolveProjectIcon(project.icon, project.category);

    return (
        <div
            data-category={project.category}
            className="project-thumb relative flex h-full min-h-56 w-full items-center justify-center overflow-hidden"
        >
            <span aria-hidden="true" className="absolute aspect-square h-[82%] rounded-full border border-blue-400/25" />
            <span aria-hidden="true" className="absolute aspect-square h-[56%] rounded-full border border-blue-400/35" />
            <span aria-hidden="true" className="thumb-orbit absolute aspect-square h-[82%]">
                <span className="absolute top-[14%] left-[14%] size-2 rounded-full bg-blue-500/70" />
                <span className="absolute right-[6%] bottom-[30%] size-1.5 rounded-full bg-sky-400/80" />
            </span>
            <span
                className={`relative flex items-center justify-center rounded-2xl bg-white shadow-xl ring-1 shadow-blue-600/15 ring-blue-100 transition-transform duration-500 group-hover:-translate-y-1 ${
                    large ? 'size-24 lg:size-28' : 'size-20'
                }`}
            >
                <Icon className={`${large ? 'size-11 lg:size-12' : 'size-9'} text-blue-600`} strokeWidth={1.6} aria-hidden="true" />
            </span>
        </div>
    );
}

function ProjectCard({ project, index }: { project: PortfolioProject; index: number }) {
    const reduce = useReducedMotion();
    const large = index === 0;

    return (
        <motion.article
            initial={reduce ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, delay: reduce ? 0 : (index % 3) * 0.08, ease: [0.22, 1, 0.36, 1] }}
            className={`group flex flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white transition-[border-color,box-shadow] duration-300 hover:border-blue-200 hover:shadow-[0_24px_50px_-28px_rgba(37,99,235,0.45)] ${
                large ? 'lg:col-span-2 lg:flex-row' : ''
            }`}
        >
            <div className={`aspect-[16/10] overflow-hidden bg-slate-100 ${large ? 'lg:aspect-auto lg:w-[55%]' : ''}`}>
                <Cover project={project} large={large} />
            </div>

            <div className={`flex flex-1 flex-col p-6 ${large ? 'lg:p-10' : ''}`}>
                <div className="flex flex-wrap items-center gap-2 text-xs">
                    <span className="text-slate-500">{categoryLabel[project.category] ?? project.category}</span>
                    {project.is_confidential && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2 py-0.5 text-slate-600">
                            <Lock className="size-3" aria-hidden="true" />
                            Internal system
                        </span>
                    )}
                </div>

                <h3 className={`mt-3 font-display font-semibold tracking-tight text-slate-900 ${large ? 'text-2xl lg:text-3xl' : 'text-xl'}`}>
                    {project.title}
                </h3>
                {project.client && <p className="mt-1 text-sm text-slate-500">{project.client}</p>}

                <p className="mt-4 leading-relaxed text-slate-600">{project.summary}</p>

                {project.users_scale && (
                    <p className="mt-5 font-display text-lg font-semibold text-blue-700">{project.users_scale}</p>
                )}

                {project.tech_stack.length > 0 && (
                    <ul className="mt-5 flex flex-wrap gap-2" aria-label="Technologies">
                        {project.tech_stack.map((tech) => (
                            <li key={tech} className="rounded-md border border-slate-200 px-2 py-1 text-xs text-slate-600">
                                {tech}
                            </li>
                        ))}
                    </ul>
                )}

                {project.live_url && !project.is_confidential && (
                    <a
                        href={project.live_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-auto inline-flex items-center gap-1 pt-6 text-sm font-medium text-blue-700 hover:text-blue-800"
                    >
                        Visit site
                        <ArrowUpRight className="size-4" aria-hidden="true" />
                        <span className="sr-only">(opens in a new tab)</span>
                    </a>
                )}
            </div>
        </motion.article>
    );
}

export function FeaturedProjects({ projects }: { projects: PortfolioProject[] }) {
    return (
        <section id="projects" className="scroll-mt-20 bg-slate-50 py-24 md:py-32">
            <div className="mx-auto max-w-6xl px-6">
                <div className="max-w-2xl">
                    <h2 className="font-display text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">Selected work</h2>
                    <p className="mt-4 text-lg leading-relaxed text-slate-600">
                        Many of these are internal company systems, so screenshots are anonymized and there are no public links.
                    </p>
                </div>

                {projects.length > 0 ? (
                    <div className="mt-14 grid gap-6 md:grid-cols-2">
                        {projects.map((project, index) => (
                            <ProjectCard key={project.id} project={project} index={index} />
                        ))}
                    </div>
                ) : (
                    <p className="mt-14 rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-slate-600">
                        No published projects yet. In the admin panel, open a project and switch on Published to show it here.
                    </p>
                )}
            </div>
        </section>
    );
}
