import { effects } from "../effects";
import { modifier_rule } from "../modifier_rule";
import { modifiers } from "../modifiers";
import { triggers } from "../triggers";
import { RootObjectEntryDescriptor, Scope, Value } from "../types";
import { unit_stats } from "../unit_stats";
import { Enum, int, localisation } from "../utils";

export const ability: RootObjectEntryDescriptor = {
  replaceScope: {
    this: Scope.UNIT_LEADER,
    root: Scope.UNIT_LEADER,
    from: Scope.COUNTRY,
  },
  children: {
    name: localisation(),
    desc: localisation(),
    icon: { type: Value.UNQUOTED, cardinality: [0, 1] },
    sound_effect: { type: Value.UNQUOTED, cardinality: [0, 1] },
    type: Enum("ability_unit_leader_types"),
    allowed: {
      cardinality: [0, 1],
      children: { ...triggers },
    },
    cost: { type: Value.FLOAT },
    duration: int(),
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
      children: effects,
    },
    cancelable: { type: Value.BOOL, cardinality: [0, 1] },
    ai_will_do: {
      cardinality: [0, 1],
      children: {
        base_factor: { type: Value.FLOAT, cardinality: [0, 1] },
        modifier: {
          cardinality: [0, Infinity],
          children: modifier_rule,
        },
      },
    },
  },
};
