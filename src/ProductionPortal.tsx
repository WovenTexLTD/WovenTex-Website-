import React from 'react';
import { motion } from 'framer-motion';
import {
  Download,
  Monitor,
  Apple,
  Terminal,
  PlayCircle,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  Zap,
  LineChart,
  Layers,
  Package,
  Globe,
} from 'lucide-react';
import { Link } from 'react-router-dom';

type DownloadButton = {
  label: string;
  href: string;
  variant: 'primary' | 'secondary';
};

type DownloadItem = {
  os: string;
  icon: React.ReactNode;
  buttons: DownloadButton[];
  note?: string;
};

const RELEASE_TAG = 'desktop-v1.0.39';

const downloads: DownloadItem[] = [
  {
    os: 'Windows',
    icon: <Monitor size={22} />,
    buttons: [
      {
        label: 'Download (MSI)',
        href: `https://github.com/WovenTexLTD/line-lead-hub/releases/download/${RELEASE_TAG}/Production.Portal_1.0.39_x64_en-US.msi`,
        variant: 'primary',
      },
      {
        label: 'Alternative (EXE)',
        href: `https://github.com/WovenTexLTD/line-lead-hub/releases/download/${RELEASE_TAG}/Production.Portal_1.0.39_x64-setup.exe`,
        variant: 'secondary',
      },
    ],
    note: 'Recommended: MSI for most Windows environments.',
  },
  {
    os: 'macOS',
    icon: <Apple size={22} />,
    buttons: [
      {
        label: 'Download (DMG)',
        href: `https://github.com/WovenTexLTD/line-lead-hub/releases/download/${RELEASE_TAG}/Production.Portal_1.0.39_universal.dmg`,
        variant: 'primary',
      },
    ],
    note: 'Universal build (Apple Silicon + Intel).',
  },
  {
    os: 'Linux',
    icon: <Terminal size={22} />,
    buttons: [
      {
        label: 'Download (AppImage)',
        href: `https://github.com/WovenTexLTD/line-lead-hub/releases/download/${RELEASE_TAG}/Production.Portal_1.0.39_amd64.AppImage`,
        variant: 'primary',
      },
      {
        label: 'Ubuntu/Debian (.deb)',
        href: `https://github.com/WovenTexLTD/line-lead-hub/releases/download/${RELEASE_TAG}/Production.Portal_1.0.39_amd64.deb`,
        variant: 'secondary',
      },
      {
        label: 'Fedora/RHEL (.rpm)',
        href: `https://github.com/WovenTexLTD/line-lead-hub/releases/download/${RELEASE_TAG}/Production.Portal-1.0.39-1.x86_64.rpm`,
        variant: 'secondary',
      },
    ],
    note: 'AppImage works on most distros. Use DEB/RPM for system installs.',
  },
];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay },
});

