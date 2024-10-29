import { modifier_rule } from "../modifier_rule";
import { trigger } from "../triggers";
import {
  obj,
  either,
  variable_field,
  array,
  scopeRef,
  bool,
  scalar,
  localisation,
  typeRef,
  float,
  enumRefKey,
  int,
  enumRef,
  literal,
  state,
  country,
  root,
  typeDefKey,
  typeRefKey,
  value,
  valueRefKey,
} from "../utils";

export const aiDiploStrats = [
  "alliance",
  "antagonize",
  "avoid_starting_wars",
  "asking_foreign_garrison",
  "befriend",
  "conquer",
  "consider_weak",
  "contain",
  "declare_war",
  "diplo_action_acceptance",
  "diplo_action_desire",
  "dont_defend_ally_borders",
  "dont_join_wars_with",
  "equipment_market_trade_desire",
  "force_defend_ally_borders",
  "front_armor_score",
  "ignore",
  "ignore_claim",
  "influence",
  "invade",
  "occupation_policy",
  "prepare_for_war",
  "protect",
  "send_lend_lease_desire",
  "send_volunteers_desire",
  "support",
];

export const equipmentStrats = [
  "equipment_variant_production_factor",
  "save_equipment",
  "production_upgrade_desire_offset",
  "equipment_production_surplus_management",
  "equipment_market_buying_threshold",
  "equipment_market_for_sale_threshold",
  "equipment_market_for_sale_factor",
  "equipment_market_min_for_sale",
  "equipment_market_max_for_sale",
];

export const noIdStrats = [
  "added_military_to_civilian_factory_ratio",
  "air_factory_balance",
  "dockyard_to_military_factory_ratio",
  "equipment_stockpile_surplus_ratio",
  "ignore_army_incompetence",
  "spare_unit_factor",
  "template_xp_reserve",
  "force_build_armies",
  "garrison",
  "produce_unit_for_subject_supply_chunks",
  "intelligence_agency_usable_factories",
  "agency_ai_base_num_factories_factor",
  "agency_ai_per_upgrade_factories_factor",
  "garrison_reinforcement_priority",
  "operation_equipment_priority",
  "railway_gun_divisions_ratio",
  "naval_invasion_focus",
  "naval_invasion_supremacy_weight",
  "avoid_starting_wars",
  "min_wanted_supply_trucks",
  "wanted_supply_trucks",
  "min_wanted_supply_trains",
  "wanted_supply_trains",
  "ai_wanted_divisions_factor",
  "equipment_market_spend_factories",
];

export const ppStrats = ["pp_spend_amount", "pp_spend_priority"];

export const ppTargets = [
  "admiral",
  "general",
  "idea",
  "decision",
  "relation",
  "guarantee",
];

export const aiXpTargets = ["division_template", "upgrade_xp_cutoff"];

export const unitStrats = [
  "equipment_production_factor",
  "equipment_production_min_factories",
  "template_prio",
  "unit_ratio",
];

export const stratRegionStrats = [
  "naval_convoy_raid_region",
  "naval_avoid_region",
  "strategic_air_importance",
  "strike_force_home_base",
];

export const stratRegionStratsWithoutValue = ["strike_force_home_base"];

export const stateStrats = [
  "theatre_distribution_demand_increase",
  "factory_build_score_factor",
];

export const stateStratsWithId = ["build_building"];

export const navalMissionStrats = ["naval_mission_threshold"];

export const aiRoleStrats = ["role_ratio", "build_army", "build_airplane"];

export const buildingStrats = ["building_target"];

export const ordertypes = ["front", "invasion"];

export const executionTypes = ["careful", "balanced", "rush", "rush_weak"];

export const unitRequests = ["front_unit_request", "invasion_unit_request"];

export const intelBranches = [
  "branch_intelligence",
  "branch_defense",
  "branch_operation",
  "branch_operative",
  "branch_crypto",
];

