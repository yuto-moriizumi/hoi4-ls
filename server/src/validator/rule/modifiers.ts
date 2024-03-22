import { normalizeRuleDict } from "./normalizer";
import { RuleDict } from "./types";

const raw_modifiers: RuleDict = {};

export const modifiers = normalizeRuleDict(raw_modifiers, [0, "inf"]);
