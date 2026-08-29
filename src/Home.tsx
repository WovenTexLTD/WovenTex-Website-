import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { Enter, Marquee, Reveal, RevealItem, Section, SectionHead, WipeHeading } from './brand/ui';
import { Pill } from './brand/system';
import useMeta from './brand/useMeta';
import { useDarkHero } from './brand/hero';
import ShutterHeading from './brand/ShutterHeading';
import ShirtScrub from './brand/ShirtScrub';
import ProofRow from './brand/ProofRow';
import HorizontalRail, { type RailItem } from './brand/HorizontalRail';

/* ---------------------------------------------------------------- data --- */

const heroSpecs = [
  { k: 'On-time', v: '98%' },
  { k: 'MOQ', v: '1,500' },
  { k: 'Oversight', v: 'On site during production' },
  { k: 'Factories', v: 'Bangladesh' },
];

const clients = [
  'Pull&Bear',
  'Hugo Boss',
  'DKNY',
  'Inditex',
  'Giant Tiger',
  'LIDL',
  'Polo Ralph Lauren',
  'C&A',
];

const certifications = ['GOTS', 'GRS', 'RCS', 'BSCI', 'Sedex', 'OEKO-TEX', 'ISO 9001', 'WRAP'];

const proof = [
  { value: '500,000+', label: 'Pieces / month', note: 'Per partner factory' },
  { value: '15+', label: 'Certifications', note: 'GOTS, GRS, BSCI, Sedex' },
  { value: '98%', label: 'On-time delivery', note: 'Across live programmes' },
  { value: '25+', label: 'Years experience', note: 'In global apparel' },
];

const pillars = [
  {
    n: '01',
    title: 'Direct factory access',
    text: 'No broker chain. We work inside our partner factories, including one of Bangladesh’s largest certified manufacturers, so pricing, capacity and quality are known quantities, not promises.',
  },
  {
    n: '02',
    title: 'UK-based management',
    text: 'A London team on your timezone, your contract law, and your standards. One accountable contact from tech pack to container.',
  },
  {
    n: '03',
    title: 'Proven at scale',
    text: 'Our network already produces for Zara, Hugo Boss and Polo Ralph Lauren, holding 98% on-time delivery across programmes.',
  },
  {
    n: '04',
    title: 'Flexible programmes',
    text: '500,000+ pieces of monthly capacity per factory, with MOQs from 1,500, leaving room for emerging labels and established retail alike.',
  },
  {
    n: '05',
    title: 'Complete transparency',
    text: 'Live production status, inline QC reports and direct line-level visibility, reported the same way every week.',
  },
  {
    n: '06',
    title: 'Compliance as standard',
    text: '15+ international certifications spanning organic content, recycled claims, chemical safety and social audit.',
  },
];

const categories: RailItem[] = [
  { title: 'Denim', spec: 'Rigid · Stretch · Selvedge', image: '/images/products/denim-shirt.jpg' },
  { title: 'Puffers & Padded', spec: 'Down · Synthetic fill', image: '/images/products/puffer-gloss.jpg' },
  { title: 'Knitwear', spec: 'Cable · Rib · Quarter-zip', image: '/images/products/knit-cable.jpg' },
  { title: 'T-shirts & Tops', spec: 'Jersey · Rib · Poplin', image: '/images/products/tee-crew.jpg' },
  { title: 'Trousers & Chinos', spec: 'Twill · Cargo · Tapered', image: '/images/products/chino-trouser.jpg' },
  { title: 'Activewear', spec: 'Moisture-wick · 4-way stretch', image: '/images/products/technical-gilet.jpg' },
  { title: 'Swimwear', spec: 'UPF 50+ · Quick-dry', image: '/images/products/swim-shorts.jpg' },
];

/* ---------------------------------------------------------------- page --- */

