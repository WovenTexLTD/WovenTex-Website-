import React from 'react';
import { Link } from 'react-router-dom';
import { Enter, WipeHeading } from './brand/ui';
import { Pill } from './brand/system';
import { useDarkHero } from './brand/hero';
import useMeta from './brand/useMeta';

const routes = [
  { to: '/capabilities', label: 'Capabilities', note: 'Eight product families' },
  { to: '/certifications', label: 'Certifications', note: '15+ international standards' },
  { to: '/clients', label: 'Clients', note: 'Who our factories make for' },
  { to: '/contact', label: 'Contact', note: 'Quote within 24 hours' },
];

export default function NotFound() {
  useDarkHero();
  useMeta({
    title: 'Page not found',
    description: 'That page does not exist. Find capabilities, certifications, clients and contact details for WovenTex LTD.',
    path: '/404',
  });

  return (
    <section data-dark className="grain relative flex min-h-[80svh] flex-col justify-center overflow-hidden bg-ink text-paper">
      <img
        src="/images/cutting.jpg"
        alt=""
        aria-hidden
        className="absolute inset-0 h-full w-full object-cover opacity-25"
        loading="eager"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/85 to-ink/45" />

      <div className="shell relative py-24 lg:py-28">
        <Enter delay={0.1} y={12} className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <span className="h-[1px] w-10 bg-signal" />
          <span className="mono-label text-signal">Error 404 · Page not found</span>
        </Enter>

        <WipeHeading
          as="h1"
          immediate
          delay={0.2}
          className="mt-7 w-condensed text-display font-black uppercase"
          lines={['This page', "isn't on the line"]}
        />

        <Enter as="p" delay={0.55} className="mt-7 max-w-xl text-lg leading-relaxed text-paper/70">
          The address you followed doesn’t exist, or the page has moved. Everything below is
          still where it should be.
        </Enter>

        <Enter delay={0.7} className="mt-10 flex flex-wrap gap-3">
          <Pill size="lg" to="/" tone="signal">
            Back to home
          </Pill>
          <Pill size="lg" to="/contact" tone="ghost-dark">
            Talk to us
          </Pill>
        </Enter>

        <Enter delay={0.85} className="mt-14">
          <div className="border-t border-paper/20 pt-4">
            <span className="mono-label text-paper/60">Or jump to</span>
          </div>
          <ul className="mt-2 grid gap-px sm:grid-cols-2 lg:grid-cols-4">
            {routes.map((r) => (
              <li key={r.to}>
                <Link
                  to={r.to}
                  className="group flex flex-col gap-2 border-t border-paper/15 py-5 transition-colors duration-300 hover:text-signal sm:pr-8"
                >
                  <span className="w-condensed text-lg font-bold uppercase leading-tight">
                    {r.label}
                  </span>
                  <span className="mono-label text-paper/60">{r.note}</span>
                </Link>
              </li>
            ))}
          </ul>
        </Enter>
      </div>
    </section>
  );
}
