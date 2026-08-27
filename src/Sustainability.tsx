import React from 'react';
import PageHero from './brand/PageHero';
import { Button, Counter, Reveal, RevealItem, Section, SectionHead, SpecRow } from './brand/ui';
import useMeta from './brand/useMeta';

const initiatives = [
  {
    n: '01',
    title: 'Organic materials',
    text: 'GOTS certified organic cotton and natural fibre sourcing with full traceability.',
    impact: '60% organic content across product lines',
  },
  {
    n: '02',
    title: 'Recycled content',
    text: 'GRS and RCS certified recycled polyester and regenerated fibre programmes.',
    impact: '40% recycled materials integration',
  },
  {
    n: '03',
    title: 'Water conservation',
    text: 'Advanced treatment and recycling systems cutting consumption by half.',
    impact: '2.5M litres saved annually',
  },
  {
    n: '04',
    title: 'Fair labour',
    text: 'BSCI and Sedex verified working conditions and fair wage standards.',
    impact: '5,000+ workers benefited',
  },
  {
    n: '05',
    title: 'Worker welfare',
    text: 'Healthcare, education and skill development programmes for all employees.',
    impact: '100% healthcare coverage',
  },
  {
    n: '06',
    title: 'Chemical safety',
    text: 'OEKO-TEX certified chemical management and worker safety protocols.',
    impact: 'Zero harmful chemicals',
  },
];

const metrics = [
  { label: 'Carbon footprint reduction', value: '35%', dir: 'down' as const },
  { label: 'Renewable energy usage', value: '80%', dir: 'up' as const },
  { label: 'Waste diversion rate', value: '95%', dir: 'up' as const },
  { label: 'Water usage efficiency', value: '50%', dir: 'down' as const },
];

const sdgGoals = [
  { number: 3, title: 'Good health and well-being', description: 'Safe working conditions and healthcare access.' },
  { number: 6, title: 'Clean water and sanitation', description: 'Water treatment and conservation systems.' },
  { number: 8, title: 'Decent work and growth', description: 'Fair wages and skill development programmes.' },
  { number: 12, title: 'Responsible consumption', description: 'Sustainable materials and circular practices.' },
  { number: 13, title: 'Climate action', description: 'Carbon reduction and renewable energy initiatives.' },
  { number: 15, title: 'Life on land', description: 'Organic farming support and biodiversity protection.' },
];

