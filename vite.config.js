import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [react()],
    server: {
      host: true, // 👈 needed so Replit can access it
      port: Number(env.VITE_PORT || 3000), // 👈 Replit expects 3000
      strictPort: true,
    },
    preview: {
      host: true,
      port: Number(env.VITE_PORT || 3000),
      strictPort: true,
    },
  }
})
