import { modifier_rule } from "../modifier_rule";
import { modifier } from "../modifiers";
import {
  unit_stat,
  naval_stat,
  air_stat,
  targeted_modifier_rule,
  unit_leader_modifier,
} from "../temp_modifiers";
import { trigger } from "../triggers";
import { Scope } from "../types";
import {
  root,
  obj,
  typeDefKey,
  either,
  array,
  value,
  country,
  localisation,
  bool,
  int,
  enumRefKey,
  float,
  enumRef,
  unit_leader,
  combat,
  typeRef,
  typeRefKey,
} from "../utils";
import { ai_strategy_rule } from "./ai_strategy";

const country_leader_trait = obj(
  { push_scope: country() },
  {
    name: localisation({ cardinality: [0, 1] }),
    random: bool({ cardinality: [0, 1] }),
    sprite: int({ cardinality: [0, 1] }),
    ...modifier,
    equipment_bonus: obj(
      { cardinality: [0, 1] },
      {
        [enumRefKey("equipment_bonus_type")]: obj(
          { cardinality: [0, Infinity] },
          {
            instant: bool({ cardinality: [0, 1] }),
            ...unit_stat,
            ...naval_stat,
            ...air_stat,
          },
        ),
      },
    ),
    ...targeted_modifier_rule,
    ai_strategy_rule,
    ai_will_do: obj(
      {
        cardinality: [0, 1],
        replace_scope: { root: country(), this: country() },
      },
      {
        [enumRefKey("base_factor")]: float({ cardinality: [0, 1] }),
        ...modifier_rule,
      },
    ),
    command_cap: enumRef({ cardinality: [0, 1] }, "command_cap"),
  },
);

export const countryLeaderTraitType = root(
  { path: "/common/country_leader" },
  {
    leader_traits: obj(
      {},
      {
        [typeDefKey("country_leader_trait")]: country_leader_trait,
      },
    ),
  },
);

const unit_leader_trait = obj(
  { push_scope: unit_leader() },
  {
    type: either(
      enumRef({ cardinality: [1, Infinity] }, "unit_leader_types"),
      array({ cardinality: [1, Infinity] }, [
        enumRef({ cardinality: [1, Infinity] }, "unit_leader_types"),
      ]),
    ),
    trait_type: enumRef({ cardinality: [0, 1] }, "trait_types"),
    [enumRefKey("land_commander")]: obj(
      {},
      {
        [enumRefKey("unit_leader_skills")]: int({ cardinality: [0, 4] }),
        [enumRefKey("army_leader_skill_factors")]: int({ cardinality: [0, 4] }),
      },
    ),
    [enumRefKey("land_naval_commander")]: obj(
      {},
      {
        [enumRefKey("army_leader_skill_factors")]: int({ cardinality: [0, 4] }),
        [enumRefKey("naval_leader_skill_factors")]: int({
          cardinality: [0, 4],
        }),
      },
    ),
    [enumRefKey("naval_commander")]: obj(
      {},
      {
        gain_xp_on_spotting: int({ cardinality: [0, 1] }),
        sub_unit_modifiers: obj(
          { cardinality: [1, Infinity] },
          {
            ...unit_stat,
            ...naval_stat,
            ...air_stat,
          },
        ),
        [enumRefKey("naval_leader_skill_factors")]: int({
          cardinality: [0, 4],
        }),
      },
    ),
    [enumRefKey("gainable_trait")]: obj(
      {},
      {
        gain_xp: obj(
          { replace_scope: { this: combat(), root: combat(), from: combat() } },
          { ...trigger },
        ),
        gain_xp_leader: obj(
          {
            replace_scope: {
              this: unit_leader(),
              root: unit_leader(),
              from: country(),
            },
          },
          { ...trigger },
        ),
        cost: int(),
        gui_row: int(),
        gui_column: int({ cardinality: [0, 1] }),
        custom_gain_xp_trigger_tooltip: localisation({ cardinality: [0, 1] }),
      },
    ),
    [enumRefKey("assignable_trait")]: obj(
      {},
      {
        gui_row: int(),
        gui_column: int({ cardinality: [0, 1] }),
        parent: typeRef({ cardinality: [0, 5] }, "unit_leader_trait"),
        mutually_exclusive: typeRef(
          { cardinality: [0, 5] },
          "unit_leader_trait",
        ),
        prerequisites: obj({ cardinality: [0, 1] }, { ...trigger }),
        custom_prerequisite_tooltip: localisation({ cardinality: [0, 1] }),
        num_parents_needed: int({ cardinality: [0, 1] }),
      },
    ),
    [enumRefKey("military_advisor_trait")]: obj(
      {},
      {
        slot: value({}, "character_advisor_slot"),
        specialist_advisor_trait: typeRef({}, "country_leader_trait"),
        expert_advisor_trait: typeRef({}, "country_leader_trait"),
        genius_advisor_trait: typeRef({}, "country_leader_trait"),
      },
    ),
    field_marshal_modifier: obj(
      { cardinality: [0, 1] },
      {
        ...modifier,
        ...unit_leader_modifier,
      },
    ),
    corps_commander_modifier: obj(
      { cardinality: [0, 1] },
      {
        ...modifier,
        ...unit_leader_modifier,
      },
    ),
    custom_effect_tooltip: localisation({ cardinality: [0, 1] }),
    override_effect_tooltip: localisation({ cardinality: [0, 1] }),
    allowed: obj({ cardinality: [0, 1] }, { ...trigger }),
    modifier: obj(
      {
        cardinality: [0, 1],
        replace_scope: { root: unit_leader(), this: unit_leader() },
      },
      {
        ...modifier,
        ...unit_leader_modifier,
      },
    ),
    non_shared_modifier: obj(
      {
        cardinality: [0, 1],
        replace_scope: { root: unit_leader(), this: unit_leader() },
      },
      {
        ...modifier,
        ...unit_leader_modifier,
      },
    ),
    enable_ability: typeRef({ cardinality: [0, 5] }, "ability"),
    new_commander_weight: obj(
      { cardinality: [0, 1] },
      {
        [enumRefKey("base_factor")]: float({ cardinality: [0, 1] }),
        ...modifier_rule,
      },
    ),
    trait_xp_factor: obj(
      { cardinality: [0, 1] },
      {
        [typeRefKey("unit_leader_trait")]: float({
          cardinality: [1, Infinity],
        }),
      },
    ),
    ai_will_do: obj(
      { cardinality: [0, 1] },
      {
        [enumRefKey("base_factor")]: float({ cardinality: [0, 1] }),
        ...modifier_rule,
      },
    ),
    unit_trigger: obj(
      { cardinality: [0, 1], push_scope: Scope.UNIT },
      { ...trigger },
    ),
    unit_type: obj(
      { cardinality: [0, 1] },
      {
        type: typeRef({ cardinality: [1, Infinity] }, "unit"),
      },
    ),
    any_parent: array({ cardinality: [0, 1] }, [
      typeRef({ cardinality: [1, Infinity] }, "unit_leader_trait"),
    ]),
    parent: obj(
      { cardinality: [0, 1] },
      {
        traits: array({ cardinality: [1, Infinity] }, [
          typeRef({ cardinality: [1, Infinity] }, "unit_leader_trait"),
        ]),
        num_parents_needed: int({ cardinality: [1, 100] }),
      },
    ),
  },
);

