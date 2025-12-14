import { createRequire } from "module";

const require = createRequire(import.meta.url);

const baseConfig = require("@koma/prettier-config/index.json");
const prettierConfigPath =
  require.resolve("@koma/prettier-config/package.json");

export default {
  ...baseConfig,
  plugins: [
    require.resolve("@trivago/prettier-plugin-sort-imports", {
      paths: [prettierConfigPath],
    }),
    require.resolve("prettier-plugin-tailwindcss", {
      paths: [prettierConfigPath],
    }),
  ],
};
