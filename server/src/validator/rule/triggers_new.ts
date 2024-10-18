import {
  localisation_inline,
  bool,
  variable_field,
  either,
  scopeRef,
  country,
  enumRef,
  obj,
  typeRef,
  state,
  value_set,
  localisation,
  operative,
  int,
  int_variable_field,
  array,
} from "./utils";

export const trigger = {
  log: localisation_inline(),
  is_female: bool(),
  resistance: variable_field(),
  has_captured_operative: either(
    scopeRef({}, country()),
    enumRef({}, "country_tags"),
    bool(),
  ),
  non_damaged_building_level: obj(
    {},
    {
      building: typeRef({}, "building"),
      level: variable_field(),
    },
  ),
  days_since_capitulated: variable_field(),
  compliance: variable_field(),
  compliance_speed: variable_field(),
  resistance_speed: variable_field(),
  occupied_country_tag: either(
    enumRef({}, "country_tags"),
    scopeRef({}, country()),
  ),
  resistance_target: variable_field(),
  has_resistance: bool(),
  has_active_resistance: bool(),
  has_occupation_modifier: typeRef({}, "resistance_compliance_modifier"),
  is_debug: bool(),
  core_compliance: obj(
    {},
    {
      occupied_country_tag: either(
        enumRef({}, "country_tags"),
        scopeRef({}, country()),
      ),
      value: variable_field(),
    },
  ),
  core_resistance: obj(
    {},
    {
      occupied_country_tag: either(
        enumRef({}, "country_tags"),
        scopeRef({}, country()),
      ),
      value: variable_field(),
    },
  ),
  network_strength: either(
    obj(
      {},
      {
        target: either(enumRef({}, "country_tags"), scopeRef({}, country())),
        state: either(
          typeRef({ cardinality: [0, 1] }, "state"),
          scopeRef({ cardinality: [0, 1] }, state()),
        ),
        value: variable_field(),
      },
    ),
    obj(
      {},
      {
        state: either(typeRef({}, "state"), scopeRef({}, state())),
        value: variable_field(),
      },
    ),
  ),
  has_operation_token: obj(
    {},
    {
      tag: either(scopeRef({}, country()), enumRef({}, "country_tags")),
      token: typeRef({}, "operation_token"),
    },
  ),
  occupation_law: typeRef({}, "occupation_law"),
  is_ally_with: either(scopeRef({}, country()), enumRef({}, "country_tags")),
  get_highest_scored_country_temp: obj(
    {},
    {
      scorer: typeRef({}, "country_scorer"),
      var: value_set({ cardinality: [0, 1] }, "variable"),
    },
  ),
  get_sorted_scored_countries_temp: obj(
    {},
    {
      scorer: typeRef({}, "country_scorer"),
      array: value_set({ cardinality: [0, 1] }, "array"),
      scores: value_set({ cardinality: [0, 1] }, "array"),
    },
  ),
  decryption_progress: obj(
    {},
    {
      target: either(enumRef({}, "country_tags"), scopeRef({}, country())),
      value: variable_field(),
    },
  ),
  any_occupied_country: obj(
    { push_scope: country() },
    {
      tooltip: localisation({ cardinality: [0, 1] }),
      // ...trigger,
    },
  ),
  all_occupied_country: obj(
    { push_scope: country() },
    {
      tooltip: localisation({ cardinality: [0, 1] }),
      // ...trigger,
    },
  ),
  any_country_with_original_tag: obj(
    {},
    {
      original_tag_to_check: either(
        enumRef({}, "country_tags"),
        scopeRef({}, country()),
      ),
      tooltip: localisation({ cardinality: [0, 1] }),
      // ...trigger,
    },
  ),
  all_country_with_original_tag: obj(
    {},
    {
      original_tag_to_check: either(
        enumRef({}, "country_tags"),
        scopeRef({}, country()),
      ),
      tooltip: localisation({ cardinality: [0, 1] }),
      // ...trigger,
    },
  ),
  has_done_agency_upgrade: typeRef({}, "intelligence_agency_upgrade"),
  is_spymaster: bool(),
  foreign_manpower: variable_field(),
  garrison_manpower_need: variable_field(),
  agency_upgrade_number: variable_field(),
  operative_leader_mission: enumRef({}, "operative_missions"),
  compare_intel_with: obj(
    {},
    {
      target: either(enumRef({}, "country_tags"), scopeRef({}, country())),
      civilian_intel: variable_field({ cardinality: [0, 1] }),
      army_intel: variable_field({ cardinality: [0, 1] }),
      navy_intel: variable_field({ cardinality: [0, 1] }),
    },
  ),
  all_operative_leader: obj(
    { push_scope: operative() },
    {
      tooltip: localisation({ cardinality: [0, 1] }),
      // ...trigger,
    },
  ),
  any_operative_leader: obj(
    { push_scope: operative() },
    {
      tooltip: localisation({ cardinality: [0, 1] }),
      // ...trigger,
    },
  ),
  is_operative_captured: bool(),
  intel_level_over: obj(
    {},
    {
      target: either(enumRef({}, "country_tags"), scopeRef({}, country())),
      civilian_intel: variable_field({ cardinality: [0, 1] }),
      army_intel: variable_field({ cardinality: [0, 1] }),
      navy_intel: variable_field({ cardinality: [0, 1] }),
    },
  ),
  any_controlled_state: obj(
    { push_scope: state() },
    {
      tooltip: localisation({ cardinality: [0, 1] }),
      // ...trigger,
    },
  ),
  all_controlled_state: obj(
    { push_scope: state() },
    {
      tooltip: localisation({ cardinality: [0, 1] }),
      // ...trigger,
    },
  ),
  num_of_operatives: variable_field(),
  num_operative_slots: variable_field(),
  num_free_operative_slots: variable_field(),
  is_cryptology_department_active: bool(),
  is_decrypting: either(scopeRef({}, country()), enumRef({}, "country_tags")),
  is_fully_decrypted: either(
    scopeRef({}, country()),
    enumRef({}, "country_tags"),
  ),
  is_active_decryption_bonuses_enabled: either(
    scopeRef({}, country()),
    enumRef({}, "country_tags"),
  ),
  num_fake_intel_divisions: variable_field(),
  any_guaranteed_country: obj(
    { push_scope: country() },
    {
      //   // ...trigger,
    },
  ),
  all_guaranteed_country: obj(
    { push_scope: country() },
    {
      //   // ...trigger,
    },
  ),
  num_finished_operations: obj(
    {},
    {
      operation: either(typeRef({}, "operation"), value_set({}, "token")),
      target: scopeRef({}, country()),
      value: int(),
    },
  ),
  has_collaboration: obj(
    {},
    {
      target: either(scopeRef({}, country()), enumRef({}, "country_tags")),
      value: variable_field(),
    },
  ),
  is_running_operation: obj(
    {},
    {
      target: scopeRef({}, country()),
      operation: typeRef({}, "operation"),
    },
  ),
  has_finished_collecting_for_operation: obj(
    {},
    {
      target: scopeRef({}, country()),
      operation: typeRef({}, "operation"),
    },
  ),
  conscription_ratio: variable_field(),
  target_conscription_amount: variable_field(),
  current_conscription_amount: variable_field(),
  is_operation_type: typeRef({}, "operation"),
  is_preparing_operation: obj(
    {},
    {
      operation: either(typeRef({}, "operation"), ...variable_field()),
      target: scopeRef({}, country()),
    },
  ),
  operative_leader_operation: typeRef({}, "operation"),
  can_declare_war_on: either(
    scopeRef({}, country()),
    enumRef({}, "country_tags"),
  ),
  has_nationality: either(scopeRef({}, country()), enumRef({}, "country_tags")),
  network_national_coverage: obj(
    {},
    {
      target: either(enumRef({}, "country_tags"), scopeRef({}, country())),
      value: variable_field(),
    },
  ),
  impassable: bool(),
  num_researched_technologies: int_variable_field(),
  has_allowed_idea_with_traits: obj(
    {},
    {
      idea: either(
        typeRef({}, "country_leader_trait"),
        array({ cardinality: [1, Infinity] }, [
          typeRef({}, "country_leader_trait"),
        ]),
      ),
      limit: int({ cardinality: [0, 1] }),
      ignore: either(
        array({ cardinality: [0, 1] }, [enumRef({}, "idea_name")]),
        enumRef({ cardinality: [0, 1] }, "idea_name"),
      ),
      characters: bool({ cardinality: [0, 1] }),
    },
  ),
  is_leading_volunteer_group: either(
    scopeRef({}, country()),
    enumRef({}, "country_tags"),
  ),
  is_leading_volunteer_group_with_original_country: either(
    scopeRef({}, country()),
    enumRef({}, "country_tags"),
  ),
};
