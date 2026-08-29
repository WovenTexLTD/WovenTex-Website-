import React from 'react';
import PageHero from './brand/PageHero';
import { Reveal, RevealItem, Section, SectionHead, SpecRow } from './brand/ui';
import { Pill } from './brand/system';
import useMeta from './brand/useMeta';

type Cert = {
  name: string;
  fullName: string;
  description: string;
  scope: string;
  certNumber: string;
  group: 'Environment' | 'Social' | 'Product' | 'Quality';
};

const certifications: Cert[] = [
  {
    name: 'GOTS',
    fullName: 'Global Organic Textile Standard',
    description: 'Ensures organic fibre content and environmental criteria throughout the supply chain.',
    scope: 'Organic cotton processing and manufacturing',
    certNumber: 'GOTS-2024-BD-001',
    group: 'Environment',
  },
  {
    name: 'GRS',
    fullName: 'Global Recycled Standard',
    description: 'Verifies recycled content and responsible supply chain practices.',
    scope: 'Recycled polyester and fibre processing',
    certNumber: 'GRS-2024-BD-002',
    group: 'Environment',
  },
  {
    name: 'RCS',
    fullName: 'Recycled Claim Standard',
    description: 'Tracks and verifies recycled raw material content in finished products.',
    scope: 'Recycled material verification',
    certNumber: 'RCS-2024-BD-003',
    group: 'Environment',
  },
  {
    name: 'BSCI',
    fullName: 'Business Social Compliance Initiative',
    description: 'Ensures ethical working conditions and social compliance standards.',
    scope: 'Labour practices and worker rights',
    certNumber: 'BSCI-2024-BD-004',
    group: 'Social',
  },
  {
    name: 'Sedex',
    fullName: 'Supplier Ethical Data Exchange',
    description: 'Promotes responsible business practices across global supply chains.',
    scope: 'Ethical trade and supply chain transparency',
    certNumber: 'SEDEX-2024-BD-005',
    group: 'Social',
  },
  {
    name: 'WRAP',
    fullName: 'Worldwide Responsible Accredited Production',
    description: 'Certification for safe, lawful, humane and ethical manufacturing.',
    scope: 'Manufacturing facility certification',
    certNumber: 'WRAP-2024-BD-009',
    group: 'Social',
  },
  {
    name: 'OEKO-TEX',
    fullName: 'OEKO-TEX Standard 100',
    description: 'Tests for harmful substances and ensures textile safety for the wearer.',
    scope: 'Chemical safety and textile testing',
    certNumber: 'OEKO-2024-BD-006',
    group: 'Product',
  },
  {
    name: 'ISO 9001',
    fullName: 'Quality Management System',
    description: 'International standard for quality management systems.',
    scope: 'Quality management and continuous improvement',
    certNumber: 'ISO-9001-2024-BD-007',
    group: 'Quality',
  },
  {
    name: 'ISO 14001',
    fullName: 'Environmental Management System',
    description: 'Framework for environmental management and sustainability.',
    scope: 'Environmental impact management',
    certNumber: 'ISO-14001-2024-BD-008',
    group: 'Environment',
  },
];

const complianceAreas = [
  {
    n: '01',
    title: 'Environmental standards',
    description: 'Water treatment, energy efficiency and waste reduction across every facility.',
    certifications: ['GOTS', 'GRS', 'ISO 14001'],
  },
  {
    n: '02',
    title: 'Social compliance',
    description: 'Ethical labour practices, fair wages, safe conditions and worker-rights protection.',
    certifications: ['BSCI', 'Sedex', 'WRAP'],
  },
  {
    n: '03',
    title: 'Product safety',
    description: 'Chemical testing, material safety and quality assurance for consumer protection.',
    certifications: ['OEKO-TEX', 'ISO 9001'],
  },
  {
    n: '04',
    title: 'Sustainable materials',
    description: 'Organic and recycled content verification with full supply chain traceability.',
    certifications: ['GOTS', 'GRS', 'RCS'],
  },
];

