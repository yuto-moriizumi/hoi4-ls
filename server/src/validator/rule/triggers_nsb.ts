import {
  obj,
  country,
  state,
  localisation,
  int,
  scopeRef,
  typeRef,
  int_variable_field,
  either,
  array,
  enumRef,
  character,
  value,
  unit_leader,
  bool,
  scalar,
  variable_field,
  value_set,
  literal,
} from "./utils";

export const trigger = {
  any_core_state: obj(
    { scope: [country()], push_scope: state() },
    {
      tooltip: localisation({ cardinality: [0, 1] }),
      // ...trigger,
    },
  ),
  all_core_state: obj(
    { scope: [country()], push_scope: state() },
    {
      tooltip: localisation({ cardinality: [0, 1] }),
      // ...trigger,
    },
  ),
  any_subject_country: obj(
    { scope: [country()], push_scope: country() },
    {
      tooltip: localisation({ cardinality: [0, 1] }),
      // ...trigger,
    },
  ),
  all_subject_countries: obj(
    { scope: [country()], push_scope: country() },
    {
      tooltip: localisation({ cardinality: [0, 1] }),
      // ...trigger,
    },
  ),
  has_railway_level: obj(
    {},
    {
      level: int(),
      state: scopeRef({}, "state"),
    },
  ),
  has_available_resources_in_country: obj(
    { scope: [country()] },
    {
      resource: typeRef({}, "resource"),
      amount: int_variable_field(),
    },
  ),
  has_resources_rights: either(
    obj(
      { scope: [country()] },
      {
        state: scopeRef({}, "state"),
        resources: array({ cardinality: [1, Infinity] }, [
          typeRef({}, "resource"),
        ]),
      },
    ),
    obj(
      { scope: [state()] },
      {
        receiver: enumRef({}, "country_tags"),
        resources: array({ cardinality: [1, Infinity] }, [
          typeRef({}, "resource"),
        ]),
      },
    ),
  ),
  any_character: obj(
    { scope: [country()], push_scope: character() },
    {
      tooltip: localisation({ cardinality: [0, 1] }),
      // ...trigger,
    },
  ),
  all_character: obj(
    { scope: [country()], push_scope: character() },
    {
      tooltip: localisation({ cardinality: [0, 1] }),
      // ...trigger,
    },
  ),
  has_character_flag: either(
    value({}, "character_flag"),
    obj(
      { scope: [character(), unit_leader()], severity: "warning" },
      {
        flag: value({}, "character_flag"),
        value: int({ cardinality: [0, 1] }),
        days: int({ cardinality: [0, 1] }),
      },
    ),
  ),
  has_character: either(
    typeRef({}, "character"),
    value({}, "character_token"),
    value({}, "variable"),
    value({}, "event_target"),
    value({}, "global_event_target"),
    scopeRef({}, "character"),
  ),
  is_character: either(
    typeRef({}, "character"),
    value({}, "character_token"),
    value({}, "variable"),
    value({}, "event_target"),
    value({}, "global_event_target"),
    scopeRef({}, "character"),
  ),
  has_country_leader: either(
    obj(
      { scope: [country()] },
      {
        ruling_only: bool({ cardinality: [0, 1] }),
        character: either(
          typeRef({}, "character"),
          value({}, "character_token"),
          value({}, "variable"),
          value({}, "event_target"),
          value({}, "global_event_target"),
          scopeRef({}, "character"),
        ),
      },
    ),
    obj(
      { scope: [country()] },
      {
        ruling_only: bool({ cardinality: [0, 1] }),
        id: int(),
      },
    ),
    obj(
      { scope: [country()] },
      {
        ruling_only: bool({ cardinality: [0, 1] }),
        name: scalar(),
      },
    ),
  ),
  can_be_country_leader: either(
    typeRef({}, "character"),
    value({}, "character_token"),
    value({}, "variable"),
    value({}, "event_target"),
    value({}, "global_event_target"),
    scopeRef({}, "character"),
    bool(),
  ),
  is_army_chief: bool(),
  is_advisor: bool(),
  is_political_advisor: bool(),
  is_theorist: bool(),
  is_navy_chief: bool(),
  is_air_chief: bool(),
  is_high_command: bool(),
  is_country_leader: bool(),
  is_unit_leader: bool(),
  is_army_leader: bool(),
  is_corps_commander: bool(),
  is_navy_leader: bool(),
  is_operative: bool(),
  has_army_ledger: bool(),
  has_navy_ledger: bool(),
  has_air_ledger: bool(),
  is_character_slot: value({}, "character_advisor_slot"),
  not_already_hired_except_as: value({}, "character_advisor_slot"),
  character_flag: obj(
    { scope: [character(), unit_leader()], severity: "warning" },
    {
      flag: value({}, "country_flag"),
      value: int({ cardinality: [0, 1] }),
      days: int({ cardinality: [0, 1] }),
    },
  ),
  has_idea: value({}, "advisor_token"),
  has_ideology: enumRef({}, "sub_ideology"),
  has_ideology_group: typeRef({}, "ideology"),
  num_of_controlled_factories: variable_field(),
  has_terrain: typeRef({}, "terrain"),
  is_dynamic_country: bool(),
  has_design_based_on: either(
    typeRef({}, "equipment.archetype_equip"),
    typeRef({}, "duplicate_archetypes"),
  ),
  num_of_owned_factories: variable_field(),
  can_build_railway: either(
    obj(
      { scope: [country()] },
      {
        path: array({ cardinality: [1, Infinity] }, [enumRef({}, "provinces")]),
        build_only_on_allied: bool({ cardinality: [0, 1] }),
        fallback: bool({ cardinality: [0, 1] }),
      },
    ),
    obj(
      { scope: [country()] },
      {
        build_only_on_allied: bool({ cardinality: [0, 1] }),
        start_province: enumRef({}, "provinces"),
        target_province: enumRef({}, "provinces"),
        fallback: bool({ cardinality: [0, 1] }),
      },
    ),
    obj(
      { scope: [country()] },
      {
        build_only_on_allied: bool({ cardinality: [0, 1] }),
        start_state: either(typeRef({}, "state"), scopeRef({}, "state")),
        target_state: either(typeRef({}, "state"), scopeRef({}, "state")),
        fallback: bool({ cardinality: [0, 1] }),
      },
    ),
  ),
  has_railway_connection: either(
    obj(
      { scope: [country()] },
      {
        path: array({ cardinality: [1, Infinity] }, [enumRef({}, "provinces")]),
        build_only_on_allied: bool({ cardinality: [0, 1] }),
        fallback: bool({ cardinality: [0, 1] }),
      },
    ),
    obj(
      { scope: [country()] },
      {
        build_only_on_allied: bool({ cardinality: [0, 1] }),
        start_province: enumRef({}, "provinces"),
        target_province: enumRef({}, "provinces"),
        fallback: bool({ cardinality: [0, 1] }),
      },
    ),
    obj(
      { scope: [country()] },
      {
        build_only_on_allied: bool({ cardinality: [0, 1] }),
        start_state: either(typeRef({}, "state"), scopeRef({}, "state")),
        target_state: either(typeRef({}, "state"), scopeRef({}, "state")),
        fallback: bool({ cardinality: [0, 1] }),
      },
    ),
  ),
  any_country_with_core: obj(
    { scope: [state()], push_scope: country() },
    {
      tooltip: localisation({ cardinality: [0, 1] }),
      // ...trigger,
    },
  ),
  has_advisor_role: enumRef({}, "allowed_advisor_role"),
  advisor_can_be_fired: either(
    bool(),
    obj(
      { scope: [character(), unit_leader()] },
      {
        slot: value({}, "character_advisor_slot"),
      },
    ),
  ),
  num_of_supply_nodes: int_variable_field(),
  get_supply_vehicles_temp: obj(
    { scope: [country()] },
    {
      var: value_set({}, "variable"),
      type: either(literal({}, "truck"), literal({}, "train")),
      need: bool({ cardinality: [0, 1] }, true),
    },
  ),
};
