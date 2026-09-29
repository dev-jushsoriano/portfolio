import { Head } from '@inertiajs/react';
import { ContactPanel } from '@/components/portfolio/contact-panel';
import { ExperienceTimeline } from '@/components/portfolio/experience-timeline';
import { FeaturedProjects } from '@/components/portfolio/featured-projects';
import { Hero } from '@/components/portfolio/hero';
import { Services } from '@/components/portfolio/services';
import { SiteFooter } from '@/components/portfolio/site-footer';
import { SiteHeader } from '@/components/portfolio/site-header';
import { StackMarquee } from '@/components/portfolio/stack-marquee';
import { StatsBand } from '@/components/portfolio/stats-band';
import type { PortfolioProject } from '@/types/portfolio';

export default function Home({ projects, cvUrl }: { projects: PortfolioProject[]; cvUrl: string | null }) {
    return (
        <>
            <Head title="Full-Stack Web Developer" />
            <div className="min-h-screen bg-white font-body text-slate-900 antialiased selection:bg-blue-100">
                <SiteHeader cvUrl={cvUrl} />
                <main>
                    <Hero />
                    <StatsBand />
                    <Services />
                    <FeaturedProjects projects={projects} />
                    <StackMarquee />
                    <ExperienceTimeline />
                    <ContactPanel cvUrl={cvUrl} />
                </main>
                <SiteFooter />
            </div>
        </>
    );
}
