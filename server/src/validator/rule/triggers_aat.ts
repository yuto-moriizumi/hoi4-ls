import {
  bool,
  state,
  typeRef,
  military_industrial_organization,
  variable_field,
  either,
  enumRef,
  country,
  value,
  obj,
  int,
  array,
  localisation,
  float,
  scopeRef,
  purchase_contract,
} from "./utils";

export const trigger = {
  is_one_state_island: bool({ scope: [state()] }),
  is_military_industrial_organization: typeRef(
    { scope: [military_industrial_organization()] },
    "military_industrial_organization",
  ),
  has_mio_size: variable_field({ scope: [military_industrial_organization()] }),
  has_mio_equipment_type: either(
    enumRef(
      { scope: [military_industrial_organization()] },
      "equipment_bonus_type",
    ),
    typeRef({ scope: [military_industrial_organization()] }, "equipment"),
    typeRef({ scope: [military_industrial_organization()] }, "equipment_group"),
  ),
  has_military_industrial_organization: either(
    typeRef({ scope: [country()] }, "military_industrial_organization"),
    value({ scope: [country()] }, "variable"),
  ),
  is_mio_available: bool({ scope: [military_industrial_organization()] }),
  is_mio_visible: bool({ scope: [military_industrial_organization()] }),
  is_mio_assigned_to_task: bool({
    scope: [military_industrial_organization()],
  }),
  has_mio_trait: either(
    value({ scope: [military_industrial_organization()] }, "mio_trait_token"),
    obj(
      { scope: [military_industrial_organization()] },
      { trait: value({}, "mio_trait_token") },
    ),
  ),
  is_mio_trait_completed: either(
    value({ scope: [military_industrial_organization()] }, "mio_trait_token"),
    obj(
      { scope: [military_industrial_organization()] },
      { trait: value({}, "mio_trait_token") },
    ),
  ),
  is_mio_trait_available: either(
    value({ scope: [military_industrial_organization()] }, "mio_trait_token"),
    obj(
      { scope: [military_industrial_organization()] },
      { trait: value({}, "mio_trait_token") },
    ),
  ),
  has_mio_number_of_completed_traits: variable_field({
    scope: [military_industrial_organization()],
  }),
  num_planes_stationed_in_regions: obj(
    { scope: [country()] },
    {
      value: int(),
      regions: array({ cardinality: [1, Infinity] }, [
        typeRef({}, "strategic_region"),
      ]),
    },
  ),
  has_mio_flag: either(
    value({ scope: [military_industrial_organization()] }, "mio_flag"),
    obj(
      { scope: [military_industrial_organization()] },
      {
        flag: value({}, "mio_flag"),
        value: int({ cardinality: [0, 1] }),
        days: int({ cardinality: [0, 1] }),
      },
    ),
  ),
  has_mio_policy: typeRef(
    { scope: [military_industrial_organization()] },
    "mio_policy",
  ),
  has_mio_research_category: either(
    enumRef({ scope: [military_industrial_organization()] }, "tech_category"),
    typeRef({ scope: [military_industrial_organization()] }, "equipment_group"),
    typeRef(
      { scope: [military_industrial_organization()] },
      "equipment.archetype_equip",
    ),
  ),
  has_mio_policy_active: typeRef(
    { scope: [military_industrial_organization()] },
    "mio_policy",
  ),
  all_military_industrial_organization: obj(
    { scope: [country()], push_scope: military_industrial_organization() },
    {
      tooltip: localisation({ cardinality: [0, 1] }),
      include_invisible: either(
        bool({ cardinality: [0, 1] }, false),
        bool({ cardinality: [0, 1] }, true),
      ),
      //   ...trigger,
    },
  ),
  any_military_industrial_organization: obj(
    { scope: [country()], push_scope: military_industrial_organization() },
    {
      tooltip: localisation({ cardinality: [0, 1] }),
      include_invisible: either(
        bool({ cardinality: [0, 1] }, false),
        bool({ cardinality: [0, 1] }, true),
      ),
      //   ...trigger,
    },
  ),
  any_purchase_contract: obj(
    { scope: [country()], push_scope: purchase_contract() },
    {
      tooltip: localisation({ cardinality: [0, 1] }),
      //   ...trigger,
    },
  ),
  all_purchase_contracts: obj(
    { scope: [country()], push_scope: purchase_contract() },
    {
      tooltip: localisation({ cardinality: [0, 1] }),
      //   ...trigger,
    },
  ),
  contract_contains_equipment: enumRef(
    { scope: [purchase_contract()] },
    "equipment_bonus_type",
  ),
  deal_completion: float({ scope: [purchase_contract()] }, 0, 1),
  buyer: scopeRef({ scope: [purchase_contract()] }, country()),
  seller: scopeRef({ scope: [purchase_contract()] }, country()),
};
