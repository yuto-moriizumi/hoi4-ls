import { normalizeRuleDict } from "./normalizer";
import { RuleDict, Value } from "./types";

const effects: RuleDict = {
  add_stability: { type: Value.NUMBER },
  add_manpower: { type: Value.INT },
  custom_effect_tooltip: { type: Value.LOCALISATION },
};

export default normalizeRuleDict(effects, [0, "inf"]);
