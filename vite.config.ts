import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig(({ command }) => ({
  base: command === "build" ? "/Thrasher_Haloween_2/" : "/",
  plugins: [react(), tailwindcss()],
}));
