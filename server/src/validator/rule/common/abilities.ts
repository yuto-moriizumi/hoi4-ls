import { normalize } from "../normalizer";
import { Context, Rule, Scope, Value } from "../types";

const ability: Rule = {
  children: {
    name: { type: Value.UNQUOTED },
    desc: { type: Value.UNQUOTED },
    icon: { type: Value.UNQUOTED, cardinality: [0, 1] },
    sound_effect: { type: Value.UNQUOTED, cardinality: [0, 1] },
    type: { type: Value.UNQUOTED },
    allowed: {
      cardinality: [0, 1],
      provide: { context: [Context.TRIGGER], scope: Scope.COUNTRY },
    },
    cost: { type: Value.NUMBER },
    duration: { type: Value.INT },
    cooldown: { type: Value.INT, cardinality: [0, 1] },
    unit_modifiers: {
      cardinality: [0, 1],
      provide: {
        context: [Context.MODIFIER, Context.UNIT_STAT],
        scope: Scope.UNIT_LEADER,
      },
    },
    one_time_effect: {
      cardinality: [0, 1],
      provide: { context: [Context.EFFECT], scope: Scope.UNIT_LEADER },
    },
    cancelable: { type: Value.BOOL, cardinality: [0, 1] },
    ai_will_do: {
      cardinality: [0, 1],
      children: {
        enum: { type: Value.FLOAT, cardinality: [0, 1] },
        modifier_rule: {
          cardinality: [0, "inf"],
          provide: {
            context: Context.MODIFIER_RULE,
            scope: Scope.NONE,
          },
        },
      },
    },
  },
};

export default normalize(ability);
