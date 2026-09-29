import { animate, motion, useInView, useReducedMotion } from 'motion/react';
import { type ReactNode, useEffect, useRef, useState } from 'react';

/** Fades content in once when it scrolls into view. Skipped for reduced motion. */
export function Reveal({
    children,
    delay = 0,
    className,
}: {
    children: ReactNode;
    delay?: number;
    className?: string;
}) {
    const reduce = useReducedMotion();

    return (
        <motion.div
            className={className}
            initial={reduce ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
        >
            {children}
        </motion.div>
    );
}

/** Counts up from 0 to the value the first time it becomes visible. */
export function Counter({ value, suffix = '' }: { value: number; suffix?: string }) {
    const ref = useRef<HTMLSpanElement>(null);
    const inView = useInView(ref, { once: true, margin: '-40px' });
    const reduce = useReducedMotion();
    const [display, setDisplay] = useState(0);

    useEffect(() => {
        if (!inView) return;
        if (reduce) {
            setDisplay(value);
            return;
        }
        const controls = animate(0, value, {
            duration: 1.4,
            ease: [0.22, 1, 0.36, 1],
            onUpdate: (latest) => setDisplay(Math.round(latest)),
        });
        return () => controls.stop();
    }, [inView, reduce, value]);

    return (
        <span ref={ref} className="tabular-nums">
            {display}
            {suffix}
        </span>
    );
}

/** Types and deletes each word in turn. Screen readers get the full list once. */
export function Typewriter({ words }: { words: readonly string[] }) {
    const reduce = useReducedMotion();
    const [index, setIndex] = useState(0);
    const [text, setText] = useState(words[0]);
    const [deleting, setDeleting] = useState(false);

    useEffect(() => {
        if (reduce) return;
        const current = words[index % words.length];
        const finishedTyping = !deleting && text === current;
        const finishedDeleting = deleting && text === '';
        const delay = finishedTyping ? 2000 : finishedDeleting ? 250 : deleting ? 30 : 65;

        const timer = setTimeout(() => {
            if (finishedTyping) {
                setDeleting(true);
            } else if (finishedDeleting) {
                setDeleting(false);
                setIndex((i) => (i + 1) % words.length);
            } else {
                setText(deleting ? current.slice(0, text.length - 1) : current.slice(0, text.length + 1));
            }
        }, delay);

        return () => clearTimeout(timer);
    }, [text, deleting, index, words, reduce]);

    return (
        <>
            <span className="sr-only">{words.join(', ')}</span>
            <span aria-hidden="true">
                {text}
                <span className="ml-1 inline-block h-[0.9em] w-[3px] translate-y-[0.1em] animate-pulse rounded-full bg-blue-600" />
            </span>
        </>
    );
}
