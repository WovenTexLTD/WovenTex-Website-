import React from 'react';
import { Reveal, RevealItem } from './ui';
import { Pill } from './system';

/**
 * The figures that land immediately after the shirt sequence.
 *
 * It wears the sequence's own studio grey rather than a colour of its own, so
 * the pin releases into a continuous surface instead of a hard cut to black.
 * The value comes from `--shirt-bg`, which the sequence sets at runtime from
 * the colour it samples out of the frames themselves.
 */
export default function ProofRow({
  items,
}: {
  items: { value: string; label: string; note: string }[];
}) {
  return (
    <section
      className="relative pb-24 pt-16 text-ink lg:pb-32"
      style={{ backgroundColor: 'var(--shirt-bg, #bebfc0)' }}
    >
      <div className="shell">
        <Reveal className="grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-4" each={0.07}>
          {items.map((s) => (
            <RevealItem key={s.label}>
              <div className="border-t border-ink/25 pt-5">
                <span className="block w-condensed text-4xl font-black leading-none tracking-tight lg:text-5xl">
                  {s.value}
                </span>
                <div className="mono-label mt-3 text-ink/60">{s.label}</div>
                <p className="mt-2 text-sm text-ink/55">{s.note}</p>
              </div>
            </RevealItem>
          ))}
        </Reveal>

        <Reveal className="mt-14">
          <RevealItem>
            <Pill to="/about" tone="ghost">
              How we work
            </Pill>
          </RevealItem>
        </Reveal>
      </div>
    </section>
  );
}
