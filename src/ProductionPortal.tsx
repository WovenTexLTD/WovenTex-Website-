import React from 'react';
import { Link } from 'react-router-dom';
import { Apple, Monitor, Terminal } from 'lucide-react';
import { Enter, Reveal, RevealItem, WipeHeading } from './brand/ui';
import useMeta from './brand/useMeta';

const RELEASE = 'v1.0.39';
const RELEASE_BASE =
  'https://github.com/WovenTexLTD/line-lead-hub/releases/download/desktop-v1.0.97';

type DownloadButton = { label: string; href: string; primary?: boolean };
type DownloadItem = {
  os: string;
  icon: React.ReactNode;
  buttons: DownloadButton[];
  note: string;
};

const downloads: DownloadItem[] = [
  {
    os: 'Windows',
    icon: <Monitor size={20} />,
    buttons: [
      { label: 'Download (MSI)', href: `${RELEASE_BASE}/Production.Portal_1.0.39_x64_en-US.msi`, primary: true },
      { label: 'Alternative (EXE)', href: `${RELEASE_BASE}/Production.Portal_1.0.39_x64-setup.exe` },
    ],
    note: 'MSI is recommended for most Windows environments.',
  },
  {
    os: 'macOS',
    icon: <Apple size={20} />,
    buttons: [
      { label: 'Download (DMG)', href: `${RELEASE_BASE}/Production_Portal_universal.dmg`, primary: true },
    ],
    note: 'Universal build — Apple Silicon and Intel.',
  },
  {
    os: 'Linux',
    icon: <Terminal size={20} />,
    buttons: [
      { label: 'Download (AppImage)', href: `${RELEASE_BASE}/Production.Portal_1.0.39_amd64.AppImage`, primary: true },
      { label: 'Ubuntu / Debian (.deb)', href: `${RELEASE_BASE}/Production.Portal_1.0.39_amd64.deb` },
      { label: 'Fedora / RHEL (.rpm)', href: `${RELEASE_BASE}/Production.Portal-1.0.39-1.x86_64.rpm` },
    ],
    note: 'AppImage works on most distributions; use DEB/RPM for system installs.',
  },
];

const pillars = [
  {
    n: '01',
    title: 'One source of truth',
    text: 'Operators, merchandisers and management aligned on the same live production data — no parallel spreadsheets.',
  },
  {
    n: '02',
    title: 'Fewer delays, fewer surprises',
    text: 'Blockers surface the day they appear, so they get resolved before they cost lead time.',
  },
  {
    n: '03',
    title: 'Accountability by design',
    text: 'Daily ownership, clear status and structured reporting your team will actually keep up with.',
  },
];

const dashboardFeatures = [
  'Live output against target, by line',
  'Blocker logging and escalation tracking',
  'Daily summaries with named ownership',
  'Cleaner communication across teams',
];

/* Portal-navy variants of the house button */
const portalBtn =
  'group/btn inline-flex items-center justify-center gap-3 px-7 py-4 text-sm font-semibold uppercase tracking-label transition-colors duration-300 ease-brand';

