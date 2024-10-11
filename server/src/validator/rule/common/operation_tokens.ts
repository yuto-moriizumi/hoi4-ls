import {
  obj,
  localisation,
  typeRef,
  enumRef,
  float,
  root,
  typeDefKey,
} from "../utils";

export const intel_types = ["navy", "army", "civilian", "airforce"];

const operation_token = obj(
  {},
  {
    name: localisation(),
    desc: localisation(),
    icon: typeRef({}, "spriteType"),
    text_icon: typeRef({}, "spriteType"),
    targeted_modifier: typeRef(
      { cardinality: [0, Infinity] },
      "dynamic_modifier",
    ),
    intel_source: enumRef({ cardinality: [0, 1] }, intel_types),
    intel_gain: float({ cardinality: [0, 1] }),
  },
);

export const operationTokenType = root(
  { path: "game/common/operation_tokens" },
  {
    operation_token: obj(
      {},
      {
        [typeDefKey("operation_token")]: operation_token,
      },
    ),
  },
);
