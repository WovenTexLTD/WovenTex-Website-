import { useEffect } from 'react';

const SITE = 'WovenTex LTD';
const ORIGIN = 'https://woventex.co';

function setTag(selector: string, attr: string, value: string) {
  const el = document.head.querySelector<HTMLMetaElement | HTMLLinkElement>(selector);
  if (el) el.setAttribute(attr, value);
}

/**
 * Per-route title, description, canonical and Open Graph.
 * Small enough not to warrant pulling in a head-management dependency.
 */
export default function useMeta({
  title,
  description,
  path,
  image,
}: {
  title: string;
  description: string;
  path: string;
  image?: string;
}) {
  useEffect(() => {
    const full = title.includes(SITE) ? title : `${title} — ${SITE}`;
    const url = `${ORIGIN}${path}`;
    const img = `${ORIGIN}${image ?? '/images/background.jpg'}`;

    document.title = full;
    setTag('meta[name="description"]', 'content', description);
    setTag('link[rel="canonical"]', 'href', url);
    setTag('meta[property="og:title"]', 'content', full);
    setTag('meta[property="og:description"]', 'content', description);
    setTag('meta[property="og:url"]', 'content', url);
    setTag('meta[property="og:image"]', 'content', img);
  }, [title, description, path, image]);
}
