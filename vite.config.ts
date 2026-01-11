import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig(({ command }) => {
  const isGitHubPages = process.env.GITHUB_ACTIONS === "true";
  const repoName = "/Thrasher_Haloween_2/";
  
  return {
    base: isGitHubPages ? repoName : "/",
    plugins: [react(), tailwindcss()],
  };
});
