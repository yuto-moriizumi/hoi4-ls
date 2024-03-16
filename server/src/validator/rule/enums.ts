export const unit_types = [
  "infantry",
  "support",
  "artillery",
  "rocket",
  "anti_tank",
  "anti_air",
  "motorized",
  "cavalry",
  "mechanized",
  "armor",
  "fighter",
  "cas",
  "naval_bomber",
  "interceptor",
  "suicide",
  "tactical_bomber",
  "strategic_bomber",
  "air_transport",
  "missile",
  "submarine",
  "screen_ship",
  "capital_ship",
  "carrier",
  "convoy",
  "paratroopers",
  "scout_plane",
  "floating_harbor",
  "railway_gun",
  "train",
  "flame",
  "maritime_patrol_plane",
  "cv_naval_bomber",
  "cv_cas",
  "cv_fighter",
  "cv_interceptor",
  "heavy_fighter",
  "amphibious",
];

export const ai_diplo_strats = [
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

export const equipment_strats = [
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

export const no_id_strats = [
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
  "equipment_market_spend_factories",
];

export const pp_strats = ["pp_spend_amount", "pp_spend_priority"];

export const pp_targets = [
  "admiral",
  "general",
  "idea",
  "decision",
  "relation",
  "guarantee",
];

export const ai_xp_targets = ["division_template", "upgrade_xp_cutoff"];

export const unit_strats = [
  "equipment_production_factor",
  "equipment_production_min_factories",
  "template_prio",
  "unit_ratio",
];

export const strat_region_strats = [
  "naval_convoy_raid_region",
  "naval_avoid_region",
  "strategic_air_importance",
  "strike_force_home_base",
];

export const strat_region_strats_without_value = ["strike_force_home_base"];

export const state_strats = [
  "theatre_distribution_demand_increase",
  "factory_build_score_factor",
];

export const state_strats_with_id = ["build_building"];

export const naval_mission_strats = ["naval_mission_threshold"];

export const ai_role_strats = ["role_ratio", "build_army", "build_airplane"];

export const building_strats = ["building_target"];

export const ordertypes = ["front", "invasion"];

export const execution_types = ["careful", "balanced", "rush", "rush_weak"];

export const unit_requests = ["front_unit_request", "invasion_unit_request"];

export const intel_branches = [
  "branch_intelligence",
  "branch_defense",
  "branch_operation",
  "branch_operative",
  "branch_crypto",
];

export const operative_missions = [
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

export const diplo_action_strats = [
  "diplo_action_desire",
  "diplo_action_acceptance",
];

export const market_seller_strats = ["equipment_market_buy"];

export const research_strats = ["research_tech", "research_weight_factor"];

export const base_factor = ["base", "factor"];

export const add_factor = ["add", "factor"];

export const air_units = [
  "air_transport",
  "cas",
  "fighter",
  "interceptor",
  "missile",
  "naval_bomber",
  "scout_plane",
  "strategic_bomber",
  "suicide",
  "tactical_bomber",
  "maritime_patrol_plane",
  "heavy_fighter",
];

export const ledgers = [
  "army",
  "navy",
  "air",
  "military",
  "invalid",
  "civilian",
  "hidden",
  "all",
];

export const ai_research_areas = [
  "defensive",
  "offensive",
  "carrier",
  "battleship",
  "cruiser",
];

export const character_ids = ["id", "legacy_id"];
export const character_portrait_types = ["civilian", "army", "navy"];
export const character_portrait_sizes = ["large", "small"];
