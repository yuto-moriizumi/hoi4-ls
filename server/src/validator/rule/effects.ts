import { Entries, Value } from "./types";
import { entryMap } from "./utils";

const rawEffects = {
  add_stability: { type: Value.FLOAT },
  add_manpower: Value.INT,
  custom_effect_tooltip: { type: Value.LOCALISATION },
} satisfies Entries;

export const effects = entryMap(rawEffects, [0, Infinity]);
export const effect = effects;
