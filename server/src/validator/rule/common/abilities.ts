import { effect } from "../effects";
import { modifier, modifierRule } from "../modifiers";
import { trigger } from "../triggers";
import { unitStat } from "../unit_stats";
import {
  localisation,
  scalar,
  float,
  int,
  literal,
  unitLeader,
  country,
  obj,
  typeRef,
  enumRef,
  bool,
} from "../utils";

const ability = obj(
  {
    replace_scope: { this: unitLeader(), root: unitLeader(), from: country() },
  },
  {
    name: localisation(),
    desc: localisation(),
    icon: typeRef({ cardinality: [0, 1], severity: "warning" }, "spriteType"),
    sound_effect: scalar({ cardinality: [0, 1] }),
    type: enumRef("ability_unit_leader_types"),
    allowed: obj(
      { cardinality: [0, 1] },
      {
        ...trigger,
      },
    ),
    cost: float(),
    duration: int(),
    cooldown: int({ cardinality: [0, 1] }),
    unit_modifiers: obj(
      { cardinality: [0, 1] },
      {
        ...modifier,
        ...unitStat,
      },
    ),
    one_time_effect: obj(
      { cardinality: [0, 1] },
      {
        ...effect,
      },
    ),
    cancelable: bool({ cardinality: [0, 1] }),
    ai_will_do: obj(
      { cardinality: [0, 1] },
      {
        enum_base_factor: float(),
        ...modifierRule,
      },
    ),
  },
);

const abilityEnums = {
  ability_unit_leader_types: enumType(["army_leader"]),
};

const abilityType = obj(
  {},
  {
    path: literal("game/common/abilities"),
    skip_root_key: literal("ability"),
  },
);
