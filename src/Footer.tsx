import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import Logo from './brand/Logo';

const columns = [
  {
    title: 'Company',
    links: [
      { to: '/about', label: 'About' },
      { to: '/clients', label: 'Clients' },
      { to: '/blog', label: 'Journal' },
      { to: '/contact', label: 'Contact' },
    ],
  },
  {
    title: 'Manufacturing',
    links: [
      { to: '/capabilities', label: 'Capabilities' },
      { to: '/certifications', label: 'Certifications' },
      { to: '/sustainability', label: 'Sustainability' },
      { to: '/production-portal', label: 'Production Portal' },
    ],
  },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer data-dark className="relative overflow-hidden bg-ink text-paper">
      <div className="shell relative pt-20 lg:pt-28">
        <div className="grid gap-14 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          {/* Identity */}
          <div>
            <Logo variant="lockup" className="h-16 w-auto text-paper" />
            <p className="mt-7 max-w-xs text-[15px] leading-relaxed text-paper/60">
              Your direct link to world-class apparel manufacturing. Connecting brands to certified
              factories with quality, speed and transparency.
            </p>
          </div>

          {/* Link columns */}
          {columns.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <h2 className="mono-label text-paper/55">{col.title}</h2>
              <ul className="mt-6 space-y-3">
                {col.links.map((l) => (
                  <li key={l.to}>
                    <Link
                      to={l.to}
                      className="link-swipe text-[15px] text-paper/75 transition-colors duration-200 hover:text-signal"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          {/* Contact */}
          <div>
            <h2 className="mono-label text-paper/55">Contact</h2>
            <address className="mt-6 space-y-5 not-italic">
              <div>
                <div className="mono-label text-paper/55">Office</div>
                <p className="mt-1.5 text-[15px] leading-snug text-paper/75">
                  167–169 Great Portland Street
                  <br />
                  5th Floor, London W1W 5PF
                </p>
              </div>
              <div>
                <div className="mono-label text-paper/55">Email</div>
                <a
                  href="mailto:contact@woventex.co"
                  className="link-swipe mt-1.5 inline-block text-[15px] text-paper/75 hover:text-signal"
                >
                  contact@woventex.co
                </a>
              </div>
              <div>
                <div className="mono-label text-paper/55">Phone</div>
                <a
                  href="tel:+447933291037"
                  className="link-swipe mt-1.5 inline-block text-[15px] text-paper/75 hover:text-signal"
                >
                  +44 7933 291037
                </a>
              </div>
            </address>
          </div>
        </div>

        {/* Portal strip */}
        <a
          href="https://productionportal.co"
          target="_blank"
          rel="noopener noreferrer"
          className="group mt-16 flex flex-wrap items-center justify-between gap-4 border-y border-paper/15 py-6 transition-colors duration-500 hover:border-signal/50"
        >
          <div className="flex items-center gap-4">
            <span className="h-2 w-2 animate-blink bg-signal" aria-hidden />
            <span className="w-condensed text-xl font-bold uppercase tracking-tight sm:text-2xl">
              Production Portal: every order, every line, under control
            </span>
          </div>
          <ArrowUpRight
            size={22}
            className="shrink-0 text-paper/60 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-signal"
          />
        </a>

        {/* Legal bar */}
        <div className="flex flex-col gap-4 py-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="mono-label text-paper/55">© {year} WovenTex LTD · Made with integrity</p>
          <div className="flex flex-wrap items-center gap-x-7 gap-y-2">
            <Link to="/privacy-policy" className="mono-label text-paper/60 hover:text-signal">
              Privacy Policy
            </Link>
            <button
              type="button"
              onClick={() =>
                (window as Window & { openCookiePreferences?: () => void }).openCookiePreferences?.()
              }
              className="mono-label text-paper/60 hover:text-signal"
            >
              Cookie Settings
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
