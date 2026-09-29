import { profile } from '@/data/profile';

export function SiteFooter() {
    return (
        <footer className="border-t border-slate-200">
            <div className="mx-auto flex max-w-6xl flex-col gap-2 px-6 py-8 text-sm text-slate-500 sm:flex-row sm:justify-between">
                <p>
                    © {new Date().getFullYear()} {profile.fullName}
                </p>
                <p>Built with Laravel and React</p>
            </div>
        </footer>
    );
}
