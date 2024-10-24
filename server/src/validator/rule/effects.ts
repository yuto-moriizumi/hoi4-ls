import { modifier_rule } from "./modifier_rule";
import { modifier } from "./modifiers";
import { trigger } from "./triggers";
import { Entries } from "./types";
import {
  bool,
  variable_field,
  country,
  int_variable_field,
  state,
  localisation,
  either,
  obj,
  scopeRef,
  typeRef,
  enumRef,
  array,
  int,
  enumRefKey,
  value_set,
  value,
  scalar,
  datetime_field,
  float,
  character,
  unit_leader,
  localisation_inline,
  typeRefKey,
  literal,
  date_field,
  operative,
  filepath,
  combat,
  any,
} from "./utils";

export const effect: Entries = {
  scripted_effect: bool({}, true),
  add_stability: variable_field({ scope: [any(), country()] }),
  add_manpower: int_variable_field({ scope: [state(), country()] }),
  custom_effect_tooltip: localisation({ scope: [any()] }),
  event_option_tooltip: localisation({ scope: [any()] }),
  set_capital: either(
    obj(
      { scope: [country()] },
      {
        state: scopeRef({}, "state"),
        remember_old_capital: bool({ cardinality: [0, 1] }),
      },
    ),
    obj(
      { scope: [country()] },
      {
        state: typeRef({}, "state"),
        remember_old_capital: bool({ cardinality: [0, 1] }),
      },
    ),
  ),
  add_state_core: either(
    scopeRef({ scope: [country()] }, "state"),
    typeRef({ scope: [country()] }, "state"),
  ),
  remove_state_core: either(
    scopeRef({ scope: [country()] }, "state"),
    typeRef({ scope: [country()] }, "state"),
  ),
  change_tag_from: either(
    scopeRef({ scope: [country()] }, "country"),
    enumRef({ scope: [country()] }, "country_tags"),
  ),
  add_province_modifier: either(
    obj(
      { scope: [state()] },
      {
        static_modifiers: array({ cardinality: [1, Infinity] }, [
          typeRef({}, "static_modifier"),
        ]),
        province: either(
          obj(
            {},
            {
              all_provinces: bool({}, true),
              limit_to_coastal: bool({ cardinality: [0, 1] }, true),
              limit_to_naval_base: bool({ cardinality: [0, 1] }, true),
              limit_to_border: bool({ cardinality: [0, 1] }, true),
              limit_to_victory_point: either(
                bool({ cardinality: [0, 1] }, true),
                int({ cardinality: [0, 1] }),
              ),
            },
          ),
          array({ cardinality: [1, Infinity] }, [
            obj(
              {},
              {
                id: enumRef({}, "provinces"),
              },
            ),
          ]),
        ),
      },
    ),
    obj(
      { scope: [state()] },
      {
        [enumRefKey("provinces")]: typeRef({}, "static_modifier"),
      },
    ),
  ),
  remove_province_modifier: either(
    obj(
      { scope: [state()] },
      {
        static_modifiers: array({ cardinality: [1, Infinity] }, [
          typeRef({}, "static_modifier"),
        ]),
        province: either(
          obj(
            {},
            {
              all_provinces: bool({}, true),
              limit_to_coastal: bool({ cardinality: [0, 1] }, true),
              limit_to_naval_base: bool({ cardinality: [0, 1] }, true),
              limit_to_border: bool({ cardinality: [0, 1] }, true),
              limit_to_victory_point: either(
                bool({ cardinality: [0, 1] }, true),
                int({ cardinality: [0, 1] }),
              ),
            },
          ),
          array({ cardinality: [1, Infinity] }, [
            obj(
              {},
              {
                id: enumRef({}, "provinces"),
              },
            ),
          ]),
        ),
      },
    ),
    obj(
      { scope: [state()] },
      {
        [enumRefKey("provinces")]: typeRef({}, "static_modifier"),
      },
    ),
  ),
  set_country_flag: either(
    value_set({ scope: [country()] }, "country_flag"),
    obj(
      { scope: [country()] },
      {
        flag: value_set({}, "country_flag"),
        value: int({ cardinality: [0, 1] }),
        days: int({ cardinality: [0, 1] }),
      },
    ),
  ),
  clr_country_flag: value(
    { scope: [country()], severity: "warning" },
    "country_flag",
  ),
  set_global_flag: either(
    value_set({ scope: [any()] }, "global_flag"),
    obj(
      { scope: [any()] },
      {
        flag: value_set({}, "global_flag"),
        value: int({ cardinality: [0, 1] }),
        days: int({ cardinality: [0, 1] }),
      },
    ),
  ),
  clr_global_flag: value(
    { scope: [any()], severity: "warning" },
    "global_flag",
  ),
  remove_building: obj(
    { scope: [state()] },
    {
      type: typeRef({}, "building"),
      level: int_variable_field(),
      province: enumRef({ cardinality: [0, 1] }, "provinces"),
    },
  ),
  release: either(
    scopeRef({ scope: [country()] }, "country"),
    enumRef({ scope: [country()] }, "country_tags"),
  ),
  every_country: obj(
    { scope: [any()], push_scope: country() },
    {
      random_select_amount: int({ cardinality: [0, 1] }, 1, Infinity),
      display_individual_scopes: bool({ cardinality: [0, 1] }),
      limit: obj(
        { cardinality: [0, 1] },
        {
          ...trigger,
        },
      ),
      tooltip: localisation({ cardinality: [0, 1] }),
      // ...effect,
    },
  ),
  random_country: obj(
    { scope: [any()], push_scope: country() },
    {
      limit: obj(
        { cardinality: [0, 1] },
        {
          ...trigger,
        },
      ),
      tooltip: localisation({ cardinality: [0, 1] }),
      // ...effect,
    },
  ),
  every_neighbor_country: obj(
    { scope: [country()], push_scope: country() },
    {
      random_select_amount: int({ cardinality: [0, 1] }, 1, Infinity),
      display_individual_scopes: bool({ cardinality: [0, 1] }),
      limit: obj(
        { cardinality: [0, 1] },
        {
          ...trigger,
        },
      ),
      tooltip: localisation({ cardinality: [0, 1] }),
      // ...effect,
    },
  ),

  random_neighbor_country: obj(
    { scope: [country()], push_scope: country() },
    {
      limit: obj({ cardinality: [0, 1] }, { ...trigger }),
      tooltip: localisation({ cardinality: [0, 1] }),
      // ...effect,
    },
  ),
  every_enemy_country: obj(
    { scope: [country()], push_scope: country() },
    {
      random_select_amount: int({ cardinality: [0, 1] }, 1, Infinity),
      display_individual_scopes: bool({ cardinality: [0, 1] }),
      limit: obj({ cardinality: [0, 1] }, { ...trigger }),
      tooltip: localisation({ cardinality: [0, 1] }),
      // ...effect,
    },
  ),
  random_enemy_country: obj(
    { scope: [country()], push_scope: country() },
    {
      limit: obj({ cardinality: [0, 1] }, { ...trigger }),
      tooltip: localisation({ cardinality: [0, 1] }),
      // ...effect,
    },
  ),
  country_event: either(
    obj(
      { scope: [country()] },
      {
        id: typeRef({}, "event.country_event"),
        hours: variable_field({ cardinality: [0, 1] }, 1, 24),
        days: variable_field({ cardinality: [0, 1] }, 1, 31),
        months: variable_field({ cardinality: [0, 1] }, 1, 12),
        random_hours: variable_field({ cardinality: [0, 1] }, 1, Infinity),
        random_days: variable_field({ cardinality: [0, 1] }, 1, Infinity),
        random: variable_field({ cardinality: [0, 1] }, 1, Infinity),
        // random: obj(
        //   { cardinality: [0, 1] },
        //   {
        //     chance: variable_field(),
        //     // ...effect,
        //   },
        // ),
        tooltip: localisation({ cardinality: [0, 1] }),
      },
    ),
    typeRef({}, "event.country_event"),
  ),
  state_event: either(
    obj(
      { scope: [state()] },
      {
        id: typeRef({}, "event.state_event"),
        hours: variable_field({ cardinality: [0, 1] }, 1, 24),
        days: variable_field({ cardinality: [0, 1] }, 1, 31),
        months: variable_field({ cardinality: [0, 1] }, 1, 12),
        random_hours: variable_field({ cardinality: [0, 1] }, 1, Infinity),
        random_days: variable_field({ cardinality: [0, 1] }, 1, Infinity),
        random: variable_field({ cardinality: [0, 1] }, 1, Infinity),
        // random: obj(
        //   { cardinality: [0, 1] },
        //   {
        //     chance: variable_field(),
        //     // ...effect,
        //   },
        // ),
        tooltip: localisation({ cardinality: [0, 1] }),
        trigger_for: either(
          scopeRef({}, "country"),
          enumRef({}, "country_tags"),
        ),
      },
    ),
    typeRef({}, "event.state_event"),
  ),
  set_variable: either(
    obj(
      { scope: [any()] },
      {
        var: value_set({}, "variable"),
        value: either(
          ...variable_field(),
          //   scope_field(),
          enumRef({}, "country_tags"),
          value_set({}, "token"),
        ),
        tooltip: localisation({ cardinality: [0, 1] }),
      },
    ),
    obj(
      { scope: [any()] },
      {
        value_set: either(
          ...variable_field({ cardinality: [1, 2] }),
          //   scope_field({ cardinality: [1, 2] }),
          enumRef({ cardinality: [1, 2] }, "country_tags"),
          value_set({ cardinality: [1, 2] }, "token"),
        ),
        tooltip: localisation({ cardinality: [0, 1] }),
      },
    ),
  ),
  random: obj(
    { scope: [any()] },
    {
      chance: either(
        ...variable_field({ cardinality: [1, 2] }),
        int({ cardinality: [1, 2] }),
      ),
      ...modifier_rule,
      // ...effect,
    },
  ),
  random_list: obj(
    { scope: [any()] },
    {
      log: bool({ cardinality: [0, 1] }),
      //   seed: either(
      //     variable_field({ cardinality: [0, 1] }),
      //     constRef({ cardinality: [0, 1] }),
      //     random({ cardinality: [0, 1] }),
      //   ),
      int: obj(
        { cardinality: [0, Infinity] },
        {
          ...modifier_rule,
          // ...effect,
        },
      ),
      variable_field: obj(
        { cardinality: [0, Infinity] },
        {
          ...modifier_rule,
          // ...effect,
        },
      ),
      value: obj(
        { cardinality: [0, Infinity] },
        {
          ...modifier_rule,
          // ...effect,
        },
      ),
    },
  ),

  white_peace: either(
    scopeRef({ scope: [country()] }, "country"),
    enumRef({ scope: [country()] }, "country_tags"),
    obj(
      { scope: [country()] },
      {
        tag: either(scopeRef({}, "country"), enumRef({}, "country_tags")),
        tooltip: localisation({ cardinality: [0, 1] }),
        message: localisation({ cardinality: [0, 1] }),
      },
    ),
  ),
  if: obj(
    { scope: [any()] },
    {
      limit: obj({}, { ...trigger }),
      // ...effect,
    },
  ),
  else_if: obj(
    {},
    {
      limit: obj({}, { ...trigger }),
      // ...effect,
    },
  ),
  //   else: obj({}, { ...effect }),
  add_state_claim: either(
    scopeRef({ scope: [country()] }, "state"),
    typeRef({ scope: [country()] }, "state"),
  ),
  remove_state_claim: either(
    scopeRef({ scope: [country()] }, "state"),
    typeRef({ scope: [country()] }, "state"),
  ),
  add_opinion_modifier: obj(
    { scope: [country()] },
    {
      target: either(scopeRef({}, "country"), enumRef({}, "country_tags")),
      modifier: typeRef({}, "opinion"),
      days: int({ cardinality: [0, 1] }),
    },
  ),
  remove_opinion_modifier: obj(
    { scope: [country()] },
    {
      target: either(scopeRef({}, "country"), enumRef({}, "country_tags")),
      modifier: typeRef({}, "opinion"),
    },
  ),
  create_country_leader: obj(
    {
      scope: [country()],
      severity: "info",
    },
    {
      name: scalar(),
      desc: localisation({ cardinality: [0, 1] }),
      picture: scalar({ cardinality: [1, 2] }),
      ideology: enumRef({}, "sub_ideology"),
      expire: datetime_field({ cardinality: [0, 1] }),
      traits: array({ cardinality: [1, Infinity] }, [
        typeRef({}, "country_leader_trait"),
      ]),
      id: value_set({ cardinality: [0, 1] }, "unit_leader_ids"),
      female: bool({ cardinality: [0, 1] }),
    },
  ),
  log: localisation({ scope: [any()] }),
  create_unit: obj(
    { scope: [state()] },
    {
      division: scalar(),
      owner: either(scopeRef({}, "country"), enumRef({}, "country_tags")),
      prioritize_location: enumRef({ cardinality: [0, 1] }, "provinces"),
      allow_spawning_on_enemy_provs: bool({ cardinality: [0, 1] }),
      count: int_variable_field({ cardinality: [0, 1] }),
      officer: obj(
        { cardinality: [0, 1] },
        {
          name: localisation({ cardinality: [0, 1] }),
          portraits: obj(
            {},
            {
              army: obj(
                {},
                {
                  large: typeRef({}, "spriteType"),
                  small: typeRef({}, "spriteType"),
                },
              ),
            },
          ),
        },
      ),
      country_score: obj(
        { cardinality: [0, 1] },
        {
          base: variable_field({ cardinality: [0, 1] }),
          [enumRefKey("add_factor")]: float({ cardinality: [0, Infinity] }),
          modifier: array(
            { cardinality: [1, Infinity], push_scope: country() },
            [
              obj(
                {},
                {
                  ...trigger,
                  [enumRefKey("add_factor")]: float({ cardinality: [1, 1] }),
                },
              ),
            ],
          ),
        },
      ),
      id: variable_field({ cardinality: [0, 1] }),
    },
  ),

  sound_effect: scalar({ scope: any() }),
  promote_leader: bool({ scope: [character(), unit_leader()] }),
  randomize_weather: int({ scope: any() }),
  division_template: obj(
    { scope: country() },
    {
      name: localisation_inline(),
      division_names_group: typeRef({ cardinality: [0, 1] }, "division_name"),
      override_model: typeRef({ cardinality: [0, 1] }, "entity"),
      is_locked: bool({ cardinality: [0, 1] }),
      force_allow_recruiting: bool({ cardinality: [0, 1] }),
      obsolete: bool({ cardinality: [0, 1] }),
      is_fake_intel_division: bool({ cardinality: [0, 1] }),
      division_cap: int({ cardinality: [0, 1] }),
      regiments: obj(
        {},
        {
          [typeRefKey("unit.infantry")]: obj(
            { cardinality: [0, 25] },
            {
              x: int({}, 0, 4),
              y: int({}, 0, 4),
            },
          ),
          [typeRefKey("unit.armor")]: obj(
            { cardinality: [0, 25] },
            {
              x: int({}, 0, 4),
              y: int({}, 0, 4),
            },
          ),
          [typeRefKey("unit.mobile")]: obj(
            { cardinality: [0, 25] },
            {
              x: int({}, 0, 4),
              y: int({}, 0, 4),
            },
          ),
          [typeRefKey("unit.combat_support")]: obj(
            { cardinality: [0, 25] },
            {
              x: int({}, 0, 4),
              y: int({}, 0, 4),
            },
          ),
          [typeRefKey("unit.armor_combat_support")]: obj(
            { cardinality: [0, 25] },
            {
              x: int({}, 0, 4),
              y: int({}, 0, 4),
            },
          ),
          [typeRefKey("unit.mobile_combat_support")]: obj(
            { cardinality: [0, 25] },
            {
              x: int({}, 0, 4),
              y: int({}, 0, 4),
            },
          ),
        },
      ),
      support: obj(
        { cardinality: [0, 1] },
        {
          [typeRefKey("unit.support_unit")]: obj(
            { cardinality: [1, 5] },
            {
              x: literal({}, 0),
              y: int({}, 0, 4),
            },
          ),
        },
      ),
      template_counter: int({ cardinality: [0, 1] }),
      priority: int({ cardinality: [0, 1] }),
    },
  ),
  add_units_to_division_template: obj(
    { scope: country() },
    {
      template_name: localisation_inline(),
      regiments: obj(
        { cardinality: [0, 1] },
        {
          [typeRefKey("unit")]: int({ cardinality: [1, 25] }, 0, 25),
        },
      ),
      support: obj(
        { cardinality: [0, 1] },
        {
          [typeRefKey("unit")]: int({ cardinality: [1, 5] }, 0, 4),
        },
      ),
    },
  ),
  set_country_leader_ideology: enumRef({ scope: country() }, "sub_ideology"),
  add_country_leader_trait: either(
    typeRef({ scope: country() }, "country_leader_trait"),
    obj(
      { scope: country() },
      {
        trait: typeRef({}, "country_leader_trait"),
        ideology: typeRef({ cardinality: [0, 1] }, "ideology"),
      },
    ),
  ),
  remove_country_leader_trait: either(
    typeRef({ scope: country() }, "country_leader_trait"),
    obj(
      { scope: country() },
      {
        trait: typeRef({}, "country_leader_trait"),
        ideology: typeRef({ cardinality: [0, 1] }, "ideology"),
      },
    ),
  ),
  set_political_party: obj(
    { scope: country() },
    {
      ideology: either(
        typeRef({}, "ideology"),
        ...variable_field(),
        enumRef({}, "country_tags"),
        scopeRef({}, country()),
      ),
      popularity: variable_field(),
    },
  ),
  set_politics: obj(
    { scope: country() },
    {
      ruling_party: either(
        typeRef({ cardinality: [0, 1] }, "ideology"),
        ...variable_field({ cardinality: [0, 1] }),
        scopeRef({ cardinality: [0, 1] }, country()),
      ),
      elections_allowed: bool({ cardinality: [0, 1] }),
      last_election: date_field({ cardinality: [0, 1] }),
      election_frequency: int({ cardinality: [0, 1] }),
      name: localisation({ cardinality: [0, 1] }),
      long_name: localisation({ cardinality: [0, 1] }),
    },
  ),
  set_popularities: obj(
    { scope: country() },
    {
      [typeRefKey("ideology")]: variable_field({ cardinality: [1, Infinity] }),
    },
  ),
  add_ideas: either(
    enumRef({ scope: country() }, "idea_name"),
    array({ scope: country(), cardinality: [0, Infinity] }, [
      enumRef({ cardinality: [0, Infinity] }, "idea_name"),
      value_set({ cardinality: [0, Infinity] }, "advisor_token"),
      value_set({ cardinality: [0, Infinity] }, "variable"),
    ]),
  ),
  remove_ideas: either(
    enumRef({ scope: country() }, "idea_name"),
    array({ scope: country(), cardinality: [0, Infinity] }, [
      enumRef({ cardinality: [0, Infinity] }, "idea_name"),
      value_set({ cardinality: [0, Infinity] }, "advisor_token"),
      value_set({ cardinality: [0, Infinity] }, "variable"),
    ]),
  ),
  add_political_power: variable_field({ scope: country() }),
  set_political_power: variable_field({ scope: country() }),
  set_technology: obj(
    { scope: country() },
    {
      popup: bool({ cardinality: [0, 1] }),
      [typeRefKey("technology")]: int({ cardinality: [1, Infinity] }, 0, 1),
    },
  ),

  create_navy_leader: obj(
    { scope: [country()] },
    {
      name: scalar(),
      desc: localisation({ cardinality: [0, 1] }),
      picture: scalar({ cardinality: [0, 1] }),
      portrait_path: scalar({ cardinality: [0, 1] }),
      gfx: typeRef({ cardinality: [0, 1], severity: "warning" }, "spriteType"),
      traits: array({ cardinality: [1, 1] }, [
        typeRef({ cardinality: [0, Infinity] }, "unit_leader_trait"),
      ]),
      skill: int({ cardinality: [1, 1] }),
      attack_skill: int({ cardinality: [1, 1] }),
      defense_skill: int({ cardinality: [1, 1] }),
      maneuvering_skill: int({ cardinality: [1, 1] }),
      coordination_skill: int({ cardinality: [1, 1] }),
      id: value_set({ cardinality: [0, 1] }, "unit_leader_ids"),
      legacy_id: value_set({ cardinality: [0, 1] }, "unit_leader_ids"),
      female: bool({ cardinality: [0, 1] }),
    },
  ),
  remove_unit_leader_trait: typeRef(
    { scope: [character(), unit_leader(), operative()] },
    "unit_leader_trait",
  ),
  add_unit_leader_trait: typeRef(
    { scope: [character(), unit_leader(), operative()] },
    "unit_leader_trait",
  ),
  add_namespace: scalar({ scope: [any()] }),
  set_state_owner: either(
    obj({ scope: [country()] }, { state: scopeRef("state") }),
    typeRef({ scope: [country()] }, "state"),
  ),
  puppet: either(
    scopeRef({ scope: [country()] }, "country"),
    enumRef({ scope: [country()] }, "country_tags"),
    obj(
      { scope: [country()] },
      {
        target: either(scopeRef("country"), enumRef("country_tags")),
        end_wars: bool({ cardinality: [0, 1] }),
        end_civil_wars: bool({ cardinality: [0, 1] }),
      },
    ),
  ),
  set_state_controller: either(
    obj({ scope: [country()] }, { state: scopeRef("state") }),
    typeRef({ scope: [country()] }, "state"),
  ),
  transfer_state: either(
    obj({ scope: [country()] }, { state: scopeRef("state") }),
    typeRef({ scope: [country()] }, "state"),
  ),
  set_state_flag: either(
    value_set({ scope: [state()] }, "state_flag"),
    obj(
      { scope: [state()] },
      {
        flag: value_set({}, "state_flag"),
        value: int({ cardinality: [0, 1] }),
        days: int({ cardinality: [0, 1] }),
      },
    ),
  ),
  clr_state_flag: value(
    { scope: [state()], severity: "warning" },
    "state_flag",
  ),
  create_faction: localisation_inline({ scope: [country()] }),
  add_nuclear_bombs: int_variable_field({ scope: [country()] }),
  annex_country: obj(
    { scope: [country()] },
    {
      target: either(scopeRef("country"), enumRef("country_tags")),
      transfer_troops: bool({ cardinality: [0, 1] }),
    },
  ),
  build_railway: either(
    obj(
      { scope: [any()] },
      {
        path: array({ cardinality: [1, Infinity] }, [
          enumRef({ cardinality: [1, Infinity] }, "provinces"),
        ]),
        build_only_on_allied: bool({ cardinality: [0, 1] }),
        controller_priority: obj(
          { cardinality: [0, 1] },
          {
            base: variable_field({ cardinality: [0, 1] }),
            modifier: array({ cardinality: [1, Infinity] }, [
              obj(
                { cardinality: [1, 1] },
                {
                  tag: enumRef({ cardinality: [1, 1] }, "country_tags"),
                  add: float({ cardinality: [1, 1] }),
                },
              ),
            ]),
          },
        ),
        level: int({ cardinality: [0, 1] }, 1, 5),
        fallback: bool({ cardinality: [0, 1] }),
      },
    ),
    obj(
      { scope: [any()] },
      {
        build_only_on_allied: bool({ cardinality: [0, 1] }),
        controller_priority: obj(
          { cardinality: [0, 1] },
          {
            base: variable_field({ cardinality: [0, 1] }),
            modifier: array({ cardinality: [1, Infinity] }, [
              obj(
                { cardinality: [1, 1] },
                {
                  tag: enumRef({ cardinality: [1, 1] }, "country_tags"),
                  add: float({ cardinality: [1, 1] }),
                },
              ),
            ]),
          },
        ),
        level: int({ cardinality: [0, 1] }, 1, 5),
        start_province: enumRef({}, "provinces"),
        target_province: enumRef({}, "provinces"),
        path: array({ cardinality: [1, Infinity] }, [
          enumRef({ cardinality: [1, Infinity] }, "provinces"),
        ]),
        fallback: bool({ cardinality: [0, 1] }),
      },
    ),
  ),
  add_building_construction: either(
    obj(
      { scope: state() },
      {
        type: typeRef({}, "building.state"),
        level: int_variable_field(),
        instant_build: bool({ cardinality: [0, 1] }),
      },
    ),
    obj(
      { scope: state() },
      {
        type: typeRef({}, "building.provincial"),
        level: int_variable_field(),
        instant_build: bool({ cardinality: [0, 1] }),
        province: either(
          obj(
            {},
            {
              all_provinces: bool({}, true),
              limit_to_coastal: bool({ cardinality: [0, 1] }, true),
              limit_to_naval_base: bool({ cardinality: [0, 1] }, true),
              limit_to_supply_node: bool({ cardinality: [0, 1] }, true),
              limit_to_border: bool({ cardinality: [0, 1] }, true),
              limit_to_victory_point: either(
                bool({ cardinality: [0, 1] }, true),
                int({ cardinality: [0, 1] }),
              ),
              limit_to_border_country: either(
                enumRef({ cardinality: [0, 1] }, "country_tags"),
                scopeRef({ cardinality: [0, 1] }, "country"),
              ),
              level: int_variable_field({ cardinality: [0, 1] }),
            },
          ),
          obj(
            { cardinality: [1, Infinity] },
            {
              id: enumRef({ cardinality: [1, Infinity] }, "provinces"),
              limit_to_coastal: bool({ cardinality: [0, 1] }, true),
              limit_to_naval_base: bool({ cardinality: [0, 1] }, true),
              limit_to_supply_node: bool({ cardinality: [0, 1] }, true),
              limit_to_border: bool({ cardinality: [0, 1] }, true),
              limit_to_victory_point: either(
                bool({ cardinality: [0, 1] }, true),
                int({ cardinality: [0, 1] }),
              ),
              level: int_variable_field({ cardinality: [0, 1] }),
            },
          ),
        ),
      },
    ),
  ),
  dismantle_faction: bool({ scope: country() }),
  add_to_faction: either(
    scopeRef({ scope: country() }, "country"),
    enumRef({ scope: country() }, "country_tags"),
  ),
  remove_from_faction: either(
    scopeRef({ scope: country() }, "country"),
    enumRef({ scope: country() }, "country_tags"),
  ),
  give_guarantee: either(
    scopeRef({ scope: country() }, "country"),
    enumRef({ scope: country() }, "country_tags"),
  ),
  give_military_access: either(
    scopeRef({ scope: country() }, "country"),
    enumRef({ scope: country() }, "country_tags"),
  ),
  random_state: obj(
    { scope: any(), push_scope: state() },
    {
      limit: obj({ cardinality: [0, 1] }, { ...trigger }),
      prioritize: array({ cardinality: [0, 1] }, [
        typeRef({ cardinality: [1, Infinity] }, "state"),
      ]),
      tooltip: localisation({ cardinality: [0, 1] }),
      // ...effect,
    },
  ),
  random_owned_state: obj(
    { scope: country(), push_scope: state() },
    {
      limit: obj({ cardinality: [0, 1] }, { ...trigger }),
      prioritize: array({ cardinality: [0, 1] }, [
        typeRef({ cardinality: [1, Infinity] }, "state"),
      ]),
      tooltip: localisation({ cardinality: [0, 1] }),
      // ...effect,
    },
  ),
  random_neighbor_state: obj(
    { scope: state(), push_scope: state() },
    {
      limit: obj({ cardinality: [0, 1] }, { ...trigger }),
      prioritize: array({ cardinality: [0, 1] }, [
        typeRef({ cardinality: [1, Infinity] }, "state"),
      ]),
      tooltip: localisation({ cardinality: [0, 1] }),
      // ...effect,
    },
  ),
  every_state: obj(
    { scope: any(), push_scope: state() },
    {
      random_select_amount: int({ cardinality: [0, 1] }, 1, Infinity),
      display_individual_scopes: bool({ cardinality: [0, 1] }),
      limit: obj({ cardinality: [0, 1] }, { ...trigger }),
      tooltip: localisation({ cardinality: [0, 1] }),
      // ...effect,
    },
  ),

  every_owned_state: obj(
    { scope: [country()], push_scope: state() },
    {
      random_select_amount: int({ cardinality: [0, 1] }, 1, Infinity),
      display_individual_scopes: bool({ cardinality: [0, 1] }),
      limit: obj({ cardinality: [0, 1] }, { ...trigger }),
      tooltip: localisation({ cardinality: [0, 1] }),
      // ...effect,
    },
  ),
  every_neighbor_state: obj(
    { scope: [state()], push_scope: state() },
    {
      random_select_amount: int({ cardinality: [0, 1] }, 1, Infinity),
      display_individual_scopes: bool({ cardinality: [0, 1] }),
      limit: obj({ cardinality: [0, 1] }, { ...trigger }),
      tooltip: localisation({ cardinality: [0, 1] }),
      // ...effect,
    },
  ),
  news_event: either(
    obj(
      { scope: [country()] },
      {
        id: typeRef({}, "event.news_event"),
        hours: variable_field({ cardinality: [0, 1] }, 1, 24),
        days: variable_field({ cardinality: [0, 1] }, 1, 31),
        months: variable_field({ cardinality: [0, 1] }, 1, 12),
        random_hours: variable_field({ cardinality: [0, 1] }, 1, Infinity),
        random_days: variable_field({ cardinality: [0, 1] }, 1, Infinity),
        random: variable_field(
          {
            cardinality: [0, 1],
            severity: "info",
          },
          1,
          Infinity,
        ),
        // random: obj(
        //   {
        //     cardinality: [0, 1],
        //     severity: "info",
        //   },
        //   {
        //     chance: variable_field(),
        //     // ...effect,
        //   },
        // ),
        tooltip: localisation({ cardinality: [0, 1] }),
      },
    ),
    typeRef({}, "event.news_event"),
  ),
  declare_war_on: obj(
    { scope: [country()] },
    {
      target: either(scopeRef({}, country()), enumRef({}, "country_tags")),
      type: typeRef({ cardinality: [0, 1] }, "wargoal"),
      generator: either(
        array({ cardinality: [0, Infinity] }, [
          scopeRef({ cardinality: [0, Infinity] }, state()),
          typeRef({ cardinality: [0, Infinity] }, "state"),
        ]),
        value_set({ cardinality: [0, 1] }, "array"),
        scopeRef({ cardinality: [0, 1] }, state()),
      ),
    },
  ),
  add_scaled_political_power: int_variable_field(),
  hold_election: either(scopeRef({}, country()), enumRef({}, "country_tags")),
  add_popularity: obj(
    { scope: [country()] },
    {
      ideology: either(
        typeRef({}, "ideology"),
        ...variable_field(),
        enumRef({}, "country_tags"),
        scopeRef({}, country()),
      ),
      popularity: variable_field(),
    },
  ),
  remove_ideas_with_trait: typeRef({}, "country_leader_trait"),
  start_civil_war: obj(
    { scope: [country()] },
    {
      ideology: either(
        typeRef({}, "ideology"),
        ...variable_field(),
        enumRef({}, "country_tags"),
        scopeRef({}, country()),
      ),
      ruling_party: either(
        typeRef({ cardinality: [0, 1] }, "ideology"),
        ...variable_field({ cardinality: [0, 1] }),
      ),
      size: variable_field({ cardinality: [0, 1] }, 0, 1),
      army_ratio: variable_field({ cardinality: [0, 1] }, 0, 1),
      navy_ratio: variable_field({ cardinality: [0, 1] }, 0, 1),
      air_ratio: variable_field({ cardinality: [0, 1] }, 0, 1),
      only_own_territory: bool({ cardinality: [0, 1] }),
      capital: either(
        scopeRef({ cardinality: [0, 1] }, state()),
        typeRef({ cardinality: [0, 1] }, "state"),
      ),
      states: either(
        array({ cardinality: [0, Infinity] }, [
          scopeRef({ cardinality: [0, Infinity] }, state()),
          typeRef({ cardinality: [0, Infinity] }, "state"),
        ]),
        literal({ cardinality: [0, 1] }, "all"),
      ),
      states_filter: obj(
        { cardinality: [0, 1], push_scope: any() },
        { ...trigger },
      ),
      keep_political_leader: bool({ cardinality: [0, 1] }),
      keep_political_party_members: bool({ cardinality: [0, 1] }),
      keep_unit_leaders: array({ cardinality: [1, Infinity] }, [
        value({}, "unit_leader_ids"),
      ]),
      keep_unit_leaders_trigger: obj(
        { cardinality: [0, 1], push_scope: any() },
        { ...trigger },
      ),
      // ...effect,
      keep_all_characters: bool({ cardinality: [0, 1] }),
    },
  ),

  retire_country_leader: bool(),
  kill_country_leader: bool(),
  release_puppet: either(scopeRef({}, country()), enumRef({}, "country_tags")),
  create_wargoal: obj(
    { scope: [country()] },
    {
      target: either(scopeRef({}, country()), enumRef({}, "country_tags")),
      type: typeRef({}, "wargoal"),
      generator: either(
        array({ cardinality: [0, Infinity] }, [
          scopeRef({ cardinality: [0, Infinity] }, state()),
          typeRef({ cardinality: [0, Infinity] }, "state"),
        ]),
        literal({ cardinality: [0, 1] }, "core_states"),
        literal({ cardinality: [0, 1] }, "owned_states"),
        // valueSet({ cardinality: [0, 1] }, "array"),
        scopeRef({ cardinality: [0, 1] }, state()),
      ),
      expire: either(
        // dateField({ cardinality: [0, 1] }),
        int({ cardinality: [0, 1] }),
      ),
    },
  ),
  add_claim_by: either(scopeRef({}, country()), enumRef({}, "country_tags")),
  remove_claim_by: either(scopeRef({}, country()), enumRef({}, "country_tags")),
  add_core_of: either(scopeRef({}, country()), enumRef({}, "country_tags")),
  remove_core_of: either(scopeRef({}, country()), enumRef({}, "country_tags")),
  army_experience: variable_field(),
  navy_experience: variable_field(),
  air_experience: variable_field(),
  save_event_target_as: value_set({}, "event_target"),
  save_global_event_target_as: value_set({}, "global_event_target"),
  clear_global_event_target: value({}, "global_event_target"),
  clear_global_event_targets: bool({}, true),
  //   break: either(none(), bool({}, true)),
  unlock_national_focus: either(
    typeRef({}, "focus"),
    typeRef({}, "shared_focus"),
  ),
  add_tech_bonus: obj(
    {},
    {
      [enumRefKey("tech_bonus")]: float({ cardinality: [1, 2] }),
      uses: int({ cardinality: [0, 1] }, 1, 32767),
      category: enumRef({ cardinality: [0, Infinity] }, "tech_category"),
      technology: typeRef({ cardinality: [0, Infinity] }, "technology"),
      name: localisation({ cardinality: [1, 1] }),
    },
  ),
  add_doctrine_cost_reduction: obj(
    {},
    {
      category: enumRef({ cardinality: [0, Infinity] }, "tech_category"),
      technology: typeRef({ cardinality: [0, Infinity] }, "technology"),
      uses: int({ cardinality: [0, 1] }, 1, 32767),
      cost_reduction: float({ cardinality: [1, 2] }),
      name: localisation({ cardinality: [1, 1] }),
    },
  ),
  set_demilitarized_zone: bool(),
  add_research_slot: int(),
  set_research_slots: variable_field(),
  set_border_war: bool(),
  set_equipment_fraction: float(),
  add_threat: variable_field(),
  send_equipment: obj(
    {},
    {
      type: typeRef({ cardinality: [0, 1] }, "equipment"),
      equipment: typeRef({ cardinality: [0, 1] }, "equipment"),
      amount: int_variable_field(),
      target: either(scopeRef({}, country()), enumRef({}, "country_tags")),
      old_prioritised: bool({ cardinality: [0, 1] }, true),
    },
  ),
  set_rule: obj(
    {},
    {
      [enumRefKey("game_rules")]: bool({ cardinality: [1, Infinity] }),
      desc: localisation({ cardinality: [0, 1] }),
    },
  ),
  clear_rule: obj(
    {},
    {
      [enumRefKey("game_rules")]: bool({ cardinality: [1, Infinity] }),
    },
  ),
  set_party_rule: obj(
    {},
    {
      ideology: either(typeRef({}, "ideology"), ...variable_field()),
      [enumRefKey("game_rules")]: bool({ cardinality: [1, Infinity] }),
      desc: localisation({ cardinality: [0, 1] }),
    },
  ),
  set_relation_rule: obj(
    {},
    {
      target: either(scopeRef({}, country()), enumRef({}, "country_tags")),
      [enumRefKey("game_rules")]: bool({ cardinality: [1, Infinity] }),
    },
  ),
  diplomatic_relation: obj(
    {},
    {
      country: either(scopeRef({}, country()), enumRef({}, "country_tags")),
      relation: enumRef({}, "diplomatic_relations"),
      active: bool({ cardinality: [0, 1] }),
    },
  ),

  effect_tooltip: obj(
    { scope: any() },
    {
      country_event: typeRef(
        { cardinality: [0, 1] },
        "event.unit_leader_event",
      ),
      // ...effect,
    },
  ),
  add_resource: either(
    obj(
      { scope: country() },
      {
        type: typeRef({}, "resource"),
        amount: int_variable_field(),
        state: scopeRef({}, "state"),
        // state: typeRef({}, "state"),
      },
    ),
    obj(
      { scope: state() },
      {
        type: typeRef({}, "resource"),
        amount: int_variable_field(),
        show_state_in_tooltip: bool({ cardinality: [0, 1] }),
      },
    ),
  ),
  remove_unit_leader: value({}, "unit_leader_ids"),
  add_timed_idea: obj(
    { scope: country() },
    {
      idea: either(enumRef({}, "idea_name"), value({}, "variable")),
      days: int_variable_field({ cardinality: [0, 1] }),
      months: int_variable_field({ cardinality: [0, 1] }),
      years: int_variable_field({ cardinality: [0, 1] }),
    },
  ),
  end_puppet: either(scopeRef({}, "country"), enumRef({}, "country_tags")),
  load_oob: typeRef({}, "oob"),
  create_import: obj(
    { scope: country() },
    {
      amount: int({ cardinality: [0, 1] }),
      resource: typeRef({}, "resource"),
      factories: int({ cardinality: [0, 1] }),
      exporter: either(scopeRef({}, "country"), enumRef({}, "country_tags")),
    },
  ),
  send_embargo: either(scopeRef({}, "country"), enumRef({}, "country_tags")),
  break_embargo: either(scopeRef({}, "country"), enumRef({}, "country_tags")),
  add_named_threat: obj(
    { scope: country() },
    {
      threat: variable_field(),
      name: localisation(),
    },
  ),
  set_province_controller: either(
    enumRef({}, "provinces"),
    value({}, "variable"),
  ),
  set_major: bool(),
  create_field_marshal: obj(
    { scope: country() },
    {
      name: scalar(),
      desc: localisation({ cardinality: [0, 1] }),
      picture: scalar({ cardinality: [1, 2] }),
      portrait_path: scalar({ cardinality: [0, 1] }),
      gfx: typeRef({ cardinality: [0, 1], severity: "warning" }, "spriteType"),
      traits: array({ cardinality: [0, Infinity] }, [
        typeRef({}, "unit_leader_trait"),
      ]),
      skill: int({ cardinality: [1, 1] }),
      attack_skill: int({ cardinality: [1, 1] }),
      defense_skill: int({ cardinality: [1, 1] }),
      planning_skill: int({ cardinality: [1, 1] }),
      logistics_skill: int({ cardinality: [1, 1] }),
      id: value_set({ cardinality: [0, 1] }, "unit_leader_ids"),
      legacy_id: value_set({ cardinality: [0, 1] }, "unit_leader_ids"),
      female: bool({ cardinality: [0, 1] }),
    },
  ),
  create_corps_commander: obj(
    { scope: country() },
    {
      name: scalar({ cardinality: [0, 1] }),
      desc: localisation({ cardinality: [0, 1] }),
      picture: scalar({ cardinality: [0, 1] }),
      portrait_path: scalar({ cardinality: [0, 1] }),
      gfx: typeRef({ cardinality: [0, 1], severity: "warning" }, "spriteType"),
      traits: array({ cardinality: [0, Infinity] }, [
        typeRef({}, "unit_leader_trait"),
      ]),
      skill: int({ cardinality: [1, 1] }),
      attack_skill: int({ cardinality: [1, 1] }),
      defense_skill: int({ cardinality: [1, 1] }),
      planning_skill: int({ cardinality: [1, 1] }),
      logistics_skill: int({ cardinality: [1, 1] }),
      id: value_set({ cardinality: [0, 1] }, "unit_leader_ids"),
      legacy_id: value_set({ cardinality: [0, 1] }, "unit_leader_ids"),
      female: bool({ cardinality: [0, 1] }),
    },
  ),
  goto_province: enumRef({}, "provinces"),
  goto_state: either(scopeRef({}, "state"), typeRef({}, "state")),
  leave_faction: bool(),
  complete_national_focus: either(
    typeRef({}, "focus"),
    typeRef({}, "shared_focus"),
  ),
  set_party_name: obj(
    { scope: country() },
    {
      ideology: either(
        typeRef({}, "ideology"),
        ...variable_field(),
        enumRef({}, "country_tags"),
        scopeRef({}, "country"),
      ),
      long_name: localisation_inline(),
      name: localisation_inline(),
    },
  ),
  add_extra_state_shared_building_slots: int_variable_field(),
  reverse_add_opinion_modifier: obj(
    { scope: country() },
    {
      target: either(scopeRef({}, "country"), enumRef({}, "country_tags")),
      modifier: typeRef({}, "opinion"),
    },
  ),

  add_to_war: obj(
    { scope: [country()] },
    {
      targeted_alliance: either(
        scopeRef({}, country()),
        enumRef({}, "country_tags"),
      ),
      enemy: either(scopeRef({}, country()), enumRef({}, "country_tags")),
      hostility_reason: localisation({ cardinality: [0, 1] }),
      single_target_only: bool({ cardinality: [0, 1] }),
    },
  ),
  show_ideas_tooltip: either(
    enumRef({ scope: [country()] }, "idea_name"),
    value({}, "advisor_token"),
  ),
  show_unit_leaders_tooltip: either(
    typeRef({ scope: [country()] }, "character"),
    value({}, "character_token"),
    value({}, "variable"),
    value({}, "event_target"),
    value({}, "global_event_target"),
    scopeRef({}, character()),
  ),
  create_equipment_variant: obj(
    { scope: [country()] },
    {
      name: value_set({ cardinality: [0, 1] }, "variant_name"),
      type: either(
        typeRef({}, "equipment.regular_equip"),
        value({}, "nsb_armor_variants"),
        value({}, "bba_air_variants"),
        enumRef({}, "equipment_bonus_type"),
        enumRef({}, "md_unique_dupe_archetypes"),
      ),
      name_group: typeRef({ cardinality: [0, 1] }, "ship_name"),
      parent_version: int({ cardinality: [0, 1] }),
      role_icon_index: int({ cardinality: [0, 1] }),
      allow_without_tech: bool({ cardinality: [0, 1] }),
      show_position: bool({ cardinality: [0, 1] }),
      upgrades: obj(
        { cardinality: [0, Infinity] },
        {
          upgrade: int(),
        },
      ),
      modules: obj(
        { cardinality: [0, Infinity] },
        {
          [enumRefKey("module_slots")]: either(
            typeRef({}, "module"),
            literal({}, "empty"),
          ),
        },
      ),
      obsolete: bool({ cardinality: [0, 1] }, true),
      icon: either(
        filepath({ cardinality: [0, 1] }),
        typeRef({}, "spriteType"),
      ),
      model: typeRef({ cardinality: [0, 1] }, "entity"),
      design_team: typeRef(
        { cardinality: [0, 1] },
        "military_industrial_organization",
      ),
    },
  ),
  add_equipment_production: obj(
    { scope: [country()] },
    {
      equipment: obj(
        {},
        {
          type: either(
            typeRef({}, "equipment"),
            value({}, "nsb_armor_variants"),
            value({}, "bba_air_variants"),
            enumRef({}, "md_unique_dupe_archetypes"),
          ),
          creator: enumRef({ cardinality: [0, 1] }, "country_tags"),
          version_name: localisation_inline({ cardinality: [0, 1] }),
          version: int({ cardinality: [0, 1] }),
        },
      ),
      name: scalar({ cardinality: [0, 1] }),
      amount: int({ cardinality: [0, 1] }),
      requested_factories: int({ cardinality: [0, 1] }, 1, 150),
      progress: float({ cardinality: [0, 1] }, 0, 1),
      efficiency: int({ cardinality: [0, 1] }, 0, 100),
      industrial_manufacturer: typeRef(
        { cardinality: [0, 1] },
        "military_industrial_organization",
      ),
    },
  ),
  add_ace: obj(
    { scope: [country()] },
    {
      name: localisation_inline(),
      surname: localisation_inline(),
      callsign: localisation_inline(),
      type: typeRef({}, "ace"),
      is_female: bool({ cardinality: [0, 1] }, true),
    },
  ),
  random_owned_controlled_state: obj(
    { scope: [country()], push_scope: state() },
    {
      prioritize: array({ cardinality: [0, 1] }, [
        typeRef({ cardinality: [1, Infinity] }, "state"),
      ]),
      limit: obj({ cardinality: [0, 1] }, { ...trigger }),
      tooltip: localisation({ cardinality: [0, 1] }),
      // ...effect,
    },
  ),
  ai_message: literal({}, "replace_me"),
  every_other_country: obj(
    { scope: [country()], push_scope: country() },
    {
      random_select_amount: int({ cardinality: [0, 1] }, 1, Infinity),
      display_individual_scopes: bool({ cardinality: [0, 1] }),
      limit: obj({ cardinality: [0, 1] }, { ...trigger }),
      tooltip: localisation({ cardinality: [0, 1] }),
      // ...effect,
    },
  ),
  //   random_other_country: obj(
  //     { scope: [country()], push_scope: [country()] },
  //     {
  //       limit: obj({ cardinality: [0, 1] }, { ...trigger }),
  //       tooltip: localisation({ cardinality: [0, 1] }),
  //       // ...effect,
  //     },
  //   ),
  add_equipment_to_stockpile: obj(
    { scope: [country()] },
    {
      type: either(
        typeRef({}, "equipment"),
        value({}, "nsb_armor_variants"),
        enumRef({}, "bba_air_variants"),
        value({}, "variable"),
        enumRef({}, "md_unique_dupe_archetypes"),
      ),
      amount: int_variable_field(),
      producer: either(
        scopeRef({ cardinality: [0, 1] }, country()),
        enumRef({ cardinality: [0, 1] }, "country_tags"),
      ),
      version_name: localisation_inline({ cardinality: [0, 1] }),
      variant_name: localisation_inline({ cardinality: [0, 1] }),
    },
  ),
  swap_ideas: obj(
    { scope: [country()] },
    {
      remove_idea: either(value({}, "variable"), enumRef({}, "idea_name")),
      add_idea: either(enumRef({}, "idea_name"), value({}, "variable")),
      add_days: int({ cardinality: [0, 1] }),
      days: int({ cardinality: [0, 1] }),
    },
  ),

  damage_building: obj(
    { scope: [state()] },
    {
      type: typeRef({}, "building"),
      damage: variable_field(),
      province: enumRef({ cardinality: [0, 1] }, "provinces"),
    },
  ),
  release_autonomy: obj(
    { scope: [country()] },
    {
      target: either(scopeRef({}, country()), enumRef({}, "country_tags")),
      autonomy_state: either(
        typeRef({}, "autonomy"),
        literal({}, "autonomy_free"),
      ),
      freedom_level: float({ cardinality: [0, 1] }, 0, 1),
      release_non_owned_controlled: bool({ cardinality: [0, 1] }),
      force_change_controller_for_non_ally_controlled: bool({
        cardinality: [0, 1],
      }),
    },
  ),
  set_autonomy: either(
    obj(
      { scope: [country()] },
      {
        target: either(scopeRef({}, country()), enumRef({}, "country_tags")),
        autonomy_state: either(
          typeRef({}, "autonomy"),
          literal({}, "autonomy_free"),
        ),
        freedom_level: float({ cardinality: [0, 1] }, 0, 1),
        end_wars: bool({ cardinality: [0, 1] }),
        end_civil_wars: bool({ cardinality: [0, 1] }),
      },
    ),
    obj(
      { scope: [country()] },
      {
        target: either(scopeRef({}, country()), enumRef({}, "country_tags")),
        freedom_level: float({ cardinality: [0, 1] }, 0, 1),
        end_wars: bool({ cardinality: [0, 1] }),
        end_civil_wars: bool({ cardinality: [0, 1] }),
      },
    ),
  ),
  add_to_tech_sharing_group: typeRef(
    { scope: [country()] },
    "tech_sharing_group",
  ),
  remove_from_tech_sharing_group: typeRef(
    { scope: [country()] },
    "tech_sharing_group",
  ),
  add_autonomy_score: obj(
    { scope: [country()] },
    {
      value: float(),
      localization: localisation({ cardinality: [0, 1] }),
    },
  ),
  modify_tech_sharing_bonus: obj(
    { scope: [country()] },
    {
      id: typeRef({}, "tech_sharing_group"),
      bonus: float(),
    },
  ),
  add_autonomy_ratio: obj(
    { scope: [country()] },
    {
      value: float(),
      localization: localisation({ cardinality: [0, 1] }),
    },
  ),
  set_cosmetic_tag: value_set({ scope: [country()] }, "cosmetic_tag"),
  drop_cosmetic_tag: bool({ scope: [country()] }, true),
  transfer_ship: obj(
    { scope: [country()] },
    {
      prefer_name: scalar({ cardinality: [0, 1] }),
      type: typeRef({}, "unit.ship_unit"),
      target: either(scopeRef({}, country()), enumRef({}, "country_tags")),
      exclude_refitting: bool({ cardinality: [0, 1] }),
    },
  ),
  set_state_category: typeRef({ scope: [state()] }, "state_category"),
  modify_global_flag: obj(
    { scope: [any()] },
    {
      flag: value({}, "global_flag"),
      value: int({ cardinality: [0, 1] }),
      days: int({ cardinality: [0, 1] }),
    },
  ),
  modify_country_flag: obj(
    { scope: [country()] },
    {
      flag: value({}, "country_flag"),
      value: int({ cardinality: [0, 1] }),
      days: int({ cardinality: [0, 1] }),
    },
  ),
  modify_state_flag: obj(
    { scope: [state()] },
    {
      flag: value({}, "state_flag"),
      value: int({ cardinality: [0, 1] }),
      days: int({ cardinality: [0, 1] }),
    },
  ),
  add_state_modifier: obj(
    { scope: [state()] },
    {
      modifier: obj({}, { ...modifier }),
    },
  ),
  set_province_name: obj(
    { scope: [any()] },
    {
      id: enumRef({}, "provinces"),
      name: localisation_inline(),
    },
  ),
  set_state_name: localisation_inline({ scope: [state()] }),
  reset_province_name: enumRef({ scope: [any()] }, "provinces"),
  reset_state_name: bool({ scope: [state()] }, true),
  create_production_license: obj(
    { scope: [country()] },
    {
      target: either(scopeRef({}, country()), enumRef({}, "country_tags")),
      equipment: obj(
        {},
        {
          type: either(
            typeRef({}, "equipment.regular_equip"),
            value({}, "equipment_variant"),
          ),
          version: int({ cardinality: [0, 1] }),
        },
      ),
      cost_factor: float(),
    },
  ),
  add_relation_modifier: obj(
    { scope: [country()] },
    {
      target: either(scopeRef({}, country()), enumRef({}, "country_tags")),
      modifier: typeRef({}, "static_modifier"),
    },
  ),
  remove_relation_modifier: obj(
    { scope: [country()] },
    {
      target: either(scopeRef({}, country()), enumRef({}, "country_tags")),
      modifier: typeRef({}, "static_modifier"),
    },
  ),
  set_building_level: obj(
    { scope: [state()] },
    {
      type: typeRef({}, "building.state"),
      level: int_variable_field(),
      instant_build: bool({ cardinality: [0, 1] }, true),
    },
  ),

  //   set_building_level: obj(
  //     { scope: [state()] },
  //     {
  //       type: typeRef({}, "building.provincial"),
  //       level: int_variable_field(),
  //       instant_build: bool({ cardinality: [0, 1] }, true),
  //       province: either(
  //         obj(
  //           {},
  //           {
  //             all_provinces: bool(),
  //             limit_to_coastal: bool({ cardinality: [0, 1] }),
  //             limit_to_naval_base: bool({ cardinality: [0, 1] }),
  //             limit_to_border: bool({ cardinality: [0, 1] }),
  //             level: int_variable_field(),
  //           },
  //         ),
  //         obj(
  //           { cardinality: [1, Infinity] },
  //           {
  //             id: enumRef({}, "provinces"),
  //             limit_to_coastal: bool({ cardinality: [0, 1] }),
  //             limit_to_naval_base: bool({ cardinality: [0, 1] }),
  //             limit_to_border: bool({ cardinality: [0, 1] }),
  //             level: int_variable_field(),
  //           },
  //         ),
  //       ),
  //     },
  //   ),
  set_stability: variable_field({ scope: [country()] }, 0, 1),
  add_war_support: variable_field({ scope: [country()] }, -1, 1),
  set_war_support: variable_field({ scope: [country()] }, 0, 1),
  random_unit_leader: obj(
    { scope: [country()], push_scope: unit_leader() },
    {
      limit: obj({ cardinality: [0, 1] }, { ...trigger }),
      tooltip: localisation({ cardinality: [0, 1] }),
      // ...effect,
    },
  ),
  every_unit_leader: obj(
    { scope: [country()], push_scope: unit_leader() },
    {
      random_select_amount: int({ cardinality: [0, 1] }, 1, Infinity),
      display_individual_scopes: bool({ cardinality: [0, 1] }),
      limit: obj({ cardinality: [0, 1] }, { ...trigger }),
      tooltip: localisation({ cardinality: [0, 1] }),
      // ...effect,
    },
  ),
  random_army_leader: obj(
    { scope: [country()], push_scope: unit_leader() },
    {
      limit: obj({ cardinality: [0, 1] }, { ...trigger }),
      tooltip: localisation({ cardinality: [0, 1] }),
      // ...effect,
    },
  ),
  every_army_leader: obj(
    { scope: [country()], push_scope: unit_leader() },
    {
      random_select_amount: int({ cardinality: [0, 1] }, 1, Infinity),
      display_individual_scopes: bool({ cardinality: [0, 1] }),
      limit: obj({ cardinality: [0, 1] }, { ...trigger }),
      tooltip: localisation({ cardinality: [0, 1] }),
      // ...effect,
    },
  ),
  random_navy_leader: obj(
    { scope: [country()], push_scope: unit_leader() },
    {
      limit: obj({ cardinality: [0, 1] }, { ...trigger }),
      tooltip: localisation({ cardinality: [0, 1] }),
      // ...effect,
    },
  ),
  every_navy_leader: obj(
    { scope: [country()], push_scope: unit_leader() },
    {
      random_select_amount: int({ cardinality: [0, 1] }, 1, Infinity),
      display_individual_scopes: bool({ cardinality: [0, 1] }),
      limit: obj({ cardinality: [0, 1] }, { ...trigger }),
      tooltip: localisation({ cardinality: [0, 1] }),
      // ...effect,
    },
  ),
  transfer_navy: obj(
    { scope: [country()] },
    {
      target: either(scopeRef({}, country()), enumRef({}, "country_tags")),
      is_government_in_exile: bool({ cardinality: [0, 1] }, true),
    },
  ),
  destroy_ships: obj(
    { scope: [country()] },
    {
      type: either(
        typeRef({}, "unit.ship_unit"),
        typeRef({}, "equipment.naval_equip"),
      ),
      count: either(int(), literal("all")),
    },
  ),
  set_unit_leader_flag: either(
    value_set(
      { scope: [unit_leader(), character(), operative()] },
      "leader_flag",
    ),
    obj(
      { scope: [unit_leader(), character(), operative()] },
      {
        flag: value_set({}, "leader_flag"),
        value: int({ cardinality: [0, 1] }),
        days: int({ cardinality: [0, 1] }),
      },
    ),
  ),
  modify_unit_leader_flag: obj(
    { scope: [unit_leader(), character()] },
    {
      flag: value({}, "leader_flag"),
      value: int({ cardinality: [0, 1] }),
      days: int({ cardinality: [0, 1] }),
    },
  ),
  clr_unit_leader_flag: value(
    { scope: [unit_leader(), character()] },
    "leader_flag",
  ),
  demote_leader: bool({ scope: [character(), unit_leader()] }, true),
  retire: bool({ scope: [character(), unit_leader()] }),
  add_command_power: variable_field({ scope: [country()] }),
  unlock_decision_tooltip: either(
    typeRef({ scope: [country()] }, "decision"),
    obj(
      { scope: [country()] },
      {
        decision: typeRef({}, "decision"),
        show_effect_tooltip: bool({ cardinality: [0, 1] }, true),
        show_modifiers: bool({ cardinality: [0, 1] }, true),
      },
    ),
  ),

  add_temporary_buff_to_units: obj(
    { scope: [character(), unit_leader()] },
    {
      combat_offense: float({ cardinality: [0, 1] }),
      combat_breakthrough: float({ cardinality: [0, 1] }),
      combat_defense: float({ cardinality: [0, 1] }),
      combat_entrenchment: float({ cardinality: [0, 1] }),
      org_damage_multiplier: float({ cardinality: [0, 1] }),
      str_damage_multiplier: float({ cardinality: [0, 1] }),
      war_support_reduction_on_damage: float({ cardinality: [0, 1] }),
      cannot_retreat_while_attacking: float({ cardinality: [0, 1] }),
      cannot_retreat_while_defending: float({ cardinality: [0, 1] }),
      days: int({ cardinality: [0, 1] }),
      tooltip: localisation({ cardinality: [0, 1] }),
    },
  ),
  boost_planning: float(),
  //   add_region_efficiency: replace_me(),
  modify_building_resources: obj(
    { scope: [country()] },
    {
      building: typeRef({}, "building"),
      resource: typeRef({}, "resource"),
      amount: int(),
    },
  ),
  //   global_every_army_leader: obj(
  //     { scope: [any()], push_scope: [any()] },
  //     {
  //       random_select_amount: int({ cardinality: [0, 1] }, 1, Infinity),
  //       display_individual_scopes: bool({ cardinality: [0, 1] }),
  //       limit: obj({}, { ...trigger }),
  //       tooltip: localisation({ cardinality: [0, 1] }),
  //       // ...effect,
  //     },
  //   ),
  add_to_variable: either(
    obj(
      { scope: [any()] },
      {
        value_set: value_set({ cardinality: [1, 2] }, "variable"),
        tooltip: localisation({ cardinality: [0, 1] }),
      },
    ),
    obj(
      { scope: [any()] },
      {
        var: value_set({}, "variable"),
        value: variable_field(),
        tooltip: localisation({ cardinality: [0, 1] }),
      },
    ),
  ),
  subtract_from_variable: either(
    obj(
      { scope: [any()] },
      {
        value_set: value_set({ cardinality: [1, 2] }, "variable"),
        tooltip: localisation({ cardinality: [0, 1] }),
      },
    ),
    obj(
      { scope: [any()] },
      {
        var: value_set({}, "variable"),
        value: variable_field(),
        tooltip: localisation({ cardinality: [0, 1] }),
      },
    ),
  ),
  multiply_variable: either(
    obj(
      { scope: [any()] },
      {
        value_set: value_set({ cardinality: [1, 2] }, "variable"),
        tooltip: localisation({ cardinality: [0, 1] }),
      },
    ),
    obj(
      { scope: [any()] },
      {
        var: value_set({}, "variable"),
        value: variable_field(),
        tooltip: localisation({ cardinality: [0, 1] }),
      },
    ),
  ),
  divide_variable: either(
    obj(
      { scope: [any()] },
      {
        value_set: value_set({ cardinality: [1, 2] }, "variable"),
        tooltip: localisation({ cardinality: [0, 1] }),
      },
    ),
    obj(
      { scope: [any()] },
      {
        var: value_set({}, "variable"),
        value: variable_field(),
        tooltip: localisation({ cardinality: [0, 1] }),
      },
    ),
  ),
  clear_variable: variable_field(),
  add_attack: int({ scope: [character(), unit_leader()] }),
  add_defense: int({ scope: [character(), unit_leader()] }),
  add_planning: int({ scope: [character(), unit_leader()] }),
  unlock_decision_category_tooltip: typeRef(
    { scope: [country()] },
    "decision_category",
  ),
  activate_mission_tooltip: typeRef({ scope: [country()] }, "decision.mission"),
  load_focus_tree: either(
    typeRef({ scope: [country()] }, "focus_tree"),
    obj(
      { scope: [country()] },
      {
        tree: typeRef({}, "focus_tree"),
        keep_completed: bool({ cardinality: [0, 1] }),
      },
    ),
  ),
  add_logistics: int({ scope: [character(), unit_leader()] }),
  add_offsite_building: obj(
    { scope: [country()] },
    {
      type: typeRef({}, "building"),
      level: int_variable_field(),
    },
  ),
  //   replace_unit_leader_trait: replace_me({ scope: [unit_leader()] }),
  add_max_trait: int({ scope: [character(), unit_leader()] }),
  add_skill_level: int({ scope: [character(), unit_leader()] }),
  add_to_temp_variable: either(
    obj(
      { scope: [any()] },
      {
        // value_set: value_set(
        //   { cardinality: [1, 2] },
        //   value({ cardinality: [1, 2] }, "variable"),
        // ),
        tooltip: localisation({ cardinality: [0, 1] }),
      },
    ),
    obj(
      { scope: [any()] },
      {
        // value_set: value_set({ cardinality: [1, 2] }, variable_field()),
        tooltip: localisation({ cardinality: [0, 1] }),
      },
    ),
    obj(
      { scope: [any()] },
      {
        var: value_set({ cardinality: [1, 2] }, "variable"),
        value: variable_field({ cardinality: [1, 2] }),
        tooltip: localisation({ cardinality: [0, 1] }),
      },
    ),
  ),
  subtract_from_temp_variable: obj(
    { scope: [any()] },
    {
      //   value_set: value_set({ cardinality: [1, 2] }, variable_field()),
      tooltip: localisation({ cardinality: [0, 1] }),
    },
  ),

  //   subtract_from_temp_variable: obj(
  //     { scope: any(), cardinality: [1, 2] },
  //     {
  //       var: value_set({}, "variable"),
  //       value: variable_field({ cardinality: [1, 2] }),
  //       tooltip: localisation({ cardinality: [0, 1] }),
  //     },
  //   ),
  multiply_temp_variable: either(
    obj(
      { scope: any(), cardinality: [1, 2] },
      {
        // [value_setKey("variable")]: variable_field({ cardinality: [1, 2] }),
        tooltip: localisation({ cardinality: [0, 1] }),
      },
    ),
    obj(
      { scope: any(), cardinality: [1, 2] },
      {
        var: value_set({}, "variable"),
        value: variable_field({ cardinality: [1, 2] }),
        tooltip: localisation({ cardinality: [0, 1] }),
      },
    ),
  ),
  divide_temp_variable: either(
    obj(
      { scope: any(), cardinality: [1, 2] },
      {
        // [value_setKey("variable")]: variable_field({ cardinality: [1, 2] }),
        tooltip: localisation({ cardinality: [0, 1] }),
      },
    ),
    obj(
      { scope: any(), cardinality: [1, 2] },
      {
        var: value_set({}, "variable"),
        value: variable_field({ cardinality: [1, 2] }),
        tooltip: localisation({ cardinality: [0, 1] }),
      },
    ),
  ),
  //   set_temp_variable: either(
  //     obj(
  //       { scope: any(), cardinality: [1, 2] },
  //       {
  //         [value_setKey("variable")]: variable_field({ cardinality: [1, 2] }),
  //         [value_setKey("variable")]: scope_field({ cardinality: [1, 2] }),
  //         [value_setKey("variable")]: enumRef(
  //           { cardinality: [1, 2] },
  //           "country_tags",
  //         ),
  //         [value_setKey("variable")]: value_set({}, "token"),
  //         tooltip: localisation({ cardinality: [0, 1] }),
  //       },
  //     ),
  //     obj(
  //       { scope: any() },
  //       {
  //         var: value_set({}, "variable"),
  //         value: variable_field(),
  //         value: scope_field(),
  //         value: enumRef({}, "country_tags"),
  //         value: value_set({}, "token"),
  //         tooltip: localisation({ cardinality: [0, 1] }),
  //       },
  //     ),
  //   ),
  add_timed_unit_leader_trait: obj(
    { scope: [character(), unit_leader()] },
    {
      trait: typeRef({}, "unit_leader_trait"),
      days: int(),
    },
  ),
  clamp_variable: either(
    obj(
      { scope: any() },
      {
        var: value_set({}, "variable"),
        min: variable_field(),
        max: variable_field(),
      },
    ),
    obj(
      { scope: any() },
      {
        var: value_set({}, "variable"),
        max: variable_field(),
      },
    ),
    obj(
      { scope: any() },
      {
        var: value_set({}, "variable"),
        min: variable_field(),
      },
    ),
  ),
  clamp_temp_variable: either(
    obj(
      { scope: any() },
      {
        var: value_set({}, "variable"),
        min: variable_field(),
        max: variable_field(),
      },
    ),
    obj(
      { scope: any() },
      {
        var: value_set({}, "variable"),
        max: variable_field(),
      },
    ),
    obj(
      { scope: any() },
      {
        var: value_set({}, "variable"),
        min: variable_field(),
      },
    ),
  ),
  //   start_border_war: obj(
  //     { scope: [state(), country()] },
  //     {
  //       change_state_after_war: bool(),
  //       combat_width: int({ cardinality: [0, 1] }),
  //       minimum_duration_in_days: int({ cardinality: [0, 1] }),
  //       attacker: obj(
  //         {},
  //         {
  //           state: scope(state()),
  //           state: typeRef({}, "state"),
  //           num_provinces: int({}, 1, 100),
  //           on_win: typeRef({}, "event"),
  //           on_lose: typeRef({}, "event"),
  //           on_cancel: typeRef({ cardinality: [0, 1] }, "event"),
  //           leader_score: obj(
  //             {},
  //             {
  //               base: variable_field({ cardinality: [0, 1] }),
  //               [enumRefKey("add_factor")]: float({ cardinality: [0, Infinity] }),
  //               modifier: array({}, [
  //                 obj(
  //                   { cardinality: [1, Infinity] },
  //                   {
  //                     ...trigger,
  //                     [enumRefKey("add_factor")]: float({ cardinality: [0, 1] }),
  //                   },
  //                 ),
  //               ]),
  //             },
  //           ),
  //           dig_in_factor: float({ cardinality: [0, 1] }),
  //           terrain_factor: float({ cardinality: [0, 1] }),
  //         },
  //       ),
  //       defender: obj(
  //         {},
  //         {
  //           //   state: scope(state()),
  //           state: typeRef({}, "state"),
  //           num_provinces: int({}, 1, 100),
  //           on_win: typeRef({}, "event"),
  //           on_lose: typeRef({}, "event"),
  //           on_cancel: typeRef({ cardinality: [0, 1] }, "event"),
  //         },
  //       ),
  //     },
  //   ),
  set_border_war_data: obj(
    { scope: [state(), country()] },
    {
      //   attacker: scope(state()),
      //   attacker: typeRef({}, "state"),
      //   defender: scope(state()),
      //   defender: typeRef({}, "state"),
      attacker_modifier: float({ cardinality: [0, 1] }),
      defender_modifier: float({ cardinality: [0, 1] }),
      combat_width: int({ cardinality: [0, 1] }),
    },
  ),
  cancel_border_war: obj(
    { scope: [state(), country()] },
    {
      dont_fire_events: bool({ cardinality: [0, 1] }),
      //   attacker: scope(state()),
      //   attacker: typeRef({}, "state"),
      //   defender: scope(state()),
      //   defender: typeRef({}, "state"),
    },
  ),
  set_division_template_lock: obj(
    { scope: country() },
    {
      division_template: localisation_inline(),
      is_locked: bool(),
    },
  ),

  set_division_template_cap: obj(
    { scope: [country()] },
    {
      division_template: localisation_inline(),
      division_cap: int_variable_field(),
    },
  ),
  clear_division_template_cap: obj(
    { scope: [country()] },
    {
      division_template: localisation_inline(),
    },
  ),
  set_division_force_allow_recruiting: obj(
    { scope: [country()] },
    {
      division_template: localisation_inline(),
      force_allow_recruiting: bool({ cardinality: [0, 1] }),
    },
  ),
  delete_unit_template_and_units: obj(
    { scope: [country()] },
    {
      division_template: localisation_inline(),
      disband: bool({ cardinality: [0, 1] }),
    },
  ),
  print_variables: obj(
    { scope: [any()] },
    {
      file: scalar(),
      text: scalar({ cardinality: [0, 1] }),
      append: bool({ cardinality: [0, 1] }),
      print_global: bool({ cardinality: [0, 1] }),
      var_list: array({ cardinality: [1, Infinity] }, [value({}, "variable")]),
    },
  ),
  activate_mission: typeRef({ scope: [country()] }, "decision.mission"),
  remove_mission: typeRef({ scope: [country()] }, "decision.mission"),
  recall_attache: either(
    scopeRef({ scope: [country()] }, country()),
    enumRef({}, "country_tags"),
  ),
  activate_targeted_decision: either(
    obj(
      { scope: [country()] },
      {
        target: either(scopeRef({}, country()), enumRef({}, "country_tags")),
        decision: typeRef({}, "decision.country"),
      },
    ),
    obj(
      { scope: [country()] },
      {
        target: either(scopeRef({}, state()), typeRef({}, "state")),
        decision: typeRef({}, "decision.state_targeted"),
      },
    ),
  ),
  remove_targeted_decision: either(
    typeRef({ scope: [country()] }, "decision"),
    obj(
      { scope: [country()] },
      {
        target: either(scopeRef({}, country()), enumRef({}, "country_tags")),
        decision: typeRef({}, "decision.country"),
      },
    ),
    obj(
      { scope: [country()] },
      {
        target: either(scopeRef({}, state()), typeRef({}, "state")),
        decision: typeRef({}, "decision.state_targeted"),
      },
    ),
  ),
  modify_timed_idea: obj(
    { scope: [country()] },
    {
      idea: either(enumRef({}, "idea_name"), value({}, "variable")),
      days: int_variable_field({ cardinality: [0, 1] }),
      months: int_variable_field({ cardinality: [0, 1] }),
      years: int_variable_field({ cardinality: [0, 1] }),
    },
  ),
  activate_decision: typeRef({ scope: [country()] }, "decision"),
  set_truce: obj(
    { scope: [country()] },
    {
      target: either(scopeRef({}, country()), enumRef({}, "country_tags")),
      days: int(),
    },
  ),
  round_variable: variable_field({ scope: [any()] }),
  unit_leader_event: either(
    obj(
      { scope: [character(), unit_leader()] },
      {
        id: typeRef({}, "event.unit_leader_event"),
        hours: variable_field({ cardinality: [0, 1] }, 1, 24),
        days: variable_field({ cardinality: [0, 1] }, 1, 31),
        months: variable_field({ cardinality: [0, 1] }, 1, 12),
        random_hours: variable_field({ cardinality: [0, 1] }, 1, Infinity),
        random_days: variable_field({ cardinality: [0, 1] }, 1, Infinity),
        random: variable_field({ cardinality: [0, 1] }, 1, Infinity),
        tooltip: localisation({ cardinality: [0, 1] }),
        // random: obj(
        //   { cardinality: [0, 1] },
        //   {
        //     chance: variable_field(),
        //     // ...effect,
        //   },
        // ),
      },
    ),
    typeRef({ scope: [character(), unit_leader()] }, "event.unit_leader_event"),
  ),
  finalize_border_war: obj(
    { scope: [state(), country()] },
    {
      attacker: either(scopeRef({}, state()), typeRef({}, "state")),
      defender: either(scopeRef({}, state()), typeRef({}, "state")),
      attacker_win: bool({ cardinality: [0, 1] }),
      defender_win: bool({ cardinality: [0, 1] }),
    },
  ),
  remove_decision: typeRef({ scope: [country()] }, "decision"),
  swap_ruler_traits: obj(
    { scope: [country()] },
    {
      remove: typeRef({}, "country_leader_trait"),
      add: typeRef({}, "country_leader_trait"),
    },
  ),
  add_random_trait: array(
    { scope: [character(), unit_leader()], cardinality: [1, Infinity] },
    [typeRef({}, "unit_leader_trait")],
  ),
  remove_exile_tag: bool({}, true),
  set_legitimacy: int_variable_field({ scope: [country()] }),
  become_exiled_in: obj(
    { scope: [country()] },
    {
      target: either(scopeRef({}, country()), enumRef({}, "country_tags")),
      legitimacy: float({ cardinality: [0, 1] }),
    },
  ),

  set_faction_name: localisation({ scope: [state(), country()] }),
  add_maneuver: int({ scope: [character(), unit_leader()] }),
  add_coordination: int({ scope: [character(), unit_leader()] }),
  give_resource_rights: obj(
    { scope: [country()] },
    {
      receiver: either(enumRef({}, "country_tags"), scopeRef({}, country())),
      state: either(typeRef({}, "state"), scopeRef({}, state())),
      resources: array({ cardinality: [1, Infinity] }, [
        typeRef({}, "resource"),
      ]),
    },
  ),
  remove_resource_rights: either(
    typeRef({ scope: [country()] }, "state"),
    scopeRef({ scope: [country()] }, state()),
  ),
  inherit_technology: either(
    enumRef({ scope: [country()] }, "country_tags"),
    scopeRef({ scope: [country()] }, country()),
  ),
  round_temp_variable: variable_field({ scope: [any()] }),
  set_faction_leader: bool({ scope: [country()] }, true),
  set_keyed_oob: obj(
    { scope: [country()] },
    {
      key: scalar(),
      name: typeRef({}, "oob"),
    },
  ),
  set_oob: typeRef({ scope: [country()] }, "oob"),
  set_naval_oob: typeRef({ scope: [country()] }, "oob"),
  set_air_oob: typeRef({ scope: [country()] }, "oob"),
  add_to_array: obj(
    { scope: [any()] },
    {
      array: either(value_set({}, "array"), value_set({}, "variable")),
      value: either(
        ...variable_field({ cardinality: [0, 1] }),
        // scope_field({ cardinality: [0, 1] }),
        enumRef({ cardinality: [0, 1] }, "country_tags"),
        value_set({ cardinality: [0, 1] }, "token"),
      ),
      index: int_variable_field({ cardinality: [0, 1] }),
    },
  ),
  remove_from_array: obj(
    { scope: [any()] },
    {
      array: either(
        value_set({}, "array"),
        value_set({}, "variable"),
        value_set({}, "token"),
      ),
      value: either(
        ...variable_field(),
        // scope_field(),
        enumRef({}, "country_tags"),
        value_set({}, "token"),
      ),
      index: int_variable_field(),
    },
  ),
  clear_array: either(value({}, "array"), ...variable_field()),
  resize_array: obj(
    { scope: [any()] },
    {
      array: either(value_set({}, "array"), value_set({}, "variable")),
      value: variable_field({ cardinality: [0, 1] }),
      size: int_variable_field(),
    },
  ),
  add_to_temp_array: obj(
    { scope: [any()] },
    {
      array: either(value_set({}, "array"), value_set({}, "variable")),
      value: either(
        ...variable_field({ cardinality: [0, 1] }),
        // scope_field({ cardinality: [0, 1] }),
        enumRef({ cardinality: [0, 1] }, "country_tags"),
        value_set({ cardinality: [0, 1] }, "token"),
      ),
      index: int_variable_field({ cardinality: [0, 1] }),
    },
  ),

  //   remove_from_temp_array: either(
  //     obj(
  //       { scope: any() },
  //       {
  //         array: value_set({}, "array"),
  //         value: variable_field(),
  //         value: scope_field(),
  //         value: enumRef({}, "country_tags"),
  //         value: value_set({}, "token"),
  //       },
  //     ),
  //     obj(
  //       { scope: any() },
  //       {
  //         array: value_set({}, "array"),
  //         array: value_set({}, "variable"),
  //         array: value_set({}, "token"),
  //         index: int_variable_field(),
  //       },
  //     ),
  //     obj(
  //       { scope: any() },
  //       {
  //         [valueSet("array")]: variable_field(),
  //         [value_setKey("variable")]: variable_field(),
  //         [value_setKey("array")]: scope_field(),
  //         [value_setKey("variable")]: scope_field(),
  //         [value_setKey("array")]: enumRef({}, "country_tags"),
  //         [value_setKey("variable")]: enumRef({}, "country_tags"),
  //         [value_setKey("array")]: value_set({}, "token"),
  //         [value_setKey("variable")]: value_set({}, "token"),
  //       },
  //     ),
  //   ),
  clear_temp_array: either(value({}, "array"), ...variable_field()),
  resize_temp_array: either(
    obj(
      { scope: any() },
      {
        array: value_set({}, "array"),
        // array: value_set({}, "variable"),
        value: variable_field({ cardinality: [0, 1] }),
        size: int_variable_field(),
      },
    ),
    // obj(
    //   { scope: any() },
    //   {
    //     [value_setKey("array")]: int_variable_field(),
    //     [value_setKey("variable")]: int_variable_field(),
    //   },
    // ),
  ),
  for_each_loop: obj(
    { scope: any() },
    {
      array: either(value({}, "array"), ...variable_field()),
      value: value_set({ cardinality: [0, 1] }, "variable"),
      index: value_set({ cardinality: [0, 1] }, "variable"),
      break: value_set({ cardinality: [0, 1] }, "variable"),
      // ...effect,
    },
  ),
  add_fuel: int_variable_field(),
  set_fuel: int_variable_field(),
  for_each_scope_loop: obj(
    { scope: any(), push_scope: any() },
    {
      array: either(value({}, "array"), ...variable_field()),
      break: scalar({ cardinality: [0, 1] }),
      tooltip: localisation({ cardinality: [0, 1] }),
      // ...effect,
    },
  ),
  random_scope_in_array: obj(
    { scope: any(), push_scope: any() },
    {
      array: either(value({}, "array"), ...variable_field()),
      break: scalar({ cardinality: [0, 1] }),
      limit: obj(
        { cardinality: [0, 1] },
        {
          ...trigger,
        },
      ),
      tooltip: localisation({ cardinality: [0, 1] }),
      // ...effect,
    },
  ),
  force_update_dynamic_modifier: bool({}, true),
  remove_dynamic_modifier: obj(
    { scope: [state(), country()] },
    {
      modifier: typeRef({}, "dynamic_modifier"),
      scope: enumRef({ cardinality: [0, 1] }, "country_tags"),
      //   scope: scopeRef({ cardinality: [0, 1] }, "country"),
    },
  ),
  add_dynamic_modifier: obj(
    { scope: [state(), country()] },
    {
      modifier: typeRef({}, "dynamic_modifier"),
      scope: enumRef({ cardinality: [0, 1] }, "country_tags"),
      days: int_variable_field({ cardinality: [0, 1] }),
    },
  ),
  for_loop_effect: obj(
    { scope: any() },
    {
      start: variable_field({ cardinality: [0, 1] }),
      end: variable_field({ cardinality: [0, 1] }),
      compare: enumRef({ cardinality: [0, 1] }, "var_compares"),
      add: variable_field({ cardinality: [0, 1] }),
      value: scalar({ cardinality: [0, 1] }),
      break: scalar({ cardinality: [0, 1] }),
      // ...effect,
    },
  ),
  while_loop_effect: obj(
    { scope: any() },
    {
      break: scalar({ cardinality: [0, 1] }),
      limit: obj(
        {},
        {
          ...trigger,
        },
      ),
      // ...effect,
    },
  ),
  meta_effect: obj(
    { scope: any() },
    {
      //   text: ignore_field(),
      scalar: localisation({ cardinality: [1, Infinity] }),
    },
  ),

  launch_nuke: obj(
    { scope: [country()] },
    {
      province: enumRef({ cardinality: [0, 1] }, "provinces"),
      state: either(
        scopeRef({ cardinality: [0, 1] }, state()),
        typeRef({ cardinality: [0, 1] }, "state"),
      ),
      controller: either(
        scopeRef({ cardinality: [0, 1] }, country()),
        enumRef({ cardinality: [0, 1] }, "country_tags"),
      ),
      use_nuke: bool({ cardinality: [0, 1] }),
    },
  ),
  scoped_sound_effect: scalar({ scope: [country()] }),
  find_lowest_in_array: obj(
    { scope: [any()] },
    {
      array: either(value({}, "array"), ...variable_field()),
      value: value_set({ cardinality: [0, 1] }, "variable"),
      index: value_set({ cardinality: [0, 1] }, "variable"),
    },
  ),
  find_highest_in_array: obj(
    { scope: [any()] },
    {
      array: either(value({}, "array"), ...variable_field()),
      value: value_set({ cardinality: [0, 1] }, "variable"),
      index: value_set({ cardinality: [0, 1] }, "variable"),
    },
  ),
  add_mines: obj(
    { scope: [country()] },
    {
      region: typeRef({}, "strategic_region"),
      amount: int_variable_field(),
    },
  ),
  set_fuel_ratio: float({ scope: [country()] }),
  end_exile: either(
    enumRef({ scope: [country()] }, "country_tags"),
    scopeRef({ scope: [country()] }, country()),
  ),
  supply_units: int({ scope: [unit_leader(), combat(), character()] }),
  set_convoys: int({ scope: [country()] }),
  add_ai_strategy: either(
    obj(
      { scope: [country()] },
      {
        type: enumRef({}, "ai_role_strats"),
        id: either(
          value({}, "ai_template_roles"),
          value({}, "ai_equipment_roles"),
        ),
        value: int(),
      },
    ),
    obj(
      { scope: [country()] },
      {
        type: enumRef({}, "unit_strats"),
        id: either(
          typeRef({}, "unit"),
          enumRef({}, "unit_types"),
          value({}, "ai_template_roles"),
          value({}, "ai_equipment_roles"),
        ),
        value: int(),
      },
    ),
    obj(
      { scope: [country()] },
      {
        type: enumRef({}, "equipment_strats"),
        id: either(typeRef({}, "equipment"), enumRef({}, "unit_types")),
        value: int(),
      },
    ),
    obj(
      { scope: [country()] },
      {
        type: enumRef({}, "pp_strats"),
        id: enumRef({}, "pp_targets"),
        value: int(),
      },
    ),
    obj(
      { scope: [country()] },
      {
        type: typeRef({}, "land_xp_spend_priority"),
        id: enumRef({}, "ai_xp_targets"),
        value: int(),
      },
    ),
    obj(
      { scope: [country()] },
      {
        type: typeRef({}, "air_xp_spend_priority"),
        id: enumRef({}, "ai_xp_targets"),
        value: int(),
      },
    ),
    obj(
      { scope: [country()] },
      {
        type: typeRef({}, "navy_xp_spend_priority"),
        id: enumRef({}, "ai_xp_targets"),
        value: int(),
      },
    ),
    obj(
      { scope: [country()] },
      {
        type: typeRef({}, "area_priority"),
        id: typeRef({}, "ai_area"),
        value: int(),
      },
    ),
    obj(
      { scope: [country()] },
      {
        type: enumRef({}, "ai_diplo_strats"),
        id: either(enumRef({}, "country_tags"), scopeRef({}, country())),
        value: int(),
      },
    ),
    obj(
      { scope: [country()] },
      {
        type: enumRef({}, "ai_diplo_strats"),
        target: either(typeRef({}, "ai_area"), scopeRef({}, country())),
        value: int(),
      },
    ),
    obj(
      { scope: [country()] },
      {
        type: typeRef({}, "dont_join_wars_with"),
        id: either(enumRef({}, "country_tags"), scopeRef({}, country())),
        target_country: either(
          enumRef({ cardinality: [0, 1] }, "country_tags"),
          scopeRef({ cardinality: [0, 1] }, country()),
        ),
        value: int(),
      },
    ),
    obj(
      { scope: [country()] },
      {
        type: enumRef({}, "strat_region_strats"),
        id: typeRef({}, "strategic_region"),
        value: int(),
      },
    ),
    obj(
      { scope: [country()] },
      {
        type: enumRef({}, "strat_region_strats_without_value"),
        id: typeRef({}, "strategic_region"),
      },
    ),
    obj(
      { scope: [country()] },
      {
        type: enumRef({}, "no_id_strats"),
        value: int(),
      },
    ),
    obj(
      { scope: [country()] },
      {
        type: enumRef({}, "state_strats"),
        target: typeRef({}, "state"),
        value: int(),
      },
    ),
    obj(
      { scope: [country()] },
      {
        type: enumRef({}, "state_strats"),
        id: typeRef({}, "state"),
        value: int(),
      },
    ),
    obj(
      { scope: [country()] },
      {
        type: enumRef({}, "state_strats_with_id"),
        id: typeRef({}, "building"),
        target: int(),
        value: int(),
      },
    ),
  ),

  //   add_ai_strategy: either(
  //     obj(
  //       { scope: [country()] },
  //       {
  //         type: enumRef({}, "diplo_action_strats"),
  //         id: either(scopeRef({}, country()), enumRef({}, "country_tags")),
  //         target: enumRef({}, "diplomatic_relations"),
  //         value: int(),
  //       },
  //     ),
  //     obj(
  //       { scope: [country()] },
  //       {
  //         type: enumRef({}, "naval_mission_strats"),
  //         id: enumRef({}, "naval_missions"),
  //         value: int(),
  //       },
  //     ),
  //     obj(
  //       { scope: [country()] },
  //       {
  //         type: enumRef({}, "building_strats"),
  //         id: typeRef({}, "building"),
  //         value: int(),
  //       },
  //     ),
  //     obj(
  //       { scope: [country()] },
  //       {
  //         type: literal("research_tech"),
  //         id: either(typeRef({}, "technology"), int()),
  //         value: int(),
  //       },
  //     ),
  //     obj(
  //       { scope: [country()] },
  //       {
  //         type: literal("scorched_earth_prio"),
  //         id: scopeRef({}, country()),
  //         states: array({ cardinality: [1, Infinity] }, [int()]),
  //       },
  //     ),
  //     obj(
  //       { scope: [country()] },
  //       {
  //         type: literal("put_unit_buffers"),
  //         ratio: float({}, 0, 1),
  //         order_id: int({ cardinality: [0, 1] }),
  //         states: array({ cardinality: [1, Infinity] }, [int()]),
  //         area: typeRef({ cardinality: [0, Infinity] }, "ai_area"),
  //         subtract_invasions_from_need: bool({ cardinality: [0, Infinity] }),
  //         subtract_fronts_from_need: bool({ cardinality: [0, Infinity] }),
  //       },
  //     ),
  //     obj(
  //       { scope: [country()] },
  //       {
  //         type: literal("front_control"),
  //         tag: scopeRef({ cardinality: [0, Infinity] }, country()),
  //         state: int({ cardinality: [0, Infinity] }),
  //         area: typeRef({ cardinality: [0, Infinity] }, "ai_area"),
  //         strategic_region: typeRef(
  //           { cardinality: [0, Infinity] },
  //           "strategic_region",
  //         ),
  //         country_trigger: obj(
  //           { cardinality: [0, 1] },
  //           {
  //             ...trigger,
  //           },
  //         ),
  //         state_trigger: obj(
  //           {
  //             replace_scope: {
  //               this: state(),
  //               from: country(),
  //               fromfrom: country(),
  //             },
  //             cardinality: [0, 1],
  //           },
  //           {
  //             ...trigger,
  //           },
  //         ),
  //         ratio: float({ cardinality: [0, 1] }, 0, 1),
  //         priority: int({ cardinality: [0, 1] }),
  //         ordertype: enumRef({ cardinality: [0, 1] }, "ordertypes"),
  //         execution_type: enumRef({ cardinality: [0, 1] }, "execution_types"),
  //         execute_order: bool({ cardinality: [0, 1] }),
  //         manual_attack: bool({ cardinality: [0, 1] }),
  //       },
  //     ),
  //     obj(
  //       { scope: [country()] },
  //       {
  //         type: enumRef({}, "unit_requests"),
  //         tag: scopeRef({ cardinality: [0, Infinity] }, country()),
  //         state: int({ cardinality: [0, Infinity] }),
  //         strategic_region: typeRef(
  //           { cardinality: [0, Infinity] },
  //           "strategic_region",
  //         ),
  //         area: typeRef({ cardinality: [0, Infinity] }, "ai_area"),
  //         country_trigger: obj(
  //           { cardinality: [0, 1] },
  //           {
  //             ...trigger,
  //           },
  //         ),
  //         state_trigger: obj(
  //           {
  //             replace_scope: {
  //               this: state(),
  //               from: country(),
  //               fromfrom: country(),
  //             },
  //             cardinality: [0, 1],
  //           },
  //           {
  //             ...trigger,
  //           },
  //         ),
  //         value: int(),
  //       },
  //     ),
  //     obj(
  //       { scope: [country()] },
  //       {
  //         type: literal("intelligence_agency_branch_desire_factor"),
  //         id: enumRef({}, "intel_branches"),
  //         value: int(),
  //       },
  //     ),
  //     obj(
  //       { scope: [country()] },
  //       {
  //         type: literal("asking_foreign_garrison"),
  //         value: int(),
  //         id: scopeRef({ cardinality: [0, 1] }, country()),
  //       },
  //     ),
  //     obj(
  //       { scope: [country()] },
  //       {
  //         type: literal("operative_mission"),
  //         mission: enumRef({}, "operative_missions"),
  //         value: int(),
  //         mission_target: scopeRef({ cardinality: [0, 1] }, country()),
  //         state: int({ cardinality: [0, Infinity] }),
  //         priority: int({ cardinality: [0, 1] }),
  //         num_operatives: int({ cardinality: [0, 1] }, 1, Infinity),
  //       },
  //     ),
  //     obj(
  //       { scope: [country()] },
  //       {
  //         type: literal("operative_operation"),
  //         operation: either(typeRef({}, "operation"), variable_field()),
  //         value: int(),
  //         operation_target: either(scopeRef({}, country()), variable_field()),
  //       },
  //     ),
  //   ),
  hidden_effect: obj(
    { scope: [any()] },
    {
      // ...effect,
    },
  ),
  add_legitimacy: int({}, -100, 100),
  retire_ideology_leader: either(typeRef({}, "ideology"), ...variable_field()),
  play_song: scalar(),
  scoped_play_song: scalar(),
};
