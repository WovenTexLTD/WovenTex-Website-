import { getConsent } from "./utils/cookieConsent";

// Type definitions for gtag
interface GtagWindow extends Window {
  dataLayer?: unknown[];
  gtag?: (...args: unknown[]) => void;
}

declare const window: GtagWindow;

export function initAnalytics() {
  const consent = getConsent();
  if (!consent?.analytics) return; // don't load if not allowed

  // Example: Google Analytics (gtag)
  if (!window.dataLayer) {
    window.dataLayer = window.dataLayer || [];
    function gtag(...args: unknown[]){ window.dataLayer?.push(args); }
    window.gtag = gtag;

    const s = document.createElement("script");
    s.async = true;
    s.src = "https://www.googletagmanager.com/gtag/js?id=G-XXXXXXX";
    document.head.appendChild(s);

    gtag("js", new Date());
    gtag("config", "G-XXXXXXX", { anonymize_ip: true });
  }
}

// Listen for updates if user changes their mind later
window.addEventListener("cookie-consent-updated", () => {
  initAnalytics();
});
