import { modifier_rule } from "../modifier_rule";
import { trigger } from "../triggers";
import { unit_stat } from "../unit_stats";
import {
  obj,
  scopeRef,
  bool,
  enumRef,
  enumRefKey,
  float,
  scalar,
  typeRef,
  root,
  typeDefKey,
  combat,
} from "../utils";

export const phases = [
  "no",
  "close_combat",
  "tactical_withdrawal",
  "seize_bridge",
  "hold_bridge",
  "main",
  "city_combat",
];

export const attack_defend = ["attacker", "defender"];

const combat_tactic = obj(
  { replace_scope: { this: combat(), root: combat(), from: combat() } },
  {
    only_show_for: scopeRef({ cardinality: [0, 1] }, "country"),
    is_attacker: bool(),
    trigger: obj(
      {},
      {
        is_attacker: bool(),
        phase: enumRef({}, phases),
        ...trigger,
      },
    ),
    active: bool({ cardinality: [0, 1] }),
    base: obj(
      {},
      {
        [enumRefKey("base_factor")]: float({ cardinality: [0, 1] }),
        ...modifier_rule,
      },
    ),
    picture: scalar(),
    countered_by: typeRef({ cardinality: [0, 1] }, "combat_tactic"),
    phase: enumRef({ cardinality: [0, 1] }, phases),
    display_phase: enumRef({ cardinality: [0, 1] }, phases),
    [enumRefKey("attack_defend")]: float({ cardinality: [1, 2] }),
    attacker_movement_speed: float({ cardinality: [0, 1] }),
    ...unit_stat,
  },
);

export const combatTacticType = root(
  { path: "game/common" },
  {
    combat_tactic: obj(
      {},
      {
        [typeDefKey("combat_tactic")]: combat_tactic,
      },
    ),
  },
);
