import {
  root,
  obj,
  localisation,
  enumRef,
  typeRef,
  array,
  value_set,
  bool,
} from "../utils";

export const gameRuleType = root(
  { path: "game/common/game_rules" },
  {
    game_rule: obj(
      {},
      {
        name: localisation(),
        required_dlc: enumRef({ cardinality: [0, 1] }, "dlc"),
        desc: localisation({ cardinality: [0, 1] }),
        group: localisation(),
        icon: typeRef(
          { cardinality: [0, 1], severity: "warning" },
          "spriteType",
        ),
        option: array({ cardinality: [0, Infinity] }, [
          obj(
            {},
            {
              name: value_set({}, "game_rule_options"),
              text: localisation(),
              desc: localisation(),
              allow_achievements: bool({ cardinality: [0, 1] }),
              required_dlc: enumRef({ cardinality: [0, 1] }, "dlc"),
            },
          ),
        ]),
        default: obj(
          { cardinality: [0, 1] },
          {
            name: value_set({}, "game_rule_options"),
            text: localisation(),
            desc: localisation(),
            allow_achievements: bool({ cardinality: [0, 1] }),
            required_dlc: enumRef({ cardinality: [0, 1] }, "dlc"),
          },
        ),
      },
    ),
  },
);
