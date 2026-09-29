import { Mail } from 'lucide-react';
import { profile } from '@/data/profile';

export function ContactPanel() {
    return (
        <section id="contact" className="scroll-mt-20 px-6 pb-24">
            <div className="contact-panel relative mx-auto max-w-6xl overflow-hidden rounded-3xl bg-blue-600 px-8 py-16 text-white md:px-16 md:py-20">
                <div className="relative max-w-2xl">
                    <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
                        Hiring for a web or systems role?
                    </h2>
                    <p className="mt-4 text-lg leading-relaxed text-blue-100">
                        I’m open to full-time opportunities, on-site or remote. Send me the details and let’s talk.
                    </p>
                    <a
                        href={`mailto:${profile.email}`}
                        className="mt-9 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-medium text-blue-700 transition-colors hover:bg-blue-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                    >
                        <Mail className="size-4" aria-hidden="true" />
                        {profile.email}
                    </a>
                </div>
            </div>
        </section>
    );
}
