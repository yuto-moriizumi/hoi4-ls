import { modifier_rule } from "../modifier_rule";
import { triggers } from "../triggers";
import { unit_stats } from "../unit_stats";
import { Value, RootObjectEntryDescriptor, Scope } from "../types";
import { Enum, number } from "../utils";

export const combat_tactic: RootObjectEntryDescriptor = {
  replaceScope: {
    this: Scope.COMBAT,
    root: Scope.COMBAT,
    from: Scope.COMBAT,
  },
  children: {
    only_show_for: {
      type: Value.REFERENCE_TO,
      tag: "country",
      cardinality: [0, 1],
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
      type: Value.REFERENCE_TO,
      tag: "combat_tactic",
      cardinality: [0, 1],
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
