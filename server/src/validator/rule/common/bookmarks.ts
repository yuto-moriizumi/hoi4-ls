import { trigger } from "../triggers";
import {
  obj,
  localisation,
  datetime_field,
  scalar,
  enumRef,
  bool,
  enumRefKey,
  typeRef,
  array,
  either,
  literal,
  root,
  typeDefKey,
} from "../utils";

const bookmark = obj(
  {},
  {
    name: localisation(),
    desc: localisation(),
    date: datetime_field(),
    picture: scalar(),
    default_country: enumRef({}, "country_tags"),
    default: bool({ cardinality: [0, 1] }),
    [enumRefKey("country_tags")]: obj(
      { cardinality: [7, Infinity] },
      {
        minor: bool({ cardinality: [0, 1] }, true),
        history: localisation(),
        ideology: typeRef({}, "ideology"),
        available: obj(
          { cardinality: [0, 1] },
          {
            ...trigger,
          },
        ),
        ideas: array({ cardinality: [0, 1] }, [
          enumRef({ cardinality: [1, Infinity] }, "idea_name"),
        ]),
        focuses: array({ cardinality: [0, 1] }, [
          typeRef({ cardinality: [0, 3] }, "focus"),
          typeRef({ cardinality: [0, 3] }, "shared_focus"),
        ]),
      },
    ),
    "---": obj(
      { cardinality: [0, 1] },
      {
        minor: bool({ cardinality: [0, 1] }, true),
        history: localisation(),
      },
    ),
    effect: obj(
      {},
      {
        randomize_weather: either(literal({}, 12345), literal({}, 22345)),
      },
    ),
  },
);

export const bookmarkType = root(
  { path: "game/common/bookmarks" },
  {
    bookmarks: obj(
      {},
      {
        [typeDefKey("bookmark")]: bookmark,
      },
    ),
  },
);
