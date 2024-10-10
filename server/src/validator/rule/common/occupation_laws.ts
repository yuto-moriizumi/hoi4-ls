import { modifier_rule } from "../modifier_rule";
import { modifier } from "../modifiers";
import { trigger } from "../triggers";
import {
  root,
  obj,
  localisation,
  either,
  scalar,
  int,
  country,
  typeRef,
  bool,
  state,
  enumRefKey,
  float,
} from "../utils";

export const occupationLawType = root(
  { path: "game/common/occupation_laws" },
  {
    occupation_law: obj(
      {},
      {
        tooltip: localisation({ cardinality: [0, 1] }),
        icon: either(
          scalar({ cardinality: [0, 1] }),
          int({ cardinality: [0, 1] }),
        ),
        sound_effect: scalar({ cardinality: [0, 1] }),
        visible: obj(
          {
            replace_scope: { this: country(), root: country() },
            cardinality: [0, 1],
          },
          { ...trigger },
        ),
        available: obj(
          {
            replace_scope: {
              this: country(),
              root: country(),
              from: country(),
            },
            cardinality: [0, 1],
          },
          { ...trigger },
        ),
        fallback_law: typeRef({ cardinality: [0, 1] }, "occupation_law"),
        default_law: bool({ cardinality: [0, 1] }),
        starting_law: bool({ cardinality: [0, 1] }),
        main_fallback_law: bool({ cardinality: [0, 1] }),
        state_modifier: obj(
          { push_scope: state(), cardinality: [0, Infinity] },
          { ...modifier },
        ),
        suppressed_state_modifier: obj(
          { push_scope: state(), cardinality: [0, 1] },
          { ...modifier },
        ),
        gui_order: int({ cardinality: [0, 1] }),
        ai_will_do: obj(
          {
            replace_scope: {
              this: state(),
              root: state(),
              from: country(),
              fromfrom: country(),
            },
            cardinality: [0, 1],
          },
          {
            [enumRefKey("base_factor")]: float({ cardinality: [0, 1] }),
            ...modifier_rule,
          },
        ),
      },
    ),
  },
);
