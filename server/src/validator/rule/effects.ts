import { Rule, Value } from "./types";

export const effects: Record<string, Rule> = {
  add_stability: { type: Value.NUMBER },
  add_manpower: { type: Value.INT },
  custom_effect_tooltip: { type: Value.LOCALISATION },
};
