import { existsSync, readdirSync } from 'node:fs';
import { resolve } from 'node:path';
import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';

/* ---------------------------------------------------------------------- *
 *  frameSequence
 *
 *  Reads an image-sequence directory under public/ at build time and hands
 *  the sorted URL list to the client as a virtual module. The browser cannot
 *  list a folder, and hardcoding "300 frames, three-digit padding" would
 *  silently break the moment the sequence is re-extracted. Sorting is
 *  numeric-aware, so it also survives unpadded or non-contiguous numbering.
 *
 *  In dev the directory is watched: add or remove a frame and the module is
 *  invalidated and the page reloads.
 * -------------------------------------------------------------------- */
function frameSequence(sets: Record<string, string>): Plugin {
  const id = 'virtual:frame-sequence';
  const resolvedId = '\0' + id;
  let root = process.cwd();

  const list = (rel: string): string[] | null => {
    const dir = resolve(root, 'public', rel);
    if (!existsSync(dir)) return null;
    return readdirSync(dir)
      .filter((f) => /\.(jpe?g|png|webp|avif)$/i.test(f))
      .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
      .map((f) => `/${rel}/${f}`);
  };

  return {
    name: 'frame-sequence',
    configResolved(config) {
      root = config.root;
    },
    resolveId(source) {
      if (source === id) return resolvedId;
    },
    load(source) {
      if (source !== resolvedId) return;
      const out = Object.entries(sets).map(
        ([name, rel]) => `export const ${name} = ${JSON.stringify(list(rel))};`,
      );
      return out.join('\n');
    },
    configureServer(server) {
      const dirs = Object.values(sets).map((rel) => resolve(root, 'public', rel));
      dirs.forEach((d) => server.watcher.add(d));
      const onChange = (file: string) => {
        if (!dirs.some((d) => file.startsWith(d))) return;
        const mod = server.moduleGraph.getModuleById(resolvedId);
        if (mod) server.moduleGraph.invalidateModule(mod);
        server.ws.send({ type: 'full-reload' });
      };
      server.watcher.on('add', onChange);
      server.watcher.on('unlink', onChange);
    },
  };
}

export default defineConfig({
  plugins: [
    react({
      jsxRuntime: 'automatic',
    }),
    frameSequence({
      shirt: 'images/shirtvideo',
      shirtMobile: 'images/shirtvideo-mobile',
    }),
  ],
});
