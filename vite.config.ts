import react from "@vitejs/plugin-react-swc";

import { defineConfig, loadEnv } from "vite";

import svgr from "vite-plugin-svgr";

const env = loadEnv("all", process.cwd());

export default defineConfig({
  optimizeDeps: {
    exclude: ["js-big-decimal"],
  },
  plugins: [react(), svgr()],
  resolve: {
    alias: [{ find: "@", replacement: "/src" }],
  },
  server: {
    proxy: {
      "/api/base/": {
        target: env.VITE_BASE_API_URL,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/base/, ""),
      },
    },
  },
  preview: {
    allowedHosts: ["test-service-280931643377.asia-southeast1.run.app"],
  },
});
