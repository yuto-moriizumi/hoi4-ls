import { Entries, Value } from "./types";
import {
  bool,
  either,
  entryMap,
  enumRef,
  scopeRef,
  typeRef,
  variable_field,
} from "./utils";

const raw_triggers: Entries = {
  has_something: { type: Value.BOOL, defaultValue: false },
  pc_is_winner: bool(),
  pc_is_on_winning_side: bool(),
  pc_is_loser: bool(),
  c_is_untouched_loser: bool(),
  pc_is_on_same_side_as: either(
    enumRef({}, "country_tags"),
    scopeRef({}, "country"),
  ),
  pc_is_liberated: bool(),
  pc_is_liberated_by: either(
    enumRef({}, "country_tags"),
    scopeRef({}, "country"),
  ),
  pc_is_puppeted: bool(),
  pc_is_puppeted_by: either(
    enumRef({}, "country_tags"),
    scopeRef({}, "country"),
  ),
  pc_is_forced_government: bool(),
  pc_is_forced_government_by: either(
    enumRef({}, "country_tags"),
    scopeRef({}, "country"),
  ),
  pc_is_forced_government_to: typeRef({}, "ideology"),
  pc_total_score: variable_field(),
  pc_current_score: variable_field(),
  pc_is_state_claimed_and_taken_by: scopeRef({}, "country"),
} satisfies Entries;

export const triggers = entryMap(raw_triggers, [0, Infinity]);
export const trigger = triggers;
