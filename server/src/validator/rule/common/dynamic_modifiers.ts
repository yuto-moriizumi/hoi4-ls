import { trigger } from "../triggers";
import {
  obj,
  typeRef,
  bool,
  either,
  variable_field,
  localisation,
  root,
  typeDefKey,
} from "../utils";

const dynamic_modifier = obj(
  {},
  {
    icon: typeRef({ cardinality: [0, 1] }, "spriteType"),
    attacker_modifier: bool({ cardinality: [0, 1] }, true),
    enable: obj(
      { cardinality: [0, 1] },
      {
        ...trigger,
      },
    ),
    remove_trigger: obj(
      { cardinality: [0, 1] },
      {
        ...trigger,
      },
    ),
    alias_keys_field: either(
      ...variable_field({ cardinality: [0, Infinity] }),
      localisation({ cardinality: [0, Infinity] }),
    ),
  },
);

export const dynamicModifierType = root(
  { path: "/common/dynamic_modifiers" },
  {
    dynamic_modifier: obj(
      {},
      {
        [typeDefKey("dynamic_modifier")]: dynamic_modifier,
      },
    ),
  },
);
