import { Rule, Value } from "./types";

export const country_event: Rule = {
  syntax: {
    id: { type: Value.UNQUOTED },
    immediate: {
      optional: true,
      syntax: {
        log: { type: Value.QUOTED },
      },
    },
    title: { type: Value.UNQUOTED },
    desc: { type: Value.UNQUOTED },
    picture: { type: Value.UNQUOTED },
    is_triggered_only: { type: Value.BOOL },
    fire_only_once: { type: Value.BOOL },
    option: {
      syntax: {
        name: { type: Value.UNQUOTED },
        ai_chance: {
          syntax: { factor: { type: Value.NUMBER } },
        },
      },
    },
  },
} as const;