export default function ProductionPortal() {
  useMeta({
    title: 'Production Portal',
    description: 'Real-time visibility across production lines. Every order, every line, under control. Available for Windows, macOS, Linux and on the web.',
    path: '/production-portal',
    image: '/images/portal-app.jpg',
  });

  return (
    <div className="bg-portal text-paper">
      {/* ============================================================ HERO */}
      <section className="relative flex min-h-[80svh] flex-col justify-end overflow-hidden">
        <div
          className="absolute inset-0 opacity-70"
          style={{
            backgroundImage:
              'radial-gradient(circle at 80% 12%, rgba(255,255,255,0.35), transparent 52%), radial-gradient(circle at 8% 88%, rgba(255,185,5,0.22), transparent 48%)',
          }}
          aria-hidden
        />
        <div className="absolute inset-0 woven woven-dark opacity-50" aria-hidden />

        <div className="shell relative grid items-end gap-14 pb-16 pt-32 lg:grid-cols-[1fr_0.9fr] lg:pb-20 lg:pt-40">
          <div>
            <Enter delay={0.1} y={12} className="flex flex-wrap items-center gap-x-4 gap-y-2">
              <span className="h-[1px] w-10 bg-signal" />
              <span className="mono-label text-signal">Production Portal · Release {RELEASE}</span>
            </Enter>

            <Enter delay={0.2} className="mt-8 flex items-center gap-5">
              <img
                src="/images/app-icon.svg"
                alt=""
                aria-hidden
                className="h-16 w-16 shrink-0 sm:h-20 sm:w-20"
                loading="eager"
              />
              <div>
                <h1 className="w-condensed text-3xl font-black uppercase leading-none sm:text-4xl">
                  Production Portal
                </h1>
                <p className="mono-label mt-3 text-paper/60">Powered by WovenTex</p>
              </div>
            </Enter>

            <WipeHeading
              as="p"
              immediate
              delay={0.35}
              className="mt-10 w-condensed text-display-sm font-black uppercase"
              lines={['Every order. Every line.', <span key="uc" className="text-signal">Under control.</span>]}
            />

            <Enter as="p" delay={0.6} className="mt-7 max-w-xl text-lg leading-relaxed text-paper/75">
              Real-time visibility across production lines — updates, blockers, output and
              accountability in one place. Built for factories and brands that need speed, clarity
              and control.
            </Enter>

            <Enter delay={0.75} className="mt-10 flex flex-wrap gap-3">
              <a href="#download" className={`${portalBtn} bg-signal text-ink hover:bg-paper`}>
                Download
                <span className="transition-transform duration-300 ease-brand group-hover/btn:translate-y-0.5">
                  ↓
                </span>
              </a>
              <a
                href="https://productionportal.co"
                target="_blank"
                rel="noopener noreferrer"
                className={`${portalBtn} border border-paper/30 text-paper hover:bg-paper hover:text-portal`}
              >
                Open web app
                <span className="transition-transform duration-300 ease-brand group-hover/btn:translate-x-1">
                  ↗
                </span>
              </a>
            </Enter>
          </div>

          <Enter delay={0.5} className="relative">
            <img
              src="/images/portal-app.jpg"
              alt="Production Portal dashboard on desktop and mobile"
              className="w-full shadow-[0_40px_100px_-20px_rgba(0,0,0,0.65)]"
              loading="eager"
              decoding="async"
            />
          </Enter>
        </div>

        {/* Spec strip */}
        <Enter delay={0.9} y={0} className="relative border-t border-paper/15 bg-ink/25 backdrop-blur-md">
          <dl className="shell grid grid-cols-2 divide-paper/10 py-5 sm:grid-cols-4 sm:divide-x">
            {[
              { k: 'Platforms', v: 'Windows · macOS · Linux' },
              { k: 'Web app', v: 'productionportal.co' },
              { k: 'Release', v: RELEASE },
              { k: 'Onboarding', v: 'One session' },
            ].map((s, i) => (
              <div key={s.k} className={`py-2 sm:px-6 ${i === 0 ? 'sm:pl-0' : ''}`}>
                <dt className="mono-label text-paper/45">{s.k}</dt>
                <dd className="mt-1.5 text-sm font-semibold sm:text-base">{s.v}</dd>
              </div>
            ))}
          </dl>
        </Enter>
      </section>

      {/* ========================================================= PILLARS */}
      <section className="relative py-24 lg:py-32">
        <div className="shell">
          <Reveal className="grid gap-px border border-paper/15 bg-paper/15 md:grid-cols-3" each={0.08}>
            {pillars.map((p) => (
              <RevealItem key={p.n} className="flex flex-col bg-portal p-8 lg:p-10">
                <span className="mono-label text-signal">{p.n}</span>
                <h2 className="mt-6 w-condensed text-2xl font-bold uppercase leading-tight">
                  {p.title}
                </h2>
                <p className="mt-4 text-[15px] leading-relaxed text-paper/70">{p.text}</p>
              </RevealItem>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ======================================================= DASHBOARD */}
      <section className="relative border-y border-paper/15 py-24 lg:py-32">
        <div className="shell grid gap-14 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <RevealItem>
              <div className="flex items-center gap-4 border-t border-paper/25 pt-4">
                <span className="mono-label text-signal">Daily execution</span>
              </div>
            </RevealItem>
            <RevealItem>
              <h2 className="mt-6 w-condensed text-display-sm font-black uppercase leading-none">
                One dashboard for daily production control
              </h2>
            </RevealItem>
            <RevealItem>
              <p className="mt-7 max-w-lg text-lg leading-relaxed text-paper/75">
                Production Portal turns factory reporting into a real-time operating system, so
                managers can see line performance, bottlenecks and priorities the moment they matter.
              </p>
            </RevealItem>
            <RevealItem>
              <ul className="mt-9 space-y-px">
                {dashboardFeatures.map((f) => (
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
          </Reveal>

          <Reveal>
            <RevealItem>
              <div className="ticked overflow-hidden border border-paper/15">
                <div className="relative w-full bg-ink/40" style={{ paddingTop: '56.25%' }}>
                  <iframe
                    className="absolute inset-0 h-full w-full"
                    src="https://www.youtube.com/embed/cHSR_1I-IkQ"
                    title="Introducing Production Portal"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                </div>
              </div>
              <p className="mono-label mt-4 text-paper/50">
                Introduction — core features in three minutes
              </p>
            </RevealItem>
          </Reveal>
        </div>
      </section>

      {/* ======================================================== DOWNLOADS */}
      <section id="download" className="relative scroll-mt-28 py-24 lg:py-32">
        <div className="shell">
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <Reveal className="max-w-2xl">
              <RevealItem>
                <div className="border-t border-paper/25 pt-4">
                  <span className="mono-label text-signal">Get the app</span>
                </div>
              </RevealItem>
              <RevealItem>
                <h2 className="mt-6 w-condensed text-display-sm font-black uppercase leading-none">
                  Download Production Portal
                </h2>
              </RevealItem>
              <RevealItem>
                <p className="mt-6 text-lg leading-relaxed text-paper/70">
                  Official installers, served from GitHub Releases. Pick your operating system.
                </p>
              </RevealItem>
            </Reveal>

            <Reveal>
              <RevealItem>
                <Link
                  to="/contact"
                  className="link-swipe mono-label whitespace-nowrap text-paper hover:text-signal"
                >
                  Need onboarding? Contact us →
                </Link>
              </RevealItem>
            </Reveal>
          </div>

          <Reveal className="mt-14 grid gap-px border border-paper/15 bg-paper/15 md:grid-cols-3" each={0.08}>
            {downloads.map((d) => (
              <RevealItem key={d.os} className="flex flex-col bg-portal p-8">
                <div className="flex items-center gap-4 border-b border-paper/15 pb-6">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center border border-paper/25 text-signal">
                    {d.icon}
                  </span>
                  <div>
                    <div className="w-condensed text-xl font-bold uppercase leading-none">{d.os}</div>
                    <div className="mono-label mt-2 text-paper/45">Release {RELEASE}</div>
                  </div>
                </div>

                <div className="mt-6 flex flex-col gap-2.5">
                  {d.buttons.map((b) => (
                    <a
                      key={b.label}
                      href={b.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center justify-between gap-3 px-5 py-3.5 text-[13px] font-semibold uppercase tracking-label transition-colors duration-300 ${
                        b.primary
                          ? 'bg-signal text-ink hover:bg-paper'
                          : 'border border-paper/25 text-paper hover:bg-paper hover:text-portal'
                      }`}
                    >
                      {b.label}
                      <span aria-hidden>↓</span>
                    </a>
                  ))}
                </div>

                <p className="mono-label mt-auto pt-6 text-paper/45">{d.note}</p>
              </RevealItem>
            ))}
          </Reveal>

          <p className="mono-label mt-8 text-paper/45">
            If a download doesn’t start, your browser may be blocking the redirect.
          </p>
        </div>
      </section>

      {/* ======================================================= WALKTHROUGH */}
      <section className="relative border-t border-paper/15 py-24 lg:py-32">
        <div className="shell">
          <Reveal className="mx-auto max-w-3xl text-center">
            <RevealItem>
              <span className="mono-label text-signal">Walkthrough playlist</span>
            </RevealItem>
            <RevealItem>
              <h2 className="mt-6 w-condensed text-display-sm font-black uppercase leading-none">
                A step-by-step guide
              </h2>
            </RevealItem>
          </Reveal>

          <Reveal className="mt-14">
            <RevealItem>
              <div className="ticked overflow-hidden border border-paper/15">
                <div className="relative w-full bg-ink/40" style={{ paddingTop: '56.25%' }}>
                  <iframe
                    className="absolute inset-0 h-full w-full"
                    src="https://www.youtube.com/embed/videoseries?list=PLlD7KVUUzTsB3-tFbyMdDUBLG_nV765BD"
                    title="Production Portal walkthrough playlist"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                </div>
              </div>
            </RevealItem>
          </Reveal>
        </div>
      </section>

      {/* ============================================================== CTA */}
      <section className="relative border-t border-paper/15 py-20 lg:py-24">
        <div className="shell flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
          <h2 className="w-condensed max-w-xl text-display-sm font-black uppercase leading-none">
            Want a guided setup for your factory?
          </h2>
          <div className="flex flex-wrap gap-3">
            <Link to="/contact" className={`${portalBtn} bg-signal text-ink hover:bg-paper`}>
              Request onboarding
              <span className="transition-transform duration-300 ease-brand group-hover/btn:translate-x-1">
                →
              </span>
            </Link>
            <a
              href="#download"
              className={`${portalBtn} border border-paper/30 text-paper hover:bg-paper hover:text-portal`}
            >
              Download now
              <span aria-hidden>↓</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
