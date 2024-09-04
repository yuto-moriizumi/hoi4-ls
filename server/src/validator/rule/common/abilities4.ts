import { effect } from "../effects";
import { modifier_rule } from "../modifier_rule";
import { modifier } from "../modifiers";
import { trigger } from "../triggers";
import { unit_stat } from "../unit_stats";
import {
  obj,
  unit_leader,
  country,
  localisation,
  typeRef,
  scalar,
  enumRef,
  float,
  int,
  bool,
  enumRefKey,
  typeDefKey,
  root,
} from "../utils";

export const ability_unit_leader_types = ["army_leader"];

const ability = obj(
  {
    replace_scope: {
      this: unit_leader(),
      root: unit_leader(),
      from: country(),
    },
  },
  {
    name: localisation(),
    desc: localisation(),
    icon: typeRef({ cardinality: [0, 1], severity: "warning" }, "spriteType"),
    sound_effect: scalar({ cardinality: [0, 1] }),
    type: enumRef({}, "ability_unit_leader_types"),
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
        ...unit_stat,
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
        [enumRefKey("base_factor")]: float({ cardinality: [0, 1] }),
        ...modifier_rule,
      },
    ),
  },
);

export const abilityType = root(
  { path: "game/common/abilities" },
  {
    ability: obj(
      {},
      {
        [typeDefKey("ability")]: ability,
      },
    ),
  },
);
