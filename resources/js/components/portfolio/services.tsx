import { Globe, Layers, Server, Workflow } from 'lucide-react';
import { services } from '@/data/profile';

const icons = { globe: Globe, layers: Layers, workflow: Workflow, server: Server };

export function Services() {
    return (
        <section id="services" className="scroll-mt-20 py-24 md:py-32">
            <div className="mx-auto max-w-6xl px-6">
                <div className="max-w-2xl">
                    <h2 className="font-display text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
                        What I build and look after
                    </h2>
                    <p className="mt-4 text-lg leading-relaxed text-slate-600">
                        Most of my work sits where a company’s website meets its internal operations.
                    </p>
                </div>

                <div className="mt-14 grid gap-x-16 md:grid-cols-2">
                    {services.map((service) => {
                        const Icon = icons[service.icon];
                        return (
                            <div key={service.title} className="flex gap-5 border-t border-slate-200 py-8">
                                <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                                    <Icon className="size-5" aria-hidden="true" />
                                </span>
                                <div>
                                    <h3 className="font-display text-lg font-semibold text-slate-900">{service.title}</h3>
                                    <p className="mt-2 leading-relaxed text-slate-600">{service.body}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
