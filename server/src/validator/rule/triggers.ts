import { normalizeRuleDict } from "./normalizer";
import { RuleDict } from "./types";

const raw_triggers: RuleDict = {};

export const triggers = normalizeRuleDict(raw_triggers, [0, "inf"]);
