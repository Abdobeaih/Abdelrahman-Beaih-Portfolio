import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';

/**
 * `vite preview` serves HTML without a charset in the Content-Type header, which
 * fails Lighthouse's `charset` best-practices audit even though `<meta charset>`
 * is present. Production hosts (Vercel/Netlify) send it correctly; this only
 * normalises the local preview so audits match production.
 */
function previewCharset(): Plugin {
  return {
    name: 'preview-charset',
    configurePreviewServer(server) {
      server.middlewares.use((_req, res, next) => {
        const original = res.setHeader.bind(res);
        res.setHeader = ((name: string, value: number | string | readonly string[]) => {
          if (
            name.toLowerCase() === 'content-type' &&
            typeof value === 'string' &&
            value.toLowerCase().startsWith('text/html') &&
            !value.toLowerCase().includes('charset')
          ) {
            return original(name, `${value}; charset=utf-8`);
          }
          return original(name, value);
        }) as typeof res.setHeader;
        next();
      });
    },
  };
}

export default defineConfig({
  plugins: [react(), previewCharset()],
  build: {
    target: 'es2020',
    cssCodeSplit: true,
    sourcemap: false,
    // three + fibre + drei live in their own lazily-fetched vendor chunks (only
    // requested by the JourneyScene chunk), so they cache independently of the
    // app code and never ship in the initial bundle.
    // three/fibre/drei stay inside the lazily-imported JourneyScene chunk (they
    // are only reachable through its dynamic import), so they are never part of
    // the initial JS graph. That chunk is intentionally large; it is fetched
    // one viewport before the journey section is seen.
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: {
          gsap: ['gsap'],
          react: ['react', 'react-dom'],
        },
      },
    },
  },
});
