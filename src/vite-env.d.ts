/// <reference types="vite/client" />

/**
 * Image sequences read from public/ at build time by the `frameSequence`
 * plugin in vite.config.ts. Each export is the sorted list of URLs for one
 * directory, or null when that directory does not exist.
 */
declare module 'virtual:frame-sequence' {
  export const shirt: string[] | null;
  export const shirtMobile: string[] | null;
}
