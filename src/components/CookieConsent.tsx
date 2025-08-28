import React, { useEffect, useState } from "react";

type ConsentState = {
  necessary: true;       // always true
  analytics: boolean;
  marketing: boolean;
  timestamp?: string;
};

const STORAGE_KEY = "cookie-consent-v1";

function readConsent(): ConsentState | null {
  const raw = localStorage.getItem(STORAGE_KEY);
  try { return raw ? JSON.parse(raw) : null; } catch { return null; }
}

function saveConsent(c: ConsentState) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...c, timestamp: new Date().toISOString() }));
}

/** Public helper you can import elsewhere */
export function getConsent(): ConsentState | null {
  return readConsent();
}

export default function CookieConsent() {
  const [open, setOpen] = useState(false);
  const [prefsOpen, setPrefsOpen] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);

  useEffect(() => {
    const existing = readConsent();
    if (!existing) {
      setOpen(true); // first visit -> show banner
    } else {
      setAnalytics(!!existing.analytics);
      setMarketing(!!existing.marketing);
    }
  }, []);

  const acceptAll = () => {
    const consent: ConsentState = { necessary: true, analytics: true, marketing: true };
    saveConsent(consent);
    setOpen(false);
    setPrefsOpen(false);
    window.dispatchEvent(new Event("cookie-consent-updated"));
  };

  const rejectNonEssential = () => {
    const consent: ConsentState = { necessary: true, analytics: false, marketing: false };
    saveConsent(consent);
    setOpen(false);
    setPrefsOpen(false);
    window.dispatchEvent(new Event("cookie-consent-updated"));
  };

  const savePreferences = () => {
    const consent: ConsentState = { necessary: true, analytics, marketing };
    saveConsent(consent);
    setOpen(false);
    setPrefsOpen(false);
    window.dispatchEvent(new Event("cookie-consent-updated"));
  };

  // Small “Manage cookies” button you can show in the footer later
  (window as any).openCookiePreferences = () => {
    const existing = readConsent();
    setAnalytics(!!existing?.analytics);
    setMarketing(!!existing?.marketing);
    setPrefsOpen(true);
  };

  return (
    <>
      {/* Banner */}
      {open && !prefsOpen && (
        <div className="fixed inset-x-0 bottom-0 z-[60]">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-6">
            <div className="rounded-lg bg-gray-900 text-white p-4 sm:p-5 shadow-lg">
              <div className="sm:flex sm:items-start sm:justify-between gap-4">
                <div className="mb-3 sm:mb-0">
                  <h3 className="text-lg font-semibold">We use cookies</h3>
                  <p className="text-sm text-gray-300 mt-1">
                    We use essential cookies to make this site work. With your consent, we’ll also use analytics and
                    marketing cookies to improve your experience. See our{" "}
                    <a href="/privacy" className="underline">Privacy Policy</a>.
                  </p>
                </div>
                <div className="flex shrink-0 gap-2">
                  <button
                    onClick={rejectNonEssential}
                    className="px-3 py-2 rounded border border-gray-700 text-white hover:bg-gray-800"
                  >
                    Reject non-essential
                  </button>
                  <button
                    onClick={() => setPrefsOpen(true)}
                    className="px-3 py-2 rounded border border-gray-700 text-white hover:bg-gray-800"
                  >
                    Preferences
                  </button>
                  <button
                    onClick={acceptAll}
                    className="px-3 py-2 rounded bg-yellow-500 text-black font-semibold hover:bg-yellow-400"
                  >
                    Accept all
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Preferences modal */}
      {prefsOpen && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/60 px-4">
          <div className="w-full max-w-lg rounded-lg bg-white p-6 shadow-2xl">
            <h3 className="text-xl font-semibold text-gray-900">Cookie preferences</h3>
            <p className="text-sm text-gray-600 mt-1">
              Control how we use cookies on this site. Essential cookies are always on.
            </p>

            <div className="mt-5 space-y-4">
              <div className="flex items-start justify-between gap-4 border rounded p-3">
                <div>
                  <div className="font-medium text-gray-900">Essential</div>
                  <div className="text-sm text-gray-600">Required for core site functionality.</div>
                </div>
                <span className="text-sm px-2 py-1 rounded bg-gray-200 text-gray-700">Always on</span>
              </div>

              <label className="flex items-start justify-between gap-4 border rounded p-3 cursor-pointer">
                <div>
                  <div className="font-medium text-gray-900">Analytics</div>
                  <div className="text-sm text-gray-600">Helps us understand site usage to improve UX.</div>
                </div>
                <input
                  type="checkbox"
                  checked={analytics}
                  onChange={(e) => setAnalytics(e.target.checked)}
                  className="h-5 w-5 accent-yellow-500"
                />
              </label>

              <label className="flex items-start justify-between gap-4 border rounded p-3 cursor-pointer">
                <div>
                  <div className="font-medium text-gray-900">Marketing</div>
                  <div className="text-sm text-gray-600">Used for ads & remarketing.</div>
                </div>
                <input
                  type="checkbox"
                  checked={marketing}
                  onChange={(e) => setMarketing(e.target.checked)}
                  className="h-5 w-5 accent-yellow-500"
                />
              </label>
            </div>

            <div className="mt-6 flex justify-end gap-2">
              <button
                onClick={() => { setPrefsOpen(false); setOpen(true); }}
                className="px-3 py-2 rounded border border-gray-300 text-gray-700 hover:bg-gray-50"
              >
                Back
              </button>
              <button
                onClick={rejectNonEssential}
                className="px-3 py-2 rounded border border-gray-300 text-gray-700 hover:bg-gray-50"
              >
                Reject non-essential
              </button>
              <button
                onClick={savePreferences}
                className="px-3 py-2 rounded bg-gray-900 text-white hover:bg-gray-800"
              >
                Save preferences
              </button>
              <button
                onClick={acceptAll}
                className="px-3 py-2 rounded bg-yellow-500 text-black font-semibold hover:bg-yellow-400"
              >
                Accept all
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
