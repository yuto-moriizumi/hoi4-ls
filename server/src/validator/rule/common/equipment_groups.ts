import {
  obj,
  scalar,
  array,
  enumRef,
  typeRef,
  root,
  typeDefKey,
} from "../utils";

const equipment_group = obj(
  {},
  {
    description: scalar({ cardinality: [0, 1] }),
    equipment_type: array({ cardinality: [0, Infinity] }, [
      enumRef({ cardinality: [0, Infinity] }, "equipment_bonus_type"),
      typeRef({ cardinality: [0, Infinity] }, "equipment_group"),
      enumRef({ cardinality: [0, Infinity] }, "equipment_group_exceptions"),
    ]),
  },
);

export const equipmentGroupExceptions = [
  "modern_tank_amphibious_chassis",
  "super_heavy_tank_flame_chassis",
  "modern_tank_flame_chassis",
];

export const equipmentGroupType = root(
  { path: "game/common/equipment_groups" },
  {
    equipment_group: obj(
      {},
      {
        [typeDefKey("equipment_group")]: equipment_group,
      },
    ),
  },
);
