import { triggers } from "../triggers";
import { RootObjectEntryDescriptor, Value } from "../types";
import { datetime_field, Enum, localisation, ref, scalar } from "../utils";

export const bookmark: RootObjectEntryDescriptor = {
  children: {
    name: localisation(),
    desc: localisation(),
    date: datetime_field(),
    picture: scalar(),
    default_country: Enum("country_tags"),
    default: { type: Value.BOOL, cardinality: [0, 1] },
    countries: {
      cardinality: [7, Infinity],
      children: {
        "---": {
          children: {
            minor: { type: Value.BOOL, cardinality: [0, 1] },
            history: localisation(),
          },
          cardinality: [0, 1],
        },
      },
      dynamicChildren: [
        {
          key: Enum("country_tags"),
          value: {
            children: {
              minor: { type: Value.BOOL, cardinality: [0, 1] },
              history: localisation(),
              ideology: { type: Value.REFERENCE_TO, tag: "ideology" },
              available: {
                cardinality: [0, 1],
                children: triggers,
              },
              ideas: {
                type: Value.ARRAY,
                cardinality: [0, 1],
                values: Enum("idea_name"),
              },
              focuses: {
                type: Value.ARRAY,
                cardinality: [0, 1],
                values: ref(["focus", "shared_focus"]),
              },
            },
          },
        },
      ],
    },
    effect: {
      children: {
        randomize_weather: Enum(["12345", "22345"]), // Adjust cardinality and values as per actual values/rules.
      },
    },
  },
};
