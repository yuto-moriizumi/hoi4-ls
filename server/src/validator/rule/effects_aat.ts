import { trigger } from "./triggers";
import { Entries, Scope } from "./types";
import {
  obj,
  country,
  military_industrial_organization,
  int,
  bool,
  localisation,
  either,
  value,
  variable_field,
  typeRef,
  enumRef,
  scalar,
  array,
  value_set,
  int_variable_field,
} from "./utils";

export const effect: Entries = {
  every_military_industrial_organization: obj(
    { scope: country(), push_scope: military_industrial_organization() },
    {
      random_select_amount: int({ cardinality: [0, 1] }, 1, Infinity),
      display_individual_scopes: bool({ cardinality: [0, 1] }),
      limit: obj({ cardinality: [0, 1] }, { ...trigger }),
      tooltip: localisation({ cardinality: [0, 1] }),
      //   ...effect,
    },
  ),
  unlock_mio_trait_tooltip: either(
    value({}, "mio_trait_token"),
    obj(
      { scope: military_industrial_organization() },
      {
        trait: value({}, "mio_trait_token"),
        show_modifiers: either(
          bool({ cardinality: [0, 1] }, true),
          bool({ cardinality: [0, 1] }, false),
        ),
      },
    ),
  ),
  add_mio_funds_gain_factor: variable_field(),
  add_mio_size: int_variable_field({}, 1, Infinity),
  add_mio_research_bonus: variable_field(),
  complete_mio_trait: either(
    value({}, "mio_trait_token"),
    obj(
      { scope: military_industrial_organization() },
      {
        trait: value({}, "mio_trait_token"),
        show_modifiers: either(
          bool({ cardinality: [0, 1] }, true),
          bool({ cardinality: [0, 1] }, false),
        ),
      },
    ),
  ),
  add_mio_design_team_assign_cost: variable_field(),
  set_mio_design_team_assign_cost: variable_field({}, 0, Infinity),
  add_mio_industrial_manufacturer_assign_cost: variable_field(),
  set_mio_industrial_manufacturer_assign_cost: variable_field({}, 0, Infinity),
  add_mio_design_team_change_cost: variable_field(),
  set_mio_design_team_change_cost: variable_field({}, 0, Infinity),
  add_mio_funds: variable_field(),
  set_mio_funds: variable_field(),
  set_mio_funds_gain_factor: variable_field({}, 0, Infinity),
  add_mio_size_up_requirement_factor: variable_field(),
  set_mio_size_up_requirement_factor: variable_field({}, 0, Infinity),
  unlock_military_industrial_organization_tooltip: either(
    typeRef({}, "military_industrial_organization"),
    value({}, "variable"),
  ),
  show_mio_tooltip: either(
    typeRef({}, "military_industrial_organization"),
    value({}, "variable"),
  ),
  unlock_mio_policy_tooltip: either(
    typeRef({}, "mio_policy"),
    obj(
      { scope: country() },
      {
        policy: typeRef({}, "mio_policy"),
        show_modifiers: either(
          bool({ cardinality: [0, 1] }, true),
          bool({ cardinality: [0, 1] }, false),
        ),
      },
    ),
  ),
  add_mio_policy_cost: obj(
    { scope: country() },
    {
      policy: typeRef({}, "mio_policy"),
      value: int_variable_field(),
    },
  ),
  set_mio_policy_cost: obj(
    { scope: country() },
    {
      policy: typeRef({}, "mio_policy"),
      value: int_variable_field({}, 0, Infinity),
    },
  ),
  add_mio_policy_cooldown: obj(
    { scope: country() },
    {
      policy: typeRef({}, "mio_policy"),
      value: int_variable_field(),
    },
  ),
  set_mio_policy_cooldown: obj(
    { scope: country() },
    {
      policy: typeRef({}, "mio_policy"),
      value: int_variable_field({}, 0, Infinity),
    },
  ),
  add_cic: variable_field(),
  add_equipment_subsidy: obj(
    { scope: country() },
    {
      cic: variable_field(),
      equipment_type: enumRef({}, "equipment_bonus_type"),
      seller_trigger: either(
        obj({ cardinality: [1, Infinity] }, { ...trigger }),
        scalar({ cardinality: [0, 1] }),
      ),
      seller_tags: array({ cardinality: [0, Infinity] }, [
        enumRef({}, "country_tags"),
        typeRef({}, "country"),
      ]),
    },
  ),
  set_mio_name_key: either(localisation(), typeRef({}, "scripted_loc")),
  set_mio_icon: typeRef({}, "spriteType"),
  set_mio_flag: either(
    value_set({}, "mio_flag"),
    obj(
      { scope: military_industrial_organization() },
      {
        flag: value_set({}, "mio_flag"),
        value: int({ cardinality: [0, 1] }),
        days: int({ cardinality: [0, 1] }),
      },
    ),
  ),
  modify_mio_flag: obj(
    { scope: military_industrial_organization() },
    {
      flag: value({}, "mio_flag"),
      value: int({ cardinality: [0, 1] }),
      days: int({ cardinality: [0, 1] }),
    },
  ),
  clr_mio_flag: value({}, "mio_flag"),
  set_mio_research_bonus: variable_field({}, 0, Infinity),
  set_mio_task_capacity: int_variable_field({}, 0, Infinity),
  add_mio_task_capacity: int_variable_field(),
  random_military_industrial_organization: obj(
    { scope: country(), push_scope: military_industrial_organization() },
    {
      limit: obj({ cardinality: [0, 1] }, { ...trigger }),
      tooltip: localisation({ cardinality: [0, 1] }),
      include_invisible: either(
        bool({ cardinality: [0, 1] }, false),
        bool({ cardinality: [0, 1] }, true),
      ),
      //   ...effect,
    },
  ),
  give_market_access: either(
    enumRef({}, "country_tags"),
    typeRef({}, "country"),
  ),
  create_purchase_contract: obj(
    {},
    {
      seller: typeRef({}, "country"),
      buyer: typeRef({}, "country"),
      civilian_factories: int(),
      equipment: array({ cardinality: [1, Infinity] }, [
        obj(
          {},
          {
            type: enumRef({}, "equipment_bonus_type"),
            amount: int(),
          },
        ),
      ]),
    },
  ),
  cancel_purchase_contract: bool({}, true),
  random_purchase_contract: obj(
    { scope: country(), push_scope: Scope.PURCHASE_CONTRACT },
    {
      tooltip: localisation({ cardinality: [0, 1] }),
      limit: obj({ cardinality: [0, 1] }, { ...trigger }),
      //   ...effect,
    },
  ),
  every_purchase_contract: obj(
    { scope: country(), push_scope: Scope.PURCHASE_CONTRACT },
    {
      tooltip: localisation({ cardinality: [0, 1] }),
      random_select_amount: int({ cardinality: [0, 1] }, 1, Infinity),
      display_individual_scopes: bool({ cardinality: [0, 1] }),
      limit: obj({ cardinality: [0, 1] }, { ...trigger }),
      //   ...effect,
    },
  ),
};
