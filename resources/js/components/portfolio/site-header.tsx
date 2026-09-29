import { motion, useScroll, useSpring } from 'motion/react';
import { Download, Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { profile } from '@/data/profile';

const links = [
    { href: '/#services', label: 'Services' },
    { href: '/projects', label: 'Projects' },
    { href: '/#experience', label: 'Experience' },
];

export function SiteHeader({ cvUrl }: { cvUrl: string | null }) {
    const [scrolled, setScrolled] = useState(false);
    const [open, setOpen] = useState(false);
    const { scrollYProgress } = useScroll();
    const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 });

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 12);
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return (
        <header
            className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
                scrolled || open ? 'border-b border-slate-200/80 bg-white/85 backdrop-blur-lg' : 'border-b border-transparent'
            }`}
        >
            <motion.div
                aria-hidden="true"
                className="absolute inset-x-0 top-0 h-0.5 origin-left bg-blue-600"
                style={{ scaleX: progress }}
            />
            <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6" aria-label="Main">
                <a href="/" className="font-display text-lg font-semibold tracking-tight text-slate-900">
                    {profile.name}
                </a>

                <div className="hidden items-center gap-8 md:flex">
                    {links.map((link) => (
                        <a
                            key={link.href}
                            href={link.href}
                            className="text-sm text-slate-600 transition-colors hover:text-blue-600 focus-visible:text-blue-600"
                        >
                            {link.label}
                        </a>
                    ))}
                    {cvUrl && (
                        <a
                            href={cvUrl}
                            download="Justine-Soriano-CV.pdf"
                            className="inline-flex items-center gap-1.5 text-sm text-slate-600 transition-colors hover:text-blue-600 focus-visible:text-blue-600"
                        >
                            <Download className="size-4" aria-hidden="true" />
                            Download CV
                        </a>
                    )}
                    <a
                        href="/#contact"
                        className="rounded-full bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                    >
                        Contact me
                    </a>
                </div>

                <button
                    type="button"
                    className="-mr-2 rounded-md p-2 text-slate-700 md:hidden"
                    aria-label={open ? 'Close menu' : 'Open menu'}
                    aria-expanded={open}
                    onClick={() => setOpen((value) => !value)}
                >
                    {open ? <X className="size-5" /> : <Menu className="size-5" />}
                </button>
            </nav>

            {open && (
                <div className="border-t border-slate-200 px-6 pb-6 md:hidden">
                    {[...links, { href: '/#contact', label: 'Contact' }].map((link) => (
                        <a
                            key={link.href}
                            href={link.href}
                            onClick={() => setOpen(false)}
                            className="block border-b border-slate-100 py-3 text-slate-700"
                        >
                            {link.label}
                        </a>
                    ))}
                    {cvUrl && (
                        <a
                            href={cvUrl}
                            download="Justine-Soriano-CV.pdf"
                            onClick={() => setOpen(false)}
                            className="mt-4 flex items-center justify-center gap-2 rounded-full border border-slate-300 py-3 text-sm font-medium text-slate-800"
                        >
                            <Download className="size-4" aria-hidden="true" />
                            Download CV
                        </a>
                    )}
                </div>
            )}
        </header>
    );
}
