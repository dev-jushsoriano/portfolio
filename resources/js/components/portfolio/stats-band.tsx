import { Counter } from '@/components/portfolio/motion-primitives';
import { stats } from '@/data/profile';

export function StatsBand() {
    return (
        <section aria-label="Highlights" className="border-y border-slate-200 bg-slate-50">
            <dl className="mx-auto grid max-w-6xl grid-cols-2 px-6 lg:grid-cols-4">
                {stats.map((stat) => (
                    <div
                        key={stat.label}
                        className="flex flex-col border-slate-200 py-8 pr-4 lg:px-8 lg:py-10 lg:first:pl-0 lg:not-first:border-l"
                    >
                        <dt className="order-2 mt-2 text-sm leading-snug text-slate-600">{stat.label}</dt>
                        <dd className="order-1 font-display text-4xl font-semibold tracking-tight text-slate-900">
                            <Counter value={stat.value} suffix={stat.suffix} />
                        </dd>
                    </div>
                ))}
            </dl>
        </section>
    );
}
