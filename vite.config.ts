import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // Raise warning limit slightly — big Radix/Framer bundles are expected
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        manualChunks: {
          // Core React
          "react-vendor": ["react", "react-dom"],
          // Routing
          "router":       ["react-router-dom"],
          // Animation
          "motion":       ["framer-motion"],
          // Radix UI primitives (large but tree-shaken per chunk)
          "radix":        [
            "@radix-ui/react-accordion",
            "@radix-ui/react-dialog",
            "@radix-ui/react-dropdown-menu",
            "@radix-ui/react-tabs",
            "@radix-ui/react-tooltip",
            "@radix-ui/react-popover",
            "@radix-ui/react-select",
            "@radix-ui/react-slot",
          ],
          // Data / query
          "query":        ["@tanstack/react-query"],
          // Supabase
          "supabase":     ["@supabase/supabase-js"],
        },
      },
    },
  },
}));
