import { Entries, Value } from "./types";
import { entryMap } from "./utils";

const rawEffects = {
  add_stability: { type: Value.NUMBER },
  add_manpower: Value.INT,
  custom_effect_tooltip: { type: Value.LOCALISATION },
} satisfies Entries;

export const effects = entryMap(rawEffects, [0, "inf"]);
