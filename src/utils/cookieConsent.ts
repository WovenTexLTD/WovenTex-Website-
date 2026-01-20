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

export function saveConsent(c: ConsentState) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...c, timestamp: new Date().toISOString() }));
}

/** Public helper you can import elsewhere */
export function getConsent(): ConsentState | null {
  return readConsent();
}

export type { ConsentState };
export { STORAGE_KEY, readConsent };
