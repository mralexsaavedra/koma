import { config } from "@koma/eslint-config";

export default [
  ...config,
  {
    ignores: ["dist/**", "**/node_modules/**", "**/coverage/**"],
  },
];
