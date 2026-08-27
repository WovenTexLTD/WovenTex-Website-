import React from 'react';
import PageHero from './brand/PageHero';
import { Button, Marquee, Reveal, RevealItem, Section, SectionHead, Stat } from './brand/ui';
import useMeta from './brand/useMeta';

const majorClients = [
  { name: 'Hugo Boss', partnership: 'Luxury menswear', logo: '/images/bosslogo.png' },
  { name: 'Pull & Bear', partnership: 'Young fashion', logo: '/images/pullbearlogo.png' },
  { name: 'Polo Ralph Lauren', partnership: 'Classic American', logo: '/images/polologo.png' },
  { name: 'LIDL', partnership: 'European retail', logo: '/images/lidllogo.png' },
  { name: 'C&A', partnership: 'European fashion', logo: '/images/calogo.png' },
  { name: 'DKNY', partnership: 'Contemporary fashion', logo: '/images/dknylogo.png' },
  { name: 'Giant Tiger', partnership: 'North American retail', logo: '/images/gianttiger.png' },
  { name: 'Inditex', partnership: 'Global fashion group', logo: '/images/inditexlogo.png' },
];

export default function Clients() {
  useMeta({
    title: 'Clients',
    description: 'Our factory partners manufacture for Hugo Boss, Inditex, Polo Ralph Lauren, Pull & Bear, DKNY, C&A, LIDL and Giant Tiger.',
    path: '/clients',
    image: '/images/guys.jpg',
  });

  return (
    <>
      <PageHero
        eyebrow="Clients & partnerships"
        title={['Trusted by', 'global brands']}
        lede="Our factory partners manufacture for some of the world’s most recognised fashion brands, delivering quality and reliability at retail scale."
        image="/images/guys.jpg"
        imageAlt="Production team on the factory floor"
        imagePosition="50% 35%"
        specs={[
          { k: 'Global clients', v: '50+' },
          { k: 'Monthly capacity', v: '500,000+ pcs' },
          { k: 'On-time delivery', v: '98%' },
          { k: 'Experience', v: '25+ years' },
        ]}
      />

      {/* ============================================================ NAMES */}
      <Section tone="paper" className="border-b border-ink/10 py-8">
        <Marquee speed={48}>
          {majorClients.map((c) => (
            <span
              key={c.name}
              className="w-condensed px-8 text-2xl font-bold uppercase tracking-tight text-ink-200 lg:text-3xl"
            >
              {c.name}
            </span>
          ))}
        </Marquee>
      </Section>

      {/* ========================================================== FIGURES */}
      <Section tone="paper" className="py-20 lg:py-24">
        <div className="shell grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          <Stat value="25+" label="Years experience" note="In global apparel" />
          <Stat value="500,000+" label="Monthly capacity" note="Per partner factory" />
          <Stat value="15+" label="Certifications" note="Across the network" />
          <Stat value="50+" label="Global clients" note="Fashion and retail" />
        </div>
      </Section>

      {/* ========================================================== ROSTER */}
      <Section tone="paper-2" className="py-24 lg:py-32">
        <div className="shell">
          <SectionHead
            index="01 / 02"
            label="Major clients"
            title={['Who our factories', 'make for']}
            lede="Longstanding relationships across fashion and retail — from luxury menswear to national grocery ranges."
          />

          <Reveal className="mt-16 grid gap-px border border-ink/12 bg-ink/12 sm:grid-cols-2 lg:grid-cols-4" each={0.05}>
            {majorClients.map((c) => (
              <RevealItem
                key={c.name}
                className="group flex flex-col justify-between gap-8 bg-paper p-8 transition-colors duration-500 hover:bg-white"
              >
                <div className="flex h-24 items-center">
                  <img
                    src={c.logo}
                    alt={`${c.name} logo`}
                    className="max-h-20 w-auto max-w-full object-contain object-left opacity-80 grayscale transition-all duration-500 ease-brand group-hover:opacity-100 group-hover:grayscale-0"
                    loading="lazy"
                  />
                </div>
                <div className="border-t border-ink/12 pt-4">
                  <h3 className="w-condensed text-lg font-bold uppercase leading-tight">{c.name}</h3>
                  <p className="mono-label mt-2 text-ink-300">{c.partnership}</p>
                </div>
              </RevealItem>
            ))}
          </Reveal>
        </div>
      </Section>

      {/* ============================================================== CTA */}
      <section className="grain relative overflow-hidden bg-ink text-paper">
        <img
          src="/images/cutting.jpg"
          alt=""
          aria-hidden
          className="absolute inset-0 h-full w-full object-cover opacity-25"
          loading="lazy"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/85 to-ink/40" />

        <div className="shell relative py-24 lg:py-32">
          <Reveal className="max-w-3xl">
            <RevealItem>
              <span className="mono-label text-signal">02 / 02 — Partnership</span>
            </RevealItem>
            <RevealItem>
              <h2 className="mt-6 w-condensed text-display font-black uppercase">
                Want to partner with us?
              </h2>
            </RevealItem>
            <RevealItem>
              <p className="mt-7 max-w-xl text-lg leading-relaxed text-paper/70">
                Tap into the quality, reliability and service that made us the preferred
                manufacturing partner for global fashion brands.
              </p>
            </RevealItem>
            <RevealItem>
              <div className="mt-10 flex flex-wrap gap-3">
                <Button to="/contact" tone="signal">
                  Start a partnership
                </Button>
                <Button to="/capabilities" tone="ghost-dark">
                  See what we make
                </Button>
              </div>
            </RevealItem>
          </Reveal>
        </div>
      </section>
    </>
  );
}
