import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    host: '0.0.0.0',
    port: 3000,
    strictPort: true,
    // allow the sandboxed preview host + any tunnel domain
    allowedHosts: true
  },
  preview: { host: '0.0.0.0', port: 3000, allowedHosts: true },
  build: {
    target: 'es2020',
    assetsInlineLimit: 4096,
    cssCodeSplit: false
  }
})
