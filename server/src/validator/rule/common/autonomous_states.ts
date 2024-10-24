import { modifier_rule } from "../modifier_rule";
import { modifier } from "../modifiers";
import { trigger } from "../triggers";
import {
  root,
  obj,
  typeDefKey,
  country,
  localisation,
  bool,
  float,
  enumRefKey,
  array,
  typeRef,
} from "../utils";

export const autonomyType = root(
  { path: "game/common/autonomous_states" },
  {
    autonomy: obj(
      {},
      {
        [typeDefKey("autonomy")]: obj(
          { replace_scope: { this: country(), root: country() } },
          {
            id: localisation(),
            default: bool({ cardinality: [0, 1] }),
            is_puppet: bool({ cardinality: [0, 1] }),
            use_overlord_color: bool({ cardinality: [0, 1] }),
            min_freedom_level: float({}, 0, 0.99),
            peace_conference_initial_freedom: float(
              { cardinality: [0, 1] },
              0,
              1,
            ),
            manpower_influence: float({}, 0, 1),
            rule: obj(
              {},
              {
                desc: localisation({ cardinality: [0, 1] }),
                [enumRefKey("game_rules")]: bool({ cardinality: [0, 20] }),
              },
            ),
            modifier: obj({ cardinality: [1, Infinity] }, { ...modifier }),
            ai_subject_wants_higher: obj(
              {},
              {
                factor: float(),
              },
            ),
            ai_overlord_wants_lower: obj(
              {},
              {
                factor: float(),
              },
            ),
            ai_overlord_wants_garrison: obj(
              { cardinality: [0, 1] },
              { ...trigger },
            ),
            allowed: obj({ cardinality: [0, 1] }, { ...trigger }),
            allowed_levels_filter: array({ cardinality: [0, 1] }, [
              typeRef({ cardinality: [1, Infinity] }, "autonomy"),
            ]),
            use_for_peace_conference_weight: obj(
              {
                replace_scope: { root: country(), from: country() },
                cardinality: [0, 1],
              },
              {
                [enumRefKey("base_factor")]: float({ cardinality: [0, 1] }),
                ...modifier_rule,
              },
            ),
            can_take_level: obj({ cardinality: [0, 1] }, { ...trigger }),
            can_lose_level: obj({ cardinality: [0, 1] }, { ...trigger }),
          },
        ),
      },
    ),
  },
);
