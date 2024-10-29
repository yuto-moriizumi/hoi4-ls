import { modifier } from "../modifiers";
import { unit_stat, air_stat, naval_stat } from "../temp_modifiers";
import { trigger } from "../triggers";
import { either, obj, root, typeDefKey, array } from "../utils";

const static_modifier = either(
  obj(
    {},
    {
      ...modifier,
      ...unit_stat,
      ...air_stat,
      ...naval_stat,
    },
  ),
  obj(
    {},
    {
      valid_relation_trigger: obj(
        {},
        {
          ...trigger,
        },
      ),
    },
  ),
);

export const staticModifierType = root(
  { path: "/common/modifiers" },
  {
    modifier: either(
      obj(
        {},
        {
          [typeDefKey("static_modifier")]: static_modifier,
        },
      ),
      obj(
        {},
        {
          valid_relation_trigger: array({}, []),
        },
      ),
    ),
  },
);