export const operativeMissions = [
  "build_intel_network",
  "counter_intelligence",
  "quiet_network",
  "boost_ideology",
  "propaganda",
  "root_out_resistance",
  "control_trade",
  "diplomatic_pressure",
  "no_mission",
];

export const diploActionStrats = [
  "diplo_action_desire",
  "diplo_action_acceptance",
];

export const marketSellerStrats = ["equipment_market_buy"];

export const researchStrats = ["research_tech", "research_weight_factor"];

export const ai_strategy_rule = either(
  obj(
    { cardinality: [0, Infinity] },
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
    { cardinality: [0, Infinity] },
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
    { cardinality: [0, Infinity] },
    {
      type: enumRef({}, "equipment_strats"),
      id: either(typeRef({}, "equipment"), enumRef({}, "unit_types")),
      value: int(),
    },
  ),
  obj(
    { cardinality: [0, Infinity] },
    {
      type: enumRef({}, "pp_strats"),
      id: enumRef({}, "pp_targets"),
      value: int(),
    },
  ),
  obj(
    { cardinality: [0, Infinity] },
    {
      type: literal("land_xp_spend_priority"),
      id: enumRef({}, "ai_xp_targets"),
      value: int(),
    },
  ),
  obj(
    { cardinality: [0, Infinity] },
    {
      type: literal("air_xp_spend_priority"),
      id: enumRef({}, "ai_xp_targets"),
      value: int(),
    },
  ),
  obj(
    { cardinality: [0, Infinity] },
    {
      type: literal("navy_xp_spend_priority"),
      id: enumRef({}, "ai_xp_targets"),
      value: int(),
    },
  ),
  obj(
    { cardinality: [0, Infinity] },
    {
      type: literal("area_priority"),
      id: typeRef({}, "ai_area"),
      value: int(),
    },
  ),
  obj(
    { cardinality: [0, Infinity] },
    {
      type: enumRef({}, "ai_diplo_strats"),
      id: either(enumRef({}, "country_tags"), scopeRef({}, "country")),
      value: int(),
    },
  ),
  obj(
    { cardinality: [0, Infinity] },
    {
      type: enumRef({}, "ai_diplo_strats"),
      target: typeRef({}, "ai_area"),
      value: int(),
    },
  ),
  obj(
    { cardinality: [0, Infinity] },
    {
      type: literal("dont_join_wars_with"),
      id: either(enumRef({}, "country_tags"), scopeRef({}, "country")),
      target_country: either(
        enumRef({ cardinality: [0, 1] }, "country_tags"),
        scopeRef({ cardinality: [0, 1] }, "country"),
      ),
      value: int(),
    },
  ),
  obj(
    { cardinality: [0, Infinity] },
    {
      type: enumRef({}, "strat_region_strats"),
      id: typeRef({}, "strategic_region"),
      value: int(),
    },
  ),
  obj(
    { cardinality: [0, Infinity] },
    {
      type: enumRef({}, "strat_region_strats_without_value"),
      id: typeRef({}, "strategic_region"),
    },
  ),
  obj(
    { cardinality: [0, Infinity] },
    {
      type: enumRef({}, "no_id_strats"),
      value: int(),
    },
  ),
  obj(
    { cardinality: [0, Infinity] },
    {
      type: enumRef({}, "state_strats"),
      target: typeRef({}, "state"),
      value: int(),
    },
  ),
  obj(
    { cardinality: [0, Infinity] },
    {
      type: enumRef({}, "state_strats"),
      id: typeRef({}, "state"),
      value: int(),
    },
  ),
  obj(
    { cardinality: [0, Infinity] },
    {
      type: enumRef({}, "state_strats_with_id"),
      id: typeRef({}, "building"),
      target: int(),
      value: int(),
    },
  ),
  obj(
    { cardinality: [0, Infinity] },
    {
      type: enumRef({}, "diplo_action_strats"),
      id: either(scopeRef({}, "country"), enumRef({}, "country_tags")),
      target: enumRef({}, "diplomatic_relations"),
      value: int(),
    },
  ),
  obj(
    { cardinality: [0, Infinity] },
    {
      type: enumRef({}, "naval_mission_strats"),
      id: enumRef({}, "naval_missions"),
      value: int(),
    },
  ),
  obj(
    { cardinality: [0, Infinity] },
    {
      type: enumRef({}, "building_strats"),
      id: typeRef({}, "building"),
      value: int(),
    },
  ),
  obj(
    { cardinality: [0, Infinity] },
    {
      type: enumRef({}, "research_strats"),
      id: either(typeRef({}, "technology"), int()),
      value: int(),
    },
  ),
  obj(
    { cardinality: [0, Infinity] },
    {
      type: literal("scorched_earth_prio"),
      id: scopeRef({}, "country"),
      states: array({ cardinality: [0, 1] }, [
        int({ cardinality: [1, Infinity] }),
      ]),
    },
  ),
  obj(
    { cardinality: [0, Infinity] },
    {
      type: literal("put_unit_buffers"),
      ratio: float({ cardinality: [0, 1] }, 0, 1),
      order_id: int({ cardinality: [0, 1] }),
      states: array({ cardinality: [0, 1] }, [
        int({ cardinality: [1, Infinity] }),
      ]),
      area: array({ cardinality: [0, Infinity] }, [typeRef({}, "ai_area")]),
      subtract_invasions_from_need: bool({ cardinality: [0, Infinity] }),
      subtract_fronts_from_need: bool({ cardinality: [0, Infinity] }),
    },
  ),
  obj(
    { cardinality: [0, Infinity] },
    {
      type: literal("front_control"),
      tag: array({ cardinality: [0, Infinity] }, [scopeRef({}, "country")]),
      state: array({ cardinality: [0, Infinity] }, [int()]),
      area: array({ cardinality: [0, Infinity] }, [typeRef({}, "ai_area")]),
      strategic_region: array({ cardinality: [0, Infinity] }, [
        typeRef({}, "strategic_region"),
      ]),
      country_trigger: obj({ cardinality: [0, 1] }, { ...trigger }),
      state_trigger: obj(
        {
          replace_scope: {
            this: state(),
            from: country(),
            fromfrom: country(),
          },
          cardinality: [0, 1],
        },
        { ...trigger },
      ),
      ratio: float({ cardinality: [0, 1] }, 0, 1),
      priority: int({ cardinality: [0, 1] }),
      ordertype: enumRef({ cardinality: [0, 1] }, "ordertypes"),
      execution_type: enumRef({ cardinality: [0, 1] }, "execution_types"),
      execute_order: bool({ cardinality: [0, 1] }),
      manual_attack: bool({ cardinality: [0, 1] }),
    },
  ),
  obj(
    { cardinality: [0, Infinity] },
    {
      type: enumRef({}, "unit_requests"),
      tag: array({ cardinality: [0, Infinity] }, [scopeRef({}, "country")]),
      state: array({ cardinality: [0, Infinity] }, [int()]),
      strategic_region: array({ cardinality: [0, Infinity] }, [
        typeRef({}, "strategic_region"),
      ]),
      area: array({ cardinality: [0, Infinity] }, [typeRef({}, "ai_area")]),
      country_trigger: obj({ cardinality: [0, 1] }, { ...trigger }),
      state_trigger: obj(
        {
          replace_scope: {
            this: state(),
            from: country(),
            fromfrom: country(),
          },
          cardinality: [0, 1],
        },
        { ...trigger },
      ),
      value: int(),
    },
  ),
  obj(
    { cardinality: [0, Infinity] },
    {
      type: literal("intelligence_agency_branch_desire_factor"),
      id: enumRef({}, "intel_branches"),
      value: int(),
    },
  ),
  obj(
    { cardinality: [0, Infinity] },
    {
      type: literal("asking_foreign_garrison"),
      value: int(),
      id: scopeRef({ cardinality: [0, 1] }, "country"),
    },
  ),
  obj(
    { cardinality: [0, Infinity] },
    {
      type: literal("operative_mission"),
      mission: enumRef({}, "operative_missions"),
      value: int(),
      mission_target: scopeRef({ cardinality: [0, 1] }, "country"),
      state: array({ cardinality: [0, Infinity] }, [int()]),
      priority: int({ cardinality: [0, 1] }),
      num_operatives: int({ cardinality: [0, 1] }, 1, Infinity),
    },
  ),
  obj(
    { cardinality: [0, Infinity] },
    {
      type: literal("operative_operation"),
      operation: either(typeRef({}, "operation"), ...variable_field()),
      value: int(),
      operation_target: either(scopeRef({}, "country"), ...variable_field()),
    },
  ),
  obj(
    { cardinality: [0, Infinity] },
    {
      type: enumRef({}, "market_seller_strats"),
      equipment_type: typeRef({ cardinality: [0, 1] }, "equipment"),
      seller: either(
        scopeRef({ cardinality: [0, 1] }, "country"),
        enumRef({ cardinality: [0, 1] }, "country_tags"),
      ),
      value: int(),
    },
  ),
);

