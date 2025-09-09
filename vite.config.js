import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    historyApiFallback: true, // ⬅️ ensures React Router routes work
    proxy: {
      "/api": "http://localhost:4000",
    },
  },
});
