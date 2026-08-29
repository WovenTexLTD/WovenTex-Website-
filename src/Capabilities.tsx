import React from 'react';
import PageHero from './brand/PageHero';
import { Reveal, RevealItem, Section, SectionHead, SpecRow, Stat } from './brand/ui';
import { Pill } from './brand/system';
import useMeta from './brand/useMeta';

const ranges = [
  {
    n: '01',
    title: 'Denim',
    spec: 'Rigid · Stretch · Selvedge',
    description:
      'Jeans, jackets, shirting and shorts, with laser, ozone and enzyme wash programmes run in house.',
    /* Tops first, then bottoms, the order holds within every range, so the
       grid reads the same way down the page regardless of family. */
    items: [
      { name: 'Trucker jacket', image: '/images/products/denim-jacket.jpg' },
      { name: 'Fitted denim shirt', image: '/images/products/denim-shirt.jpg' },
      { name: 'Sleeveless peplum top', image: '/images/products/denim-top.jpg' },
      { name: 'Slim jean, grey wash', image: '/images/products/denim-jeans.jpg' },
      { name: 'Wide short, rinse', image: '/images/products/denim-shorts-wide.jpg' },
      { name: 'Cargo short', image: '/images/products/denim-shorts-cargo.jpg' },
      { name: 'Five-pocket short', image: '/images/products/denim-shorts.jpg' },
    ],
  },
  {
    n: '02',
    title: 'Puffers & padded outerwear',
    spec: 'Down · Synthetic fill',
    description:
      'Insulated outerwear with baffle construction, fill-power control and water-repellent finishes.',
    items: [
      { name: 'Gloss hooded puffer', image: '/images/products/puffer-gloss.jpg' },
      { name: 'Hooded puffer, matte', image: '/images/products/puffer-hooded.jpg' },
      { name: 'Down hooded jacket', image: '/images/products/puffer-navy.jpg' },
      { name: 'Longline hooded coat', image: '/images/products/puffer-longline.jpg' },
      { name: 'Padded bomber', image: '/images/products/padded-bomber.jpg' },
    ],
  },
  {
    n: '03',
    title: 'Knitwear',
    spec: 'Cable · Rib · Quarter-zip',
    description:
      'Cut-and-sew and fully fashioned knits in cotton, wool and blended yarns, from fine gauge to chunky.',
    items: [
      { name: 'Cable crew neck', image: '/images/products/knit-cable.jpg' },
      { name: 'Button-through cardigan', image: '/images/products/knit-cardigan.jpg' },
      { name: 'Quarter-zip sweater', image: '/images/products/knit-quarter-zip.jpg' },
    ],
  },
  {
    n: '04',
    title: 'T-shirts, tops & blouses',
    spec: 'Jersey · Rib · Poplin',
    description:
      'Knit basics, graphic tees and woven blouses in premium cotton, at volume and to a fixed hand feel.',
    items: [
      { name: 'Crew neck t-shirt', image: '/images/products/tee-crew.jpg' },
      { name: 'Rib mock-neck top', image: '/images/products/mock-neck-top.jpg' },
      { name: 'Puff-sleeve blouse', image: '/images/products/blouse-puff-sleeve.jpg' },
    ],
  },
  {
    n: '05',
    title: 'Trousers & chinos',
    spec: 'Twill · Cargo · Tapered',
    description:
      'Cotton twill and blended trousers and shorts, with utility pocketing and garment-dye options.',
    items: [
      { name: 'Utility chino', image: '/images/products/chino-trouser.jpg' },
      { name: 'Chino short', image: '/images/products/chino-shorts.jpg' },
    ],
  },
  {
    n: '06',
    title: 'Activewear & swim',
    spec: 'Moisture-wick · Quick-dry',
    description:
      'Performance pieces with bonded seams, technical finishes and chlorine-resistant swim fabrics.',
    items: [
      { name: 'Technical gilet', image: '/images/products/technical-gilet.jpg' },
      { name: 'Jersey training short', image: '/images/products/jersey-shorts.jpg' },
      { name: 'Swim short', image: '/images/products/swim-shorts.jpg' },
    ],
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
    text: 'From 1,500 to 50,000+ pieces per style, so a first drop and a national rollout both fit.',
  },
];

export default function Capabilities() {
  useMeta({
    title: 'Manufacturing Capabilities',
    description: 'Denim, knitwear, puffers and padded outerwear, tops, trousers, activewear and swimwear. 500,000 pieces monthly, MOQs from 1,500, 30–60 day lead times.',
    path: '/capabilities',
    image: '/images/machine.jpg',
  });

  return (
    <>
      <PageHero
        eyebrow="Manufacturing capabilities"
        title={['Everything we', 'can build for you']}
        lede="Comprehensive apparel manufacturing through our network of certified factories: world-class quality, capacity and flexibility across six product families."
        image="/images/machine.jpg"
        imageAlt="Technical finishing equipment on the production floor"
        imagePosition="50% 40%"
        specs={[
          { k: 'Categories', v: '6 product families' },
          { k: 'Capacity', v: '500,000 pcs / month' },
          { k: 'MOQ', v: 'From 1,500 pcs' },
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
      <Section tone="paper-2" className="py-24 lg:py-32">
        <div className="shell">
          <SectionHead
            index="02 / 03"
            label="Product categories"
            title={['Six families,', 'one standard']}
            lede="Every piece below is made across the same network, to the same QC protocol and the same delivery discipline."
          />

          {/* Grouped rather than one flat grid: the range is the unit a buyer
              thinks in, and it lets each family show its actual spread of
              silhouettes instead of a single representative photograph. */}
          <div className="mt-16 space-y-16 lg:space-y-20">
            {ranges.map((r) => (
              <div key={r.title}>
                <div className="flex flex-wrap items-baseline gap-x-5 gap-y-2 border-t border-ink/15 pt-5">
                  <span className="mono-label text-signal-700">{r.n}</span>
                  <h3 className="w-condensed text-2xl font-bold uppercase leading-tight lg:text-3xl">
                    {r.title}
                  </h3>
                  <span className="mono-label text-ink-300">{r.spec}</span>
                </div>
                <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-ink-400">
                  {r.description}
                </p>

                <Reveal
                  className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 lg:gap-6"
                  each={0.05}
                >
                  {r.items.map((it) => (
                    <RevealItem key={it.image} className="group">
                      <div className="overflow-hidden rounded-4xl bg-paper">
                        <img
                          src={it.image}
                          alt={`${it.name}, ${r.title}`}
                          /* The product shots are shot 4:5, so this crops
                             nothing off a hem or a collar. */
                          className="aspect-[4/5] w-full object-cover transition-transform duration-[900ms] ease-brand group-hover:scale-105"
                          loading="lazy"
                          decoding="async"
                        />
                      </div>
                      <p className="mt-3 text-[13px] font-medium text-ink-500">{it.name}</p>
                    </RevealItem>
                  ))}
                </Reveal>
              </div>
            ))}
          </div>
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
            <Pill size="lg" to="/certifications" tone="ghost">
              Certifications
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
