import { either, obj, literal, array, root, typeDefKey } from "../utils";

export const map_modes = ["name"];
export const far_text_type = ["none", "country", "state", "faction", "player"];
export const map_mode_type = [
  "none",
  "country",
  "state",
  "state_controller",
  "game_map_mode_country",
  "game_map_mode_states",
  "game_map_mode_diplomacy",
  "game_map_mode_players",
  "game_map_mode_factions",
  "game_map_mode_ideology",
];

const scripted_map_modes = either(
  obj(
    {},
    {
      top: obj(
        {},
        {
          type: literal("none"),
        },
      ),
    },
  ),
  obj(
    {},
    {
      top: array({}, []),
    },
  ),
  obj(
    {},
    {
      bottom: obj(
        {},
        {
          type: literal("none"),
        },
      ),
    },
  ),
  obj(
    {},
    {
      bottom: array({}, []),
    },
  ),
);

export const scriptedMapModesType = root(
  { path: "game/common/map_modes" },
  {
    scripted_map_modes: obj(
      {},
      {
        [typeDefKey("scripted_map_modes")]: scripted_map_modes,
      },
    ),
  },
);

// const scripted_map_modes_instance = either(
//   obj(
//     {},
//     {
//       top: obj(
//         {},
//         {
//           type: literal("none"),
//         },
//       ),
//     },
//   ),
//   obj(
//     {},
//     {
//       top: obj(
//         {},
//         {
//           type: enumRef({ cardinality: [1, 1] }, "map_mode_type"),
//           color: obj(
//             { cardinality: [0, 1] },
//             {
//               ...trigger,
//             },
//           ),
//           targets: obj(
//             { cardinality: [0, 1] },
//             {
//               ...trigger,
//             },
//           ),
//           thickness: bool({ cardinality: [0, 1] }),
//         },
//       ),
//     },
//   ),
//   obj(
//     {},
//     {
//       bottom: obj(
//         {},
//         {
//           type: literal("none"),
//         },
//       ),
//     },
//   ),
//   obj(
//     {},
//     {
//       bottom: obj(
//         {},
//         {
//           type: enumRef({ cardinality: [1, 1] }, "map_mode_type"),
//           color: obj(
//             { cardinality: [0, 1] },
//             {
//               ...trigger,
//             },
//           ),
//           targets: obj(
//             { cardinality: [0, 1] },
//             {
//               ...trigger,
//             },
//           ),
//           thickness: bool({ cardinality: [0, 1] }),
//         },
//       ),
//     },
//   ),
// );

// const far_text = enumRef({}, "far_text_type");
// const near_text = enumRef({ cardinality: [0, 1] }, "far_text_type");
// const update_daily = bool({ cardinality: [0, 1] });

// const scripted_map_modes_full = obj(
//   {},
//   {
//     ...scripted_map_modes_instance,
//     ...far_text,
//     ...near_text,
//     ...update_daily,
//   },
// );
