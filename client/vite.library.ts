import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), dts()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    emptyOutDir: true,
    outDir: path.resolve(__dirname, "../../inspector/dist"),
    lib: {
      entry: path.resolve(__dirname, "./src/lib.ts"),
      name: "InspectorApp",
      formats: ["es"],
      fileName: "index",
    },
    minify: false,
    rollupOptions: {
      external: [
        "react",
        "react-dom",
        "react/jsx-runtime",
        "prismjs",
        "prismjs/components/prism-json",
        "prismjs/themes/prism.css",
      ],
      // output: {
      //   manualChunks: undefined,
      // },
    },
  },
});
