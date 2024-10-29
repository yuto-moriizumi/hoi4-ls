import { effect } from "../effects";
import { modifier } from "../modifiers";
import { trigger } from "../triggers";
import {
  obj,
  country,
  int,
  typeRef,
  either,
  variable_field,
  root,
  typeDefKey,
} from "../utils";

const unit_medal = obj(
  { replace_scope: { root: country(), this: country() } },
  {
    available: obj(
      { cardinality: [0, 1] },
      {
        ...trigger,
      },
    ),
    frame: int(),
    icon: typeRef({}, "spriteType"),
    cost: either(...variable_field(), int()),
    unit_modifiers: obj(
      { cardinality: [0, 1] },
      {
        ...modifier,
      },
    ),
    one_time_effect: obj(
      { cardinality: [0, 1] },
      {
        ...effect,
      },
    ),
  },
);

export const unitMedalType = root(
  { path: "/common/unit_medals" },
  {
    unit_medals: obj(
      {},
      {
        [typeDefKey("unit_medal")]: unit_medal,
      },
    ),
  },
);