export const unitLeaderTraitType = root(
  { path: "/common/unit_leader" },
  {
    unit_leader_trait,
    // leader_traits: either(
    //   obj({}, { type: literal("corps_commander") }),
    //   obj({}, { type: literal("field_marshal") }),
    //   obj({}, { type: literal("navy") }),
    //   obj({}, { type: array({}, [literal("navy")]) }),
    //   obj({}, { type: literal("land") }),
    //   obj({}, { type: array({}, [literal("land")]) }),
    //   obj({}, { type: array({}, [literal("land"), literal("navy")]) }),
    //   obj(
    //     {},
    //     {
    //       trait_type: either(
    //         literal("assignable_trait"),
    //         literal("assignable_terrain_trait"),
    //       ),
    //     },
    //   ),
    //   obj({}, { gain_xp: array({}, []) }),
    //   obj({}, { gain_xp_leader: array({}, []) }),
    //   obj({}, { slot: value({}, "character_advisor_slot") }),
    // ),
  },
);

export const unit_leader_skills = [
  "attack_skill",
  "defense_skill",
  "logistics_skill",
  "planning_skill",
];

export const army_leader_skill_factors = [
  "attack_skill_factor",
  "defense_skill_factor",
  "logistics_skill_factor",
  "planning_skill_factor",
];

export const naval_leader_skill_factors = [
  "attack_skill_factor",
  "coordination_skill_factor",
  "maneuvering_skill_factor",
  "planning_skill_factor",
];

export const unit_leader_types = [
  "all",
  "corps_commander",
  "field_marshal",
  "navy",
  "land",
  "operative",
];

export const trait_types = [
  "assignable_terrain_trait",
  "basic_terrain_trait",
  "personality_trait",
  "assignable_trait",
  "status_trait",
  "exile",
  "basic_trait",
];

export const combat_modifiers = [
  "fort_attack",
  "river_crossing",
  "amphibious_attack",
  "paradrop",
];