export default function Certifications() {
  useMeta({
    title: 'Certifications & Compliance',
    description: 'GOTS, GRS, RCS, BSCI, Sedex, OEKO-TEX, WRAP, ISO 9001 and ISO 14001. 15+ international certifications with quarterly third-party audits.',
    path: '/certifications',
    image: '/images/hands.jpg',
  });

  return (
    <>
      <PageHero
        eyebrow="Certifications & compliance"
        title={['Audited,', 'not asserted']}
        lede="Our network of factories holds the highest international standards through comprehensive certification and continuous compliance monitoring."
        image="/images/hands.jpg"
        imageAlt="Close inspection of finished fabric"
        imagePosition="50% 45%"
        specs={[
          { k: 'Certifications', v: '15+ international' },
          { k: 'Audit cycle', v: 'Quarterly, third-party' },
          { k: 'Coverage', v: 'Environment · Social · Product' },
          { k: 'Renewal', v: 'Annual' },
        ]}
      />

      {/* ==================================================== CERT REGISTER */}
      <Section tone="paper" className="py-24 lg:py-32">
        <div className="shell">
          <SectionHead
            index="01 / 03"
            label="The register"
            title={['International', 'certifications']}
            lede="Verified compliance with global standards for quality, sustainability and ethical manufacturing. Certificate references are available on request."
          />

          <Reveal className="mt-16 border-t border-ink/15" each={0.05}>
            {certifications.map((c) => (
              <RevealItem
                key={c.name}
                className="group grid grid-cols-1 gap-4 border-b border-ink/12 py-7 transition-colors duration-300 hover:bg-paper-200 md:grid-cols-[8rem_1fr_auto] md:items-start md:gap-8"
              >
                <div className="flex items-baseline gap-3 md:block">
                  <span className="w-condensed text-2xl font-black uppercase leading-none transition-colors duration-300 group-hover:text-signal-700">
                    {c.name}
                  </span>
                  <span className="mono-label mt-2 block text-ink-300">{c.group}</span>
                </div>

                <div>
                  <h3 className="text-base font-semibold text-ink">{c.fullName}</h3>
                  <p className="mt-2 max-w-2xl text-[15px] leading-relaxed text-ink-400">
                    {c.description}
                  </p>
                  <p className="mono-label mt-3 text-ink-300">Scope · {c.scope}</p>
                </div>

                <div className="mono-label text-ink-300 md:text-right">{c.certNumber}</div>
              </RevealItem>
            ))}
          </Reveal>
        </div>
      </Section>

      {/* ==================================================== COMPLIANCE AREAS */}
      <Section tone="paper-2" className="py-24 lg:py-32">
        <div className="shell">
          <SectionHead
            index="02 / 03"
            label="Compliance areas"
            title={['Four fronts,', 'covered']}
          />

          <Reveal className="mt-16 grid gap-px border border-ink/12 bg-ink/12 sm:grid-cols-2" each={0.07}>
            {complianceAreas.map((a) => (
              <RevealItem key={a.n} className="flex flex-col bg-paper p-8 lg:p-10">
                <span className="mono-label text-signal-700">{a.n}</span>
                <h3 className="mt-6 w-condensed text-2xl font-bold uppercase leading-tight">
                  {a.title}
                </h3>
                <p className="mt-4 text-[15px] leading-relaxed text-ink-400">{a.description}</p>
                <div className="mt-auto flex flex-wrap gap-2 pt-8">
                  {a.certifications.map((c) => (
                    <span
                      key={c}
                      className="mono-label border border-ink/20 px-3 py-1.5 text-ink-500"
                    >
                      {c}
                    </span>
                  ))}
                </div>
              </RevealItem>
            ))}
          </Reveal>
        </div>
      </Section>

      {/* ======================================================= MONITORING */}
      <Section tone="ink" className="py-24 lg:py-32">
        <div className="shell grid gap-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <SectionHead
              index="03 / 03"
              label="Continuous monitoring"
              tone="dark"
              title={['Compliance is', 'a schedule,', 'not a badge']}
            />

            <Reveal className="mt-12">
              <RevealItem>
                <dl>
                  <SpecRow term="Regular audits" tone="dark">
                    Quarterly third-party audits and annual certification renewals keep every
                    standard current rather than historical.
                  </SpecRow>
                  <SpecRow term="Live monitoring" tone="dark">
                    Digital tracking of environmental parameters, worker conditions and quality
                    metrics as production runs.
                  </SpecRow>
                  <SpecRow term="Improvement" tone="dark">
                    Training programmes, process optimisation and equipment upgrades scheduled
                    against audit findings.
                  </SpecRow>
                </dl>
              </RevealItem>
            </Reveal>
          </div>

          <Reveal className="lg:pt-10">
            <RevealItem>
              <div className="ticked overflow-hidden">
                <img
                  src="/images/man.jpg"
                  alt="Operator checking garment quality against specification"
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
            Need certificates for your compliance file?
          </h2>
          <div className="flex flex-wrap gap-3">
            <Pill size="lg" to="/sustainability" tone="ghost">
              Sustainability
            </Pill>
            <Pill size="lg" to="/contact" tone="signal">
              Request documents
            </Pill>
          </div>
        </div>
      </Section>
    </>
  );
}
