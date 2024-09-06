import { modifier_rule } from "../modifier_rule";
import { trigger } from "../triggers";
import {
  root,
  typeDefKey,
  obj,
  either,
  array,
  bool,
  scalar,
  localisation,
  typeRef,
  float,
  enumRefKey,
  int,
  enumRef,
  valueRef,
  variable_field,
  scopeRef,
} from "../utils";

const ai_strategy = obj(
  {},
  {
    allowed: obj({ cardinality: [0, 1] }, { ...trigger }),
    target_array: either(
      valueRef({ cardinality: [0, 1] }, "array"),
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
    ...ai_strategy_rule,
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
    ai_national_focuses: array({ cardinality: [0, 1] }, [
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
    ...ai_strategy_rule,
    weight: obj(
      { cardinality: [0, 1] },
      {
        [enumRefKey("base_factor")]: float({ cardinality: [0, 1] }),
        ...modifier_rule,
      },
    ),
  },
);

const ai_strategy_rule = {
  ai_strategy: obj(
    { cardinality: [0, Infinity] },
    {
      type: enumRef({}, "ai_role_strats"),
      id: either(
        valueRef({ cardinality: [0, Infinity] }, "ai_template_roles"),
        valueRef({ cardinality: [0, Infinity] }, "ai_equipment_roles"),
        typeRef({}, "unit"),
      ),
      value: int({ cardinality: [0, Infinity] }),
    },
  ),
};

const enums = {
  ai_diplo_strats: [
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
  ],
  equipment_strats: [
    "equipment_variant_production_factor",
    "save_equipment",
    "production_upgrade_desire_offset",
    "equipment_production_surplus_management",
    "equipment_market_buying_threshold",
    "equipment_market_for_sale_threshold",
    "equipment_market_for_sale_factor",
    "equipment_market_min_for_sale",
    "equipment_market_max_for_sale",
  ],
  no_id_strats: [
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
  ],
  pp_strats: ["pp_spend_amount", "pp_spend_priority"],
  pp_targets: [
    "admiral",
    "general",
    "idea",
    "decision",
    "relation",
    "guarantee",
  ],
  ai_xp_targets: ["division_template", "upgrade_xp_cutoff"],
  unit_strats: [
    "equipment_production_factor",
    "equipment_production_min_factories",
    "template_prio",
    "unit_ratio",
  ],
  strat_region_strats: [
    "naval_convoy_raid_region",
    "naval_avoid_region",
    "strategic_air_importance",
    "strike_force_home_base",
  ],
  strat_region_strats_without_value: ["strike_force_home_base"],
  state_strats: [
    "theatre_distribution_demand_increase",
    "factory_build_score_factor",
  ],
  state_strats_with_id: ["build_building"],
  naval_mission_strats: ["naval_mission_threshold"],
  ai_role_strats: ["role_ratio", "build_army", "build_airplane"],
  building_strats: ["building_target"],
  ordertypes: ["front", "invasion"],
  execution_types: ["careful", "balanced", "rush", "rush_weak"],
  unit_requests: ["front_unit_request", "invasion_unit_request"],
  intel_branches: [
    "branch_intelligence",
    "branch_defense",
    "branch_operation",
    "branch_operative",
    "branch_crypto",
  ],
  operative_missions: [
    "build_intel_network",
    "counter_intelligence",
    "quiet_network",
    "boost_ideology",
    "propaganda",
    "root_out_resistance",
    "control_trade",
    "diplomatic_pressure",
    "no_mission",
  ],
  diplo_action_strats: ["diplo_action_desire", "diplo_action_acceptance"],
  market_seller_strats: ["equipment_market_buy"],
  research_strats: ["research_tech", "research_weight_factor"],
};

export const aiStrategyType = root(
  { path: "game/common/ai_strategy", path_strict: true },
  {
    [typeDefKey("ai_strategy")]: ai_strategy,
  },
);

export const aiStrategyPlanType = root(
  { path: "game/common/ai_strategy_plans" },
  {
    [typeDefKey("ai_strategy_plan")]: ai_strategy_plan,
  },
);
