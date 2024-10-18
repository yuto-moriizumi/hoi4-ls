import {
  bool,
  either,
  scopeRef,
  typeRef,
  obj,
  int,
  unit_leader,
  combat,
  character,
  enumRef,
  country,
  localisation,
  value,
  float,
  state,
  variable_field,
} from "./utils";

export const trigger = {
  scripted_trigger: bool(),
  state: either(scopeRef({}, "state"), typeRef({}, "state")),
  if: obj(
    {},
    {
      limit: obj({}, {}),
    },
  ),
  else_if: obj(
    {},
    {
      limit: obj({}, {}),
    },
  ),
  else: obj({}, {}),
  skill: int({ scope: [unit_leader(), combat(), character()] }),
  phase: enumRef({}, "phases"),
  exists: bool({ scope: country() }),
  difficulty: int({}),
  any_neighbor_country: obj(
    { scope: country(), push_scope: country() },
    {
      tooltip: localisation({ cardinality: [0, 1] }),
    },
  ),
  resource: int(),
  has_country_flag: either(
    value({}, "country_flag"),
    obj(
      { scope: country(), severity: "warning" },
      {
        flag: value({}, "country_flag"),
        value: int({ cardinality: [0, 1] }),
        days: int({ cardinality: [0, 1] }),
      },
    ),
  ),
  reserves: int(),
  tag: either(scopeRef({}, "country"), enumRef({}, "country_tags")),
  any_country: obj(
    { push_scope: country() },
    {
      tooltip: localisation({ cardinality: [0, 1] }),
    },
  ),
  check_variable: either(
    obj(
      { cardinality: [1, 2] },
      {
        variable_field_32: variable_field(),
        compare: enumRef({ cardinality: [0, 1] }, "var_compares"),
        tooltip: localisation({ cardinality: [0, 1] }),
      },
    ),
    obj(
      { cardinality: [1, 2] },
      {
        value: variable_field(),
        compare: enumRef({ cardinality: [0, 1] }, "var_compares"),
        tooltip: localisation({ cardinality: [0, 1] }),
      },
    ),
    obj(
      { cardinality: [1, 2] },
      {
        variable_field_32: enumRef({}, "country_tags"),
        tooltip: localisation({ cardinality: [0, 1] }),
      },
    ),
    obj(
      { cardinality: [1, 2] },
      {
        variable_field_32: scopeRef({}, "country"),
        tooltip: localisation({ cardinality: [0, 1] }),
      },
    ),
    obj(
      { cardinality: [1, 2] },
      {
        variable_field_32: value({}, "token"),
        tooltip: localisation({ cardinality: [0, 1] }),
      },
    ),
    obj(
      {},
      {
        var: either(value({}, "variable"), ...variable_field()),
        value: either(...variable_field(), value({}, "variable")),
        compare: enumRef({ cardinality: [0, 1] }, "var_compares"),
        tooltip: localisation({ cardinality: [0, 1] }),
      },
    ),
  ),
  region: typeRef({}, "strategic_region"),
  is_subject: bool({ scope: country() }),
  area: typeRef({}, "supply_area"),
  threat: float({}, 0, 1),
  always: bool(),
  is_capital: bool({ scope: state() }),
  has_global_flag: either(
    value({}, "global_flag"),
    obj(
      { severity: "warning" },
      {
        flag: value({}, "global_flag"),
        value: int({ cardinality: [0, 1] }),
        days: int({ cardinality: [0, 1] }),
      },
    ),
  ),
  is_attacker: bool({ scope: combat() }),
  has_dlc: enumRef({}, "dlc"),
  has_idea: enumRef({}, "idea_name"),
  any_enemy_country: obj(
    { scope: country(), push_scope: country() },
    {
      tooltip: localisation({ cardinality: [0, 1] }),
    },
  ),
  is_neighbor_of: either(scopeRef({}, "country"), enumRef({}, "country_tags")),
  has_opinion: either(
    obj(
      { scope: country() },
      {
        target: scopeRef({}, "country"),
        value: int(),
      },
    ),
    obj(
      { scope: country() },
      {
        target: enumRef({}, "country_tags"),
        value: int(),
      },
    ),
  ),
  has_opinion_modifier: typeRef({}, "opinion"),
  is_subject_of: either(scopeRef({}, "country"), enumRef({}, "country_tags")),
  all_neighbor_country: obj(
    { scope: country(), push_scope: country() },
    {
      limit: obj({}, {}),
    },
  ),
  all_country: obj(
    { push_scope: country() },
    {
      limit: obj({}, {}),
    },
  ),
  all_enemy_country: obj(
    { scope: country(), push_scope: country() },
    {
      limit: obj({}, {}),
    },
  ),
  night: bool({ scope: combat() }),
  dig_in: float({ scope: combat() }),
  temperature: int({ scope: combat() }),
  armor: float({ scope: combat() }),
  has_war: bool({ scope: country() }),
  is_controlled_by: either(
    scopeRef({}, "country"),
    enumRef({}, "country_tags"),
  ),
  is_owned_by: either(scopeRef({}, "country"), enumRef({}, "country_tags")),
  skill_advantage: int({ scope: [unit_leader(), combat()] }),
  owns_state: either(scopeRef({}, "state"), typeRef({}, "state")),
  controls_state: either(scopeRef({}, "state"), typeRef({}, "state")),
  has_government: either(
    typeRef({}, "ideology"),
    enumRef({}, "sub_ideology"),
    scopeRef({}, "country"),
  ),
  has_country_leader_ideology: either(
    typeRef({}, "ideology"),
    enumRef({}, "sub_ideology"),
  ),
  has_state_flag: either(
    value({}, "state_flag"),
    obj(
      { scope: state(), severity: "warning" },
      {
        flag: value({}, "state_flag"),
        value: int({ cardinality: [0, 1] }),
        days: int({ cardinality: [0, 1] }),
      },
    ),
  ),
  has_war_with: either(scopeRef({}, "country"), enumRef({}, "country_tags")),
  divisions_in_state: obj(
    { scope: country() },
    {
      size: float(),
      state: either(scopeRef({}, "state"), typeRef({}, "state")),
      unit: typeRef({ cardinality: [0, 1] }, "unit"),
      type: enumRef({ cardinality: [0, 1] }, "land_units"),
    },
  ),
  country_exists: either(scopeRef({}, "country"), enumRef({}, "country_tags")),
  ships_in_area: obj(
    { scope: country() },
    {
      type: either(
        typeRef({ cardinality: [0, 1] }, "unit.ship_unit"),
        enumRef({ cardinality: [0, 1] }, "ship_units"),
      ),
      area: typeRef({}, "strategic_region"),
      size: int(),
    },
  ),
  has_army_size: obj(
    { scope: country() },
    {
      size: float(),
      type: enumRef({ cardinality: [0, 1] }, "land_units"),
    },
  ),
  has_navy_size: obj(
    { scope: country() },
    {
      size: float(),
      type: enumRef({ cardinality: [0, 1] }, "ship_units"),
      unit: typeRef({ cardinality: [0, 1] }, "unit.ship_unit"),
      archetype: either(
        typeRef({ cardinality: [0, 1] }, "equipment.archetype_equip"),
        typeRef({ cardinality: [0, 1] }, "duplicate_archetypes"),
      ),
    },
  ),
  num_of_military_factories: variable_field(),
  num_of_civilian_factories: variable_field(),
  num_of_naval_factories: variable_field(),
  num_of_nukes: variable_field(),
  has_manpower: variable_field(),
  has_political_power: variable_field(),
  num_of_available_military_factories: variable_field(),
  num_of_available_naval_factories: variable_field(),
  num_of_available_civilian_factories: variable_field(),
  is_in_faction_with: either(
    scopeRef({}, "country"),
    enumRef({}, "country_tags"),
    value({}, "variable"),
  ),
  is_in_faction: bool(),
  is_faction_leader: bool(),
  is_guaranteed_by: either(
    scopeRef({}, "country"),
    enumRef({}, "country_tags"),
  ),
  is_embargoing: either(scopeRef({}, "country"), enumRef({}, "country_tags")),
  is_embargoed_by: either(scopeRef({}, "country"), enumRef({}, "country_tags")),
  has_guaranteed: either(scopeRef({}, "country"), enumRef({}, "country_tags")),
  has_military_access_to: either(
    scopeRef({}, "country"),
    enumRef({}, "country_tags"),
  ),
  gives_military_access_to: either(
    scopeRef({}, "country"),
    enumRef({}, "country_tags"),
  ),
  any_state: obj(
    { push_scope: state() },
    {
      tooltip: localisation({ cardinality: [0, 1] }),
    },
  ),
};

export const var_compares = [
  "less_than",
  "less_than_or_equals",
  "greater_than",
  "greater_than_or_equals",
  "equals",
  "not_equals",
];
