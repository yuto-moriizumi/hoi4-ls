import { obj, int, bool, float, enumRefKey, root, typeDefKey } from "../utils";

const opinion = obj(
  {},
  {
    value: int(),
    trade: bool({ cardinality: [0, 1] }),
    decay: float({ cardinality: [0, 1] }),
    min_trust: int({ cardinality: [0, 1] }),
    max_trust: int({ cardinality: [0, 1] }),
    target: bool({ cardinality: [0, 1] }),
    [enumRefKey("opinion_timer")]: int({ cardinality: [0, 1] }),
  },
);

export const opinion_timer = ["days", "months", "years"];

export const opinionType = root(
  { path: "/common/opinion_modifiers" },
  {
    opinion_modifiers: obj(
      {},
      {
        [typeDefKey("opinion")]: opinion,
      },
    ),
  },
);
