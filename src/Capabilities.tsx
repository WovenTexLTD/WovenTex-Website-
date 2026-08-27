import React from 'react';
import PageHero from './brand/PageHero';
import { Button, Reveal, RevealItem, Section, SectionHead, SpecRow, Stat } from './brand/ui';

const products = [
  {
    title: 'Denim',
    image: '/images/jeans.jpg',
    spec: 'Rigid · Stretch · Selvedge',
    description: 'Jeans, jackets and shirting with laser, ozone and enzyme wash programmes.',
  },
  {
    title: 'T-shirts & Basics',
    image: '/images/shirt.jpg',
    spec: 'Jersey · Rib · Interlock',
    description: 'Knit basics, graphic tees and premium cotton essentials at volume.',
  },
  {
    title: 'Jackets & Outerwear',
    image: '/images/jacket.jpg',
    spec: 'Woven · Bonded · Shell',
    description: 'Tailored blazers, casual jackets and technical outerwear for all seasons.',
  },
  {
    title: 'Puffer Jackets',
    image: '/images/puffer.jpg',
    spec: 'Down · Synthetic fill',
    description: 'Insulated outerwear with baffle construction and fill-power control.',
  },
  {
    title: 'Activewear',
    image: '/images/sport.jpg',
    spec: 'Moisture-wick · 4-way stretch',
    description: 'Performance sportswear with bonded seams and technical finishes.',
  },
  {
    title: 'Workwear',
    image: '/images/construction.jpg',
    spec: 'EN ISO 20471 · Hi-vis',
    description: 'Durable industrial and corporate uniforms with certified safety features.',
  },
  {
    title: 'Courier Apparel',
    image: '/images/bag.jpg',
    spec: 'Ripstop · Reinforced',
    description: 'Delivery uniforms built for durability, comfort and brand visibility.',
  },
  {
    title: 'Swimwear',
    image: '/images/swim.jpg',
    spec: 'UPF 50+ · Quick-dry',
    description: 'Performance swimwear and beachwear with chlorine-resistant finishes.',
  },
];

const capabilities = [
  {
    n: '01',
    title: 'Production capacity',
    text: '500,000 pieces per month across scalable lines, with capacity reserved ahead of each season.',
  },
  {
    n: '02',
    title: 'Quality control',
    text: 'Inline inspection, 4-point fabric audit and final AQL sign-off before anything is packed.',
  },
  {
    n: '03',
    title: 'Fabric sourcing',
    text: 'A mill network spanning China, India, Pakistan and local suppliers, matched to price and hand-feel.',
  },
  {
    n: '04',
    title: 'Flexible MOQs',
    text: 'From 2,000 to 50,000+ pieces per style, so a first drop and a national rollout both fit.',
  },
];

