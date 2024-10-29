import { trigger } from "../triggers";
import { obj, country, array, int, scalar, root, typeDefKey } from "../utils";

const achievement = obj(
  { replace_scope: { root: country(), this: country() } },
  {
    possible: obj(
      { cardinality: [0, Infinity] },
      {
        ...trigger,
      },
    ),
    happened: obj(
      { cardinality: [0, Infinity] },
      {
        ...trigger,
      },
    ),
    ribbon: obj(
      { cardinality: [0, 1] },
      {
        frames: array({}, [int()]),
        colors: array({}, [scalar()]),
      },
    ),
  },
);

export const achievementType = root(
  { path: "/common/achievements", unique: true },
  {
    [typeDefKey("achievement")]: achievement,
  },
);

// For `mod_achievement_id` use achievement type instead
