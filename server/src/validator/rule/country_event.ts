import { Context, Rule, Scope, Value } from "./types";

export const country_event: Rule = {
  children: {
    id: { type: Value.UNQUOTED },
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
    immediate: {
      // 現状childrenがないのでエラーになる
      cardinality: [0, 1],
      provide: { context: Context.EFFECT, scope: Scope.COUNTRY },
    },
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
