import { trigger } from "./triggers";
import { Entries } from "./types";
import {
  variable_field,
  obj,
  scalar,
  either,
  typeRef,
  scopeRef,
  bool,
  enumRef,
  value,
  localisation,
  array,
  value_set,
  int,
  literal,
  float,
  int_variable_field,
  enumRefKey,
  country,
  localisation_inline,
  unit,
  state,
} from "./utils";

export const effect: Entries = {
  gain_xp: variable_field(),
  delete_unit: obj(
    {},
    {
      template: scalar({ cardinality: [0, 1] }),
      division_template: scalar({ cardinality: [0, 1] }),
      id: variable_field({ cardinality: [0, 1] }),
      state: either(
        typeRef({ cardinality: [0, 1] }, "state"),
        scopeRef({ cardinality: [0, 1] }, "state"),
      ),
      disband: bool({ cardinality: [0, 1] }),
    },
  ),
  free_operative: either(
    enumRef({}, "country_tags"),
    scopeRef({}, "country"),
    value({}, "unit_leader_ids"),
    scopeRef({}, "unit_leader"),
    obj({}, { captured_by: enumRef({}, "country_tags") }),
    obj({}, { captured_by: scopeRef({}, "country") }),
  ),
  free_random_operative: obj(
    {},
    {
      captured_by: either(enumRef({}, "country_tags"), scopeRef({}, "country")),
      all: bool({ cardinality: [0, 1] }),
    },
  ),
  create_operative_leader: obj(
    {},
    {
      name: scalar({ cardinality: [0, 1] }),
      desc: localisation({ cardinality: [0, 1] }),
      picture: scalar({ cardinality: [0, 1] }),
      portrait_path: scalar({ cardinality: [0, 1] }),
      gfx: typeRef({ cardinality: [0, 1], severity: "warning" }, "spriteType"),
      traits: array({ cardinality: [0, 1] }, [
        typeRef({ cardinality: [0, Infinity] }, "unit_leader_trait"),
      ]),
      id: value_set({ cardinality: [0, 1] }, "unit_leader_ids"),
      available_to_spy_master: bool({ cardinality: [0, 1] }),
      bypass_recruitment: bool({ cardinality: [0, 1] }),
      nationalities: array({ cardinality: [0, 1] }, [
        scopeRef({ cardinality: [0, Infinity] }, "country"),
        enumRef({ cardinality: [0, Infinity] }, "country_tags"),
      ]),
      portrait_tag_override: either(
        scopeRef({ cardinality: [0, 1] }, "country"),
        enumRef({ cardinality: [0, 1] }, "country_tags"),
      ),
      female: bool({ cardinality: [0, 1] }),
      skill: int({ cardinality: [0, 1] }),
      gender: either(
        literal({ cardinality: [0, 1] }, "male"),
        literal({ cardinality: [0, 1] }, "female"),
      ),
    },
  ),
  capture_operative: either(
    scopeRef({}, "operative"),
    obj(
      {},
      {
        operative: scopeRef({}, "operative"),
        ignore_death_chance: bool({ cardinality: [0, 1] }),
      },
    ),
    obj(
      {},
      {
        captured_by: either(
          scopeRef({}, "country"),
          enumRef({}, "country_tags"),
        ),
        ignore_death_chance: bool({ cardinality: [0, 1] }),
      },
    ),
  ),
  random_operative: obj(
    {},
    {
      limit: obj({ cardinality: [0, 1] }, { ...trigger }),
      // ...effect,
    },
  ),
  every_operative: obj(
    {},
    {
      random_select_amount: int({ cardinality: [0, 1] }, 1, Infinity),
      display_individual_scopes: bool({ cardinality: [0, 1] }),
      limit: obj({ cardinality: [0, 1] }, { ...trigger }),
      // ...effect,
    },
  ),
  send_equipment_fraction: obj(
    {},
    {
      target: either(enumRef({}, "country_tags"), scopeRef({}, "country")),
      value: variable_field(),
    },
  ),
  transfer_units_fraction: obj(
    {},
    {
      target: either(enumRef({}, "country_tags"), scopeRef({}, "country")),
      target_organization: float({ cardinality: [0, 1] }),
      source_organization: float({ cardinality: [0, 1] }),
      size: variable_field({ cardinality: [0, 1] }),
      stockpile_ratio: variable_field({ cardinality: [0, 1] }),
      army_ratio: variable_field({ cardinality: [0, 1] }),
      navy_ratio: variable_field({ cardinality: [0, 1] }),
      air_ratio: variable_field({ cardinality: [0, 1] }),
      keep_unit_leaders: array({ cardinality: [0, 1] }, [
        value({ cardinality: [1, Infinity] }, "unit_leader_ids"),
      ]),
      keep_unit_leaders_trigger: obj({ cardinality: [0, 1] }, { ...trigger }),
    },
  ),
  kill_ideology_leader: either(typeRef({}, "ideology"), ...variable_field()),
  add_days_remove: obj(
    {},
    {
      decision: typeRef({}, "decision.timed"),
      days: int_variable_field(),
    },
  ),
  add_days_mission_timeout: obj(
    {},
    {
      mission: typeRef({}, "decision.mission"),
      days: int_variable_field(),
    },
  ),
  add_resistance: variable_field(),
  add_compliance: variable_field(),
  start_resistance: either(
    enumRef({}, "country_tags"),
    scopeRef({}, "country"),
    bool(),
  ),
  cancel_resistance: bool(),
  set_resistance: variable_field(),
  set_compliance: variable_field(),
  add_operation_token: obj(
    {},
    {
      tag: either(scopeRef({}, "country"), enumRef({}, "country_tags")),
      token: typeRef({}, "operation_token"),
    },
  ),
  remove_operation_token: obj(
    {},
    {
      tag: either(scopeRef({}, "country"), enumRef({}, "country_tags")),
      token: typeRef({}, "operation_token"),
    },
  ),
  steal_random_tech_bonus: obj(
    {},
    {
      folder: enumRef({ cardinality: [0, Infinity] }, "tech_folder"),
      category: enumRef({ cardinality: [0, Infinity] }, "tech_category"),
      [enumRefKey("tech_bonus")]: float({ cardinality: [1, 2] }),
      base_bonus: float({ cardinality: [0, 1] }),
      dynamic: bool({ cardinality: [0, 1] }),
      name: localisation({ cardinality: [0, 1] }),
      uses: int({ cardinality: [0, 1] }, 1, 32767),
      instant: bool({ cardinality: [0, 1] }),
      target: either(enumRef({}, "country_tags"), scopeRef({}, "country")),
    },
  ),
  teleport_armies: either(
    obj(
      {},
      {
        limit: obj(
          { cardinality: [0, 1], replace_scope: { this: country() } },
          { ...trigger },
        ),
        to_state: either(typeRef({}, "state"), scopeRef({}, "state")),
      },
    ),
    obj(
      {},
      {
        limit: obj(
          { cardinality: [0, 1], replace_scope: { this: country() } },
          { ...trigger },
        ),
        to_state_array: value_set({ cardinality: [1, 1] }, "array"),
      },
    ),
    obj(
      {},
      {
        limit: obj(
          { cardinality: [0, 1], replace_scope: { this: country() } },
          { ...trigger },
        ),
        to_province: enumRef({ cardinality: [1, 1] }, "provinces"),
      },
    ),
    obj(
      {},
      {
        limit: obj(
          { cardinality: [0, 1], replace_scope: { this: country() } },
          { ...trigger },
        ),
      },
    ),
  ),
  every_controlled_state: obj(
    {},
    {
      random_select_amount: int({ cardinality: [0, 1] }, 1, Infinity),
      display_individual_scopes: bool({ cardinality: [0, 1] }),
      limit: obj({ cardinality: [0, 1] }, { ...trigger }),
      tooltip: localisation({ cardinality: [0, 1] }),
      // ...effect,
    },
  ),
  set_state_province_controller: obj(
    {},
    {
      controller: either(enumRef({}, "country_tags"), scopeRef({}, "country")),
      limit: obj({ cardinality: [0, 1] }, { ...trigger }),
    },
  ),
  reserve_dynamic_country: bool(),
  get_highest_scored_country_temp: obj(
    {},
    {
      scorer: typeRef({}, "country_scorer"),
      var: value_set({ cardinality: [0, 1] }, "variable"),
    },
  ),
  create_dynamic_country: obj(
    { push_scope: country() },
    {
      original_tag: either(
        enumRef({}, "country_tags"),
        scopeRef({}, "country"),
      ),
      copy_tag: either(
        enumRef({ cardinality: [0, 1] }, "country_tags"),
        scopeRef({ cardinality: [0, 1] }, "country"),
      ),
      // ...effect,
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
  random_occupied_country: obj(
    { push_scope: country() },
    {
      limit: obj({ cardinality: [0, 1] }, { ...trigger }),
      // ...effect,
    },
  ),
  every_occupied_country: obj(
    { push_scope: country() },
    {
      random_select_amount: int({ cardinality: [0, 1] }, 1, Infinity),
      display_individual_scopes: bool({ cardinality: [0, 1] }),
      limit: obj({ cardinality: [0, 1] }, { ...trigger }),
      tooltip: localisation({ cardinality: [0, 1] }),
      // ...effect,
    },
  ),
  add_resistance_target: either(
    ...variable_field(),
    obj(
      {},
      {
        amount: variable_field(),
        tooltip: localisation({ cardinality: [0, 1] }),
        id: value_set({ cardinality: [0, 1] }, "resistance_target"),
        days: int_variable_field({ cardinality: [0, 1] }),
        occupier: either(
          scopeRef({ cardinality: [0, 1] }, "country"),
          enumRef({ cardinality: [0, 1] }, "country_tags"),
        ),
        occupied: either(
          scopeRef({ cardinality: [0, 1] }, "country"),
          enumRef({ cardinality: [0, 1] }, "country_tags"),
        ),
      },
    ),
  ),
  remove_resistance_target: value({}, "resistance_target"),
  get_highest_scored_country: obj(
    {},
    {
      scorer: typeRef({}, "country_scorer"),
      var: value_set({ cardinality: [0, 1] }, "variable"),
    },
  ),
  get_sorted_scored_countries: obj(
    {},
    {
      scorer: typeRef({}, "country_scorer"),
      array: value_set({ cardinality: [0, 1] }, "array"),
      scores: value_set({ cardinality: [0, 1] }, "array"),
    },
  ),
  random_country_with_original_tag: obj(
    { push_scope: country() },
    {
      original_tag_to_check: either(
        enumRef({}, "country_tags"),
        scopeRef({}, "country"),
      ),
      limit: obj({ cardinality: [0, 1] }, { ...trigger }),
      // ...effect,
    },
  ),
  random_country_division: obj(
    { push_scope: unit() },
    {
      limit: obj({ cardinality: [0, 1] }, { ...trigger }),
      // ...effect,
    },
  ),
  every_country_with_original_tag: obj(
    { push_scope: country() },
    {
      random_select_amount: int({ cardinality: [0, 1] }, 1, Infinity),
      display_individual_scopes: bool({ cardinality: [0, 1] }),
      original_tag_to_check: either(
        enumRef({}, "country_tags"),
        scopeRef({}, "country"),
      ),
      limit: obj({ cardinality: [0, 1] }, { ...trigger }),
      // ...effect,
    },
  ),
  add_decryption: obj(
    {},
    {
      target: either(enumRef({}, "country_tags"), scopeRef({}, "country")),
      amount: variable_field(),
    },
  ),
  add_decryption_ratio: obj(
    {},
    {
      target: either(enumRef({}, "country_tags"), scopeRef({}, "country")),
      ratio: variable_field(),
    },
  ),
  delete_units: obj(
    {},
    {
      division_template: scalar(),
      disband: bool({ cardinality: [0, 1] }),
    },
  ),
  force_enable_resistance: either(
    scopeRef({}, "country"),
    enumRef({}, "country_tags"),
    obj(
      {},
      {
        clear: bool({ cardinality: [0, 1] }),
        occupier: either(scopeRef({}, "country"), enumRef({}, "country_tags")),
        occupied: either(scopeRef({}, "country"), enumRef({}, "country_tags")),
      },
    ),
  ),
  force_disable_resistance: either(
    bool(),
    scopeRef({}, "country"),
    enumRef({}, "country_tags"),
    obj(
      {},
      {
        clear: bool({ cardinality: [0, 1] }),
        occupier: either(scopeRef({}, "country"), enumRef({}, "country_tags")),
        occupied: either(scopeRef({}, "country"), enumRef({}, "country_tags")),
      },
    ),
  ),
  create_intelligence_agency: either(
    bool({}, true),
    obj(
      {},
      {
        name: localisation(),
        icon: typeRef({}, "spriteType"),
      },
    ),
  ),
  upgrade_intelligence_agency: typeRef({}, "intelligence_agency_upgrade"),
  create_ship: obj(
    {},
    {
      type: typeRef({}, "equipment.naval_equip"),
      equipment_variant: scalar(),
      creator: either(
        enumRef({ cardinality: [0, 1] }, "country_tags"),
        scopeRef({ cardinality: [0, 1] }, "country"),
      ),
      name: scalar({ cardinality: [0, 1] }),
    },
  ),
  set_faction_spymaster: bool(),
  country_lock_all_division_template: bool(),
  //   randomize_temp_variable: either(
  //     value_set({}, "variable"),
  //     obj(
  //       {},
  //       {
  //         var: value_set({}, "variable"),
  //         distribution: either(literal({}, "uniform"), literal({}, "binomial")),
  //         min: variable_field_32({ cardinality: [0, 1] }),
  //         max: variable_field_32({ cardinality: [0, 1] }),
  //         lambda: variable_field_32({ cardinality: [0, 1] }),
  //       },
  //     ),
  //   ),
  //   randomize_variable: either(
  //     variable_field_32(),
  //     obj(
  //       {},
  //       {
  //         var: variable_field_32(),
  //         distribution: either(literal({}, "uniform"), literal({}, "binomial")),
  //         min: variable_field_32({ cardinality: [0, 1] }),
  //         max: variable_field_32({ cardinality: [0, 1] }),
  //         lambda: variable_field_32({ cardinality: [0, 1] }),
  //       },
  //     ),
  //   ),
  harm_operative_leader: variable_field(),
  force_operative_leader_into_hiding: either(bool(), int({}, 0, 100)),
  add_intel: obj(
    {},
    {
      target: either(enumRef({}, "country_tags"), scopeRef({}, "country")),
      civilian_intel: variable_field({ cardinality: [0, 1] }),
      army_intel: variable_field({ cardinality: [0, 1] }),
      navy_intel: variable_field({ cardinality: [0, 1] }),
      airforce_intel: variable_field({ cardinality: [0, 1] }),
    },
  ),
  operative_leader_event: obj(
    {},
    {
      id: typeRef({}, "event.operative_leader_event"),
      originator: either(
        enumRef({ cardinality: [0, 1] }, "country_tags"),
        scopeRef({ cardinality: [0, 1] }, "country"),
      ),
      recipient: either(
        enumRef({ cardinality: [0, 1] }, "country_tags"),
        scopeRef({ cardinality: [0, 1] }, "country"),
      ),
      hours: variable_field({ cardinality: [0, 1] }, 1, 24),
      days: variable_field({ cardinality: [0, 1] }, 1, 31),
      months: variable_field({ cardinality: [0, 1] }, 1, 12),
      random_hours: variable_field({ cardinality: [0, 1] }, 1, Infinity),
      random_days: variable_field({ cardinality: [0, 1] }, 1, Infinity),
      random: either(
        ...variable_field({ cardinality: [0, 1] }, 1, Infinity),
        obj(
          { cardinality: [0, 1] },
          {
            chance: variable_field(),
            // ...effect,
          },
        ),
      ),
      tooltip: localisation({ cardinality: [0, 1] }),
      set_from: either(
        enumRef({ cardinality: [0, 1] }, "country_tags"),
        scopeRef({ cardinality: [0, 1] }, "country"),
      ),
      set_from_from: either(
        enumRef({ cardinality: [0, 1] }, "country_tags"),
        scopeRef({ cardinality: [0, 1] }, "country"),
      ),
      set_root: either(
        enumRef({ cardinality: [0, 1] }, "country_tags"),
        scopeRef({ cardinality: [0, 1] }, "country"),
      ),
    },
  ),
  kill_operative: either(
    scopeRef({}, "operative"),
    obj(
      {},
      {
        operative: scopeRef({}, "operative"),
      },
    ),
    obj(
      {},
      {
        killed_by: either(scopeRef({}, "country"), enumRef({}, "country_tags")),
      },
    ),
  ),
  random_controlled_state: obj(
    { push_scope: state() },
    {
      prioritize: array({ cardinality: [0, 1] }, [typeRef({}, "state")]),
      limit: obj({ cardinality: [0, 1] }, { ...trigger }),
      // ...effect,
    },
  ),
  mark_focus_tree_layout_dirty: bool({}, true),
  add_civil_war_target: either(
    scopeRef({}, "country"),
    enumRef({}, "country_tags"),
  ),
  //   modulo_temp_variable: either(
  //     obj(
  //       {},
  //       {
  //         [value_setKey("variable")]: variable_field_32(),
  //       },
  //     ),
  //     obj(
  //       {},
  //       {
  //         var: value_set({}, "variable"),
  //         value: variable_field_32(),
  //       },
  //     ),
  //   ),
  //   modulo_variable: either(
  //     obj(
  //       {},
  //       {
  //         [value_setKey("variable")]: variable_field_32(),
  //       },
  //     ),
  //     obj(
  //       {},
  //       {
  //         var: value_set({}, "variable"),
  //         value: variable_field_32(),
  //       },
  //     ),
  //   ),
  add_collaboration: obj(
    {},
    {
      target: either(scopeRef({}, "country"), enumRef({}, "country_tags")),
      value: variable_field(),
    },
  ),
  set_collaboration: obj(
    {},
    {
      target: either(scopeRef({}, "country"), enumRef({}, "country_tags")),
      value: variable_field(),
    },
  ),
  execute_operation_coordinated_strike: obj(
    {},
    {
      amount: int(),
    },
  ),
  add_nationality: either(scopeRef({}, "country"), enumRef({}, "country_tags")),
  recall_volunteers_from: either(
    scopeRef({}, "country"),
    enumRef({}, "country_tags"),
  ),
  turn_operative: either(
    scopeRef({}, "operative"),
    obj(
      {},
      {
        operative: scopeRef({}, "operative"),
      },
    ),
    obj(
      {},
      {
        turned_by: either(scopeRef({}, "country"), enumRef({}, "country_tags")),
      },
    ),
  ),
  set_garrison_strength: variable_field(),
  release_on_controlled: either(
    scopeRef({}, "country"),
    enumRef({}, "country_tags"),
  ),
  release_puppet_on_controlled: either(
    scopeRef({}, "country"),
    enumRef({}, "country_tags"),
  ),
  release: either(scopeRef({}, "country"), enumRef({}, "country_tags")),
  set_country_leader_name: obj(
    {},
    {
      name: localisation_inline(),
      ideology: either(
        typeRef({ cardinality: [0, 1] }, "ideology"),
        ...variable_field({ cardinality: [0, 1] }),
      ),
    },
  ),
  set_country_leader_portrait: obj(
    {},
    {
      portrait: typeRef({}, "spriteType"),
      ideology: either(
        typeRef({ cardinality: [0, 1] }, "ideology"),
        ...variable_field({ cardinality: [0, 1] }),
      ),
    },
  ),
  set_country_leader_description: obj(
    {},
    {
      desc: localisation(),
      ideology: either(
        typeRef({ cardinality: [0, 1] }, "ideology"),
        ...variable_field({ cardinality: [0, 1] }),
      ),
    },
  ),
  set_leader_name: localisation_inline(),
  set_leader_portrait: typeRef({}, "spriteType"),
  set_leader_description: localisation(),
  //   set_variable_to_random: either(
  //     value_set({}, "variable"),
  //     obj(
  //       {},
  //       {
  //         var: value_set({}, "variable"),
  //         min: variable_field_32({ cardinality: [0, 1] }),
  //         max: variable_field_32({ cardinality: [0, 1] }),
  //         integer: bool({ cardinality: [0, 1] }),
  //       },
  //     ),
  //   ),
  //   set_temp_variable_to_random: either(
  //     value_set({}, "variable"),
  //     obj(
  //       {},
  //       {
  //         var: value_set({}, "variable"),
  //         min: variable_field_32({ cardinality: [0, 1] }),
  //         max: variable_field_32({ cardinality: [0, 1] }),
  //         integer: bool({ cardinality: [0, 1] }),
  //       },
  //     ),
  //   ),
  //   add_victory_points: obj(
  //     {},
  //     {
  //       province: enumRef({}, "provinces"),
  //       value: variable_field_32(),
  //     },
  //   ),
  //   set_victory_points: obj(
  //     {},
  //     {
  //       province: enumRef({}, "provinces"),
  //       value: variable_field_32(),
  //     },
  //   ),
  remove_wargoal: obj(
    {},
    {
      target: either(scopeRef({}, "country"), enumRef({}, "country_tags")),
      type: either(typeRef({}, "wargoal"), literal({}, "all")),
    },
  ),
  start_peace_conference: obj(
    {},
    {
      tag: either(scopeRef({}, "country"), enumRef({}, "country_tags")),
      score_factor: float(),
    },
  ),
  set_occupation_law: either(
    literal({}, "default_law"),
    typeRef({}, "occupation_law"),
  ),
  set_occupation_law_where_available: either(
    literal({}, "default_law"),
    typeRef({}, "occupation_law"),
  ),
  add_divisional_commander_xp: int(),
};
