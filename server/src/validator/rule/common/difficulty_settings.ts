import {
  obj,
  value_set,
  typeRef,
  array,
  enumRef,
  float,
  root,
  typeDefKey,
} from "../utils";

const difficulty_setting = obj(
  {},
  {
    key: value_set({}, "difficulty_setting"),
    modifier: typeRef({}, "static_modifier"),
    countries: array({}, [
      enumRef({ cardinality: [1, Infinity] }, "country_tags"),
    ]),
    multiplier: float(),
  },
);

export const difficultySettingType = root(
  { path: "game/common/difficulty_settings" },
  {
    difficulty_settings: obj(
      {},
      {
        [typeDefKey("difficulty_setting")]: difficulty_setting,
      },
    ),
  },
);
