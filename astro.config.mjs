import { defineConfig } from 'astro/config';

// Static output: no server, no database. Deployable to any static host.
export default defineConfig({ output: 'static', build: { inlineStylesheets: 'auto' } });
