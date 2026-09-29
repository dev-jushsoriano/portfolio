import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { useEffect, useRef, useState } from 'react';

type Ticket = {
    department: string;
    request: string;
    routedTo: string;
    notice: string;
};

// Illustrative examples only. No real company, customer or employee data.
const feed: Ticket[] = [
    { department: 'IT Support', request: 'Laptop cannot connect to VPN', routedTo: 'IT Helpdesk', notice: 'SMS sent' },
    { department: 'Marketing', request: 'Landing page for weekend promo', routedTo: 'Web Team', notice: 'Email sent' },
    { department: 'Sales', request: 'Update lead status in CRM', routedTo: 'CRM Admin', notice: 'Webhook fired' },
    { department: 'Human Resources', request: 'Publish new job opening', routedTo: 'Careers Portal', notice: 'Published' },
    { department: 'Service', request: 'Appointment reminder for tomorrow', routedTo: 'Scheduler', notice: 'SMS queued' },
    { department: 'Creative', request: 'Social banners for new branch', routedTo: 'Design Team', notice: 'Email sent' },
];

const ages = ['now', '3s ago', '7s ago', '12s ago'];
const VISIBLE = 4;

export function RoutingConsole() {
    const reduce = useReducedMotion();
    const counter = useRef(VISIBLE);
    const [items, setItems] = useState(() =>
        feed.slice(0, VISIBLE).map((ticket, id) => ({ ...ticket, id })),
    );

    useEffect(() => {
        if (reduce) return;
        const timer = setInterval(() => {
            const id = counter.current++;
            setItems((previous) => [{ ...feed[id % feed.length], id }, ...previous].slice(0, VISIBLE));
        }, 2800);
        return () => clearInterval(timer);
    }, [reduce]);

    return (
        <figure className="relative">
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_30px_60px_-30px_rgba(37,99,235,0.35)]">
                <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50/80 px-5 py-3">
                    <p className="font-display text-sm font-semibold text-slate-900">Request routing</p>
                    <span className="flex items-center gap-2 text-xs font-medium text-blue-700">
                        <span className="relative flex size-2">
                            <span className="absolute inline-flex size-full animate-ping rounded-full bg-sky-400 opacity-75 motion-reduce:animate-none" />
                            <span className="relative inline-flex size-2 rounded-full bg-blue-600" />
                        </span>
                        Live
                    </span>
                </div>

                <ul className="relative h-[21rem] overflow-hidden" aria-label="Example requests">
                    <AnimatePresence initial={false}>
                        {items.map((item, position) => (
                            <motion.li
                                key={item.id}
                                layout={!reduce}
                                initial={{ opacity: 0, y: -24 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                                className="border-b border-slate-100 px-5 py-4 last:border-b-0"
                            >
                                <div className="flex items-baseline justify-between gap-4">
                                    <p className="truncate text-sm font-medium text-slate-900">{item.request}</p>
                                    <span className="shrink-0 font-code text-[11px] text-slate-400">{ages[position]}</span>
                                </div>
                                <div className="mt-2 flex flex-wrap items-center gap-2 text-xs">
                                    <span className="rounded-md bg-slate-100 px-2 py-0.5 text-slate-600">{item.department}</span>
                                    <span className="text-slate-400" aria-hidden="true">
                                        to
                                    </span>
                                    <span className="rounded-md bg-blue-50 px-2 py-0.5 font-medium text-blue-700">{item.routedTo}</span>
                                    <span className="ml-auto text-sky-600">{item.notice}</span>
                                </div>
                            </motion.li>
                        ))}
                    </AnimatePresence>
                </ul>
            </div>
            <figcaption className="mt-3 text-xs leading-relaxed text-slate-500">
                A simulated example of the automatic routing my ticketing system handles for 50+ departments.
            </figcaption>
        </figure>
    );
}
