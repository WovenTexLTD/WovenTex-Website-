import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import {
  Button,
  Enter,
  Marquee,
  Reveal,
  RevealItem,
  Section,
  SectionHead,
  Stat,
  WipeHeading,
} from './brand/ui';
import { EASE } from './brand/motion';
import useMeta from './brand/useMeta';
import ProcessLine from './brand/ProcessLine';

/* ---------------------------------------------------------------- data --- */

const heroSpecs = [
  { k: 'Capacity', v: '500,000 pcs / month' },
  { k: 'MOQ', v: '2,000 – 50,000+' },
  { k: 'On-time', v: '98%' },
  { k: 'HQ', v: 'London, UK' },
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

const pillars = [
  {
    n: '01',
    title: 'Direct factory access',
    text: 'No broker chain. We work inside our partner factories — including one of Bangladesh’s largest certified manufacturers — so pricing, capacity and quality are known quantities, not promises.',
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
    text: '500,000+ pieces of monthly capacity per factory, with MOQs from 2,000 — room for emerging labels and established retail alike.',
  },
  {
    n: '05',
    title: 'Complete transparency',
    text: 'Live production status, inline QC reports and direct line-level visibility through the Production Portal.',
  },
  {
    n: '06',
    title: 'Compliance as standard',
    text: '15+ international certifications spanning organic content, recycled claims, chemical safety and social audit.',
  },
];

const process = [
  {
    step: '01',
    title: 'Design & consultation',
    text: 'Tech pack review, fabric selection, costing and factory allocation.',
    meta: 'Week 1',
  },
  {
    step: '02',
    title: 'Sample development',
    text: 'Proto, fit and PP samples with written approval at every gate.',
    meta: 'Weeks 2–4',
  },
  {
    step: '03',
    title: 'Production & QC',
    text: 'Bulk manufacturing with inline inspection and 4-point fabric audit.',
    meta: 'Weeks 5–10',
  },
  {
    step: '04',
    title: 'Delivery & support',
    text: 'Final AQL inspection, packing, documentation and global freight.',
    meta: 'Weeks 11–12',
  },
];

const categories = [
  { name: 'Premium Denim', image: '/images/jeans.jpg', spec: 'Rigid · Stretch · Laser wash' },
  { name: 'Casual Outerwear', image: '/images/jacket.jpg', spec: 'Woven · Padded · Shell' },
  { name: 'Contemporary Basics', image: '/images/shirt.jpg', spec: 'Jersey · Rib · Fleece' },
  { name: 'Technical Workwear', image: '/images/construction.jpg', spec: 'EN ISO 20471 · Hi-vis' },
];

/* ---------------------------------------------------------------- page --- */

export default function Home() {
  useMeta({
    title: 'Apparel Manufacturing, Managed from London',
    description: 'WovenTex LTD connects international brands to certified factories producing 500,000 pieces a month — direct factory access, transparent production management and 98% on-time delivery.',
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
      <section ref={heroRef} className="grain relative flex min-h-[100svh] flex-col overflow-hidden bg-ink">
        <motion.div
          className="absolute inset-0"
          style={reduce ? undefined : { y: heroY }}
        >
          <img
            src="/images/background.jpg"
            alt="Hands guiding fabric through an industrial sewing machine"
            className="h-[118%] w-full object-cover object-[70%_center] opacity-100 contrast-[1.05] brightness-[0.92] animate-slow-zoom"
            loading="eager"
            fetchPriority="high"
          />
          {/* Legibility scrim — heaviest at the baseline where the type sits */}
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/55 to-ink/10" />
          <div className="absolute inset-0 bg-gradient-to-r from-ink/90 via-ink/45 to-ink/5" />
          <div className="absolute inset-0 woven woven-dark opacity-40" />
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

          {/* The headline */}
          <WipeHeading
            as="h1"
            immediate
            delay={0.25}
            className="w-condensed text-display-lg font-black uppercase text-paper"
            lines={[
              'Your direct link to',
              'world-class apparel',
              <span key="mfg" className="text-signal">
                manufacturing
              </span>,
            ]}
          />

          <Enter as="p" delay={0.7} className="mt-7 max-w-lg text-base leading-relaxed text-paper/70 lg:text-lg">
            Strategic factory partnerships, transparent production management, and quality
            standards that hold from first sample to final container.
          </Enter>

          <Enter delay={0.85} className="mt-9 flex flex-wrap gap-3">
            <Button to="/contact" tone="signal">
              Let’s talk production
            </Button>
            <Button to="/capabilities" tone="ghost-dark">
              View capabilities
            </Button>
          </Enter>
        </motion.div>

        {/* Spec strip along the bottom of the hero */}
        <Enter delay={1} y={0} className="relative z-10 border-t border-paper/15 bg-ink/50 backdrop-blur-md">
          <dl className="shell grid grid-cols-2 divide-paper/10 py-5 sm:grid-cols-4 sm:divide-x">
            {heroSpecs.map((s, i) => (
              <div key={s.k} className={`px-0 py-2 sm:px-6 ${i === 0 ? 'sm:pl-0' : ''}`}>
                <dt className="mono-label text-paper/40">{s.k}</dt>
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

      {/* ========================================================== FIGURES */}
      <Section tone="paper" className="py-20 lg:py-28">
        <div className="shell">
          <div className="grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            <Stat value="500,000+" label="Pieces / month" note="Per partner factory" />
            <Stat value="15+" label="Certifications" note="GOTS, GRS, BSCI, Sedex" />
            <Stat value="98%" label="On-time delivery" note="Across live programmes" />
            <Stat value="25+" label="Years experience" note="In global apparel" />
          </div>
        </div>
      </Section>

      {/* ========================================================== PILLARS */}
      <Section tone="paper-2" texture className="py-24 lg:py-32">
        <div className="shell">
          <SectionHead
            index="01 / 05"
            label="Why WovenTex"
            title={['Why global brands', 'choose WovenTex']}
            lede="A UK agency with its hands inside the factory. That combination is what makes quality, price and delivery predictable instead of hopeful."
          />

          <Reveal className="mt-16 grid gap-px border border-ink/12 bg-ink/12 sm:grid-cols-2 lg:grid-cols-3" each={0.06}>
            {pillars.map((p) => (
              <RevealItem
                key={p.n}
                className="group relative flex flex-col bg-paper p-8 transition-colors duration-500 ease-brand hover:bg-ink lg:p-10"
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
                <span className="mt-auto pt-8 block h-[2px] w-10 origin-left bg-signal transition-transform duration-500 ease-brand group-hover:scale-x-[2.4]" />
              </RevealItem>
            ))}
          </Reveal>
        </div>
      </Section>

      {/* =================================================== PRODUCTION PORTAL */}
      <section className="grain relative overflow-hidden bg-portal text-paper">
        <div
          className="absolute inset-0 opacity-[0.18]"
          style={{
            backgroundImage:
              'radial-gradient(circle at 78% 18%, rgba(255,255,255,0.5), transparent 55%)',
          }}
          aria-hidden
        />
        <div className="shell relative grid items-center gap-14 py-24 lg:grid-cols-2 lg:py-32">
          <Reveal>
            <RevealItem>
              <div className="flex items-center gap-4 border-t border-paper/25 pt-4">
                <span className="mono-label text-paper/60">02 / 05</span>
                <span className="mono-label text-paper/60">Production Portal</span>
              </div>
            </RevealItem>

            <WipeHeading
              as="h2"
              className="mt-6 w-condensed text-display-sm font-black uppercase"
              lines={['Every order.', 'Every line.', <span key="uc" className="text-signal">Under control.</span>]}
            />

            <RevealItem>
              <p className="mt-6 max-w-lg text-lg leading-relaxed text-paper/75">
                Our own software, built for apparel brands and factories that need real-time
                visibility across orders, lines and deliveries.
              </p>
            </RevealItem>

            <RevealItem>
              <ul className="mt-8 space-y-px">
                {[
                  'Real-time production status',
                  'Fewer delays, fewer surprises',
                  'One source of truth for factories',
                ].map((f) => (
                  <li
                    key={f}
                    className="flex items-center gap-4 border-t border-paper/15 py-4 text-[15px]"
                  >
                    <span className="h-1.5 w-1.5 shrink-0 bg-signal" aria-hidden />
                    {f}
                  </li>
                ))}
              </ul>
            </RevealItem>

            <RevealItem>
              <div className="mt-10 flex flex-wrap gap-3">
                <Button to="/production-portal" tone="signal">
                  Explore the portal
                </Button>
                <Button
                  href="https://productionportal.co"
                  target="_blank"
                  rel="noopener noreferrer"
                  tone="ghost-dark"
                >
                  productionportal.co
                </Button>
              </div>
            </RevealItem>
          </Reveal>

          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1, ease: EASE }}
            className="relative"
          >
            <img
              src="/images/portal-app.jpg"
              alt="Production Portal dashboard on desktop and mobile"
              className="w-full shadow-[0_40px_100px_-20px_rgba(0,0,0,0.6)]"
              loading="lazy"
              decoding="async"
            />
          </motion.div>
        </div>
      </section>

      {/* ========================================================== PROCESS */}
      <ProcessLine
        steps={process}
        index="03 / 05"
        label="How it runs"
        title={['From tech pack', 'to container']}
        lede="A twelve-week rhythm, with a written approval gate at every handover. You always know which stage your order is in."
      />

      {/* ======================================================= CATEGORIES */}
      <Section tone="paper" className="py-24 lg:py-32">
        <div className="shell">
          <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
            <SectionHead
              index="04 / 05"
              label="What we make"
              title={['Manufacturing', 'expertise']}
            />
            <Reveal>
              <RevealItem>
                <Button to="/capabilities" tone="ghost">
                  All categories
                </Button>
              </RevealItem>
            </Reveal>
          </div>

          <Reveal className="mt-16 grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6" each={0.08}>
            {categories.map((c) => (
              <RevealItem key={c.name}>
                <Link to="/capabilities" className="group block">
                  <div className="ticked relative overflow-hidden bg-paper-200">
                    <img
                      src={c.image}
                      alt={c.name}
                      className="aspect-[3/4] w-full object-cover transition-transform duration-[900ms] ease-brand group-hover:scale-105"
                      loading="lazy"
                      decoding="async"
                    />
                    <div className="absolute inset-0 bg-ink/0 transition-colors duration-500 group-hover:bg-ink/15" />
                  </div>
                  <div className="mt-4 border-t border-ink/15 pt-3">
                    <h3 className="w-condensed text-base font-bold uppercase leading-tight lg:text-lg">
                      {c.name}
                    </h3>
                    <p className="mono-label mt-2 text-ink-300">{c.spec}</p>
                  </div>
                </Link>
              </RevealItem>
            ))}
          </Reveal>
        </div>
      </Section>

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
              className="mx-3 border border-ink/20 px-7 py-3 text-sm font-bold uppercase tracking-label text-ink-500"
            >
              {c}
            </span>
          ))}
        </Marquee>
      </Section>

      {/* ============================================================== CTA */}
      <section className="grain relative overflow-hidden bg-ink text-paper">
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
              <span className="mono-label text-signal">05 / 05 — Next step</span>
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
                <Button to="/contact" tone="signal">
                  Request a quote
                </Button>
                <Button to="/clients" tone="ghost-dark">
                  See who we make for
                </Button>
              </div>
            </RevealItem>
          </Reveal>

        </div>
      </section>
    </>
  );
}
