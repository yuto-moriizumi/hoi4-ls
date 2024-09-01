import { Entries, Value } from "./types";
import { entryMap } from "./utils";

const raw_triggers = {
  has_something: { type: Value.BOOL, defaultValue: false },
} satisfies Entries;

export const triggers = entryMap(raw_triggers, [0, Infinity]);
export const trigger = triggers;
