import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],

  build: {
    outDir: "dist/widget",

    emptyOutDir: true,

    lib: {
      entry: "embedding/index.tsx",
      name: "HireFlowWidget",
      formats: ["iife"],
      fileName: () => "widget.js",
    },

    cssCodeSplit: false,

    minify: true,
  },

  define: {
    "process.env.NODE_ENV": JSON.stringify("production"),
  },
});