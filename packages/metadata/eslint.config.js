import { config } from "@koma/eslint-config";

export default [
  ...config,
  {
    ignores: ["dist/**"],
  },
];
