import { Entries } from "./types";
import { entryMap } from "./utils";

const raw_modifiers: Entries = {};

export const modifiers = entryMap(raw_modifiers, [0, Infinity]);
