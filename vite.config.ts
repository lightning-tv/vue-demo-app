import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import hexColorTransform from "@lightningtv/vite-hex-transform";
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    hexColorTransform(),
    vue({
      template: {
        compilerOptions: {
          isCustomElement: (tag) => ['node', 'view', 'text'].includes(tag),
        },
      },
    }),
   vueJsx(),
  ],
  build: {
    rollupOptions: {
      input: {
        main: 'index.html',
      },
    },
    outDir: 'dist',
    emptyOutDir: true,
  },
  // This allows us to use pnpm link for @lightningtv/vue
  optimizeDeps: {
    exclude: ["@lightningjs/renderer", "@lightningtv/vue", "@lightningtv/solid-ui", 
      "@lightningtv/core", "vue", "@vue/runtime-core", "@vue/reactivity", "@lightningtv/solid"],
  },
  resolve: {
    alias: {
      theme: path.resolve(__dirname, './src/material-theme.json'),
    },
    dedupe: [
      "vue",
      "@vue/shared",
      "@vue/runtime-core",
      "@vue/reactivity",
      "@lightningjs/renderer",
      "@lightningtv/core",
    ],
  },
});
