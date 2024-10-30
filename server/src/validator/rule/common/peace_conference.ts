import { trigger } from "../triggers";
import {
  root,
  obj,
  typeDefKey,
  either,
  bool,
  localisation,
  enumRef,
  array,
  literal,
  country,
  int,
  typeRef,
  float,
} from "../utils";

const peace_action_categories = obj(
  {},
  {
    name: localisation(),
    default: bool({}, true),
  },
);

export const peaceActionCategoriesType = root(
  { path: "/common/peace_conference/categories" },
  {
    peace_action_categories: obj(
      {},
      {
        [typeDefKey("peace_action_categories")]: peace_action_categories,
      },
    ),
  },
);

const peace_ai_desires = obj(
  {},
  {
    peace_action_type: either(
      enumRef({}, "peace_action"),
      array({}, [
        enumRef({}, "peace_action"),
        literal({}, "take_states"),
        literal({}, "puppet"),
        literal({}, "force_government"),
        literal({}, "liberate"),
      ]),
    ),
    enable: obj(
      { replace_scope: { root: country(), this: country() } },
      { ...trigger },
    ),
    ai_desire: int(),
  },
);

export const peaceAiDesiresType = root(
  { path: "/common/peace_conference/ai_peace" },
  {
    peace_ai_desires: obj(
      {},
      {
        [typeDefKey("peace_ai_desires")]: peace_ai_desires,
      },
    ),
  },
);

const peace_action_modifiers = obj(
  {},
  {
    category: typeRef({}, "peace_action_categories"),
    peace_action_type: either(
      enumRef({}, "peace_action"),
      array({}, [
        literal({}, "take_states"),
        literal({}, "puppet"),
        literal({}, "force_government"),
        literal({}, "liberate"),
      ]),
    ),
    enable: obj(
      { replace_scope: { root: country(), this: country() } },
      trigger,
    ),
    cost_multiplier: float({}, 0, Infinity),
  },
);

export const peaceActionModifiersType = root(
  { path: "/common/peace_conference/cost_modifiers" },
  {
    peace_action_modifiers: obj(
      {},
      {
        [typeDefKey("peace_action_modifiers")]: peace_action_modifiers,
      },
    ),
  },
);

export const peace_action = [
  "take_states",
  "puppet",
  "force_government",
  "liberate",
];
