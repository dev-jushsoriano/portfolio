import { useForm } from '@inertiajs/react';
import { CheckCircle2, Mail } from 'lucide-react';
import { type FormEvent, useState } from 'react';
import { profile } from '@/data/profile';

type ContactForm = {
    name: string;
    email: string;
    company: string;
    message: string;
    website: string; // honeypot, stays empty for real visitors
};

const inputClass =
    'mt-2 block w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 placeholder:text-slate-400 transition-colors focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 focus:outline-none aria-[invalid=true]:border-red-500';

function FieldError({ id, message }: { id: string; message?: string }) {
    if (!message) return null;
    return (
        <p id={id} className="mt-2 text-sm text-red-600">
            {message}
        </p>
    );
}

export function ContactPanel() {
    const form = useForm<ContactForm>({ name: '', email: '', company: '', message: '', website: '' });
    const [sent, setSent] = useState(false);

    const submit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        form.post('/contact', {
            preserveScroll: true,
            onSuccess: () => {
                form.reset();
                setSent(true);
            },
        });
    };

    return (
        <section id="contact" className="scroll-mt-20 px-6 pb-24">
            <div className="contact-panel relative mx-auto grid max-w-6xl gap-12 overflow-hidden rounded-3xl bg-blue-600 px-6 py-12 text-white sm:px-10 md:py-16 lg:grid-cols-[1fr_1.1fr] lg:gap-16 lg:px-16">
                <div className="relative">
                    <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">Hiring for a web or systems role?</h2>
                    <p className="mt-4 text-lg leading-relaxed text-blue-100">
                        I’m open to full-time opportunities, on-site or remote. Send me the details and let’s talk.
                    </p>
                    <a
                        href={`mailto:${profile.email}`}
                        className="mt-8 inline-flex items-center gap-2 text-blue-100 underline decoration-blue-300/60 underline-offset-4 transition-colors hover:text-white"
                    >
                        <Mail className="size-4" aria-hidden="true" />
                        {profile.email}
                    </a>
                </div>

                <div className="relative rounded-2xl bg-white p-6 text-slate-900 shadow-2xl shadow-blue-900/20 sm:p-8">
                    {sent ? (
                        <div className="flex flex-col items-start py-6" role="status">
                            <CheckCircle2 className="size-10 text-blue-600" aria-hidden="true" />
                            <h3 className="mt-4 font-display text-2xl font-semibold">Message sent</h3>
                            <p className="mt-2 leading-relaxed text-slate-600">
                                Thanks for reaching out. I’ll reply to the email address you provided.
                            </p>
                            <button
                                type="button"
                                onClick={() => setSent(false)}
                                className="mt-6 text-sm font-medium text-blue-700 hover:text-blue-800"
                            >
                                Send another message
                            </button>
                        </div>
                    ) : (
                        <form onSubmit={submit} noValidate>
                            <div className="grid gap-5 sm:grid-cols-2">
                                <div>
                                    <label htmlFor="contact-name" className="text-sm font-medium text-slate-700">
                                        Name
                                    </label>
                                    <input
                                        id="contact-name"
                                        type="text"
                                        autoComplete="name"
                                        required
                                        value={form.data.name}
                                        onChange={(e) => form.setData('name', e.target.value)}
                                        aria-invalid={Boolean(form.errors.name)}
                                        aria-describedby={form.errors.name ? 'contact-name-error' : undefined}
                                        className={inputClass}
                                    />
                                    <FieldError id="contact-name-error" message={form.errors.name} />
                                </div>
                                <div>
                                    <label htmlFor="contact-email" className="text-sm font-medium text-slate-700">
                                        Email
                                    </label>
                                    <input
                                        id="contact-email"
                                        type="email"
                                        autoComplete="email"
                                        required
                                        value={form.data.email}
                                        onChange={(e) => form.setData('email', e.target.value)}
                                        aria-invalid={Boolean(form.errors.email)}
                                        aria-describedby={form.errors.email ? 'contact-email-error' : undefined}
                                        className={inputClass}
                                    />
                                    <FieldError id="contact-email-error" message={form.errors.email} />
                                </div>
                            </div>

                            <div className="mt-5">
                                <label htmlFor="contact-company" className="text-sm font-medium text-slate-700">
                                    Company <span className="font-normal text-slate-400">(optional)</span>
                                </label>
                                <input
                                    id="contact-company"
                                    type="text"
                                    autoComplete="organization"
                                    value={form.data.company}
                                    onChange={(e) => form.setData('company', e.target.value)}
                                    aria-invalid={Boolean(form.errors.company)}
                                    className={inputClass}
                                />
                                <FieldError id="contact-company-error" message={form.errors.company} />
                            </div>

                            <div className="mt-5">
                                <label htmlFor="contact-message" className="text-sm font-medium text-slate-700">
                                    Message
                                </label>
                                <textarea
                                    id="contact-message"
                                    rows={5}
                                    required
                                    value={form.data.message}
                                    onChange={(e) => form.setData('message', e.target.value)}
                                    aria-invalid={Boolean(form.errors.message)}
                                    aria-describedby={form.errors.message ? 'contact-message-error' : undefined}
                                    placeholder="The role, the team, and how to reach you"
                                    className={`${inputClass} resize-y`}
                                />
                                <FieldError id="contact-message-error" message={form.errors.message} />
                            </div>

                            {/* Honeypot: hidden from people and screen readers, visible to naive bots */}
                            <div className="absolute -left-[9999px] h-px w-px overflow-hidden" aria-hidden="true">
                                <label htmlFor="contact-website">Website</label>
                                <input
                                    id="contact-website"
                                    type="text"
                                    tabIndex={-1}
                                    autoComplete="off"
                                    value={form.data.website}
                                    onChange={(e) => form.setData('website', e.target.value)}
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={form.processing}
                                className="mt-6 w-full rounded-full bg-blue-600 px-6 py-3.5 text-sm font-medium text-white transition-colors hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:cursor-wait disabled:opacity-70"
                            >
                                {form.processing ? 'Sending…' : 'Send message'}
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </section>
    );
}
