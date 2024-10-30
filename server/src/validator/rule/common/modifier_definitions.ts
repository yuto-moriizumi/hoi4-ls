import { obj, enumRef, int, root, typeDefKey } from "../utils";

export const modifier_color_type = ["good", "neutral", "bad"];
export const modifier_value_type = [
  "number",
  "percentage",
  "percentage_in_hundred",
  "yes_no",
];
export const modifier_post_fix = ["none", "days", "hours", "daily"];
export const modifier_category = [
  "none",
  "all",
  "naval",
  "air",
  "unit_leader",
  "country",
  "state",
  "army",
  "peace",
  "politics",
  "ai",
  "defensive",
  "aggressive",
  "war_production",
  "military_advancements",
  "military_equipment",
  "autonomy",
  "government_in_exile",
  "intelligence_agency",
];

const modifier_definition = obj(
  {},
  {
    color_type: enumRef({ cardinality: [0, 1] }, modifier_color_type),
    value_type: enumRef({ cardinality: [0, 1] }, modifier_value_type),
    precision: int({ cardinality: [0, 1] }),
    postfix: enumRef({ cardinality: [0, 1] }, modifier_post_fix),
    category: enumRef({ cardinality: [0, Infinity] }, modifier_category),
  },
);

export const modifierDefinitionType = root(
  { path: "/common/modifier_definitions" },
  {
    modifier_definition: obj(
      {},
      {
        [typeDefKey("modifier_definition")]: modifier_definition,
      },
    ),
  },
);
