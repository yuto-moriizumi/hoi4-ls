import {
  either,
  obj,
  enumRef,
  value_set,
  variable_field,
  value,
  float,
  bool,
  state,
  country,
  scopeRef,
  typeRef,
  int,
  scalar,
  array,
  int_variable_field,
  localisation,
  unit_leader,
  combat,
} from "./utils";

export const trigger = {
  set_temp_variable: either(
    obj(
      {},
      {
        variable: variable_field(),
      },
    ),
    obj(
      {},
      {
        // variable: scope_field(),
      },
    ),
    obj(
      {},
      {
        variable: enumRef({}, "country_tags"),
      },
    ),
    obj(
      {},
      {
        variable: value_set({}, "token"),
      },
    ),
  ),
  clamp_temp_variable: either(
    obj(
      {},
      {
        var: value_set({}, "variable"),
        min: variable_field(),
        max: variable_field(),
      },
    ),
    obj(
      {},
      {
        var: value_set({}, "variable"),
        max: variable_field(),
      },
    ),
    obj(
      {},
      {
        var: value_set({}, "variable"),
        min: variable_field(),
      },
    ),
  ),
  num_of_civilian_factories_available_for_projects: variable_field(),
  has_event_target: either(
    value({}, "event_target"),
    value({}, "global_event_target"),
  ),
  political_power_growth: float(),
  has_border_war: bool(),
  is_border_war: bool(),
  has_border_war_between: obj(
    { scope: [state(), country()] },
    {
      attacker: either(scopeRef({}, "state"), typeRef({}, "state")),
      defender: either(scopeRef({}, "state"), typeRef({}, "state")),
    },
  ),
  has_border_war_with: either(
    scopeRef({}, "country"),
    enumRef({}, "country_tags"),
  ),
  average_stats: int(),
  attack_skill_level: int(),
  defense_skill_level: int(),
  logistics_skill_level: int(),
  planning_skill_level: int(),
  is_leading_army_group: bool(),
  is_leading_army: bool(),
  print_variables: obj(
    {},
    {
      file: scalar(),
      text: scalar({ cardinality: [0, 1] }),
      append: bool({ cardinality: [0, 1] }),
      print_global: bool({ cardinality: [0, 1] }),
      var_list: array({ cardinality: [1, Infinity] }, [value({}, "variable")]),
    },
  ),
  has_active_mission: typeRef({}, "decision.mission"),
  has_attache: bool({}, true),
  has_attache_from: either(
    scopeRef({}, "country"),
    enumRef({}, "country_tags"),
  ),
  amount_manpower_in_deployment_queue: float(),
  army_manpower_in_state: obj(
    { scope: country() },
    {
      state: either(typeRef({}, "state"), ...variable_field()),
      amount: int_variable_field(),
      type: enumRef({ cardinality: [0, 1] }, "unit_types"),
    },
  ),
  is_exiled_leader: bool({}, true),
  is_exiled_in: either(scopeRef({}, "country"), enumRef({}, "country_tags")),
  is_hosting_exile: either(
    scopeRef({}, "country"),
    enumRef({}, "country_tags"),
  ),
  is_exiled_leader_from: either(
    scopeRef({}, "country"),
    enumRef({}, "country_tags"),
  ),
  is_exile_host: bool(),
  is_government_in_exile: bool(),
  divisions_in_border_state: obj(
    { scope: country() },
    {
      type: enumRef({ cardinality: [0, 1] }, "land_units"),
      size: int(),
      state: either(scopeRef({}, "state"), typeRef({}, "state")),
      border_state: either(scopeRef({}, "state"), typeRef({}, "state")),
    },
  ),
  stockpile_ratio: obj(
    { scope: country() },
    {
      archetype: either(
        typeRef({}, "equipment.archetype_equip"),
        typeRef({}, "duplicate_archetypes"),
      ),
      ratio: float(),
    },
  ),
  state_strategic_value: int(),
  state_and_terrain_strategic_value: int(),
  round_temp_variable: either(value({}, "variable"), ...variable_field()),
  has_subject: either(scopeRef({}, "country"), enumRef({}, "country_tags")),
  has_game_rule: obj(
    {},
    {
      rule: typeRef({}, "game_rule"),
      option: value({}, "game_rule_options"),
    },
  ),
  game_rules_allow_achievements: bool({}, true),
  is_in_array: either(
    obj(
      {},
      {
        array: value({}, "array"),
        value: scalar(),
      },
    ),
    obj(
      {},
      {
        value: scalar(),
      },
    ),
    obj(
      {},
      {
        variable_field_32: scalar(),
      },
    ),
  ),
  add_to_temp_array: either(
    obj(
      {},
      {
        array: value_set({}, "array"),
        value: variable_field({ cardinality: [0, 1] }),
        index: int_variable_field({ cardinality: [0, 1] }),
      },
    ),
    obj(
      {},
      {
        array: value_set({}, "variable"),
        // value: scope_field({ cardinality: [0, 1] }),
        index: int_variable_field({ cardinality: [0, 1] }),
      },
    ),
    obj(
      {},
      {
        array: enumRef({ cardinality: [0, 1] }, "country_tags"),
        // value: scope_field({ cardinality: [0, 1] }),
        index: int_variable_field({ cardinality: [0, 1] }),
      },
    ),
  ),
  remove_from_temp_array: either(
    obj(
      {},
      {
        array: value_set({}, "array"),
        value: variable_field({ cardinality: [0, 1] }),
      },
    ),
    obj(
      {},
      {
        array: value_set({}, "variable"),
        index: int_variable_field({ cardinality: [0, 1] }),
      },
    ),
  ),
  clear_temp_array: either(value({}, "array"), ...variable_field()),
  resize_temp_array: either(
    obj(
      {},
      {
        array: value_set({}, "array"),
        value: variable_field({ cardinality: [0, 1] }),
        size: int_variable_field(),
      },
    ),
    obj(
      {},
      {
        array: value_set({}, "variable"),
        value: variable_field({ cardinality: [0, 1] }),
        size: int_variable_field(),
      },
    ),
  ),
  any_of: obj(
    {},
    {
      tooltip: localisation({ cardinality: [0, 1] }),
      array: either(value({}, "array"), ...variable_field()),
      value: value_set({ cardinality: [0, 1] }, "variable"),
      index: value_set({ cardinality: [0, 1] }, "variable"),
      // ...trigger,
    },
  ),
  all_of: obj(
    {},
    {
      tooltip: localisation({ cardinality: [0, 1] }),
      array: either(value({}, "array"), ...variable_field()),
      value: value_set({ cardinality: [0, 1] }, "variable"),
      index: value_set({ cardinality: [0, 1] }, "variable"),
      // ...trigger,
    },
  ),
  has_fuel: int_variable_field(),
  any_of_scopes: obj(
    {},
    {
      tooltip: localisation({ cardinality: [0, 1] }),
      array: either(value({}, "array"), ...variable_field()),
      // ...trigger,
    },
  ),
  all_of_scopes: obj(
    {},
    {
      tooltip: localisation({ cardinality: [0, 1] }),
      array: either(value({}, "array"), ...variable_field()),
      // ...trigger,
    },
  ),
  has_country_leader_with_trait: typeRef({}, "country_leader_trait"),
  has_legitimacy: int(),
  has_rule: enumRef({}, "game_rules"),
  state_population_k: either(int(), value({}, "variable")),
  casualties_k: int(),
  meta_trigger: obj(
    {},
    {
      //   text: ignore_field(),
      scalar: localisation({ cardinality: [1, Infinity] }),
    },
  ),
  has_dynamic_modifier: obj(
    { scope: [state(), country()] },
    {
      modifier: typeRef({}, "dynamic_modifier"),
      scope: either(
        enumRef({ cardinality: [0, 1] }, "country_tags"),
        scopeRef({ cardinality: [0, 1] }, "country"),
      ),
    },
  ),
  find_lowest_in_array: obj(
    {},
    {
      array: either(value({}, "array"), ...variable_field()),
      value: value_set({ cardinality: [0, 1] }, "variable"),
      index: value_set({ cardinality: [0, 1] }, "variable"),
    },
  ),
  find_highest_in_array: obj(
    {},
    {
      array: either(value({}, "array"), ...variable_field()),
      value: value_set({ cardinality: [0, 1] }, "variable"),
      index: value_set({ cardinality: [0, 1] }, "variable"),
    },
  ),
  has_mines: obj(
    { scope: country() },
    {
      region: typeRef({}, "strategic_region"),
      amount: int_variable_field(),
    },
  ),
  naval_strength_comparison: obj(
    { scope: country() },
    {
      other: either(
        scopeRef({ cardinality: [0, 1] }, "country"),
        enumRef({ cardinality: [0, 1] }, "country_tags"),
      ),
      tooltip: localisation({ cardinality: [0, 1] }),
      ratio: float({ cardinality: [0, 1] }),
      sub_unit_def_weights: obj(
        { cardinality: [0, Infinity] },
        {
          //   [typeRef({}, "unit.ship_unit")]: float(),
        },
      ),
    },
  ),
  fuel_ratio: float(),
  days_since_last_strategic_bombing: int(),
  mine_threat: float({}, 0, 1),
  convoy_threat: float({}, 0, 1),
  casualties_inflicted_by: obj(
    { scope: country() },
    {
      opponent: either(scopeRef({}, "country"), enumRef({}, "country_tags")),
      thousands: variable_field(),
    },
  ),
  has_mined: obj(
    { scope: country() },
    {
      target: either(scopeRef({}, "country"), enumRef({}, "country_tags")),
      value: variable_field(),
    },
  ),
  received_expeditionary_forces: obj(
    { scope: country() },
    {
      sender: either(scopeRef({}, "country"), enumRef({}, "country_tags")),
      value: variable_field(),
    },
  ),
  is_fighting_in_weather: scalar(),
  "<building>": int_variable_field(),
  //   "<ideology>": either(variable_field(), typeRef({}, "ideology")),
  opponent: obj(
    { scope: [unit_leader(), combat()] },
    {
      // ...trigger,
    },
  ),
  enum_unit_types: variable_field(),
  hidden_trigger: obj(
    {},
    {
      // ...trigger,
    },
  ),
  controls_province: enumRef({}, "provinces"),
  has_core_occupation_modifier: obj(
    { scope: country() },
    {
      occupied_country_tag: either(
        scopeRef({}, "country"),
        enumRef({}, "country_tags"),
      ),
      modifier: typeRef({}, "resistance_compliance_modifier"),
    },
  ),
  has_intelligence_agency: bool(),
  impassable: bool(),
  has_casualties_war_support: either(float(), ...variable_field()),
  has_convoys_war_support: either(float(), ...variable_field()),
  has_bombing_war_support: either(float(), ...variable_field()),
  has_resources_in_country: obj(
    { scope: country() },
    {
      resource: typeRef({}, "resource"),
      amount: int_variable_field(),
      extracted: bool({ cardinality: [0, 1] }),
      buildings: bool({ cardinality: [0, 1] }),
    },
  ),
};
