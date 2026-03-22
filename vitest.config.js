import { loadEnvFile } from "node:process";
import { existsSync } from "node:fs";
import { defineConfig } from "vitest/config";

export default defineConfig(() => {
  const env = existsSync(".env") ? loadEnvFile() : {};

  return {
    test: {
      env,
    },
  };
});
