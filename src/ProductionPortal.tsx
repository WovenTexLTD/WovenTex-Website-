import React from 'react';
import { motion } from 'framer-motion';
import { Download, Monitor, Apple, Linux, PlayCircle, ArrowRight } from 'lucide-react';
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
    note: 'Universal build for Apple Silicon + Intel (if you uploaded universal).',
  },
  {
    os: 'Linux',
    icon: <Linux size={22} />,
    primary: { label: 'Download (AppImage)', href: '/downloads/production-portal/linux-appimage' },
    secondary: { label: 'Download (DEB)', href: '/downloads/production-portal/linux-deb' },
    note: 'AppImage works on most distros.',
  },
];

const ProductionPortal = () => {
  return (
    <div className="pt-16 lg:pt-20 bg-white">
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <motion.h1
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight"
              >
                Production Portal
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="mt-5 text-lg text-gray-600 max-w-xl"
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
                  className="inline-flex items-center justify-center bg-gray-900 text-white px-6 py-3 rounded-sm font-semibold hover:bg-gray-800 transition-colors"
                >
                  <Download className="mr-2" size={18} />
                  Download
                </a>

                <a
                  href="#video"
                  className="inline-flex items-center justify-center border border-gray-300 text-gray-900 px-6 py-3 rounded-sm font-semibold hover:bg-gray-50 transition-colors"
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
              className="bg-gray-50 rounded-xl p-4 shadow-sm border border-gray-100"
            >
              {/* Use your existing image asset here */}
              <img
                src="/images/pphero.svg"
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
      <section className="py-14 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: 'Real-time production status', text: 'Track daily output, targets, and issues without chasing updates.' },
              { title: 'Fewer delays, fewer surprises', text: 'Surface blockers early and fix them before they cost you lead time.' },
              { title: 'One source of truth', text: 'Operators, merchandisers, and management aligned on the same live data.' },
            ].map((b) => (
              <div key={b.title} className="bg-white rounded-lg border border-gray-100 p-6 shadow-sm">
                <div className="text-lg font-semibold text-gray-900">{b.title}</div>
                <div className="mt-2 text-gray-600">{b.text}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DOWNLOADS */}
      <section id="download" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between gap-4 flex-wrap mb-10">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Download Production Portal</h2>
              <p className="mt-2 text-gray-600 max-w-2xl">
                Choose your operating system. If you need help installing, watch the walkthrough below.
              </p>
            </div>
            <Link
              to="/contact"
              className="inline-flex items-center text-gray-900 font-semibold hover:underline"
            >
              Need onboarding? Contact us <ArrowRight className="ml-1" size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {downloads.map((d) => (
              <div key={d.os} className="rounded-lg border border-gray-100 p-6 shadow-sm">
                <div className="flex items-center gap-2 text-gray-900 font-semibold">
                  {d.icon}
                  {d.os}
                </div>

                <div className="mt-4 flex flex-col gap-3">
                  <a
                    href={d.primary.href}
                    className="inline-flex items-center justify-center bg-gray-900 text-white px-4 py-3 rounded-sm font-semibold hover:bg-gray-800 transition-colors"
                  >
                    <Download className="mr-2" size={16} />
                    {d.primary.label}
                  </a>

                  {d.secondary && (
                    <a
                      href={d.secondary.href}
                      className="inline-flex items-center justify-center border border-gray-300 text-gray-900 px-4 py-3 rounded-sm font-semibold hover:bg-gray-50 transition-colors"
                    >
                      {d.secondary.label}
                    </a>
                  )}

                  {d.note && <div className="text-sm text-gray-500">{d.note}</div>}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 text-sm text-gray-500">
            Tip: If downloads don’t start, your browser may be blocking popups or redirects.
          </div>
        </div>
      </section>

      {/* VIDEO */}
      <section id="video" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900">Walkthrough video</h2>
            <p className="mt-2 text-gray-600">Installation + how to use the core features in under 5 minutes.</p>
          </div>

          {/* Replace the src with your YouTube/Vimeo embed link */}
          <div className="relative w-full overflow-hidden rounded-xl shadow-sm border border-gray-100 bg-black"
               style={{ paddingTop: '56.25%' }}>
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
      <section className="py-16 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold">Want a guided setup for your factory?</h2>
          <p className="mt-3 text-gray-300">
            We can onboard your team, customize workflows, and help you get consistent daily reporting.
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
              className="border-2 border-white text-white px-8 py-3 rounded-sm font-semibold hover:bg-white hover:text-gray-900 transition-colors duration-300"
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
