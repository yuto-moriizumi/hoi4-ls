import { triggers } from "./triggers";
import { RootObjectEntryDescriptor, Value } from "./types";

export const country_event: RootObjectEntryDescriptor = {
  children: {
    id: Value.UNQUOTED,
    title: [
      Value.UNQUOTED,
      {
        cardinality: [0, Infinity],
        children: {
          trigger: triggers,
          text: Value.LOCALISATION,
        },
      },
    ],
    desc: Value.UNQUOTED,
    picture: Value.UNQUOTED,
    is_triggered_only: {
      type: Value.BOOL,
      cardinality: [0, 1],
      defaultValue: false,
    },
    fire_only_once: {
      type: Value.BOOL,
      cardinality: [0, 1],
      defaultValue: false,
    },
    immediate: {
      cardinality: [0, 1],
    },
    option: {
      cardinality: [0, Infinity],
      children: {
        name: { type: Value.UNQUOTED },
        ai_chance: {
          cardinality: [0, 1],
          children: { factor: { type: Value.FLOAT } },
        },
      },
    },
  },
};
