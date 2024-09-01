import { Entries } from "./types";
import { entryMap } from "./utils";

const raw_unit_stats: Entries = {};

export const unit_stats = entryMap(raw_unit_stats, [0, Infinity]);
export const unitStat = unit_stats;
