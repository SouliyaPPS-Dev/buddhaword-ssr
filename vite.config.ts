import { defineConfig, loadEnv } from "vite";
import { devtools } from "@tanstack/devtools-vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import { nitro } from "nitro/vite";
import viteReact from "@vitejs/plugin-react";
import viteTsConfigPaths from "vite-tsconfig-paths";
import { fileURLToPath, URL } from "url";

import tailwindcss from "@tailwindcss/vite";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "VITE_");

  return {
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
    define: {
      "process.env": env,
    },
    plugins: [
      devtools(),
      viteTsConfigPaths({
        projects: ["./tsconfig.json"],
      }),
      tailwindcss(),
      tanstackStart(),
      nitro(),
      viteReact({
        babel: {
          plugins: ["babel-plugin-react-compiler"],
        },
      }),
    ],
  };
});
