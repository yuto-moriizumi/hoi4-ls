import { effect } from "../effects";
import { modifier_rule } from "../modifier_rule";
import { trigger } from "../triggers";
import {
  root,
  obj,
  typeDefKey,
  literal,
  scalar,
  either,
  typeRef,
  localisation,
} from "../utils";

const scripted_trigger = obj(
  {},
  {
    ...trigger,
  },
);

const scripted_effect = obj(
  {},
  {
    ...effect,
  },
);

const scripted_loc = obj(
  {},
  {
    name: scalar(),
    text: obj(
      { cardinality: [0, Infinity] },
      {
        trigger: obj(
          { cardinality: [0, 1] },
          {
            ...trigger,
          },
        ),
        localization_key: either(
          localisation({ cardinality: [0, 1] }),
          typeRef({ cardinality: [0, 1] }, "spriteType"),
        ),
        random_list: obj(
          { cardinality: [0, 1] },
          {
            int: obj(
              { cardinality: [1, Infinity] },
              {
                ...modifier_rule,
                localization_key: either(
                  localisation(),
                  typeRef({}, "spriteType"),
                ),
              },
            ),
          },
        ),
      },
    ),
  },
);

export const scriptedTriggerType = root(
  { path: "/common/scripted_triggers" },
  {
    trigger: obj(
      {},
      {
        [typeDefKey("scripted_trigger")]: scripted_trigger,
      },
    ),
  },
);

export const scriptedEffectType = root(
  { path: "/common/scripted_effects" },
  {
    effect: obj(
      {},
      {
        [typeDefKey("scripted_effect")]: scripted_effect,
      },
    ),
  },
);

export const scriptedLocType = root(
  { path: "/common/scripted_loc" },
  {
    name: literal("name"),
    loc: obj(
      {},
      {
        [typeDefKey("scripted_loc")]: scripted_loc,
      },
    ),
  },
);
