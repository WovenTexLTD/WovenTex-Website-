import React from 'react';
import { Enter, WipeHeading } from './ui';

/**
 * The interior-page masthead. Every page opens the same way — dark plate,
 * mono eyebrow, condensed headline, optional spec strip — so the site reads
 * as one document rather than nine.
 */
export default function PageHero({
  eyebrow,
  title,
  lede,
  image,
  imageAlt = '',
  specs,
  imagePosition = 'center',
  tone = 'photo',
}: {
  eyebrow: string;
  title: React.ReactNode[];
  lede?: React.ReactNode;
  image?: string;
  imageAlt?: string;
  specs?: { k: string; v: string }[];
  imagePosition?: string;
  /** `photo` shows the image behind the plate; `plain` is ink + weave only */
  tone?: 'photo' | 'plain';
}) {
  return (
    <section className="grain relative flex min-h-[64svh] flex-col justify-end overflow-hidden bg-ink text-paper">
      {tone === 'photo' && image && (
        <div className="absolute inset-0">
          <img
            src={image}
            alt={imageAlt}
            className="h-full w-full object-cover brightness-[0.78] contrast-[1.06] saturate-[0.85]"
            style={{ objectPosition: imagePosition }}
            loading="eager"
            {...{ fetchpriority: 'high' }}
          />
          {/* Scrim weighted to the left, where the type sits — the photograph
              keeps its detail on the open side of the frame */}
          <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/72 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/95 via-ink/25 to-ink/45" />
        </div>
      )}

      <div className="shell relative pb-16 pt-32 lg:pb-20 lg:pt-44">
        <Enter delay={0.1} y={12} className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <span className="h-[1px] w-10 bg-signal" />
          <span className="mono-label text-signal">{eyebrow}</span>
        </Enter>

        <WipeHeading
          as="h1"
          immediate
          delay={0.2}
          className="mt-7 w-condensed text-display font-black uppercase"
          lines={title}
        />

        {lede && (
          <Enter as="p" delay={0.55} className="mt-7 max-w-2xl text-lg leading-relaxed text-paper/70">
            {lede}
          </Enter>
        )}
      </div>

      {specs && specs.length > 0 && (
        <Enter delay={0.7} y={0} className="relative border-t border-paper/15 bg-ink/50 backdrop-blur-md">
          <dl className="shell grid grid-cols-2 divide-paper/10 py-5 sm:grid-cols-4 sm:divide-x">
            {specs.map((s, i) => (
              <div key={s.k} className={`py-2 sm:px-6 ${i === 0 ? 'sm:pl-0' : ''}`}>
                <dt className="mono-label text-paper/40">{s.k}</dt>
                <dd className="mt-1.5 text-sm font-semibold text-paper sm:text-base">{s.v}</dd>
              </div>
            ))}
          </dl>
        </Enter>
      )}
    </section>
  );
}
