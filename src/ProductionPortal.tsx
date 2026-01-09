import React from 'react';
import { motion } from 'framer-motion';
import { Download, Monitor, Apple, Terminal, PlayCircle, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

type DownloadItem = {
  os: string;
  icon: React.ReactNode;
  primary: { label: string; href: string };
  secondary?: { label: string; href: string };
  note?: string;
};

const downloads: DownloadItem[] = [
  {
    os: 'Windows',
    icon: <Monitor size={22} />,
    primary: { label: 'Download (MSI)', href: '/downloads/production-portal/windows' },
    secondary: { label: 'Alternative (EXE)', href: '/downloads/production-portal/windows-exe' },
    note: 'Recommended for most Windows users.',
  },
  {
    os: 'macOS',
    icon: <Apple size={22} />,
    primary: { label: 'Download (DMG)', href: '/downloads/production-portal/macos' },
    note: 'Universal build (Apple Silicon + Intel) if you uploaded universal.',
  },
  {
    os: 'Linux',
    icon: <Terminal size={22} />,
    primary: { label: 'Download (AppImage)', href: '/downloads/production-portal/linux-appimage' },
    secondary: { label: 'Download (DEB)', href: '/downloads/production-portal/linux-deb' },
    note: 'AppImage works on most distros.',
  },
];

const ProductionPortal = () => {
  return (
    <div
      className="pt-16 lg:pt-20 text-white min-h-screen"
      style={{
        background: 'radial-gradient(circle at 50% 50%, #000a68, #000c38)',
      }}
    >
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              {/* Brand row: Bigger icon + Title + Slogan UNDER title */}
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="flex items-start gap-5"
              >
                <img
                  src="/images/app-icon.svg"
                  alt="Production Portal logo"
                  className="h-20 w-20 sm:h-24 sm:w-24 lg:h-28 lg:w-28 object-contain"
                  loading="eager"
                  decoding="async"
                />

                <div className="pt-1">
                  <h1 className="text-4xl sm:text-5xl font-bold leading-tight">
                    Production Portal
                  </h1>

                  <div className="mt-3 text-lg sm:text-xl font-semibold text-[#ffb905]">
                    Every Order. Every Line. Under Control.
                  </div>
                </div>
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="mt-6 text-lg text-white/80 max-w-xl"
              >
                Real-time visibility across production lines—updates, blockers, output, and accountability in one place.
                Built for factories and brands that need speed, clarity, and control.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="mt-8 flex flex-col sm:flex-row gap-3"
              >
                <a
                  href="#download"
                  className="inline-flex items-center justify-center bg-white text-[#000c38] px-6 py-3 rounded-sm font-semibold hover:bg-white/90 transition-colors"
                >
                  <Download className="mr-2" size={18} />
                  Download
                </a>

                <a
                  href="#video"
                  className="inline-flex items-center justify-center border border-white/30 text-white px-6 py-3 rounded-sm font-semibold hover:bg-white/10 transition-colors"
                >
                  <PlayCircle className="mr-2" size={18} />
                  Watch the walkthrough
                </a>
              </motion.div>
            </div>

            {/* RIGHT VISUAL */}
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="rounded-xl p-4 shadow-sm border border-white/10 bg-white/5 backdrop-blur-sm"
            >
              <img
                src="/images/pp.svg"
                alt="Production Portal preview"
                className="w-full h-auto"
                loading="lazy"
                decoding="async"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: 'Real-time production status', text: 'Track daily output, targets, and issues without chasing updates.' },
              { title: 'Fewer delays, fewer surprises', text: 'Surface blockers early and fix them before they cost lead time.' },
              { title: 'One source of truth', text: 'Operators, merchandisers, and management aligned on the same live data.' },
            ].map((b) => (
              <div
                key={b.title}
                className="rounded-lg border border-white/10 bg-white/5 backdrop-blur-sm p-6"
              >
                <div className="text-lg font-semibold">{b.title}</div>
                <div className="mt-2 text-white/80">{b.text}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NEW: LARGE INFO CARD + LAPTOP IMAGE HUGGING RIGHT WALL */}
      {/* Make sure laptop.svg is in /public/images/laptop.svg */}
      <section className="py-16 relative overflow-hidden">
        {/* Laptop image hugs the right wall on large screens */}
        <img
          src="/images/laptop.svg"
          alt="Production Portal on laptop"
          className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 h-[520px] w-auto max-w-none pointer-events-none select-none"
          loading="lazy"
          decoding="async"
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-8 sm:p-10 lg:p-12 lg:max-w-4xl">
            <div className="flex items-start justify-between gap-6 flex-wrap">
              <div>
                <h2 className="text-3xl sm:text-4xl font-bold">
                  One dashboard for daily production control
                </h2>
                <p className="mt-4 text-white/80 text-lg max-w-2xl">
                  Production Portal is built to make daily reporting effortless—so managers see what’s happening
                  across lines in real time, without waiting for manual updates.
                </p>
              </div>
            </div>

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
                className="inline-flex items-center justify-center bg-white text-[#000c38] px-6 py-3 rounded-sm font-semibold hover:bg-white/90 transition-colors"
              >
                <Download className="mr-2" size={18} />
                Download Production Portal
              </a>

              <a
                href="#video"
                className="inline-flex items-center justify-center border border-white/30 text-white px-6 py-3 rounded-sm font-semibold hover:bg-white/10 transition-colors"
              >
                <PlayCircle className="mr-2" size={18} />
                Watch the walkthrough
              </a>
            </div>

            <div className="mt-4 text-sm text-white/60">
              Tip: If you want us to onboard your team, we can set up roles, workflows, and daily reporting in a single session.
            </div>
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
                Choose your operating system. If you need help installing, watch the walkthrough below.
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
                className="rounded-lg border border-white/10 bg-white/5 backdrop-blur-sm p-6"
              >
                <div className="flex items-center gap-2 font-semibold">
                  {d.icon}
                  {d.os}
                </div>

                <div className="mt-4 flex flex-col gap-3">
                  <a
                    href={d.primary.href}
                    className="inline-flex items-center justify-center bg-white text-[#000c38] px-4 py-3 rounded-sm font-semibold hover:bg-white/90 transition-colors"
                  >
                    <Download className="mr-2" size={16} />
                    {d.primary.label}
                  </a>

                  {d.secondary && (
                    <a
                      href={d.secondary.href}
                      className="inline-flex items-center justify-center border border-white/30 text-white px-4 py-3 rounded-sm font-semibold hover:bg-white/10 transition-colors"
                    >
                      {d.secondary.label}
                    </a>
                  )}

                  {d.note && <div className="text-sm text-white/70">{d.note}</div>}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 text-sm text-white/70">
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

          {/* Replace src with your YouTube/Vimeo/Loom embed URL */}
          <div
            className="relative w-full overflow-hidden rounded-xl border border-white/10 bg-black/40"
            style={{ paddingTop: '56.25%' }}
          >
            <iframe
              className="absolute inset-0 w-full h-full"
              src="https://www.youtube.com/embed/VIDEO_ID_HERE"
              title="Production Portal Walkthrough"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
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
              className="bg-yellow-500 text-black px-8 py-3 rounded-sm font-semibold hover:bg-yellow-400 transition-colors duration-300"
            >
              Request onboarding
            </Link>
            <a
              href="#download"
              className="border-2 border-white text-white px-8 py-3 rounded-sm font-semibold hover:bg-white hover:text-[#000c38] transition-colors duration-300"
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
