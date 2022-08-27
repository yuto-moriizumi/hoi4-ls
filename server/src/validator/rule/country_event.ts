import { Context, Rule, Scope, Value } from "./types";

export const country_event: Rule = {
  children: {
    id: { type: Value.UNQUOTED },
    immediate: {
      cardinality: [0, 1],
      children: {
        log: { type: Value.QUOTED },
      },
    },
    title: [
      { type: Value.UNQUOTED },
      {
        children: {
          trigger: {
            provide: { context: Context.CONDITION, scope: Scope.COUNTRY },
          },
          text: { type: Value.UNQUOTED },
        },
      },
    ],
    desc: { type: Value.UNQUOTED },
    picture: { type: Value.UNQUOTED },
    is_triggered_only: { type: Value.BOOL, cardinality: [0, 1] },
    fire_only_once: { type: Value.BOOL, cardinality: [0, 1] },
    option: {
      cardinality: [0, "inf"],
      provide: { context: Context.EFFECT, scope: Scope.COUNTRY },
      children: {
        name: { type: Value.UNQUOTED },
        ai_chance: {
          cardinality: [0, 1],
          children: { factor: { type: Value.NUMBER } },
        },
      },
    },
  },
};
