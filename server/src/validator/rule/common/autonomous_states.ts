import { base_factor } from "../enums";
import { triggers } from "../triggers";
import { modifier_rule } from "../modifier_rule";
import { modifiers } from "../modifiers";
import {
  EntryDescriptor,
  RootObjectEntryDescriptor,
  Scope,
  Value,
} from "../types";

export const autonomy: RootObjectEntryDescriptor = {
  replaceScope: {
    this: Scope.COUNTRY,
    root: Scope.COUNTRY,
  },
  children: {
    id: Value.LOCALISATION,
    default: { type: Value.BOOL, cardinality: [0, 1] },
    is_puppet: { type: Value.BOOL, cardinality: [0, 1] },
    use_overlord_color: { type: Value.BOOL, cardinality: [0, 1] },
    min_freedom_level: { type: Value.NUMBER, range: [0, 0.99] },
    peace_conference_initial_freedom: {
      type: Value.NUMBER,
      cardinality: [0, 1],
      range: [0, 1],
    },
    manpower_influence: { type: Value.NUMBER, range: [0, 1] },
    rule: {
      children: {
        desc: { type: Value.LOCALISATION, cardinality: [0, 1] },
        game_rules: { type: Value.BOOL, cardinality: [0, 20] },
      },
    },
    modifier: {
      cardinality: [1, Infinity],
      children: modifiers,
    },
    ai_subject_wants_higher: {
      children: {
        factor: Value.NUMBER,
      },
    },
    ai_overlord_wants_lower: {
      children: {
        factor: Value.NUMBER,
      },
    },
    ai_overlord_wants_garrison: {
      cardinality: [0, 1],
      children: triggers,
    },
    allowed: {
      cardinality: [0, 1],
      children: triggers,
    },
    allowed_levels_filter: {
      type: Value.ARRAY,
      values: { type: Value.REFERENCE_TO, tag: "autonomy" },
      cardinality: [1, Infinity],
    },
    use_for_peace_conference_weight: {
      replaceScope: {
        root: Scope.COUNTRY,
        from: Scope.COUNTRY,
      },
      cardinality: [0, 1],
      children: modifier_rule,
      dynamicChildren: [
        {
          key: base_factor,
          value: Value.NUMBER,
        },
      ],
    } satisfies EntryDescriptor,
    can_take_level: {
      cardinality: [0, 1],
      children: triggers,
    },
    can_lose_level: {
      cardinality: [0, 1],
      children: triggers,
    },
  },
};
