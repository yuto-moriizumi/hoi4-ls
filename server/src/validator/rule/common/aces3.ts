import { modifier } from "../modifiers";
import {
  obj,
  enumRef,
  enumRefKey,
  float,
  root,
  typeDefKey,
  either,
  array,
  air,
} from "../utils";

const ace = obj(
  {},
  {
    type: either(
      enumRef({}, "air_units"),
      array({}, [enumRef({ cardinality: [~1, Infinity] }, "air_units")]),
    ),
    chance: float(),
    effect: obj(
      { replace_scope: { ROOT: air(), THIS: air() } },
      {
        ...modifier,
      },
    ),
  },
);

export const aceType = root(
  { path: "game/common/aces" },
  {
    modifiers: obj(
      {},
      {
        [typeDefKey("ace")]: ace,
      },
    ),
  },
);
