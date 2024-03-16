const effect: Rule = {
  children: {
    every_military_industrial_organization: {
      provide: { context: Context.EFFECT, scope: Scope.COUNTRY },
      cardinality: [0, 1],
      children: {
        random_select_amount: { type: Value.UNQUOTED },
        display_individual_scopes: { type: Value.BOOL },
        limit: {
          provide: { context: Context.TRIGGER, scope: Scope.MILITARY_INDUSTRIAL_ORGANIZATION },
          cardinality: [0, 1],
        },
        tooltip: { type: Value.UNQUOTED, cardinality: [0, 1] },
      },
    },
    unlock_mio_trait_tooltip: [
      { type: Value.UNQUOTED },
      {
        children: {
          trait: { type: Value.UNQUOTED },
          show_modifiers: { type: Value.BOOL, cardinality: [0, 1] },
        },
      },
    ],
    add_mio_funds_gain_factor: { type: Value.UNQUOTED },
    add_mio_size: { type: Value.UNQUOTED },
    add_mio_research_bonus: { type: Value.UNQUOTED },
    complete_mio_trait: { type: Value.UNQUOTED },
    add_mio_design_team_assign_cost: { type: Value.UNQUOTED },
    add_mio_design_team_change_cost: { type: Value.UNQUOTED },
    add_mio_funds: { type: Value.UNQUOTED },
    unlock_military_industrial_organization_tooltip: { type: Value.UNQUOTED },
    show_mio_tooltip: { type: Value.UNQUOTED },
    unlock_mio_policy_tooltip: [
      { type: Value.UNQUOTED },
      {
        children: {
          policy: { type: Value.UNQUOTED },
          show_modifiers: { type: Value.BOOL, cardinality: [0, 1], defaultValue: false },
        },
      },
    ],
    add_cic: { type: Value.UNQUOTED },
    add_equipment_subsidy: {
      cardinality: [0, 1],
      children: {
        cic: { type: Value.UNQUOTED },
        equipment_type: { type: Value.UNQUOTED },
        seller_trigger: [
          {
            provide: { context: Context.TRIGGER, scope: Scope.COUNTRY },
            cardinality: ["~1", "inf"],
          },
          { type: Value.UNQUOTED, cardinality: [0, 1] },
        ],
        seller_tags: {
          cardinality: [0, "inf"],
          type: Value.UNQUOTED,
        },
      },
    },
    set_mio_name_key: { type: Value.UNQUOTED },
    set_mio_icon: { type: Value.UNQUOTED },
    set_mio_flag: [
      { type: Value.UNQUOTED },
      {
        children: {
          flag: { type: Value.UNQUOTED },
          value: { type: Value.UNQUOTED, cardinality: [0, 1] },
          days: { type: Value.UNQUOTED, cardinality: [0, 1] },
        },
      },
    ],
    modify_mio_flag: {
      children: {
        flag: { type: Value.UNQUOTED },
        value: { type: Value.UNQUOTED, cardinality: [0, 1] },
        days: { type: Value.UNQUOTED, cardinality: [0, 1] },
      },
    },
    clr_mio_flag: { type: Value.UNQUOTED },
    set_mio_funds_gain_factor: { type: Value.UNQUOTED },
    set_mio_research_bonus: { type: Value.UNQUOTED },
    set_mio_design_team_assign_cost: { type: Value.UNQUOTED },
    give_market_access: [
      { type: Value.UNQUOTED },
      { type: Value.UNQUOTED },
    ],
  },
};