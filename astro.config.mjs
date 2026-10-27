import { defineConfig } from 'astro/config';
const gh = process.env.DEPLOY_GITHUB_PAGES === 'true';
export default defineConfig({ output: 'static', site: gh ? 'https://kenway-creative.github.io' : undefined, base: gh ? '/Kenway-Creations/' : '/', build: { inlineStylesheets: 'auto' } });
