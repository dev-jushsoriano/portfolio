import { experience } from '@/data/profile';

export function ExperienceTimeline() {
    return (
        <section id="experience" className="scroll-mt-20 py-24 md:py-32">
            <div className="mx-auto grid max-w-6xl gap-12 px-6 lg:grid-cols-[1fr_2fr]">
                <div>
                    <h2 className="font-display text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">Experience</h2>
                    <p className="mt-4 text-lg leading-relaxed text-slate-600">
                        Nearly four years building and running production systems, most of it for a multi-brand automotive group.
                    </p>
                </div>

                <ol className="relative border-l border-slate-200">
                    {experience.map((job, index) => (
                        <li key={job.company} className="relative pb-12 pl-8 last:pb-0">
                            <span
                                aria-hidden="true"
                                className={`absolute top-1.5 -left-[7px] size-3.5 rounded-full border-2 border-white ${
                                    index === 0 ? 'bg-blue-600 ring-4 ring-blue-100' : 'bg-slate-300'
                                }`}
                            />
                            <p className="text-sm text-slate-500">{job.period}</p>
                            <h3 className="mt-1 font-display text-lg font-semibold text-slate-900">{job.role}</h3>
                            <p className="text-slate-600">
                                {job.company}, {job.place}
                            </p>
                            <p className="mt-3 max-w-xl leading-relaxed text-slate-600">{job.summary}</p>
                        </li>
                    ))}
                </ol>
            </div>
        </section>
    );
}