export default function Capabilities() {
  return (
    <>
      <PageHero
        eyebrow="Manufacturing capabilities"
        title={['Everything we', 'can build for you']}
        lede="Comprehensive apparel manufacturing through our network of certified factories — world-class quality, capacity and flexibility across eight product families."
        image="/images/machine.jpg"
        imageAlt="Technical finishing equipment on the production floor"
        imagePosition="50% 40%"
        specs={[
          { k: 'Categories', v: '8 product families' },
          { k: 'Capacity', v: '500,000 pcs / month' },
          { k: 'MOQ', v: 'From 2,000 pcs' },
          { k: 'Lead time', v: '30–60 days' },
        ]}
      />

      {/* ===================================================== CORE ABILITY */}
      <Section tone="paper" className="py-24 lg:py-32">
        <div className="shell">
          <SectionHead
            index="01 / 03"
            label="Core capabilities"
            title={['Built for', 'brand standards']}
            lede="Four things every programme depends on, held to the same specification each season."
          />

          <Reveal className="mt-16 grid gap-px border border-ink/12 bg-ink/12 sm:grid-cols-2 lg:grid-cols-4" each={0.07}>
            {capabilities.map((c) => (
              <RevealItem
                key={c.n}
                className="group flex flex-col bg-paper p-8 transition-colors duration-500 ease-brand hover:bg-ink"
              >
                <span className="mono-label text-signal-700 transition-colors duration-500 group-hover:text-signal">
                  {c.n}
                </span>
                <h3 className="mt-6 w-condensed text-xl font-bold uppercase leading-tight transition-colors duration-500 group-hover:text-paper">
                  {c.title}
                </h3>
                <p className="mt-4 text-[15px] leading-relaxed text-ink-400 transition-colors duration-500 group-hover:text-paper/70">
                  {c.text}
                </p>
                <span className="mt-auto block h-[2px] w-10 origin-left bg-signal pt-8 transition-transform duration-500 ease-brand group-hover:scale-x-[2.4]" />
              </RevealItem>
            ))}
          </Reveal>
        </div>
      </Section>

      {/* ========================================================= PRODUCTS */}
      <Section tone="paper-2" texture className="py-24 lg:py-32">
        <div className="shell">
          <SectionHead
            index="02 / 03"
            label="Product categories"
            title={['Eight families,', 'one standard']}
          />

          <Reveal className="mt-16 grid grid-cols-2 gap-x-4 gap-y-10 lg:grid-cols-4 lg:gap-x-6" each={0.06}>
            {products.map((p) => (
              <RevealItem key={p.title} className="group">
                <div className="ticked relative overflow-hidden bg-paper">
                  <img
                    src={p.image}
                    alt={p.title}
                    className="aspect-[3/4] w-full object-cover transition-transform duration-[900ms] ease-brand group-hover:scale-105"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div className="mt-4 border-t border-ink/15 pt-3">
                  <h3 className="w-condensed text-base font-bold uppercase leading-tight lg:text-lg">
                    {p.title}
                  </h3>
                  <p className="mono-label mt-2 text-signal-700">{p.spec}</p>
                  <p className="mt-3 text-sm leading-relaxed text-ink-400">{p.description}</p>
                </div>
              </RevealItem>
            ))}
          </Reveal>
        </div>
      </Section>

      {/* ======================================================== TECHNICAL */}
      <Section tone="ink" className="py-24 lg:py-32">
        <div className="shell grid gap-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <SectionHead
              index="03 / 03"
              label="Technical excellence"
              tone="dark"
              title={['The specification', 'behind the seam']}
            />

            <Reveal className="mt-12">
              <RevealItem>
                <dl>
                  <SpecRow term="Equipment" tone="dark">
                    JUKI and Brother machinery with automated cutting systems for precision and
                    repeatability at volume.
                  </SpecRow>
                  <SpecRow term="Quality systems" tone="dark">
                    ISO 9001 certified quality management, 4-point inspection, in-house fabric
                    testing laboratory and final audit protocols.
                  </SpecRow>
                  <SpecRow term="Lead times" tone="dark">
                    45–60 days for woven garments, 30–45 days for knits, with rush orders
                    accommodated where capacity allows.
                  </SpecRow>
                  <SpecRow term="Sampling" tone="dark">
                    Proto, fit and PP samples with written approval at each gate before bulk.
                  </SpecRow>
                </dl>
              </RevealItem>
            </Reveal>

            <Reveal className="mt-12 grid grid-cols-2 gap-x-10 gap-y-10">
              <RevealItem>
                <Stat value="4" label="Point fabric audit" tone="dark" />
              </RevealItem>
              <RevealItem>
                <Stat value="98%" label="On-time delivery" tone="dark" />
              </RevealItem>
            </Reveal>
          </div>

          <Reveal className="lg:pt-10">
            <RevealItem>
              <div className="ticked overflow-hidden">
                <img
                  src="/images/cutting.jpg"
                  alt="Cutting room laying and marking fabric"
                  className="h-full w-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </RevealItem>
          </Reveal>
        </div>
      </Section>

      {/* ============================================================== CTA */}
      <Section tone="paper" className="border-t border-ink/10 py-20 lg:py-24">
        <div className="shell flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
          <h2 className="w-condensed max-w-xl text-display-sm font-black uppercase leading-none">
            Send a tech pack. Get a costed quote in 24 hours.
          </h2>
          <div className="flex flex-wrap gap-3">
            <Button to="/certifications" tone="ghost">
              Certifications
            </Button>
            <Button to="/contact" tone="signal">
              Request a quote
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}
