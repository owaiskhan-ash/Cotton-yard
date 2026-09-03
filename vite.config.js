import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    host: '0.0.0.0',
    port: 5173,
    strictPort: true,
    // allow the sandboxed preview host + any tunnel domain
    allowedHosts: true,
    hmr: { clientPort: 443 }
  },
  preview: { host: '0.0.0.0', port: 4173, allowedHosts: true },
  build: {
    target: 'es2020',
    assetsInlineLimit: 4096,
    cssCodeSplit: false
  }
})
