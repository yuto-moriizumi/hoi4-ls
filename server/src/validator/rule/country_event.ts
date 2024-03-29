import { normalize } from "./normalizer";
import { Context, Rule, Scope, Value } from "./types";

const country_event: Rule = {
  children: {
    id: { type: Value.UNQUOTED },
    title: [
      { type: Value.UNQUOTED },
      {
        children: {
          trigger: {
            provide: { context: Context.TRIGGER, scope: Scope.COUNTRY },
          },
          text: { type: Value.UNQUOTED },
        },
      },
    ],
    desc: { type: Value.UNQUOTED },
    picture: { type: Value.UNQUOTED },
    is_triggered_only: {
      type: Value.BOOL,
      cardinality: [0, 1],
      defaultValue: false,
    },
    fire_only_once: {
      type: Value.BOOL,
      cardinality: [0, 1],
      defaultValue: false,
    },
    immediate: {
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

export default normalize(country_event);