const ProductionPortal = () => {
  return (
    <div
      className="pt-16 lg:pt-20 text-white min-h-screen relative overflow-hidden"
      style={{
        background: 'radial-gradient(circle at 50% 50%, #000a68, #000c38)',
      }}
    >
      {/* Premium background glows */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 -left-40 h-[520px] w-[520px] rounded-full bg-[#ffb905]/15 blur-[90px]" />
        <div className="absolute top-24 -right-52 h-[620px] w-[620px] rounded-full bg-white/10 blur-[110px]" />
        <div className="absolute bottom-[-220px] left-1/3 h-[520px] w-[520px] rounded-full bg-[#ffb905]/10 blur-[120px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.06),transparent_35%),radial-gradient(circle_at_80%_10%,rgba(255,185,5,0.08),transparent_40%),radial-gradient(circle_at_50%_90%,rgba(255,255,255,0.05),transparent_45%)]" />
      </div>

      {/* HERO */}
      <section className="relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* LEFT */}
            <div>
              <motion.div
                {...fadeUp(0)}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/15 bg-white/5 backdrop-blur-sm"
              >
                <Sparkles size={16} className="text-[#ffb905]" />
                <span className="text-sm text-white/80">
                  Production Portal • Release {RELEASE_TAG.replace('desktop-', '')}
                </span>
              </motion.div>

              {/* Logo + Title + Slogan */}
              <motion.div {...fadeUp(0.08)} className="mt-7 flex items-start gap-6">
                <div className="relative shrink-0">
                  <div className="absolute inset-0 rounded-[28px] bg-[#ffb905]/20 blur-2xl" />
                  <img
                    src="/images/app-icon.svg"
                    alt="Production Portal logo"
                    className="relative h-24 w-24 sm:h-28 sm:w-28 lg:h-32 lg:w-32 object-contain drop-shadow-[0_18px_40px_rgba(0,0,0,0.45)]"
                    loading="eager"
                    decoding="async"
                  />
                </div>

                <div className="pt-1">
                  <h1 className="text-4xl sm:text-5xl font-bold leading-tight tracking-tight">
                    Production Portal
                  </h1>
                  <div className="mt-3 text-lg sm:text-xl font-semibold text-[#ffb905]">
                    Every Order. Every Line. Under Control.
                  </div>
                </div>
              </motion.div>

              <motion.p
                {...fadeUp(0.16)}
                className="mt-7 text-lg sm:text-xl text-white/80 max-w-xl leading-relaxed"
              >
                Real-time visibility across production lines—updates, blockers, output, and accountability in one place.
                Built for factories and brands that need speed, clarity, and control.
              </motion.p>

              {/* Web version (important CTA) */}
              <motion.div {...fadeUp(0.2)} className="mt-8">
                <div className="inline-flex items-center gap-3 px-5 py-4 rounded-2xl border border-white/15 bg-white/8 backdrop-blur-sm shadow-[0_18px_70px_rgba(0,0,0,0.25)]">
                  <div className="h-11 w-11 rounded-xl border border-white/15 bg-white/10 flex items-center justify-center">
                    <Globe size={20} className="text-[#ffb905]" />
                  </div>

                  <div className="leading-tight">
                    <div className="text-xs uppercase tracking-wider text-white/60">Web Version</div>
                    <a
                      href="https://productionportal.co"
                      target="_blank"
                      rel="noreferrer"
                      className="text-lg sm:text-xl font-bold text-[#ffb905] hover:underline"
                    >
                      productionportal.co
                    </a>
                    <div className="text-sm text-white/70 mt-1">
                      Access the platform instantly in your browser.
                    </div>
                  </div>

                  <a
                    href="https://productionportal.co"
                    target="_blank"
                    rel="noreferrer"
                    className="ml-4 inline-flex items-center justify-center bg-white text-[#000c38] px-5 py-2.5 rounded-full font-semibold hover:bg-white/90 transition-colors whitespace-nowrap gap-2"
                  >
                  Open Web App <span className="text-lg leading-none">→</span>
                  </a>
                </div>
              </motion.div>

              <motion.div {...fadeUp(0.24)} className="mt-8 flex flex-wrap gap-3">
                {[
                  { icon: <Zap size={16} className="text-[#ffb905]" />, text: 'Faster daily decisions' },
                  { icon: <ShieldCheck size={16} className="text-[#ffb905]" />, text: 'Single source of truth' },
                  { icon: <LineChart size={16} className="text-[#ffb905]" />, text: 'Live line performance' },
                ].map((p) => (
                  <div
                    key={p.text}
                    className="inline-flex items-center gap-2 px-3 py-2 rounded-full border border-white/15 bg-white/5 backdrop-blur-sm text-sm text-white/85"
                  >
                    {p.icon}
                    {p.text}
                  </div>
                ))}
              </motion.div>

              <motion.div {...fadeUp(0.28)} className="mt-10 flex flex-col sm:flex-row gap-3">
                <a
                  href="#download"
                  className="inline-flex items-center justify-center bg-white text-[#000c38] px-7 py-3.5 rounded-md font-semibold hover:bg-white/90 transition-colors shadow-[0_14px_50px_rgba(0,0,0,0.35)]"
                >
                  <Download className="mr-2" size={18} />
                  Download
                </a>

                <a
                  href="#video"
                  className="inline-flex items-center justify-center border border-white/25 text-white px-7 py-3.5 rounded-md font-semibold hover:bg-white/10 transition-colors"
                >
                  <PlayCircle className="mr-2" size={18} />
                  Watch walkthrough
                </a>
              </motion.div>

              <motion.div {...fadeUp(0.34)} className="mt-5 text-sm text-white/70">
                Want onboarding? We can set up roles, workflows, and reporting in one session.
              </motion.div>
            </div>

            {/* RIGHT: preview frame */}
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="relative"
            >
              <div className="rounded-2xl border border-white/15 bg-white/5 backdrop-blur-sm p-4 shadow-[0_20px_80px_rgba(0,0,0,0.45)]">
                <div className="rounded-xl overflow-hidden border border-white/10 bg-black/20">
                  <img
                    src="/images/pp.svg"
                    alt="Production Portal preview"
                    className="w-full h-auto"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FEATURE GRID */}
      <section className="relative py-10 lg:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp(0)} className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: <Layers className="text-[#ffb905]" size={22} />,
                title: 'One source of truth',
                text: 'Operators, merchandisers, and management aligned on the same live production data.',
              },
              {
                icon: <Zap className="text-[#ffb905]" size={22} />,
                title: 'Fewer delays, fewer surprises',
                text: 'Surface blockers early and resolve them before they cost lead time.',
              },
              {
                icon: <ShieldCheck className="text-[#ffb905]" size={22} />,
                title: 'Accountability by design',
                text: 'Daily ownership, clear status, and structured reporting your team actually uses.',
              },
            ].map((b) => (
              <div
                key={b.title}
                className="rounded-2xl border border-white/15 bg-white/5 backdrop-blur-sm p-6 shadow-[0_18px_70px_rgba(0,0,0,0.25)]"
              >
                <div className="h-11 w-11 rounded-xl border border-white/15 bg-white/10 flex items-center justify-center">
                  {b.icon}
                </div>
                <div className="mt-4 text-lg font-semibold">{b.title}</div>
                <div className="mt-2 text-white/75 leading-relaxed">{b.text}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* BIG INFO CARD + LAPTOP OVER (NOT BEHIND) */}
      <section className="relative py-16 lg:py-20 overflow-hidden">
        {/* Laptop hugs the right wall and sits ABOVE the translucent card */}
        <img
          src="/images/laptop.svg"
          alt="Production Portal on laptop"
          className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 h-[700px] w-auto max-w-none pointer-events-none select-none z-30"
          loading="lazy"
          decoding="async"
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="relative rounded-3xl border border-white/15 bg-white/5 backdrop-blur-sm shadow-[0_26px_100px_rgba(0,0,0,0.45)] overflow-hidden">
            <div className="p-8 sm:p-10 lg:p-12 lg:pr-[22rem]">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/15 bg-white/5">
                <CheckCircle2 size={16} className="text-[#ffb905]" />
                <span className="text-sm text-white/80">Designed for daily execution</span>
              </div>

              <h2 className="mt-5 text-3xl sm:text-4xl font-bold leading-tight">
                One dashboard for daily production control
              </h2>

              <p className="mt-4 text-white/80 text-lg leading-relaxed max-w-2xl">
                Production Portal turns factory reporting into a real-time operating system—so managers can
                see line performance, bottlenecks, and priorities instantly.
              </p>

              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  'Live output vs target by line',
                  'Blockers + escalation tracking',
                  'Daily summaries & accountability',
                  'Cleaner communication across teams',
                ].map((t) => (
                  <div key={t} className="flex items-start gap-3">
                    <CheckCircle2 className="text-[#ffb905]" size={20} />
                    <div className="text-white/90">{t}</div>
                  </div>
                ))}
              </div>

              <div className="mt-10 flex flex-col sm:flex-row gap-3">
                <a
                  href="#download"
                  className="inline-flex items-center justify-center bg-white text-[#000c38] px-7 py-3.5 rounded-md font-semibold hover:bg-white/90 transition-colors shadow-[0_14px_50px_rgba(0,0,0,0.35)]"
                >
                  <Download className="mr-2" size={18} />
                  Download Production Portal
                </a>

                <a
                  href="#video"
                  className="inline-flex items-center justify-center border border-white/25 text-white px-7 py-3.5 rounded-md font-semibold hover:bg-white/10 transition-colors"
                >
                  <PlayCircle className="mr-2" size={18} />
                  Watch walkthrough
                </a>
              </div>

              <div className="mt-4 text-sm text-white/60">
                Tip: Want this deployed to your factory? We can onboard teams and workflows quickly.
              </div>
            </div>

            <div className="h-1 w-full bg-gradient-to-r from-transparent via-[#ffb905]/60 to-transparent" />
          </div>
        </div>
      </section>

      {/* DOWNLOADS */}
      <section id="download" className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between gap-4 flex-wrap mb-10">
            <div>
              <h2 className="text-3xl font-bold">Download Production Portal</h2>
              <p className="mt-2 text-white/80 max-w-2xl">
                Choose your operating system. These links download the official installers from GitHub Releases.
              </p>
            </div>

            <Link to="/contact" className="inline-flex items-center text-white font-semibold hover:underline">
              Need onboarding? Contact us <ArrowRight className="ml-1" size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {downloads.map((d) => (
              <div
                key={d.os}
                className="rounded-2xl border border-white/15 bg-white/5 backdrop-blur-sm p-6 shadow-[0_18px_70px_rgba(0,0,0,0.25)]"
              >
                <div className="flex items-center gap-3 font-semibold text-white">
                  <span className="h-11 w-11 rounded-xl border border-white/15 bg-white/10 flex items-center justify-center">
                    {d.icon}
                  </span>
                  <div>
                    <div className="text-lg">{d.os}</div>
                    <div className="text-xs text-white/60 flex items-center gap-1">
                      <Package size={14} className="text-[#ffb905]" />
                      Release {RELEASE_TAG.replace('desktop-', '')}
                    </div>
                  </div>
                </div>

                <div className="mt-5 flex flex-col gap-3">
                  {d.buttons.map((btn) => {
                    const isPrimary = btn.variant === 'primary';
                    return (
                      <a
                        key={btn.label}
                        href={btn.href}
                        target="_blank"
                        rel="noreferrer"
                        className={
                          isPrimary
                            ? 'inline-flex items-center justify-center bg-white text-[#000c38] px-4 py-3 rounded-md font-semibold hover:bg-white/90 transition-colors'
                            : 'inline-flex items-center justify-center border border-white/25 text-white px-4 py-3 rounded-md font-semibold hover:bg-white/10 transition-colors'
                        }
                      >
                        <Download className="mr-2" size={16} />
                        {btn.label}
                      </a>
                    );
                  })}
                </div>

                {d.note && <div className="mt-4 text-sm text-white/70">{d.note}</div>}
              </div>
            ))}
          </div>

          <div className="mt-8 text-sm text-white/60">
            Tip: If downloads don’t start, your browser may be blocking redirects.
          </div>
        </div>
      </section>

  {/* VIDEO */}
<section id="video" className="py-16">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="text-center mb-10">
      <h2 className="text-3xl font-bold">Walkthrough video</h2>
      <p className="mt-2 text-white/80">Installation + core features in under 5 minutes.</p>
    </div>

    <div className="rounded-3xl border border-white/15 bg-white/5 backdrop-blur-sm shadow-[0_26px_100px_rgba(0,0,0,0.45)] overflow-hidden">
      <div className="relative w-full bg-black/40" style={{ paddingTop: '56.25%' }}>
        <iframe
          className="absolute inset-0 w-full h-full"
          src="https://www.youtube.com/embed/cHSR_1I-IkQ"
          title="Introducing Production Portal"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      </div>
    </div>
  </div>
</section>

  {/* VIDEO */}
<section id="video" className="py-16">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="text-center mb-10">
      <h2 className="text-3xl font-bold">Walkthrough video</h2>
      <p className="mt-2 text-white/80">Installation + core features in under 5 minutes.</p>
    </div>

    <div className="rounded-3xl border border-white/15 bg-white/5 backdrop-blur-sm shadow-[0_26px_100px_rgba(0,0,0,0.45)] overflow-hidden">
      <div className="relative w-full bg-black/40" style={{ paddingTop: '56.25%' }}>
        <iframe
          className="absolute inset-0 w-full h-full"
          src="https://www.youtube.com/embed/videoseries?list=PLlD7KVUUzTsB3-tFbyMdDUBLG_nV765BD"
          title="Introducing Production Portal"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      </div>
    </div>
  </div>
</section>
      
      {/* CTA */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold">Want a guided setup for your factory?</h2>
          <p className="mt-3 text-white/80">
            We can onboard your team, customize workflows, and get consistent daily reporting live.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="bg-[#ffb905] text-black px-8 py-3 rounded-md font-semibold hover:bg-[#ffb905]/90 transition-colors duration-300 shadow-[0_14px_50px_rgba(0,0,0,0.35)]"
            >
              Request onboarding
            </Link>
            <a
              href="#download"
              className="border border-white/25 text-white px-8 py-3 rounded-md font-semibold hover:bg-white hover:text-[#000c38] transition-colors duration-300"
            >
              Download now
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductionPortal;
