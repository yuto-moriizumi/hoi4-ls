import {
  obj,
  country,
  localisation,
  either,
  scopeRef,
  enumRef,
  variable_field,
  float,
  value,
  bool,
  typeRef,
  int,
  scalar,
  int_variable_field,
  state,
  array,
  unit_leader,
  value_set,
  date_field,
} from "./utils";

export const trigger = {
  any_other_country: obj(
    { push_scope: country() },
    {
      tooltip: localisation({ cardinality: [0, 1] }),
      // ...trigger,
    },
  ),
  all_other_country: obj(
    { scope: country(), push_scope: country() },
    {
      limit: obj({}, {}),
      // ...trigger,
    },
  ),
  has_non_aggression_pact_with: either(
    scopeRef({}, country()),
    enumRef({}, "country_tags"),
  ),
  num_faction_members: variable_field(),
  enemies_strength_ratio: float(),
  has_custom_difficulty_setting: value({}, "difficulty_setting"),
  has_any_custom_difficulty_setting: bool(),
  has_country_custom_difficulty_setting: bool(),
  is_researching_technology: typeRef({}, "technology"),
  is_in_tech_sharing_group: typeRef({}, "tech_sharing_group"),
  has_autonomy_state: typeRef({}, "autonomy"),
  compare_autonomy_progress_ratio: float(),
  compare_autonomy_state: typeRef({}, "autonomy"),
  has_cosmetic_tag: value({}, "cosmetic_tag"),
  num_subjects: int(),
  num_tech_sharing_groups: int(),
  has_template: scalar(),
  has_state_category: typeRef({}, "state_category"),
  has_cavalry_ratio: float(),
  num_occupied_states: int_variable_field(),
  has_damaged_buildings: bool(),
  has_resources_amount: either(
    obj(
      { scope: country() },
      {
        resource: typeRef({}, "resource"),
        amount: int(),
        state: scopeRef({}, state()),
        delivered: bool({ cardinality: [0, 1] }),
      },
    ),
    obj(
      { scope: state() },
      {
        resource: typeRef({}, "resource"),
        amount: int(),
        delivered: bool({ cardinality: [0, 1] }),
      },
    ),
  ),
  has_tech_bonus: either(
    obj({}, { technology: typeRef({}, "technology") }),
    obj({}, { category: enumRef({}, "tech_category") }),
  ),
  has_template_majority_unit: typeRef({}, "unit"),
  min_planning: float(),
  has_army_experience: variable_field(),
  has_air_experience: variable_field(),
  has_navy_experience: variable_field(),
  has_full_control_of_state: either(
    scopeRef({}, state()),
    typeRef({}, "state"),
  ),
  num_divisions: int_variable_field(),
  count_triggers: obj(
    {},
    {
      amount: int(),
      // ...trigger,
    },
  ),
  is_target_of_coup: bool(),
  is_staging_coup: bool(),
  has_focus_tree: typeRef({}, "focus_tree"),
  has_template_ai_majority_unit: typeRef({}, "unit"),
  has_any_license: bool(),
  has_license: either(
    obj(
      { scope: country() },
      {
        from: scopeRef({}, country()),
        archetype: typeRef({}, "equipment.archetype_equip"),
      },
    ),
    obj(
      { scope: country() },
      {
        from: scopeRef({}, country()),
        equipment: obj(
          {},
          {
            type: typeRef({}, "equipment.regular_equip"),
            version: int(),
          },
        ),
      },
    ),
  ),
  is_licensing_to: either(
    obj(
      { scope: country() },
      {
        target: scopeRef({}, country()),
        archetype: typeRef({}, "equipment.archetype_equip"),
      },
    ),
    obj(
      { scope: country() },
      {
        target: scopeRef({}, country()),
        equipment: obj(
          {},
          {
            type: typeRef({}, "equipment.regular_equip"),
            version: int(),
          },
        ),
      },
    ),
  ),
  is_licensing_any_to: either(
    scopeRef({}, country()),
    enumRef({}, "country_tags"),
  ),
  ai_has_role_template: value({}, "ai_template_roles"),
  ai_has_role_division: value({}, "ai_template_roles"),
  has_relation_modifier: obj(
    { scope: country() },
    {
      target: scopeRef({}, country()),
      modifier: typeRef({}, "static_modifier"),
    },
  ),
  any_province_building_level: obj(
    { scope: state() },
    {
      province: either(
        obj(
          { cardinality: [1, Infinity] },
          {
            all_provinces: bool({ cardinality: [1, Infinity] }, true),
            limit_to_border: bool({ cardinality: [0, 1] }, true),
            limit_to_coastal: bool({ cardinality: [0, 1] }, true),
            limit_to_naval_base: bool({ cardinality: [0, 1] }, true),
          },
        ),
        obj(
          { cardinality: [1, Infinity] },
          {
            id: enumRef({}, "provinces"),
            limit_to_border: bool({ cardinality: [0, 1] }, true),
            limit_to_coastal: bool({ cardinality: [0, 1] }, true),
            limit_to_naval_base: bool({ cardinality: [0, 1] }, true),
          },
        ),
      ),
      building: typeRef({}, "building.provincial"),
      level: int(),
    },
  ),
  estimated_intel_max_armor: obj(
    { scope: country() },
    {
      tag: either(scopeRef({}, country()), enumRef({}, "country_tags")),
      value: float(),
    },
  ),
  estimated_intel_max_piercing: obj(
    { scope: country() },
    {
      tag: either(scopeRef({}, country()), enumRef({}, "country_tags")),
      value: float(),
    },
  ),
  amount_research_slots: int(),
  manpower_per_military_factory: float(),
  amount_taken_ideas: obj(
    { scope: country() },
    {
      amount: int(),
      slots: array({ cardinality: [0, Infinity] }, [
        value({}, "idea_slot"),
        value({}, "character_advisor_slot"),
      ]),
    },
  ),
  has_carrier_airwings_in_own_combat: bool(),
  naval_strength_ratio: obj(
    { scope: country() },
    {
      tag: either(scopeRef({}, country()), enumRef({}, "country_tags")),
      ratio: float(),
    },
  ),
  enemies_naval_strength_ratio: float(),
  alliance_naval_strength_ratio: float(),
  has_stability: float(),
  has_war_support: either(float(), ...variable_field()),
  all_unit_leader: obj(
    { scope: country(), push_scope: unit_leader() },
    {
      tooltip: localisation({ cardinality: [0, 1] }),
      // ...trigger,
    },
  ),
  any_unit_leader: obj(
    { scope: country(), push_scope: unit_leader() },
    {
      tooltip: localisation({ cardinality: [0, 1] }),
      // ...trigger,
    },
  ),
  all_army_leader: obj(
    { scope: country() },
    {
      tooltip: localisation({ cardinality: [0, 1] }),
      // ...trigger,
    },
  ),
  any_army_leader: obj(
    { scope: country() },
    {
      tooltip: localisation({ cardinality: [0, 1] }),
      // ...trigger,
    },
  ),
  all_navy_leader: obj(
    { scope: country() },
    {
      tooltip: localisation({ cardinality: [0, 1] }),
      // ...trigger,
    },
  ),
  any_navy_leader: obj(
    { scope: country() },
    {
      tooltip: localisation({ cardinality: [0, 1] }),
      // ...trigger,
    },
  ),
  is_assigned: bool(),
  num_units: int(),
  is_field_marshal: bool(),
  has_unit_leader_flag: either(
    value({}, "leader_flag"),
    obj(
      {
        // scope: {
        //   unit_leader: true,
        //   combat: true,
        //   character: true,
        //   operative: true,
        // },
      },
      {
        flag: value({}, "leader_flag"),
        value: int({ cardinality: [0, 1] }),
        date: date_field({ cardinality: [0, 1] }),
        days: int({ cardinality: [0, 1] }),
      },
    ),
  ),
  has_decision: typeRef({}, "decision"),
  command_power: variable_field(),
  command_power_daily: variable_field(),
  is_fully_controlled_by: either(
    scopeRef({}, country()),
    enumRef({}, "country_tags"),
  ),
  has_ability: typeRef({}, "ability"),
  has_variable: either(value({}, "variable"), ...variable_field()),
  has_id: int(),
  can_select_trait: typeRef({}, "unit_leader_trait"),
  add_to_temp_variable: either(
    obj(
      {},
      {
        value_set: value_set({}, "variable"),
        value: variable_field(),
      },
    ),
    obj(
      {},
      {
        var: value_set({}, "variable"),
        value: variable_field(),
      },
    ),
  ),
  subtract_from_temp_variable: either(
    obj(
      {},
      {
        value_set: value_set({}, "variable"),
        value: variable_field(),
      },
    ),
    obj(
      {},
      {
        var: value_set({}, "variable"),
        value: variable_field(),
      },
    ),
  ),
  multiply_temp_variable: either(
    obj(
      {},
      {
        value_set: value_set({}, "variable"),
        value: variable_field(),
      },
    ),
    obj(
      {},
      {
        var: value_set({}, "variable"),
        value: variable_field(),
      },
    ),
  ),
  divide_temp_variable: either(
    obj(
      {},
      {
        value_set: value_set({}, "variable"),
        value: variable_field(),
        tooltip: localisation({ cardinality: [0, 1] }),
      },
    ),
    obj(
      {},
      {
        var: value_set({}, "variable"),
        value: variable_field(),
        tooltip: localisation({ cardinality: [0, 1] }),
      },
    ),
  ),
};
