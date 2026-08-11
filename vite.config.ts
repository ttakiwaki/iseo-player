import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      manifest: {
        name: "iseo-player",
        short_name: "iseo",
        start_url: "/",
        display: "standalone",
        background_color: "#f5f5f5",
        theme_color: "#f5f5f5",
        icons: [
          { src: "/iseo-192.png", sizes: "192x192", type: "image/png" },
          { src: "/iseo-512.png", sizes: "512x512", type: "image/png" },
        ],
      },
    }),
  ],
  server: {
    proxy: {
      "/lrclib": {
        target: "https://lrclib.net",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/lrclib/, ""),
      },
    },
  },
});
