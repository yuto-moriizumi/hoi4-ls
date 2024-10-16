import { modifier_rule } from "./modifier_rule";
import { modifier } from "./modifiers";
import { trigger } from "./triggers";
import {
  obj,
  country,
  state,
  int,
  bool,
  localisation,
  array,
  typeRef,
  either,
  enumRef,
  scopeRef,
  character,
  unit_leader,
  value_set,
  value,
  int_variable_field,
  datetime_field,
  enumRefKey,
  float,
  variable_field,
  scalar,
  localisation_inline,
  literal,
  operative,
} from "./utils";

export const effect = {
  every_core_state: obj(
    { scope: [country()], push_scope: state() },
    {
      random_select_amount: int({ cardinality: [0, 1] }, 1, Infinity),
      display_individual_scopes: bool({ cardinality: [0, 1] }),
      limit: obj({ cardinality: [0, 1] }, { ...trigger }),
      tooltip: localisation({ cardinality: [0, 1] }),
      // ...effect,
    },
  ),
  random_core_state: obj(
    { scope: [country()], push_scope: state() },
    {
      limit: obj({ cardinality: [0, 1] }, { ...trigger }),
      prioritize: array({ cardinality: [0, 1] }, [
        typeRef({ cardinality: [1, Infinity] }, "state"),
      ]),
      tooltip: localisation({ cardinality: [0, 1] }),
      // ...effect,
    },
  ),
  transfer_state_to: either(
    enumRef({ scope: [state()] }, "country_tags"),
    scopeRef({ scope: [state()] }, country()),
  ),
  set_state_owner_to: either(
    enumRef({ scope: [state()] }, "country_tags"),
    scopeRef({ scope: [state()] }, country()),
  ),
  set_state_controller_to: either(
    enumRef({ scope: [state()] }, "country_tags"),
    scopeRef({ scope: [state()] }, country()),
  ),
  release_on_controlled: either(
    enumRef({ scope: [country()] }, "country_tags"),
    scopeRef({ scope: [country()] }, country()),
  ),
  release_puppet_on_controlled: either(
    enumRef({ scope: [country()] }, "country_tags"),
    scopeRef({ scope: [country()] }, country()),
  ),
  uncomplete_national_focus: obj(
    { scope: [country()] },
    {
      focus: either(typeRef({}, "focus"), typeRef({}, "shared_focus")),
      uncomplete_children: bool({ cardinality: [0, 1] }),
      refund_political_power: bool({ cardinality: [0, 1] }),
    },
  ),
  every_character: obj(
    { scope: [country()], push_scope: character() },
    {
      random_select_amount: int({ cardinality: [0, 1] }, 1, Infinity),
      display_individual_scopes: bool({ cardinality: [0, 1] }),
      limit: obj({ cardinality: [0, 1] }, { ...trigger }),
      tooltip: localisation({ cardinality: [0, 1] }),
      // ...effect,
    },
  ),
  random_character: obj(
    { scope: [country()], push_scope: character() },
    {
      limit: obj({ cardinality: [0, 1] }, { ...trigger }),
      tooltip: localisation({ cardinality: [0, 1] }),
      // ...effect,
    },
  ),
  add_corps_commander_role: obj(
    { scope: [character(), country(), unit_leader()] },
    {
      character: either(
        typeRef({ cardinality: [0, 1] }, "character"),
        value_set({ cardinality: [0, 1] }, "character_token"),
        value({ cardinality: [0, 1] }, "variable"),
        value({ cardinality: [0, 1] }, "event_target"),
        value({ cardinality: [0, 1] }, "global_event_target"),
        scopeRef({ cardinality: [0, 1] }, character()),
      ),
      desc: localisation({ cardinality: [0, 1] }),
      traits: array({ cardinality: [0, 1] }, [
        typeRef({ cardinality: [1, Infinity] }, "unit_leader_trait"),
      ]),
      skill: int_variable_field({ cardinality: [0, 1] }),
      attack_skill: int_variable_field({ cardinality: [0, 1] }),
      defense_skill: int_variable_field({ cardinality: [0, 1] }),
      planning_skill: int_variable_field({ cardinality: [0, 1] }),
      logistics_skill: int_variable_field({ cardinality: [0, 1] }),
      female: bool({ cardinality: [0, 1] }),
      legacy_id: value_set({ cardinality: [0, 1] }, "unit_leader_ids"),
      visible: obj({ cardinality: [0, 1] }, { ...trigger }),
    },
  ),
  remove_unit_leader_role: either(
    bool({ scope: [character(), unit_leader()] }),
    typeRef({ scope: [country()] }, "character"),
    value({ scope: [country()] }, "character_token"),
    value({ scope: [country()] }, "variable"),
    value({ scope: [country()] }, "event_target"),
    value({ scope: [country()] }, "global_event_target"),
    scopeRef({ scope: [country()] }, character()),
    obj(
      { scope: [country()] },
      {
        character: either(
          typeRef({}, "character"),
          value_set({}, "character_token"),
          value({}, "variable"),
          value({}, "event_target"),
          value({}, "global_event_target"),
          scopeRef({}, character()),
        ),
      },
    ),
  ),
  add_field_marshal_role: obj(
    { scope: [character(), country(), unit_leader()] },
    {
      character: either(
        typeRef({ cardinality: [0, 1] }, "character"),
        value_set({ cardinality: [0, 1] }, "character_token"),
        value({ cardinality: [0, 1] }, "variable"),
        value({ cardinality: [0, 1] }, "event_target"),
        value({ cardinality: [0, 1] }, "global_event_target"),
        scopeRef({ cardinality: [0, 1] }, character()),
      ),
      desc: localisation({ cardinality: [0, 1] }),
      traits: array({ cardinality: [0, 1] }, [
        typeRef({ cardinality: [1, Infinity] }, "unit_leader_trait"),
      ]),
      skill: int_variable_field(),
      attack_skill: int_variable_field(),
      defense_skill: int_variable_field(),
      planning_skill: int_variable_field(),
      logistics_skill: int_variable_field(),
      legacy_id: value_set({ cardinality: [0, 1] }, "unit_leader_ids"),
      visible: obj(
        {
          cardinality: [0, 1],
          replace_scope: { this: character(), root: country() },
        },
        { ...trigger },
      ),
    },
  ),
  add_naval_commander_role: obj(
    { scope: [character(), country(), unit_leader()] },
    {
      character: either(
        typeRef({ cardinality: [0, 1] }, "character"),
        value_set({ cardinality: [0, 1] }, "character_token"),
        value({ cardinality: [0, 1] }, "variable"),
        value({ cardinality: [0, 1] }, "event_target"),
        value({ cardinality: [0, 1] }, "global_event_target"),
        scopeRef({ cardinality: [0, 1] }, character()),
      ),
      desc: localisation({ cardinality: [0, 1] }),
      traits: array({ cardinality: [0, 1] }, [
        typeRef({ cardinality: [1, Infinity] }, "unit_leader_trait"),
      ]),
      skill: int_variable_field(),
      attack_skill: int_variable_field(),
      defense_skill: int_variable_field(),
      maneuvering_skill: int_variable_field(),
      coordination_skill: int_variable_field(),
      legacy_id: value_set({ cardinality: [0, 1] }, "unit_leader_ids"),
      visible: obj({ cardinality: [0, 1] }, { ...trigger }),
    },
  ),
  add_country_leader_role: obj(
    { scope: [character(), country(), unit_leader()] },
    {
      character: either(
        typeRef({ cardinality: [0, 1] }, "character"),
        value_set({ cardinality: [0, 1] }, "character_token"),
        value({ cardinality: [0, 1] }, "variable"),
        value({ cardinality: [0, 1] }, "event_target"),
        value({ cardinality: [0, 1] }, "global_event_target"),
        scopeRef({ cardinality: [0, 1] }, character()),
      ),
      promote_leader: bool({ cardinality: [0, 1] }),
      country_leader: obj(
        { cardinality: [0, 1] },
        {
          desc: localisation({ cardinality: [0, 1] }),
          ideology: enumRef({}, "sub_ideology"),
          traits: array({ cardinality: [0, 1] }, [
            typeRef({ cardinality: [1, Infinity] }, "country_leader_trait"),
          ]),
          expire: datetime_field({ cardinality: [0, 1] }),
          id: int({ cardinality: [0, 1] }),
        },
      ),
    },
  ),
  remove_country_leader_role: obj(
    { scope: [character(), country(), unit_leader()] },
    {
      character: either(
        typeRef({ cardinality: [0, 1] }, "character"),
        value_set({ cardinality: [0, 1] }, "character_token"),
        value({ cardinality: [0, 1] }, "variable"),
        value({ cardinality: [0, 1] }, "event_target"),
        value({ cardinality: [0, 1] }, "global_event_target"),
        scopeRef({ cardinality: [0, 1] }, character()),
      ),
      ideology: enumRef({ cardinality: [0, 1] }, "sub_ideology"),
    },
  ),
  add_advisor_role: obj(
    { scope: [character(), country(), unit_leader()] },
    {
      character: either(
        typeRef({ cardinality: [0, 1] }, "character"),
        value_set({ cardinality: [0, 1] }, "character_token"),
        value({ cardinality: [0, 1] }, "variable"),
        value({ cardinality: [0, 1] }, "event_target"),
        value({ cardinality: [0, 1] }, "global_event_target"),
        scopeRef({ cardinality: [0, 1] }, character()),
      ),
      activate: bool({ cardinality: [0, 1] }),
      advisor: obj(
        {},
        {
          slot: value({}, "character_advisor_slot"),
          idea_token: value_set({}, "advisor_token"),
          name: localisation({ cardinality: [0, 1] }),
          desc: localisation({ cardinality: [0, 1] }),
          traits: array({ cardinality: [0, 1] }, [
            typeRef({ cardinality: [0, Infinity] }, "country_leader_trait"),
          ]),
          research_bonus: obj(
            { cardinality: [0, 1] },
            {
              [enumRefKey("tech_category")]: float({
                cardinality: [1, Infinity],
              }),
            },
          ),
          ledger: enumRef({ cardinality: [0, 1] }, "ledgers"),
          cost: int({ cardinality: [0, 1] }),
          removal_cost: int({ cardinality: [0, 1] }),
          ai_will_do: obj(
            {
              cardinality: [0, 1],
              replace_scope: { this: character(), root: country() },
            },
            {
              [enumRefKey("base_factor")]: variable_field(),
              ...modifier_rule,
            },
          ),
          modifier: obj(
            {
              cardinality: [0, 1],
              replace_scope: { this: character(), root: country() },
            },
            { ...modifier },
          ),
          can_be_fired: bool({ cardinality: [0, 1] }),
        },
      ),
    },
  ),
  remove_advisor_role: obj(
    { scope: [character(), country(), unit_leader()] },
    {
      character: either(
        typeRef({ cardinality: [0, 1] }, "character"),
        value_set({ cardinality: [0, 1] }, "character_token"),
        value({ cardinality: [0, 1] }, "variable"),
        value({ cardinality: [0, 1] }, "event_target"),
        value({ cardinality: [0, 1] }, "global_event_target"),
        scopeRef({ cardinality: [0, 1] }, character()),
      ),
      slot: value({}, "character_advisor_slot"),
    },
  ),
  retire_character: either(
    typeRef({ scope: [country()] }, "character"),
    value({ scope: [country()] }, "character_token"),
    value({}, "variable"),
    value({}, "event_target"),
    value({}, "global_event_target"),
    scopeRef({}, character()),
  ),
  set_character_name: either(
    localisation({ scope: [character(), unit_leader()] }),
    typeRef({ scope: [character(), unit_leader()] }, "spriteType"),
    obj(
      { scope: [country(), character(), unit_leader()] },
      {
        character: either(
          typeRef({ cardinality: [0, 1] }, "character"),
          value({ cardinality: [0, 1] }, "character_token"),
          value({ cardinality: [0, 1] }, "variable"),
          value({ cardinality: [0, 1] }, "event_target"),
          value({ cardinality: [0, 1] }, "global_event_target"),
          scopeRef({ cardinality: [0, 1] }, character()),
        ),
        name: localisation(),
      },
    ),
  ),
  promote_character: either(
    typeRef({ scope: [country()] }, "character"),
    value({ scope: [country()] }, "character_token"),
    obj(
      { scope: [country()] },
      {
        character: either(
          typeRef({}, "character"),
          value({}, "character_token"),
        ),
        ideology: either(enumRef({}, "sub_ideology"), typeRef({}, "ideology")),
      },
    ),
    bool({ scope: [character(), unit_leader()] }),
    enumRef({ scope: [character(), unit_leader()] }, "sub_ideology"),
    typeRef({ scope: [character(), unit_leader()] }, "ideology"),
    obj(
      { scope: [character(), unit_leader()] },
      {
        ideology: either(enumRef({}, "sub_ideology"), typeRef({}, "ideology")),
      },
    ),
  ),
  swap_country_leader_traits: obj(
    { scope: [character(), unit_leader()] },
    {
      remove: typeRef({}, "country_leader_trait"),
      add: typeRef({}, "country_leader_trait"),
      ideology: enumRef({ cardinality: [0, 1] }, "sub_ideology"),
    },
  ),
  set_character_flag: either(
    value_set({ scope: [character(), unit_leader()] }, "character_flag"),
    obj(
      { scope: [character(), unit_leader()] },
      {
        flag: value_set({}, "character_flag"),
        value: int({ cardinality: [0, 1] }),
        days: int({ cardinality: [0, 1] }),
      },
    ),
  ),
  modify_character_flag: obj(
    { scope: [character(), unit_leader()] },
    {
      flag: value({}, "character_flag"),
      value: int_variable_field(),
    },
  ),
  clr_character_flag: value(
    { scope: [character(), unit_leader()] },
    "character_flag",
  ),
  activate_advisor: value({ scope: [country()] }, "advisor_token"),
  deactivate_advisor: value({ scope: [country()] }, "advisor_token"),
  add_trait: obj(
    { scope: [country(), character(), unit_leader()] },
    {
      character: either(
        typeRef({ cardinality: [0, 1] }, "character"),
        value({ cardinality: [0, 1] }, "character_token"),
        scopeRef({ cardinality: [0, 1] }, character()),
        value({ cardinality: [0, 1] }, "variable"),
        value({ cardinality: [0, 1] }, "event_target"),
        value({ cardinality: [0, 1] }, "global_event_target"),
      ),
      trait: either(
        typeRef({}, "country_leader_trait"),
        typeRef({}, "unit_leader_trait"),
      ),
      ideology: enumRef({ cardinality: [0, 1] }, "sub_ideology"),
      slot: value({ cardinality: [0, 1] }, "character_advisor_slot"),
    },
  ),
  remove_trait: obj(
    { scope: [country(), character(), unit_leader()] },
    {
      character: either(
        typeRef({ cardinality: [0, 1] }, "character"),
        value({ cardinality: [0, 1] }, "character_token"),
        scopeRef({ cardinality: [0, 1] }, character()),
        value({ cardinality: [0, 1] }, "variable"),
        value({ cardinality: [0, 1] }, "event_target"),
        value({ cardinality: [0, 1] }, "global_event_target"),
      ),
      trait: either(
        typeRef({}, "country_leader_trait"),
        typeRef({}, "unit_leader_trait"),
      ),
      ideology: enumRef({ cardinality: [0, 1] }, "sub_ideology"),
      slot: value({ cardinality: [0, 1] }, "character_advisor_slot"),
    },
  ),
  set_nationality: either(
    obj(
      { scope: [country(), character(), unit_leader(), operative()] },
      {
        target_country: either(
          scopeRef({}, country()),
          enumRef({}, "country_tags"),
        ),
        character: either(
          typeRef({}, "character"),
          value({}, "character_token"),
          value({}, "variable"),
          value({}, "event_target"),
          value({}, "global_event_target"),
          scopeRef({}, character()),
        ),
      },
    ),
    scopeRef({ scope: [character(), unit_leader(), operative()] }, country()),
    enumRef(
      { scope: [character(), unit_leader(), operative()] },
      "country_tags",
    ),
  ),
  every_subject_country: obj(
    { scope: [country()], push_scope: country() },
    {
      random_select_amount: int({ cardinality: [0, 1] }, 1, Infinity),
      display_individual_scopes: bool({ cardinality: [0, 1] }),
      limit: obj({ cardinality: [0, 1] }, { ...trigger }),
      tooltip: localisation({ cardinality: [0, 1] }),
      // ...effect,
    },
  ),
  random_subject_country: obj(
    { scope: [country()], push_scope: country() },
    {
      limit: obj({ cardinality: [0, 1] }, { ...trigger }),
      // ...effect,
    },
  ),
  every_possible_country: obj(
    { scope: [country()], push_scope: country() },
    {
      random_select_amount: int({ cardinality: [0, 1] }, 1, Infinity),
      display_individual_scopes: bool({ cardinality: [0, 1] }),
      limit: obj({ cardinality: [0, 1] }, { ...trigger }),
      tooltip: localisation({ cardinality: [0, 1] }),
      // ...effect,
    },
  ),
  character_list_tooltip: obj(
    { scope: [country()], push_scope: character() },
    {
      limit: obj({ cardinality: [0, 1] }, { ...trigger }),
    },
  ),
  set_portraits: obj(
    { scope: [character(), country(), unit_leader()] },
    {
      character: either(
        typeRef({ cardinality: [0, 1] }, "character"),
        value({ cardinality: [0, 1] }, "character_token"),
        value({ cardinality: [0, 1] }, "variable"),
        value({ cardinality: [0, 1] }, "event_target"),
        value({ cardinality: [0, 1] }, "global_event_target"),
        scopeRef({ cardinality: [0, 1] }, character()),
      ),
      [enumRefKey("character_portrait_types")]: array({ cardinality: [0, 1] }, [
        obj(
          { cardinality: [1, 2] },
          {
            [enumRefKey("character_portrait_sizes")]: scalar(),
          },
        ),
      ]),
    },
  ),
  recruit_character: either(
    typeRef({ scope: [country()] }, "character"),
    value({ scope: [country()] }, "variable"),
    value({ scope: [country()] }, "event_target"),
    value({ scope: [country()] }, "global_event_target"),
    scopeRef({ scope: [country()] }, character()),
  ),
  remove_ideas: either(
    value({ scope: [country()] }, "variable"),
    value({ scope: [country()] }, "advisor_token"),
  ),
  add_ideas: either(
    value({ scope: [country()] }, "variable"),
    value({ scope: [country()] }, "advisor_token"),
  ),
  damage_units: obj(
    { scope: [country(), state(), unit_leader()] },
    {
      province: enumRef({ cardinality: [0, 1] }, "provinces"),
      state: either(
        typeRef({ cardinality: [0, 1] }, "state"),
        scopeRef({ cardinality: [0, 1] }, state()),
      ),
      region: typeRef({ cardinality: [0, 1] }, "strategic_region"),
      limit: obj(
        { cardinality: [0, 1], replace_scope: { this: country() } },
        { ...trigger },
      ),
      damage: float({ cardinality: [0, 1] }),
      org_damage: float({ cardinality: [0, 1] }),
      str_damage: float({ cardinality: [0, 1] }),
      ratio: bool({ cardinality: [0, 1] }),
      template: localisation_inline({ cardinality: [0, 1] }),
      army: bool({ cardinality: [0, 1] }),
      navy: bool({ cardinality: [0, 1] }),
    },
  ),
  force_update_map_mode: obj(
    { scope: [country()] },
    {
      mapmode: array({ cardinality: [1, 2] }, [
        typeRef({}, "scripted_map_modes"),
      ]),
    },
  ),
  create_railway_gun: obj(
    {},
    {
      equipment: typeRef({}, "equipment.railway_gun"),
      name: localisation_inline({ cardinality: [0, 1] }),
      location: enumRef({ cardinality: [0, 1] }, "provinces"),
    },
  ),
  generate_character: obj(
    { scope: [country()] },
    {
      token_base: value_set({}, "character_token"),
      name: localisation({ cardinality: [0, 1] }),
      advisor: obj(
        { cardinality: [0, 1] },
        {
          slot: value({}, "character_advisor_slot"),
          name: localisation({ cardinality: [0, 1] }),
          desc: localisation({ cardinality: [0, 1] }),
          idea_token: value_set({}, "advisor_token"),
          allowed: obj(
            {
              cardinality: [0, 1],
              replace_scope: { this: character(), root: country() },
            },
            { ...trigger },
          ),
          visible: obj(
            {
              cardinality: [0, 1],
              replace_scope: { this: character(), root: country() },
            },
            { ...trigger },
          ),
          available: obj(
            {
              cardinality: [0, 1],
              replace_scope: { this: character(), root: country() },
            },
            { ...trigger },
          ),
          traits: array({ cardinality: [0, 1] }, [
            typeRef({ cardinality: [0, Infinity] }, "country_leader_trait"),
          ]),
          research_bonus: obj(
            { cardinality: [0, 1] },
            {
              [enumRefKey("tech_category")]: float({
                cardinality: [1, Infinity],
              }),
            },
          ),
          ledger: enumRef({ cardinality: [0, 1] }, "ledgers"),
          cost: int({ cardinality: [0, 1] }),
          removal_cost: int({ cardinality: [0, 1] }),
          ai_will_do: obj(
            {
              cardinality: [0, 1],
              replace_scope: { this: character(), root: country() },
            },
            {
              [enumRefKey("base_factor")]: variable_field(),
              ...modifier_rule,
            },
          ),
          //   on_add: array(
          //     {
          //       cardinality: [0, 1],
          //       replace_scope: { this: character(), root: country() },
          //     },
          //     [{ ...effect }],
          //   ),
          //   on_remove: array(
          //     {
          //       cardinality: [0, 1],
          //       replace_scope: { this: character(), root: country() },
          //     },
          //     [{ ...effect }],
          //   ),
          do_effect: obj(
            {
              cardinality: [0, 1],
              replace_scope: { this: character(), root: country() },
            },
            { ...trigger },
          ),
          modifier: obj(
            {
              cardinality: [0, 1],
              replace_scope: { this: character(), root: country() },
            },
            { ...modifier },
          ),
          can_be_fired: bool({ cardinality: [0, 1] }),
        },
      ),
      portraits: array({ cardinality: [0, 1] }, [
        obj(
          { cardinality: [1, 3] },
          {
            [enumRefKey("character_portrait_types")]: obj(
              { cardinality: [1, 2] },
              {
                [enumRefKey("character_portrait_sizes")]: scalar(),
              },
            ),
          },
        ),
      ]),
    },
  ),
  create_entity: obj(
    {},
    {
      entity: typeRef({}, "entity"),
      id: value_set({ cardinality: [0, 1] }, "entity_id"),
      var: value_set({ cardinality: [0, 1] }, "variable"),
      x: float(),
      y: float(),
      z: float({ cardinality: [0, 1] }),
      province: enumRef({}, "provinces"),
      state: typeRef({}, "state"),
      rotation: float(),
      scale: float(),
      min_zoom: float(),
      visible: typeRef({ cardinality: [0, 1] }, "scripted_trigger"),
    },
  ),
  destroy_entity: value({}, "entity_id"),
  set_entity_movement: obj(
    {},
    {
      id: value({}, "entity_id"),
      start: obj(
        {},
        {
          x: float(),
          y: float(),
          z: float({ cardinality: [0, 1] }),
        },
      ),
      target: obj(
        {},
        {
          province: enumRef({}, "provinces"),
        },
      ),
      ratio: float(),
      rotation: float(),
    },
  ),
  set_entity_position: obj(
    {},
    {
      id: value({}, "entity_id"),
      x: float(),
      y: float(),
      z: float({ cardinality: [0, 1] }),
      province: enumRef({}, "provinces"),
      state: typeRef({}, "state"),
    },
  ),
  set_entity_rotation: obj(
    {},
    {
      id: value({}, "entity_id"),
      rotation: float(),
    },
  ),
  set_entity_scale: obj(
    {},
    {
      id: value({}, "entity_id"),
      scale: float(),
    },
  ),
  set_entity_animation: obj(
    {},
    {
      id: value({}, "entity_id"),
      animation: typeRef({}, "model_animation"),
    },
  ),
  get_supply_vehicles: obj(
    { scope: [country()] },
    {
      var: value_set({}, "variable"),
      type: either(literal("truck"), literal("train")),
      need: bool({ cardinality: [0, 1] }, true),
    },
  ),
  get_supply_vehicles_temp: obj(
    { scope: [country()] },
    {
      var: value_set({}, "variable"),
      type: either(literal("truck"), literal("train")),
      need: bool({ cardinality: [0, 1] }, true),
    },
  ),
  party_leader: obj(
    { scope: [country()], push_scope: character() },
    {
      tooltip: localisation({ cardinality: [0, 1] }),
      limit: obj(
        { cardinality: [0, 1] },
        {
          has_ideology: enumRef({}, "sub_ideology"),
        },
      ),
      // ...effect,
    },
  ),
  teleport_railway_guns_to_deploy_province: scopeRef(
    { scope: [country()] },
    country(),
  ),
};
