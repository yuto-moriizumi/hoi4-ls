import { modifier_rule } from "../modifier_rule";
import { triggers } from "../triggers";
import { unit_stats } from "../unit_stats";
import { Value, RootObjectEntryDescriptor, Scope } from "../types";
import { Enum, number, ref } from "../utils";

export const combat_tactic: RootObjectEntryDescriptor = {
  replaceScope: {
    this: Scope.COMBAT,
    root: Scope.COMBAT,
    from: Scope.COMBAT,
  },
  children: {
    only_show_for: {
      cardinality: [0, 1],
      ...ref("country"),
    },
    is_attacker: { type: Value.BOOL },
    trigger: {
      children: {
        is_attacker: { type: Value.BOOL },
        phase: Enum("phases"),
        ...triggers,
      },
    },
    active: { type: Value.BOOL, cardinality: [0, 1] },
    base: {
      cardinality: [0, 1],
      children: {
        base_factor: { type: Value.FLOAT },
        ...modifier_rule,
      },
    },
    picture: { type: Value.UNQUOTED },
    countered_by: {
      cardinality: [0, 1],
      ...ref("combat_tactic"),
    },
    phase: { type: Value.ARRAY, values: Enum("phases"), cardinality: [0, 1] },
    display_phase: {
      type: Value.ARRAY,
      values: Enum("phases"),
      cardinality: [0, 1],
    },
    attacker_movement_speed: { type: Value.FLOAT, cardinality: [0, 1] },
    ...unit_stats,
  },
  dynamicChildren: [
    {
      key: Enum("attack_defend"),
      value: number(),
      cardinality: [1, 2],
    },
  ],
};
