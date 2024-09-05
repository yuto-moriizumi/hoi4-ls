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
  { path: "game/common/achievements", unique: true },
  {
    [typeDefKey("achievement")]: achievement,
  },
);

export const mod_achievement_id = complexEnum(
  {
    path: "game/common/achievements",
    unique: true,
    start_from_root: true,
  },
  {
    name: {
      unique_id: scalar({ use_enum_name: true }),
    },
  },
);
