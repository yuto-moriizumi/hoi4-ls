import { Value, RootObjectEntryDescriptor } from "../types";
import { int, float } from "../utils";

export const country_file: RootObjectEntryDescriptor = {
  children: {
    country: {
      children: {
        graphical_culture: { type: Value.UNQUOTED, cardinality: [0, Infinity] },
        graphical_culture_2d: {
          type: Value.UNQUOTED,
          cardinality: [0, Infinity],
        },
        color: [
          {
            type: Value.ARRAY,
            values: { cardinality: [3, 3], ...int() },
          },
          {
            type: Value.ARRAY,
            values: { cardinality: [3, 3], ...float() },
          },
        ],
      },
    },
    cosmetic: {
      children: {
        scalar: {
          children: {
            color: [
              {
                type: Value.ARRAY,
                values: { cardinality: [3, 3], ...int() },
              },
              {
                type: Value.ARRAY,
                values: { cardinality: [3, 3], ...float() },
              },
            ],
            color_ui: [
              {
                type: Value.ARRAY,
                values: { cardinality: [3, 3], ...int() },
                cardinality: [0, 1],
              },
              {
                type: Value.ARRAY,
                values: { cardinality: [3, 3], ...float() },
                cardinality: [0, 1],
              },
            ],
          },
          cardinality: [1, Infinity],
        },
      },
    },
  },
};
