import { effect } from "../effects";
import { modifier_rule } from "../modifier_rule";
import { modifier } from "../modifiers";
import { trigger } from "../triggers";
import {
  root,
  obj,
  typeDefKey,
  country,
  typeRef,
  scalar,
  enumRefKey,
  float,
  array,
} from "../utils";

// TODO: SUpport this
// export const intelligenceAgencyBranchType = root(
//   { path: "game/common/intelligence_agency_upgrades" },
//   {
//     intelligence_agency_branch: obj(
//       {},
//       {
//         [typeDefKey("intelligence_agency_branch")]: obj(),
//       },
//     ),
//   },
// );

const intelligence_agency_upgrade = obj(
  { replace_scope: { root: country(), this: country() } },
  {
    picture: typeRef({}, "spriteType"),
    frame: typeRef({ cardinality: [0, 1] }, "spriteType"),
    sound: scalar({ cardinality: [0, 1] }),
    ai_will_do: obj(
      { cardinality: [0, 1] },
      {
        [enumRefKey("base_factor")]: float({ cardinality: [0, 1] }),
        ...modifier_rule,
      },
    ),
    modifiers_during_progress: obj(
      { cardinality: [0, 1] },
      {
        ...modifier,
      },
    ),
    available: obj(
      { cardinality: [0, 1] },
      {
        ...trigger,
      },
    ),
    visible: obj(
      { cardinality: [0, 1] },
      {
        ...trigger,
      },
    ),
    level: array({ cardinality: [1, Infinity] }, [
      obj(
        {},
        {
          modifier: obj(
            { cardinality: [0, 1] },
            {
              ...modifier,
            },
          ),
          complete_effect: obj(
            { cardinality: [0, 1] },
            {
              ...effect,
            },
          ),
        },
      ),
    ]),
  },
);

export const intelligenceAgencyUpgradeType = root(
  { path: "game/common/intelligence_agency_upgrades" },
  {
    any: obj(
      {},
      {
        [typeDefKey("intelligence_agency_upgrade")]:
          intelligence_agency_upgrade,
      },
    ),
  },
);
