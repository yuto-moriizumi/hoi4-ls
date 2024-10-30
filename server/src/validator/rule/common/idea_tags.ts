import { either, obj, bool, int, enumRef, value_set, root } from "../utils";

export const military_spirit_types = [
  "army_spirit",
  "navy_spirit",
  "air_spirit",
];

const idea_category = either(
  obj(
    { cardinality: [0, 1] },
    {
      hidden: bool(),
      cost: int({ cardinality: [0, 1] }),
      removal_cost: int({ cardinality: [0, 1] }),
      ledger: enumRef({ cardinality: [0, 1] }, "ledgers"),
      politics_tab: bool({ cardinality: [1, 1] }),
      slot: value_set({ cardinality: [1, Infinity] }, "idea_slot"),
      character_slot: value_set(
        { cardinality: [1, Infinity] },
        "character_advisor_slot",
      ),
      // type: national_spirit(),
    },
  ),
  obj(
    { cardinality: [0, 1] },
    {
      type: enumRef({ cardinality: [1, 1] }, "military_spirit_types"),
      politics_tab: bool({ cardinality: [1, 1] }),
    },
  ),
  obj(
    { cardinality: [1, Infinity] },
    {
      slot: value_set({ cardinality: [1, Infinity] }, "idea_slot"),
    },
  ),
  obj(
    { cardinality: [1, Infinity] },
    {
      character_slot: value_set(
        { cardinality: [1, Infinity] },
        "character_advisor_slot",
      ),
    },
  ),
);

// TODO: Support this
// const ideaCategoriesEither = either(
//   obj(
//     { cardinality: [1, Infinity] },
//     {
//       slot: scalar({ cardinality: [1, Infinity] }),
//     },
//   ),
//   obj(
//     { cardinality: [1, Infinity] },
//     {
//       character_slot: scalar({ cardinality: [1, Infinity] }),
//     },
//   ),
//   obj(
//     {},
//     {
//       type: enumRef({}, "military_spirit_types"),
//     },
//   ),
//   array({}, []),
// );

export const ideaCategoriesType = root(
  { path: "/common/idea_tags" },
  {
    idea_categories: idea_category,
  },
);
