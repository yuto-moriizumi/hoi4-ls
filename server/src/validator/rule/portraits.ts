import { root, obj, enumRef } from "./utils";

export const continents = []; // Assuming continents enum is defined elsewhere

const portrait = obj(
  {},
  {
    continent: obj(
      { cardinality: [0, 1] },
      {
        name: enumRef({ cardinality: [0, 1] }, "continents"),
      },
    ),
    // male: single_alias_right({ cardinality: [0, 1] }, "genderportrait"),
    // female: single_alias_right({ cardinality: [0, 1] }, "genderportrait"),
    // army: single_alias_right({ cardinality: [0, 1] }, "portraits"),
    // navy: single_alias_right({ cardinality: [0, 1] }, "portraits"),
    // operative: single_alias_right({ cardinality: [0, 1] }, "portraits"),
    political: obj(
      { cardinality: [0, 1] },
      {
        // enum_sub_ideology: single_alias_right(
        //   { cardinality: [0, Infinity] },
        //   "portraits",
        // ),
        // ideology: single_alias_right(
        //   { cardinality: [0, Infinity] },
        //   "portraits",
        // ),
      },
    ),
  },
);

export const portraitType = root(
  { path: "/portraits" },
  {
    default: portrait,
    // continent: obj(
    //   { type_key_filter: "continent" },
    //   {
    //     name: scalar(),
    //   },
    // ),
    // country: obj(
    //   { only_if_not: ["default", "continent"] },
    //   {
    //     unique: bool({}, true),
    //   },
    // ),
  },
);
