import React from 'react';
import PageHero from './brand/PageHero';
import {
  Reveal,
  RevealItem,
  Section,
  SectionHead,
  SpecRow,
  Stat,
} from './brand/ui';
import { Pill } from './brand/system';
import useMeta from './brand/useMeta';

const values = [
  {
    n: '01',
    title: 'Expert leadership',
    text: 'Decades inside global apparel manufacturing and quality control, from people who have run lines, not just read reports.',
  },
  {
    n: '02',
    title: 'Global reach',
    text: 'Direct factory access with worldwide shipping and the local market knowledge to route each programme correctly.',
  },
  {
    n: '03',
    title: 'Quality assurance',
    text: 'Advanced QC systems and certifications that hold every piece to international standard, not to a claim.',
  },
  {
    n: '04',
    title: 'Trusted partnerships',
    text: 'Long-term relationships built on transparency and reliability, the reason brands stay through repeat seasons.',
  },
];

const gallery = [
  { src: '/images/cutting.jpg', alt: 'Operators laying and cutting fabric', span: 'row-span-2' },
  { src: '/images/machine.jpg', alt: 'Industrial finishing machinery on the floor', span: '' },
  { src: '/images/guys.jpg', alt: 'Production team working a line', span: '' },
];

export default function About() {
  useMeta({
    title: 'About',
    description: 'A London-based apparel sourcing agency with direct access to certified manufacturers in Bangladesh, with 25+ years of experience and 500,000 pieces of monthly capacity.',
    path: '/about',
    image: '/images/factory.jpg',
  });

  return (
    <>
      <PageHero
        eyebrow="About WovenTex LTD"
        title={['A London agency', 'with its hands', 'inside the factory']}
        lede="WovenTex LTD exists to close the distance between an international brand and the floor where its garments are actually made."
        image="/images/factory.jpg"
        imageAlt="Sewing floor of a partner garment factory"
        imagePosition="60% center"
        specs={[
          { k: 'Founded', v: 'London, UK' },
          { k: 'Network', v: 'Bangladesh + partners' },
          { k: 'Capacity', v: '500,000 pcs / month' },
          { k: 'Experience', v: '25+ years' },
        ]}
      />

      {/* ============================================================ STORY */}
      <Section tone="paper" className="py-24 lg:py-32">
        <div className="shell grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <SectionHead
            index="01 / 03"
            label="Our story"
            title={['Built to bridge', 'a gap']}
          />

          <Reveal className="space-y-6 text-lg leading-relaxed text-ink-500">
            <RevealItem as="p">
              WovenTex LTD was founded to bridge the gap between international fashion brands and
              world-class manufacturing facilities. As a UK-based agency, we coordinate production
              through our network of factories, ensuring reliable capacity, certified processes and
              transparent communication.
            </RevealItem>
            <RevealItem as="p">
              Our leadership team’s direct access to production, combined with extensive industry
              experience, lets us deliver exceptional quality, competitive pricing and reliable
              delivery schedules for brands worldwide.
            </RevealItem>
            <RevealItem as="p">
              From our London headquarters we coordinate with global clients while keeping hands-on
              oversight of production, so every garment meets the highest international standards.
            </RevealItem>

            <RevealItem>
              <div className="pt-4">
                <Pill size="lg" to="/contact" tone="ghost">
                  Talk to the team
                </Pill>
              </div>
            </RevealItem>
          </Reveal>
        </div>
      </Section>

      {/* =========================================================== VALUES */}
      <Section tone="paper-2" className="py-24 lg:py-32">
        <div className="shell">
          <SectionHead
            index="02 / 03"
            label="What sets us apart"
            title={['Why brands', 'choose WovenTex']}
            lede="What sets WovenTex apart isn’t only what we offer. It’s how we deliver it."
          />

          <Reveal className="mt-16 grid gap-px border border-ink/12 bg-ink/12 sm:grid-cols-2 lg:grid-cols-4" each={0.07}>
            {values.map((v) => (
              <RevealItem
                key={v.n}
                className="group flex flex-col bg-paper p-8 transition-colors duration-500 ease-brand hover:bg-ink"
              >
                <span className="mono-label text-signal-700 transition-colors duration-500 group-hover:text-signal">
                  {v.n}
                </span>
                <h3 className="mt-6 w-condensed text-xl font-bold uppercase leading-tight transition-colors duration-500 group-hover:text-paper">
                  {v.title}
                </h3>
                <p className="mt-4 text-[15px] leading-relaxed text-ink-400 transition-colors duration-500 group-hover:text-paper/70">
                  {v.text}
                </p>
                <span className="mt-auto block h-[2px] w-10 origin-left bg-signal pt-8 transition-transform duration-500 ease-brand group-hover:scale-x-[2.4]" />
              </RevealItem>
            ))}
          </Reveal>
        </div>
      </Section>

      {/* ========================================================== NETWORK */}
      <Section tone="ink" className="py-24 lg:py-32">
        <div className="shell grid gap-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <SectionHead
              index="03 / 03"
              label="The network"
              tone="dark"
              title={['Our network', 'of factories']}
              lede="Connected facilities give us large-scale capacity with rigorous compliance. We align factory strengths to each programme so efficiency, consistency and delivery hold together."
            />

            <Reveal className="mt-12 grid grid-cols-2 gap-x-10 gap-y-10">
              <RevealItem>
                <Stat value="500,000+" label="Monthly capacity" tone="dark" />
              </RevealItem>
              <RevealItem>
                <Stat value="15+" label="Certifications" tone="dark" />
              </RevealItem>
              <RevealItem>
                <Stat value="50+" label="Global clients" tone="dark" />
              </RevealItem>
              <RevealItem>
                <Stat value="25+" label="Years experience" tone="dark" />
              </RevealItem>
            </Reveal>

            <Reveal className="mt-14">
              <RevealItem>
                <dl>
                  <SpecRow term="Lead time" tone="dark">
                    45–60 days woven · 30–45 days knits · rush schedules on request
                  </SpecRow>
                  <SpecRow term="MOQ" tone="dark">
                    1,500 to 50,000+ pieces per style
                  </SpecRow>
                  <SpecRow term="Fabric sourcing" tone="dark">
                    China, India, Pakistan and local mills
                  </SpecRow>
                </dl>
              </RevealItem>
            </Reveal>
          </div>

          <Reveal className="grid grid-cols-2 gap-3 lg:gap-4" each={0.1}>
            {gallery.map((g) => (
              <RevealItem key={g.src} className={g.span}>
                <div className="ticked h-full overflow-hidden">
                  <img
                    src={g.src}
                    alt={g.alt}
                    className="h-full min-h-[13rem] w-full object-cover transition-transform duration-[900ms] ease-brand hover:scale-105"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </RevealItem>
            ))}
          </Reveal>
        </div>
      </Section>

      {/* ============================================================== CTA */}
      <Section tone="paper" className="border-t border-ink/10 py-20 lg:py-24">
        <div className="shell flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
          <h2 className="w-condensed max-w-xl text-display-sm font-black uppercase leading-none">
            Want to see what we could make for you?
          </h2>
          <div className="flex flex-wrap gap-3">
            <Pill size="lg" to="/capabilities" tone="ink">
              View capabilities
            </Pill>
            <Pill size="lg" to="/contact" tone="signal">
              Request a quote
            </Pill>
          </div>
        </div>
      </Section>
    </>
  );
}
