/* Motion vocabulary shared across the brand components. */

export const EASE = [0.22, 1, 0.36, 1] as const;

export const rise = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 0.75, ease: EASE } },
};

export const stagger = (delay = 0, each = 0.08) => ({
  hidden: {},
  show: { transition: { staggerChildren: each, delayChildren: delay } },
});
