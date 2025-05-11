import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
export default defineConfig({
  plugins: [
      react(),
      tailwindcss()
  ],
    server: {
        proxy: {
            '/ai/chat': {
                target: 'https://my-app.yangcongzhao123.workers.dev', // 替换为你的 Cloudflare Workers 域名
                changeOrigin: true,
                secure: true,
            },
        },
    },
})
