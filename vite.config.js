import { defineConfig } from 'vite'
import legacy from '@vitejs/plugin-legacy'
import vue from '@vitejs/plugin-vue'
import vueI18n from '@intlify/vite-plugin-vue-i18n'

const path = require('path')

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true
      }
    }
  },
  base: '',
  plugins: [
    vue(),
    vueI18n({
      include: path.resolve(__dirname, './src/i18n/**')
    }),
    legacy({
      targets: ['defaults'],
      polyfills: ['es.promise.finally', 'es/map', 'es/set']
    })
  ],
  define: { 'process.env': {} },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  /* remove the need to specify .vue files https://vitejs.dev/config/#resolve-extensions
  resolve: {
    extensions: [
      '.js',
      '.json',
      '.jsx',
      '.mjs',
      '.ts',
      '.tsx',
      '.vue',
    ]
  },
  */
})
