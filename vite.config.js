import { defineConfig } from 'vite'
import eslint from 'vite-plugin-eslint'
import sassDts from 'vite-plugin-sass-dts'

export default defineConfig({
  plugins: [
    eslint({
      fix: true
    }),
    sassDts({
      enabledMode: ['development', 'production'],
      global: {
        generate: true
      }
    })
  ]
})
