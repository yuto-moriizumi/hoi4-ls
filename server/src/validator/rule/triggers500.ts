import {
  obj,
  country,
  state,
  localisation,
  variable_field,
  scopeRef,
  enumRef,
  float,
  typeRef,
  int_variable_field,
  bool,
  combat,
  int,
  array,
  either,
  character,
  unit_leader,
  operative,
  typeRefKey,
  value_set,
} from "./utils";

export const trigger = {
  any_owned_state: obj(
    { scope: [country()], push_scope: state() },
    {
      tooltip: localisation({ cardinality: [0, 1] }),
      // ...trigger,
    },
  ),
  any_neighbor_state: obj(
    { scope: [state()], push_scope: state() },
    {
      tooltip: localisation({ cardinality: [0, 1] }),
      // ...trigger,
    },
  ),
  any_allied_country: obj(
    { scope: [country()], push_scope: country() },
    {
      tooltip: localisation({ cardinality: [0, 1] }),
      // ...trigger,
    },
  ),
  all_state: obj(
    { push_scope: state() },
    {
      tooltip: localisation({ cardinality: [0, 1] }),
      // ...trigger,
    },
  ),
  all_owned_state: obj(
    { scope: [country()], push_scope: state() },
    {
      tooltip: localisation({ cardinality: [0, 1] }),
      // ...trigger,
    },
  ),
  all_neighbor_state: obj(
    { scope: [state()], push_scope: state() },
    {
      tooltip: localisation({ cardinality: [0, 1] }),
      // ...trigger,
    },
  ),
  all_allied_country: obj(
    { scope: [country()], push_scope: country() },
    {
      tooltip: localisation({ cardinality: [0, 1] }),
      // ...trigger,
    },
  ),
  surrender_progress: variable_field({ scope: [country()] }),
  political_power_daily: variable_field({ scope: [country()] }),
  ic_ratio: obj(
    { scope: [country()] },
    {
      tag: scopeRef({}, country()),
      ratio: float(),
    },
  ),
  any_war_score: variable_field({ scope: [country()] }),
  has_idea_with_trait: typeRef({}, "country_leader_trait"),
  has_deployed_air_force_size: obj(
    { scope: [country()] },
    {
      size: float({ cardinality: [0, 1] }),
      type: enumRef({ cardinality: [0, 1] }, "air_units"),
    },
  ),
  is_fighting_in_terrain: typeRef({}, "terrain"),
  is_defender: bool({ scope: [combat()] }),
  has_combat_modifier: enumRef({}, "combat_modifiers"),
  is_winning: bool({ scope: [combat()] }),
  fastest_unit: float({ scope: [combat()] }),
  recon_advantage: bool({ scope: [combat()] }),
  has_tech: typeRef({}, "technology"),
  land_doctrine_level: int({ scope: [country()] }),
  is_ironman: bool({}),
  has_built: obj(
    { scope: [country()] },
    {
      type: typeRef({}, "building"),
      value: int(),
    },
  ),
  has_available_idea_with_traits: obj(
    { scope: [country()] },
    {
      idea: typeRef({}, "country_leader_trait"),
      limit: int(),
      ignore: array({ cardinality: [0, 1] }, [enumRef({}, "idea_name")]),
    },
  ),
  is_claimed_by: either(
    scopeRef({ scope: [state()] }, country()),
    enumRef({ scope: [state()] }, "country_tags"),
  ),
  is_core_of: either(
    scopeRef({ scope: [state()] }, country()),
    enumRef({ scope: [state()] }, "country_tags"),
  ),
  is_ai: bool({ scope: [country()] }),
  has_trait: either(
    typeRef(
      { scope: [character(), unit_leader(), combat(), operative()] },
      "unit_leader_trait",
    ),
    typeRef({ scope: [character(), unit_leader()] }, "country_leader_trait"),
  ),
  has_reserves: bool({ scope: [combat()] }),
  frontage_full: bool({ scope: [combat()] }),
  is_lend_leasing: either(
    scopeRef({ scope: [country()] }, country()),
    enumRef({ scope: [country()] }, "country_tags"),
  ),
  free_building_slots: obj(
    { scope: [state()] },
    {
      building: typeRef({}, "building"),
      size: int(),
      include_locked: bool({ cardinality: [0, 1] }),
      province: enumRef({ cardinality: [0, 1] }, "provinces"),
    },
  ),
  is_demilitarized_zone: bool({ scope: [state()] }),
  is_border_conflict: bool({ scope: [state()] }),
  has_completed_focus: either(
    typeRef({ scope: [country()] }, "focus"),
    typeRef({ scope: [country()] }, "shared_focus"),
  ),
  has_offensive_war_with: either(
    scopeRef({ scope: [country()] }, country()),
    enumRef({ scope: [country()] }, "country_tags"),
  ),
  has_defensive_war_with: either(
    scopeRef({ scope: [country()] }, country()),
    enumRef({ scope: [country()] }, "country_tags"),
  ),
  has_offensive_war: bool({ scope: [country()] }),
  has_defensive_war: bool({ scope: [country()] }),
  is_coastal: bool({ scope: [state()] }),
  casualties: int({ scope: [country()] }),
  custom_trigger_tooltip: obj(
    {},
    {
      tooltip: localisation(),
      // ...trigger,
    },
  ),
  has_equipment: obj(
    { scope: [country()] },
    {
      [typeRefKey("equipment")]: int_variable_field(),
    },
  ),
  num_of_factories: variable_field({ scope: [country()] }),
  focus_progress: obj(
    { scope: [country()] },
    {
      focus: either(typeRef({}, "focus"), typeRef({}, "shared_focus")),
      progress: float({}, 0, 1.0),
    },
  ),
  is_puppet: bool({ scope: [country()] }),
  is_puppet_of: either(
    scopeRef({ scope: [country()] }, country()),
    enumRef({ scope: [country()] }, "country_tags"),
  ),
  ships_in_state_ports: obj(
    { scope: [country()] },
    {
      state: either(scopeRef({}, state()), typeRef({}, "state")),
      size: float(),
      type: enumRef({ cardinality: [0, 1] }, "ship_units"),
    },
  ),
  is_major: bool({ scope: [country()] }),
  is_on_continent: either(
    enumRef({ scope: [state()] }, "continents"),
    scopeRef({ scope: [state()] }, country()),
  ),
  is_amphibious_invasion: bool({ scope: [combat()] }),
  strength_ratio: obj(
    { scope: [country()] },
    {
      tag: either(scopeRef({}, country()), enumRef({}, "country_tags")),
      ratio: float(),
    },
  ),
  has_max_planning: bool({ scope: [combat()] }),
  has_civil_war: bool({ scope: [country()] }),
  less_combat_width_than_opponent: bool({ scope: [combat()] }),
  is_fighting_air_units: bool({ scope: [combat()] }),
  has_carrier_airwings_on_mission: bool({ scope: [combat()] }),
  has_flanked_opponent: bool({ scope: [combat()] }),
  any_claim: bool({ scope: [country()] }),
  has_volunteers_amount_from: obj(
    { scope: [country()] },
    {
      tag: either(scopeRef({}, country()), enumRef({}, "country_tags")),
      count: int(),
    },
  ),
  num_of_controlled_states: variable_field({ scope: [country()] }),
  original_tag: either(
    scopeRef({ scope: [country(), combat()] }, country()),
    enumRef({ scope: [country(), combat()] }, "country_tags"),
  ),
  has_added_tension_amount: float({ scope: [country()] }),
  has_manpower_for_recruit_change_to: obj(
    { scope: [country()] },
    {
      value: float(),
      group: value_set({}, "idea_slot"),
    },
  ),
  ai_liberate_desire: obj(
    { scope: [country()] },
    {
      target: either(scopeRef({}, country()), enumRef({}, "country_tags")),
      value: float(),
    },
  ),
  distance_to: obj(
    { scope: [state()] },
    {
      value: float(),
      target: either(scopeRef({}, state()), typeRef({}, "state")),
    },
  ),
  can_research: typeRef({ scope: [country()] }, "technology"),
  has_annex_war_goal: either(
    scopeRef({ scope: [country()] }, country()),
    enumRef({ scope: [country()] }, "country_tags"),
  ),
  hardness: float({ scope: [combat()] }),
  has_template_containing_unit: typeRef({ scope: [country()] }, "unit"),
  is_in_home_area: bool({ scope: [state()] }),
  state_population: either(
    float({ scope: [state()] }),
    value_set({}, "variable"),
  ),
  ai_irrationality: int({ scope: [country()] }),
  has_war_together_with: either(
    scopeRef({ scope: [country()] }, country()),
    enumRef({ scope: [country()] }, "country_tags"),
  ),
  has_capitulated: bool({ scope: [country()] }),
  has_army_manpower: obj(
    { scope: [country()] },
    {
      size: int(),
    },
  ),
  is_owned_and_controlled_by: either(
    scopeRef({ scope: [state()] }, country()),
    enumRef({ scope: [state()] }, "country_tags"),
  ),
  is_island_state: bool({ scope: [state()] }),
  has_elections: bool({ scope: [country()] }),
  alliance_strength_ratio: float({ scope: [country()] }),
  civilwar_target: either(
    scopeRef({ scope: [country()] }, country()),
    enumRef({ scope: [country()] }, "country_tags"),
  ),
  is_in_peace_conference: bool({ scope: [country()] }),
  has_unit_leader: value_set({}, "unit_leader_ids"),
  any_home_area_neighbor_country: obj(
    { scope: [country()], push_scope: country() },
    {
      tooltip: localisation({ cardinality: [0, 1] }),
      // ...trigger,
    },
  ),
};
