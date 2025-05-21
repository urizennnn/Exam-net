// eslint.config.mjs
import antfu from "@antfu/eslint-config";

export default antfu({
  type: "app",
  vue: true,
  typescript: true,
  formatters: true,
  stylistic: {
    indent: 2,
    semi: true,
    quotes: "double",
  },
}, {
  rules: {
    "ts/consistent-type-definitions": ["error", "type"],
    "object-curly-newline": ["error", "always"],
    "no-console": ["warn"],
    "function-paren-newline": ["error", "never"],
    "antfu/no-top-level-await": ["off"],
    "node/prefer-global/process": ["off"],
    "node/no-process-env": ["error"],
    "perfectionist/sort-imports": [
      "error",
      {
        tsconfigRootDir: ".",
      },
    ],
  },
});
