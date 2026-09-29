import { motion, useReducedMotion } from 'motion/react';
import { MapPin } from 'lucide-react';
import { Typewriter } from '@/components/portfolio/motion-primitives';
import { RoutingConsole } from '@/components/portfolio/routing-console';
import { profile } from '@/data/profile';

export function Hero() {
    const reduce = useReducedMotion();
    const enter = (delay: number) =>
        reduce
            ? {}
            : {
                  initial: { opacity: 0, y: 16 },
                  animate: { opacity: 1, y: 0 },
                  transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] as const },
              };

    return (
        <section id="top" className="relative overflow-hidden pt-32 pb-16 md:pt-40 md:pb-24">
            <div aria-hidden="true" className="hero-grid pointer-events-none absolute inset-0" />

            <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-6 lg:grid-cols-[1.1fr_1fr]">
                <div>
                    <motion.p {...enter(0)} className="flex items-center gap-2 text-sm text-slate-600">
                        <span className="size-2 rounded-full bg-blue-600" aria-hidden="true" />
                        Open to new roles
                    </motion.p>

                    <motion.h1
                        {...enter(0.08)}
                        className="mt-6 font-display text-5xl font-semibold tracking-[-0.03em] text-slate-900 sm:text-6xl lg:text-7xl"
                    >
                        {profile.name}
                    </motion.h1>

                    <motion.p {...enter(0.16)} className="mt-4 min-h-[2.25rem] font-display text-2xl text-slate-500 sm:text-3xl">
                        <Typewriter words={profile.roles} />
                    </motion.p>

                    <motion.p {...enter(0.24)} className="mt-6 max-w-xl text-lg leading-relaxed text-slate-600">
                        {profile.intro}
                    </motion.p>

                    <motion.div {...enter(0.32)} className="mt-9 flex flex-wrap items-center gap-4">
                        <a
                            href="#projects"
                            className="rounded-full bg-blue-600 px-6 py-3 text-sm font-medium text-white shadow-lg shadow-blue-600/25 transition-colors hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                        >
                            View projects
                        </a>
                        <a
                            href={`mailto:${profile.email}`}
                            className="rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-medium text-slate-800 transition-colors hover:border-blue-600 hover:text-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                        >
                            Email me
                        </a>
                    </motion.div>

                    <motion.p {...enter(0.4)} className="mt-8 flex items-center gap-2 text-sm text-slate-500">
                        <MapPin className="size-4" aria-hidden="true" />
                        {profile.location}
                    </motion.p>
                </div>

                <motion.div
                    {...(reduce
                        ? {}
                        : {
                              initial: { opacity: 0, y: 28 },
                              animate: { opacity: 1, y: 0 },
                              transition: { duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] as const },
                          })}
                >
                    <RoutingConsole />
                </motion.div>
            </div>
        </section>
    );
}
