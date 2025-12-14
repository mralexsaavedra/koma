import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import { defineConfig } from "eslint/config";

import { config as sharedConfig } from "@koma/eslint-config";

const eslintConfig = defineConfig([
  ...sharedConfig,
  ...nextVitals,
  ...nextTs,
  {
    ignores: [".next/**", "dist/**"],
  },
]);

export default eslintConfig;
