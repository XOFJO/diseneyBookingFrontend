import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  preview: {
    allowedHosts: ["disneybookingbackend-production-4ce8.up.railway.app"],
  },
  server: {
    proxy: {
      "/api": {
        target: "https://disneybookingbackend-production-4ce8.up.railway.app",
        changeOrigin: true,
        secure: true,
        // rewrite: (path) => path.replace(/^\/api/, "/api"),
      },
    },
  },
});