const ai_strategy = obj(
  {},
  {
    allowed: obj({ cardinality: [0, 1] }, { ...trigger }),
    target_array: either(
      value({ cardinality: [0, 1] }, "array"),
      ...variable_field({ cardinality: [0, 1] }),
    ),
    targets: array({ cardinality: [0, 1] }, [
      scopeRef({ cardinality: [1, Infinity] }, "country"),
    ]),
    enable_reverse: obj({ cardinality: [0, 1] }, { ...trigger }),
    enable: obj({ cardinality: [0, 1] }, { ...trigger }),
    abort: obj({ cardinality: [0, 1] }, { ...trigger }),
    abort_when_not_enabled: bool({ cardinality: [0, 1] }),
    reversed: bool({ cardinality: [0, 1] }),
    ai_strategy_rule,
  },
);

const ai_strategy_plan = obj(
  {},
  {
    name: scalar({ cardinality: [0, 1] }),
    desc: localisation({ cardinality: [0, 1] }),
    allowed: obj({ cardinality: [0, 1] }, { ...trigger }),
    enable: obj({}, { ...trigger }),
    abort: obj({ cardinality: [0, 1] }, { ...trigger }),
    ai_national_focuses: array({}, [
      typeRef({ cardinality: [0, Infinity] }, "focus"),
      typeRef({ cardinality: [0, Infinity] }, "shared_focus"),
    ]),
    focus_factors: obj(
      { cardinality: [0, 1] },
      {
        [typeRefKey("focus")]: float({ cardinality: [0, Infinity] }),
        [typeRefKey("shared_focus")]: float({ cardinality: [0, Infinity] }),
      },
    ),
    research: obj(
      { cardinality: [0, 1] },
      {
        [enumRefKey("tech_category")]: float({ cardinality: [1, Infinity] }),
      },
    ),
    ideas: obj(
      { cardinality: [0, 1] },
      {
        [enumRefKey("idea_name")]: int({ cardinality: [0, Infinity] }),
        [valueRefKey("advisor_token")]: int({ cardinality: [0, Infinity] }),
      },
    ),
    traits: obj(
      { cardinality: [0, 1] },
      {
        [typeRefKey("country_leader_trait")]: int({
          cardinality: [1, Infinity],
        }),
      },
    ),
    weight: obj(
      { cardinality: [0, 1] },
      {
        [enumRefKey("base_factor")]: float({ cardinality: [0, 1] }),
        ...modifier_rule,
      },
    ),
    ai_strategy_rule,
  },
);

export const aiStrategyType = root(
  { path: "/common/ai_strategy", path_strict: true },
  {
    [typeDefKey("ai_strategy")]: ai_strategy,
  },
);

export const aiStrategyPlanType = root(
  { path: "/common/ai_strategy_plans" },
  {
    [typeDefKey("ai_strategy_plan")]: ai_strategy_plan,
  },
);
