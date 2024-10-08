import { modifier_rule } from "../modifier_rule";
import {
  obj,
  country,
  enumRefKey,
  variable_field,
  root,
  typeDefKey,
} from "../utils";

const mtth = obj(
  { replace_scope: { root: country(), this: country() } },
  {
    [enumRefKey("base_factor")]: variable_field(),
    ...modifier_rule,
  },
);

export const mtthType = root(
  { path: "game/common/mtth" },
  {
    mtth: obj(
      {},
      {
        [typeDefKey("mtth")]: mtth,
      },
    ),
  },
);