export default function Home() {
  useDarkHero();
  useMeta({
    title: 'Apparel Manufacturing, Managed from London',
    description:
      'WovenTex LTD connects international brands to certified factories producing 500,000 pieces a month: direct factory access, transparent production management and 98% on-time delivery.',
    path: '/',
    image: '/images/background.jpg',
  });

  const heroRef = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '18%']);
  const heroFade = useTransform(scrollYProgress, [0, 0.85], [1, 0]);

  return (
    <>
      {/* ============================================================ HERO */}
      <section ref={heroRef} data-dark className="relative flex min-h-[100svh] flex-col overflow-hidden bg-ink">
        <motion.div className="absolute inset-0" style={reduce ? undefined : { y: heroY }}>
          <img
            src="/images/background.jpg"
            alt="Hands guiding fabric through an industrial sewing machine"
            className="h-[118%] w-full object-cover object-[70%_center] contrast-[1.05] brightness-[0.86] animate-slow-zoom"
            loading="eager"
            {...{ fetchpriority: 'high' }}
          />
          {/* Legibility scrim, heaviest at the baseline where the type sits */}
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/60 to-ink/15" />
          <div className="absolute inset-0 bg-gradient-to-r from-ink/92 via-ink/50 to-ink/5" />
        </motion.div>

        <motion.div
          className="shell relative z-10 flex flex-1 flex-col justify-end pb-12 pt-28"
          style={reduce ? undefined : { opacity: heroFade }}
        >
          {/* Eyebrow */}
          <Enter delay={0.15} y={12} className="mb-7 flex flex-wrap items-center gap-x-4 gap-y-2">
            <span className="h-[1px] w-10 bg-signal" />
            <span className="mono-label text-signal">Apparel manufacturing · Managed from London</span>
          </Enter>

          {/* The headline, assembled glyph by glyph under a shutter sweep */}
          <ShutterHeading
            as="h1"
            immediate
            delay={0.12}
            className="w-condensed text-display-lg font-black uppercase text-paper"
            lines={[
              'Your direct link to',
              'world-class apparel',
              { text: 'manufacturing', accent: true },
            ]}
          />

          <Enter as="p" delay={0.9} className="mt-7 max-w-lg text-base leading-relaxed text-paper/70 lg:text-lg">
            Strategic factory partnerships, transparent production management, and quality
            standards that hold from first sample to final container.
          </Enter>

          <Enter delay={1.0} className="mt-9 flex flex-wrap gap-3">
            <Pill to="/contact" tone="signal" size="lg">
              Let’s talk production
            </Pill>
            <Pill to="/capabilities" tone="ghost-dark" size="lg">
              View capabilities
            </Pill>
          </Enter>
        </motion.div>

        {/* Spec strip along the bottom of the hero */}
        <Enter delay={1.15} y={0} className="relative z-10 border-t border-paper/15 bg-ink/50 backdrop-blur-md">
          <dl className="shell grid grid-cols-2 divide-paper/10 py-5 sm:grid-cols-4 sm:divide-x">
            {heroSpecs.map((s, i) => (
              <div key={s.k} className={`px-0 py-2 sm:px-6 ${i === 0 ? 'sm:pl-0' : ''}`}>
                <dt className="mono-label text-paper/55">{s.k}</dt>
                <dd className="mt-1.5 text-sm font-semibold text-paper sm:text-base">{s.v}</dd>
              </div>
            ))}
          </dl>
        </Enter>
      </section>

      {/* ================================================= CLIENT MARQUEE */}
      <Section tone="paper" className="border-b border-ink/10 py-7">
        <div className="shell mb-5 flex items-center gap-4">
          <span className="mono-label text-ink-300">Produced for</span>
          <span className="h-[1px] flex-1 bg-ink/10" />
        </div>
        <Marquee speed={45}>
          {clients.map((c) => (
            <span
              key={c}
              className="w-condensed px-8 text-2xl font-bold uppercase tracking-tight text-ink-200 lg:text-3xl"
            >
              {c}
            </span>
          ))}
        </Marquee>
      </Section>

      {/* ============================================== SHIRT ASSEMBLY SCRUB */}
      <ShirtScrub />
      <ProofRow items={proof} />

      {/* ========================================================== PILLARS */}
      <Section tone="paper-2" className="py-24 lg:py-32">
        <div className="shell">
          <SectionHead
            index="02 / 04"
            label="Why WovenTex"
            title={['Why global brands', 'choose WovenTex']}
            lede="A UK agency with its hands inside the factory. That combination is what makes quality, price and delivery predictable instead of hopeful."
          />

          {/* Rounded tiles rather than a hairline grid: the one place the
              section borrows the product-page card, so it matches the
              carousel further down. The hover invert stays. */}
          <Reveal className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3" each={0.06}>
            {pillars.map((p) => (
              <RevealItem
                key={p.n}
                className="group relative flex flex-col rounded-4xl bg-paper p-8 transition-colors duration-500 ease-brand hover:bg-ink lg:p-10"
              >
                <span className="mono-label text-signal-700 transition-colors duration-500 group-hover:text-signal">
                  {p.n}
                </span>
                <h3 className="mt-6 w-condensed text-2xl font-bold uppercase leading-tight transition-colors duration-500 group-hover:text-paper">
                  {p.title}
                </h3>
                <p className="mt-4 text-[15px] leading-relaxed text-ink-400 transition-colors duration-500 group-hover:text-paper/70">
                  {p.text}
                </p>
                <div className="mt-auto pt-8">
                  <span className="block h-[2px] w-10 origin-left rounded-full bg-signal transition-transform duration-500 ease-brand group-hover:scale-x-[2.4]" />
                </div>
              </RevealItem>
            ))}
          </Reveal>
        </div>
      </Section>

      {/* ======================================================= CATEGORIES */}
      <HorizontalRail
        items={categories}
        index="03 / 04"
        label="What we make"
        title={['Manufacturing', 'expertise']}
        lede="Seven core categories, built on the same fabric sourcing, the same QC protocol and the same delivery discipline."
      />

      {/* =================================================== CERTIFICATIONS */}
      <Section tone="paper-2" className="border-y border-ink/10 py-16">
        <div className="shell mb-6 flex flex-wrap items-center justify-between gap-4">
          <span className="mono-label text-ink-300">Certified across the network</span>
          <Link
            to="/certifications"
            className="link-swipe mono-label text-ink transition-colors hover:text-signal-700"
          >
            All certifications →
          </Link>
        </div>
        <Marquee speed={38} reverse>
          {certifications.map((c) => (
            <span
              key={c}
              className="mx-2 rounded-full border border-ink/20 px-6 py-2.5 text-sm font-bold uppercase tracking-label text-ink-500"
            >
              {c}
            </span>
          ))}
        </Marquee>
      </Section>

      {/* ============================================================== CTA */}
      <section data-dark className="relative overflow-hidden bg-ink text-paper">
        <img
          src="/images/factory.jpg"
          alt=""
          aria-hidden
          className="absolute inset-0 h-full w-full object-cover opacity-25"
          loading="lazy"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/85 to-ink/40" />

        <div className="shell relative py-28 lg:py-36">
          <Reveal className="max-w-3xl">
            <RevealItem>
              <span className="mono-label text-signal">04 / 04 · Next step</span>
            </RevealItem>
            <WipeHeading
              as="h2"
              className="mt-6 w-condensed text-display font-black uppercase"
              lines={['Ready to start', 'your next', <span key="p" className="text-signal">production?</span>]}
            />
            <RevealItem>
              <p className="mt-7 max-w-lg text-base leading-relaxed text-paper/70 lg:text-lg">
                Send us a tech pack, a sketch, or just a target price. You’ll have a costed
                quotation and a production timeline within 24 hours.
              </p>
            </RevealItem>
            <RevealItem>
              <div className="mt-10 flex flex-wrap gap-3">
                <Pill to="/contact" tone="signal" size="lg">
                  Request a quote
                </Pill>
                <Pill to="/clients" tone="ghost-dark" size="lg">
                  See who we make for
                </Pill>
              </div>
            </RevealItem>
          </Reveal>
        </div>
      </section>
    </>
  );
}
