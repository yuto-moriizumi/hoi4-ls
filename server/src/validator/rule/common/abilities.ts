import { modifiers } from "../modifiers";
import { normalize } from "../normalizer";
import { triggers } from "../triggers";
import { Context, Rule, Scope, Value } from "../types";
import { unit_stats } from "../unit_stats";

const ability: Rule = {
  replaceScope: {
    this: Scope.UNIT_LEADER,
    root: Scope.UNIT_LEADER,
    from: Scope.COUNTRY,
  },
  children: {
    name: { type: Value.UNQUOTED },
    desc: { type: Value.UNQUOTED },
    icon: { type: Value.UNQUOTED, cardinality: [0, 1] },
    sound_effect: { type: Value.UNQUOTED, cardinality: [0, 1] },
    type: { type: Value.UNQUOTED },
    allowed: {
      cardinality: [0, 1],
      children: { ...triggers },
    },
    cost: { type: Value.NUMBER },
    duration: { type: Value.INT },
    cooldown: { type: Value.INT, cardinality: [0, 1] },
    unit_modifiers: {
      cardinality: [0, 1],
      children: {
        ...modifiers,
        ...unit_stats,
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
