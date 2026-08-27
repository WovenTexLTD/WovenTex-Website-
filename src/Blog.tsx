import React from 'react';
import PageHero from './brand/PageHero';
import { Reveal, RevealItem, Section } from './brand/ui';

type Post = {
  title: string;
  date: string;
  iso: string;
  href: string;
  image: string;
  topic: string;
  excerpt: string;
};

const posts: Post[] = [
  {
    title: 'Blockchain & supply chain transparency: building trust in textiles',
    date: '15 January 2026',
    iso: '2026-01-15',
    href: '/blog/Blockchain.html',
    image: '/images/Linkedin Post 29122025.png',
    topic: 'Traceability',
    excerpt:
      'Distributed ledgers are moving from pilot to procurement requirement. What that means for suppliers who have to prove provenance.',
  },
  {
    title: 'How ethical compliance became a dealbreaker for global buyers',
    date: '22 December 2025',
    iso: '2025-12-22',
    href: '/images/ethicalcomp.html',
    image: '/images/fibers.jpg',
    topic: 'Compliance',
    excerpt:
      'Social audit results now sit alongside price and lead time in the buying decision. The bar has moved, and it is not moving back.',
  },
  {
    title: 'The rise of Digital Product Passports — and why brands must prepare now',
    date: '15 December 2025',
    iso: '2025-12-15',
    href: '/blog/DPP.html',
    image: '/images/dpp.jpg',
    topic: 'Regulation',
    excerpt:
      'EU legislation will require a data record for every garment placed on the market. Preparation starts at the tech pack.',
  },
  {
    title: 'How denim is leading the sustainability transition',
    date: '8 December 2025',
    iso: '2025-12-08',
    href: '/blog/denimblog.html',
    image: '/images/denim.jpg',
    topic: 'Materials',
    excerpt:
      'The most water-intensive category in apparel has become its most inventive. Laser, ozone and closed-loop finishing explained.',
  },
  {
    title: 'Why recycled fibres are the new mainstream',
    date: '1 December 2025',
    iso: '2025-12-01',
    href: '/blog/fibers.html',
    image: '/images/ethicalcomp.jpg',
    topic: 'Materials',
    excerpt:
      'GRS-certified recycled content has crossed from marketing claim to default specification across mid-market retail.',
  },
];

export default function Blog() {
  const [lead, ...rest] = posts;

  return (
    <>
      <PageHero
        eyebrow="The WovenTex journal"
        title={['From the floor', 'to the boardroom']}
        lede="Perspective on sourcing, manufacturing and supply chain strategy for modern apparel brands."
        image="/images/blogheader.png"
        imageAlt=""
        imagePosition="50% 40%"
      />

      {/* ============================================================ LEAD */}
      <Section tone="paper" className="py-20 lg:py-24">
        <div className="shell">
          <Reveal>
            <RevealItem>
              <a href={lead.href} className="group grid gap-8 lg:grid-cols-2 lg:gap-14">
                <div className="ticked order-1 overflow-hidden bg-paper-200 lg:order-2">
                  <img
                    src={lead.image}
                    alt=""
                    className="aspect-[16/10] w-full object-cover transition-transform duration-[900ms] ease-brand group-hover:scale-105"
                    loading="eager"
                  />
                </div>

                <div className="order-2 flex flex-col justify-center lg:order-1">
                  <div className="flex items-center gap-4 border-t border-ink/15 pt-4">
                    <span className="mono-label text-signal-700">Latest</span>
                    <span className="mono-label text-ink-300">{lead.topic}</span>
                  </div>
                  <h2 className="mt-6 w-condensed text-display-sm font-black uppercase leading-none transition-colors duration-300 group-hover:text-signal-700">
                    {lead.title}
                  </h2>
                  <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-400">
                    {lead.excerpt}
                  </p>
                  <div className="mt-8 flex items-center gap-4">
                    <time dateTime={lead.iso} className="mono-label text-ink-300">
                      {lead.date}
                    </time>
                    <span className="mono-label text-ink transition-transform duration-300 ease-brand group-hover:translate-x-1">
                      Read article →
                    </span>
                  </div>
                </div>
              </a>
            </RevealItem>
          </Reveal>
        </div>
      </Section>

      {/* ========================================================= ARCHIVE */}
      <Section tone="paper-2" texture className="py-20 lg:py-28">
        <div className="shell">
          <div className="flex items-center gap-4 border-t border-ink/15 pt-4">
            <span className="mono-label text-ink-400">More articles</span>
            <span className="mono-label ml-auto text-ink-300">{rest.length} posts</span>
          </div>

          <Reveal className="mt-12 grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-4" each={0.07}>
            {rest.map((p) => (
              <RevealItem key={p.href}>
                <a href={p.href} className="group flex h-full flex-col">
                  <div className="ticked overflow-hidden bg-paper">
                    <img
                      src={p.image}
                      alt=""
                      className="aspect-[4/3] w-full object-cover transition-transform duration-[900ms] ease-brand group-hover:scale-105"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  <div className="mt-4 flex flex-1 flex-col border-t border-ink/15 pt-3">
                    <span className="mono-label text-signal-700">{p.topic}</span>
                    <h3 className="mt-3 w-condensed text-lg font-bold uppercase leading-tight transition-colors duration-300 group-hover:text-signal-700">
                      {p.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-ink-400">{p.excerpt}</p>
                    <time dateTime={p.iso} className="mono-label mt-auto pt-5 text-ink-300">
                      {p.date}
                    </time>
                  </div>
                </a>
              </RevealItem>
            ))}
          </Reveal>
        </div>
      </Section>
    </>
  );
}
