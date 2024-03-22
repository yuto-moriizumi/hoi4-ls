import { normalizeRuleDict } from "./normalizer";
import { RuleDict } from "./types";

const raw_unit_stats: RuleDict = {};

export const unit_stats = normalizeRuleDict(raw_unit_stats, [0, "inf"]);
