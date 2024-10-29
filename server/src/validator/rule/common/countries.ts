import {
  root,
  either,
  obj,
  array,
  scalar,
  bool,
  filepath,
  int,
  float,
} from "../utils";

const country_tag_file = obj(
  {},
  {
    dynamic_tags: bool({ cardinality: [0, 1] }, true),
    scalar: filepath({ cardinality: [1, Infinity] }, "common/"),
  },
);

const country_file = obj(
  {},
  {
    country: obj(
      {},
      {
        graphical_culture: scalar({ cardinality: [0, Infinity] }),
        graphical_culture_2d: scalar({ cardinality: [0, Infinity] }),
        color: either(
          array({ cardinality: [3, 3] }, [int()]),
          array({ cardinality: [3, 3] }, [float()]),
        ),
      },
    ),
    cosmetic: obj(
      {},
      {
        scalar: obj(
          { cardinality: [1, Infinity] },
          {
            color: either(
              array({ cardinality: [3, 3] }, [int()]),
              array({ cardinality: [3, 3] }, [float()]),
            ),
            color_ui: either(
              array({ cardinality: [0, 1] }, [int()]),
              array({ cardinality: [0, 1] }, [float()]),
            ),
          },
        ),
      },
    ),
  },
);

export const countryFileType = root(
  { path: "/common/countries" },
  {
    country_file,
  },
);

export const countryTagFileType = root(
  { path: "/common/country_tags" },
  {
    country_tag_file,
  },
);
