import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig(({ mode }) => ({
  base: "./", // chemins relatifs pour la prod (o2switch)
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    // ⛔️ retiré: lovable-tagger (cause __prependToUrl en prod)
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom"],
          ui: ["@radix-ui/react-dialog", "@radix-ui/react-accordion", "@radix-ui/react-tabs"],
          icons: ["lucide-react"],
        },
      },
    },
    minify: "esbuild",
    cssMinify: true,
    reportCompressedSize: false,
    chunkSizeWarningLimit: 1000,
  },
  optimizeDeps: {
    include: [
      "react",
      "react-dom",
      "react-router-dom",
      "@tanstack/react-query",
      "lucide-react",
    ],
  },
}));