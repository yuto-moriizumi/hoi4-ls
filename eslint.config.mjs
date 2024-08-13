import pluginJs from "@eslint/js";
import tsEslint from "typescript-eslint";

export default [
  {
    ignores: [
      "server/src/parser/clausewitz.ts",
      "server/src/validator/rule/wip",
    ],
  },
  pluginJs.configs.recommended,
  ...tsEslint.configs.recommended,
];
