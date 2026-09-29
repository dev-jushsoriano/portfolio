import { stack } from '@/data/profile';

export function StackMarquee() {
    return (
        <section aria-labelledby="stack-heading" className="py-24">
            <div className="mx-auto max-w-6xl px-6 text-center">
                <h2
                    id="stack-heading"
                    className="font-display text-2xl font-semibold tracking-[0.08em] text-slate-900 uppercase sm:text-3xl"
                >
                    Tools I work with
                </h2>
            </div>

            <div className="marquee-mask mt-10 overflow-hidden">
                <ul className="animate-marquee flex w-max gap-4 hover:[animation-play-state:paused]">
                    {[...stack, ...stack].map((tool, index) => (
                        <li
                            key={`${tool}-${index}`}
                            aria-hidden={index >= stack.length}
                            className="rounded-full border border-slate-200 bg-white px-7 py-3.5 font-display text-base font-medium tracking-[0.06em] whitespace-nowrap text-slate-700 uppercase"
                        >
                            {tool}
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}