import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  preview: {
    allowedHosts: ["diseneybookingfrontend-production.up.railway.app"],
  },
  server: {
    proxy: {
      "/api": {
        target: "https://disneybookingbackend-production.up.railway.app",
        changeOrigin: true,
        secure: true,
        // rewrite: (path) => path.replace(/^\/api/, "/api"),
      },
    },
  },
});