export default function Sustainability() {
  useMeta({
    title: 'Sustainability & Ethics',
    description: '60% organic content, 40% recycled materials, 80% renewable energy and 95% waste diversion — measured, audited and aligned to six UN Sustainable Development Goals.',
    path: '/sustainability',
    image: '/images/fibers.jpg',
  });

  return (
    <>
      <PageHero
        eyebrow="Sustainability & ethics"
        title={['Made with', 'integrity']}
        lede="Manufacturing with integrity through ethical labour practices, environmental responsibility and sustainable material choices — measured, audited and published."
        image="/images/fibers.jpg"
        imageAlt="Raw natural fibre before spinning"
        imagePosition="50% 50%"
        specs={[
          { k: 'Organic content', v: '60% of lines' },
          { k: 'Recycled content', v: '40% integration' },
          { k: 'Renewable energy', v: '80% of usage' },
          { k: 'Waste diverted', v: '95%' },
        ]}
      />

      {/* ===================================================== INITIATIVES */}
      <Section tone="paper" className="py-24 lg:py-32">
        <div className="shell">
          <SectionHead
            index="01 / 04"
            label="Initiatives"
            title={['Programmes with', 'numbers attached']}
            lede="Six programmes addressing environmental impact, social responsibility and ethical manufacturing — each with a figure we hold ourselves to."
          />

          <Reveal className="mt-16 grid gap-px border border-ink/12 bg-ink/12 sm:grid-cols-2 lg:grid-cols-3" each={0.06}>
            {initiatives.map((i) => (
              <RevealItem
                key={i.n}
                className="group flex flex-col bg-paper p-8 transition-colors duration-500 ease-brand hover:bg-ink lg:p-10"
              >
                <span className="mono-label text-signal-700 transition-colors duration-500 group-hover:text-signal">
                  {i.n}
                </span>
                <h3 className="mt-6 w-condensed text-2xl font-bold uppercase leading-tight transition-colors duration-500 group-hover:text-paper">
                  {i.title}
                </h3>
                <p className="mt-4 text-[15px] leading-relaxed text-ink-400 transition-colors duration-500 group-hover:text-paper/70">
                  {i.text}
                </p>
                <p className="mono-label mt-auto border-l-2 border-signal pl-4 pt-8 text-ink-500 transition-colors duration-500 group-hover:text-signal">
                  {i.impact}
                </p>
              </RevealItem>
            ))}
          </Reveal>
        </div>
      </Section>

      {/* ========================================================= METRICS */}
      <Section tone="ink" texture className="py-24 lg:py-32">
        <div className="shell">
          <SectionHead
            index="02 / 04"
            label="Environmental performance"
            tone="dark"
            title={['Measurable', 'progress']}
          />

          <Reveal className="mt-16 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-4" each={0.08}>
            {metrics.map((m) => (
              <RevealItem key={m.label} className="border-t border-paper/20 pt-5">
                <Counter
                  value={m.value}
                  className="block w-condensed text-5xl font-black leading-none text-signal lg:text-6xl"
                />
                <div className="mono-label mt-4 text-paper/60">{m.label}</div>
                <div className="mono-label mt-2 text-paper/35">
                  {m.dir === 'down' ? '↓ Reduced' : '↑ Improved'}
                </div>
              </RevealItem>
            ))}
          </Reveal>
        </div>
      </Section>

      {/* ======================================================== FACILITY */}
      <Section tone="paper-2" className="py-24 lg:py-32">
        <div className="shell grid gap-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <SectionHead
              index="03 / 04"
              label="The facility"
              title={['Built for the', 'people in it']}
            />
            <Reveal className="mt-12">
              <RevealItem>
                <dl>
                  <SpecRow term="Production floor">
                    Ventilation systems, natural lighting and ergonomic workstations that support
                    comfort and productivity while cutting environmental load.
                  </SpecRow>
                  <SpecRow term="Worker welfare">
                    On-site medical clinic, cafeteria, prayer rooms, childcare and recreation areas.
                  </SpecRow>
                  <SpecRow term="Environmental controls">
                    Water treatment, solar installation, waste segregation and chemical-free
                    processing zones.
                  </SpecRow>
                </dl>
              </RevealItem>
            </Reveal>
          </div>

          <Reveal className="lg:pt-10">
            <RevealItem>
              <div className="ticked overflow-hidden">
                <img
                  src="/images/machine.jpg"
                  alt="Clean, well-lit production environment"
                  className="h-full w-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </RevealItem>
          </Reveal>
        </div>
      </Section>

      {/* ============================================================= SDG */}
      <Section tone="paper" className="py-24 lg:py-32">
        <div className="shell">
          <SectionHead
            index="04 / 04"
            label="UN Sustainable Development Goals"
            title={['Aligned to six', 'global goals']}
          />

          <Reveal className="mt-16 grid gap-px border border-ink/12 bg-ink/12 sm:grid-cols-2 lg:grid-cols-3" each={0.05}>
            {sdgGoals.map((g) => (
              <RevealItem key={g.number} className="flex gap-5 bg-paper p-8">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center bg-signal">
                  <span className="w-condensed text-xl font-black leading-none text-ink">
                    {String(g.number).padStart(2, '0')}
                  </span>
                </span>
                <div>
                  <h3 className="w-condensed text-lg font-bold uppercase leading-tight">
                    {g.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-400">{g.description}</p>
                </div>
              </RevealItem>
            ))}
          </Reveal>
        </div>
      </Section>

      {/* ============================================================== CTA */}
      <Section tone="paper-2" className="border-t border-ink/10 py-20 lg:py-24">
        <div className="shell flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
          <h2 className="w-condensed max-w-xl text-display-sm font-black uppercase leading-none">
            Building a responsible supply chain?
          </h2>
          <div className="flex flex-wrap gap-3">
            <Button to="/certifications" tone="ghost">
              See certifications
            </Button>
            <Button to="/contact" tone="signal">
              Talk to us
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}
