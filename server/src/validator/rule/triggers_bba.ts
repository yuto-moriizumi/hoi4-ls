import {
  obj,
  country,
  typeRef,
  bool,
  value,
  float,
  unit,
  state,
  int,
  array,
  scopeRef,
  enumRef,
  character,
  unit_leader,
  either,
  variable_field,
} from "./utils";

export const trigger = {
  has_power_balance: obj(
    { scope: [country()] },
    { id: typeRef({}, "balance_of_power") },
  ),
  has_any_power_balance: bool({ scope: [country()] }),
  has_power_balance_modifier: obj(
    { scope: [country()] },
    {
      id: typeRef({}, "balance_of_power"),
      modifier: typeRef({}, "static_modifier"),
    },
  ),
  is_power_balance_in_range: obj(
    { scope: [country()] },
    {
      id: typeRef({}, "balance_of_power"),
      range: value({}, "bop_range_id"),
    },
  ),
  power_balance_value: obj(
    { scope: [country()] },
    {
      id: typeRef({}, "balance_of_power"),
      value: float({}, -1, 1),
    },
  ),
  power_balance_daily_change: obj(
    { scope: [country()] },
    {
      id: typeRef({}, "balance_of_power"),
      value: float({}, -1, 1),
    },
  ),
  power_balance_weekly_change: obj(
    { scope: [country()] },
    {
      id: typeRef({}, "balance_of_power"),
      value: float({}, -1, 1),
    },
  ),
  is_power_balance_side_active: obj(
    { scope: [country()] },
    {
      id: typeRef({}, "balance_of_power"),
      side: value({}, "bop_side"),
    },
  ),
  division_has_majority_template: typeRef({ scope: [unit()] }, "unit"),
  any_country_division: obj(
    { scope: [country()], push_scope: unit(), cardinality: [1, Infinity] },
    {},
  ),
  any_state_division: obj(
    { scope: [state()], push_scope: unit(), cardinality: [1, Infinity] },
    {},
  ),
  division_has_battalion_in_template: typeRef({ scope: [unit()] }, "unit"),
  num_divisions_in_states: obj(
    { scope: [country()] },
    {
      count: int(),
      states: array({ cardinality: [1, Infinity] }, [typeRef({}, "state")]),
      types: array({ cardinality: [0, 1] }, [typeRef({}, "unit")]),
      exclude: array({ cardinality: [0, 1] }, [typeRef({}, "unit")]),
    },
  ),
  num_battalions_in_states: obj(
    { scope: [country()] },
    {
      count: int(),
      states: array({ cardinality: [1, Infinity] }, [typeRef({}, "state")]),
      types: array({ cardinality: [0, 1] }, [typeRef({}, "unit")]),
      exclude: array({ cardinality: [0, 1] }, [typeRef({}, "unit")]),
    },
  ),
  has_war_with_major: bool({ scope: [country()] }),
  has_war_with_wargoal_against: obj(
    { scope: [country()] },
    {
      target: scopeRef({}, "country"),
      //   target: enumRef({}, "country_tags"),
      type: typeRef({}, "wargoal"),
    },
  ),
  is_hired_as_advisor: bool({ scope: [character(), unit_leader()] }),
  has_completed_custom_achievement: obj(
    { scope: [country()] },
    {
      mod: enumRef({}, "mod_achievement_id"),
      achievement: typeRef({}, "achievement"),
    },
  ),
  pc_does_state_stack_demilitarized: bool({ scope: [state()] }),
  pc_does_state_stack_dismantled: bool({ scope: [state()] }),
  pc_is_state_claimed: bool({ scope: [state()] }),
  pc_is_state_claimed_by: scopeRef({}, "country"),
  pc_is_state_outside_influence_for_winner: either(
    enumRef({}, "country_tags"),
    scopeRef({}, "country"),
  ),
  pc_turn: int(),
  unit_strength: variable_field({ scope: unit() }, 0, 1),
  unit_organization: variable_field({ scope: unit() }, 0, 1),
  is_unit_template_reserves: bool({ scope: [unit()] }),
};
