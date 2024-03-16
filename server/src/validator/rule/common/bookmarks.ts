```import { triggers } from "../triggers";
import { country_tags, idea_name } from "../enums";
import { RootObjectEntryDescriptor, Localisation, Value } from "../types";

export const bookmark: RootObjectEntryDescriptor = {
  children: {
    name: Localisation.LOCALISATION,
    desc: Localisation.LOCALISATION,
    date: Value.DATETIME,
    picture: Value.UNQUOTED,
    default_country: country_tags,
    default: { type: Value.BOOL, cardinality: [0, 1] },
    countries: {
      cardinality: [7, "inf"],
      dynamicChildren: [
        {
          key: country_tags,
          children: {
            minor: { type: Value.BOOL, cardinality: [0, 1] },
            history: Localisation.LOCALISATION,
            ideology: { type: Value.REFERENCE_TO, tag: "ideology" },
            available: {
              cardinality: [0, 1],
              children: triggers,
            },
            ideas: {
              cardinality: [0, 1],
              values: idea_name,
            },
            focuses: {
              cardinality: [0, 1],
              dynamicChildren: [
                {
                  key: "focus",
                  cardinality: [0, 3],
                },
                {
                  key: "shared_focus",
                  cardinality: [0, 3],
                },
              ],
            },
          },
        },
        {
          key: "---",
          children: {
            minor: { type: Value.BOOL, cardinality: [0, 1] },
            history: Localisation.LOCALISATION,
          },
          cardinality: [0, 1],
        },
      ],
    },
    effect: {
      children: {
        randomize_weather: { values: [12345, 22345] }, // Adjust cardinality and values as per actual values/rules.
      },
    },
  },
}; 
```