import { modifier } from "../modifiers";
import {
  obj,
  either,
  enumRef,
  array,
  float,
  air,
  root,
  typeDefKey,
} from "../utils";

const ace = obj(
  {},
  {
    type: either(
      enumRef({}, "air_units"),
      array({ cardinality: [0, Infinity] }, [enumRef({}, "air_units")]),
    ),
    chance: float(),
    effect: obj(
      { replace_scope: { root: air(), this: air() } },
      { ...modifier },
    ),
  },
);

export const aceType = root(
  { path: "/common/aces" },
  {
    modifiers: obj(
      {},
      {
        [typeDefKey("ace")]: ace,
      },
    ),
  },
);
