import path from "path"
import tailwindcss from "@tailwindcss/vite"
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({

  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  base: './',
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: 'index.html',
        background: 'src/background/background.ts',
        content: 'src/content/content.ts'
      },
      output: {
        entryFileNames: '[name].js'
      }
    },
    copyPublicDir: true // Ensure public/ files are copied
  },
  assetsInclude: ["**/*.png"], // Include PNGs in build
})
