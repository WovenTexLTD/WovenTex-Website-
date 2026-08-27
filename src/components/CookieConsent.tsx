import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { type ConsentState, readConsent, saveConsent } from '../utils/cookieConsent';

const btn =
  'px-5 py-3 text-[11px] font-semibold uppercase tracking-label transition-colors duration-300';

export default function CookieConsent() {
  const [open, setOpen] = useState(false);
  const [prefsOpen, setPrefsOpen] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);

  useEffect(() => {
    const existing = readConsent();
    if (!existing) {
      setOpen(true);
    } else {
      setAnalytics(!!existing.analytics);
      setMarketing(!!existing.marketing);
    }
  }, []);

  const commit = (consent: ConsentState) => {
    saveConsent(consent);
    setOpen(false);
    setPrefsOpen(false);
    window.dispatchEvent(new Event('cookie-consent-updated'));
  };

  const acceptAll = () => commit({ necessary: true, analytics: true, marketing: true });
  const rejectNonEssential = () => commit({ necessary: true, analytics: false, marketing: false });
  const savePreferences = () => commit({ necessary: true, analytics, marketing });

  // Exposed for the footer's "Cookie settings" control
  useEffect(() => {
    (window as Window & { openCookiePreferences?: () => void }).openCookiePreferences = () => {
      const existing = readConsent();
      setAnalytics(!!existing?.analytics);
      setMarketing(!!existing?.marketing);
      setPrefsOpen(true);
    };
  }, []);

  return (
    <>
      {/* Banner */}
      {open && !prefsOpen && (
        <div
          role="dialog"
          aria-label="Cookie consent"
          className="fixed inset-x-0 bottom-0 z-[60] border-t border-paper/15 bg-ink text-paper"
        >
          <div className="shell flex flex-col gap-5 py-5 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
            <div className="max-w-2xl">
              <span className="mono-label text-signal">Cookies</span>
              <p className="mt-2 text-sm leading-relaxed text-paper/70">
                We use essential cookies to make this site work. With your consent we’ll also use
                analytics and marketing cookies to improve your experience. See our{' '}
                <Link to="/privacy-policy" className="link-swipe text-paper">
                  Privacy Policy
                </Link>
                .
              </p>
            </div>

            <div className="flex shrink-0 flex-wrap gap-2">
              <button
                onClick={rejectNonEssential}
                className={`${btn} border border-paper/25 hover:bg-paper hover:text-ink`}
              >
                Reject non-essential
              </button>
              <button
                onClick={() => setPrefsOpen(true)}
                className={`${btn} border border-paper/25 hover:bg-paper hover:text-ink`}
              >
                Preferences
              </button>
              <button onClick={acceptAll} className={`${btn} bg-signal text-ink hover:bg-paper`}>
                Accept all
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Preferences */}
      {prefsOpen && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-ink/80 px-4 backdrop-blur-sm">
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Cookie preferences"
            className="w-full max-w-lg border border-ink/15 bg-paper p-8"
          >
            <span className="mono-label text-signal-700">Cookie preferences</span>
            <h2 className="mt-4 w-condensed text-2xl font-black uppercase leading-none">
              Control how we use cookies
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-ink-400">
              Essential cookies are always on. Everything else is your call.
            </p>

            <div className="mt-7">
              <div className="flex items-center justify-between gap-4 border-t border-ink/12 py-4">
                <div>
                  <div className="text-[15px] font-semibold text-ink">Essential</div>
                  <div className="text-sm text-ink-400">Required for core site functionality.</div>
                </div>
                <span className="mono-label text-ink-300">Always on</span>
              </div>

              <label className="flex cursor-pointer items-center justify-between gap-4 border-t border-ink/12 py-4">
                <div>
                  <div className="text-[15px] font-semibold text-ink">Analytics</div>
                  <div className="text-sm text-ink-400">Helps us understand how the site is used.</div>
                </div>
                <input
                  type="checkbox"
                  checked={analytics}
                  onChange={(e) => setAnalytics(e.target.checked)}
                  className="h-5 w-5 shrink-0 accent-signal"
                />
              </label>

              <label className="flex cursor-pointer items-center justify-between gap-4 border-y border-ink/12 py-4">
                <div>
                  <div className="text-[15px] font-semibold text-ink">Marketing</div>
                  <div className="text-sm text-ink-400">Used for advertising and remarketing.</div>
                </div>
                <input
                  type="checkbox"
                  checked={marketing}
                  onChange={(e) => setMarketing(e.target.checked)}
                  className="h-5 w-5 shrink-0 accent-signal"
                />
              </label>
            </div>

            <div className="mt-7 flex flex-wrap justify-end gap-2">
              <button
                onClick={() => {
                  setPrefsOpen(false);
                  if (!readConsent()) setOpen(true);
                }}
                className={`${btn} border border-ink/25 text-ink hover:bg-ink hover:text-paper`}
              >
                Back
              </button>
              <button
                onClick={savePreferences}
                className={`${btn} bg-ink text-paper hover:bg-signal hover:text-ink`}
              >
                Save preferences
              </button>
              <button onClick={acceptAll} className={`${btn} bg-signal text-ink hover:bg-ink hover:text-paper`}>
                Accept all
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
