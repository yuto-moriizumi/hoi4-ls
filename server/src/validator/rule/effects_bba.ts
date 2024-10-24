import { trigger } from "./triggers";
import { Entries } from "./types";
import {
  obj,
  country,
  typeRef,
  bool,
  value,
  float,
  localisation,
  either,
  value_set,
  scopeRef,
  enumRef,
  int,
  state,
  localisation_inline,
  unit,
} from "./utils";

export const effect: Entries = {
  set_power_balance: obj(
    { scope: country() },
    {
      id: typeRef({}, "balance_of_power"),
      set_default: bool({ cardinality: [0, 1] }),
      right_side: value({ cardinality: [0, 1] }, "bop_side"),
      left_side: value({ cardinality: [0, 1] }, "bop_side"),
      set_value: float({ cardinality: [0, 1] }, -1, 1),
    },
  ),
  remove_power_balance: obj(
    { scope: country() },
    {
      id: typeRef({}, "balance_of_power"),
    },
  ),
  add_power_balance_side: obj(
    { scope: country() },
    {
      id: typeRef({}, "balance_of_power"),
      side: value({}, "bop_side"),
    },
  ),
  remove_power_balance_side: obj(
    { scope: country() },
    {
      id: typeRef({}, "balance_of_power"),
      side: value({}, "bop_side"),
    },
  ),
  add_power_balance_value: obj(
    { scope: country() },
    {
      id: typeRef({}, "balance_of_power"),
      value: float({}, -2, 2),
      tooltip_side: localisation({ cardinality: [0, 1] }),
    },
  ),
  set_power_balance_gfx: obj(
    { scope: country() },
    {
      id: typeRef({}, "balance_of_power"),
      side: value({}, "bop_side"),
      gfx: typeRef({}, "spriteType"),
    },
  ),
  add_power_balance_modifier: obj(
    { scope: country() },
    {
      id: typeRef({}, "balance_of_power"),
      modifier: typeRef({}, "static_modifier"),
    },
  ),
  remove_power_balance_modifier: obj(
    { scope: country() },
    {
      id: typeRef({}, "balance_of_power"),
      modifier: typeRef({}, "static_modifier"),
    },
  ),
  remove_all_power_balance_modifiers: obj(
    { scope: country() },
    {
      id: typeRef({}, "balance_of_power"),
    },
  ),
  add_random_valid_trait_from_unit: obj(
    { scope: unit() },
    {
      character: either(
        typeRef({}, "character"),
        value_set({}, "character_token"),
        value({}, "variable"),
        value({}, "event_target"),
        value({}, "global_event_target"),
        scopeRef({}, "character"),
      ),
    },
  ),
  set_can_be_fired_in_advisor_role: obj(
    {},
    {
      character: either(
        typeRef({ cardinality: [0, 1] }, "character"),
        value_set({ cardinality: [0, 1] }, "character_token"),
        value({ cardinality: [0, 1] }, "variable"),
        value({ cardinality: [0, 1] }, "event_target"),
        value({ cardinality: [0, 1] }, "global_event_target"),
        scopeRef({ cardinality: [0, 1] }, "character"),
      ),
      slot: enumRef({ cardinality: [0, 1] }, "allowed_advisor_role"),
      value: bool({}),
    },
  ),
  every_country_division: obj(
    { scope: country(), push_scope: unit() },
    {
      random_select_amount: int({ cardinality: [0, 1] }, 1, Infinity),
      display_individual_scopes: bool({ cardinality: [0, 1] }),
      limit: obj({ cardinality: [0, 1] }, { ...trigger }),
      tooltip: localisation({ cardinality: [0, 1] }),
      //   ...effect,
    },
  ),
  every_state_division: obj(
    { scope: state(), push_scope: unit() },
    {
      random_select_amount: int({ cardinality: [0, 1] }, 1, Infinity),
      display_individual_scopes: bool({ cardinality: [0, 1] }),
      limit: obj({ cardinality: [0, 1] }, { ...trigger }),
      tooltip: localisation({ cardinality: [0, 1] }),
      //   ...effect,
    },
  ),
  random_state_division: obj(
    { scope: state(), push_scope: unit() },
    {
      limit: obj({ cardinality: [0, 1] }, { ...trigger }),
      tooltip: localisation({ cardinality: [0, 1] }),
      //   ...effect,
    },
  ),
  change_division_template: obj(
    { scope: unit() },
    {
      division_template: localisation_inline(),
    },
  ),
  set_unit_organization: float({ scope: unit() }),
  remove_civil_war_target: either(
    scopeRef({ scope: country() }, "country"),
    enumRef({ scope: country() }, "country_tags"),
  ),
  destroy_unit: bool({ scope: unit() }),
  add_history_entry: obj(
    { scope: unit() },
    {
      key: localisation(),
      subject: localisation(),
      allow: bool({}),
    },
  ),
  add_unit_medal_to_latest_entry: obj(
    { scope: unit() },
    {
      unit_medals: typeRef({}, "unit_medal"),
    },
  ),
};
