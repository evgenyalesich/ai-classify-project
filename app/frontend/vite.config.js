import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/classify": "http://127.0.0.1:8000",
    },
  },
  build: {
    outDir: "../app/static", // билд кладём в app/static
    emptyOutDir: true,
  },
});
