const effect: Rule = {
  children: {
    every_core_state: {
      type: Value.OBJECT,
      cardinality: [0, 1],
      children: {
        random_select_amount: { type: Value.UNQUOTED },
        display_individual_scopes: { type: Value.BOOL, cardinality: [0, 1] },
        limit: { provide: { context: Context.TRIGGER, scope: Scope.COUNTRY }, cardinality: [0, 1] },
        tooltip: { type: Value.UNQUOTED, cardinality: [0, 1] },
      },
      provide: { context: Context.EFFECT, scope: Scope.STATE },
    },
    random_core_state: {
      type: Value.OBJECT,
      cardinality: [0, 1],
      children: {
        limit: { provide: { context: Context.TRIGGER, scope: Scope.COUNTRY }, cardinality: [0, 1] },
        prioritize: { type: Value.UNQUOTED, cardinality: [1, "inf"] },
        tooltip: { type: Value.UNQUOTED, cardinality: [0, 1] },
      },
      provide: { context: Context.EFFECT, scope: Scope.STATE },
    },
    transfer_state_to: {
      type: Value.OBJECT,
      cardinality: ["0", "inf"],
      children: {
        value: { type: Value.UNQUOTED },
      },
    },
    set_state_owner_to: {
      type: Value.OBJECT,
      cardinality: ["0", "inf"],
      children: {
        value: { type: Value.UNQUOTED },
      },
    },
    set_state_controller_to: {
      type: Value.OBJECT,
      cardinality: ["0", "inf"],
      children: {
        value: { type: Value.UNQUOTED },
      },
    },
    release_on_controlled: {
      type: Value.OBJECT,
      cardinality: ["0", "inf"],
      children: {
        value: { type: Value.UNQUOTED },
      },
    },
    release_puppet_on_controlled: {
      type: Value.OBJECT,
      cardinality: ["0", "inf"],
      children: {
        value: { type: Value.UNQUOTED },
      },
    },
    uncomplete_national_focus: {
      type: Value.OBJECT,
      cardinality: [0, 1],
      children: {
        focus: { type: Value.ARRAY, children: { type: Value.UNQUOTED } },
        uncomplete_children: { type: Value.BOOL, cardinality: [0, 1] },
        refund_political_power: { type: Value.BOOL, cardinality: [0, 1] },
      },
    },
    every_character: {
      type: Value.OBJECT,
      cardinality: [0, 1],
      children: {
        random_select_amount: { type: Value.UNQUOTED },
        display_individual_scopes: { type: Value.BOOL, cardinality: [0, 1] },
        limit: { provide: { context: Context.TRIGGER, scope: Scope.COUNTRY }, cardinality: [0, 1] },
        tooltip: { type: Value.UNQUOTED, cardinality: [0, 1] },
      },
      provide: { context: Context.EFFECT, scope: Scope.CHARACTER },
    },
    random_character: {
      type: Value.OBJECT,
      cardinality: [0, 1],
      children: {
        limit: { provide: { context: Context.TRIGGER, scope: Scope.COUNTRY }, cardinality: [0, 1] },
        tooltip: { type: Value.UNQUOTED, cardinality: [0, 1] },
      },
      provide: { context: Context.EFFECT, scope: Scope.CHARACTER },
    },
    add_corps_commander_role: {
      type: Value.OBJECT,
      cardinality: ["0", "inf"],
      children: {
        character: { type: Value.ARRAY, children: { type: Value.UNQUOTED } },
        desc: { type: Value.UNQUOTED, cardinality: [0, 1] },
        traits: { type: Value.UNQUOTED, cardinality: ["~1", "inf"] },
        skill: { type: Value.UNQUOTED, cardinality: [0, 1] },
        attack_skill: { type: Value.UNQUOTED, cardinality: [0, 1] },
        defense_skill: { type: Value.UNQUOTED, cardinality: [0, 1] },
        planning_skill: { type: Value.UNQUOTED, cardinality: [0, 1] },
        logistics_skill: { type: Value.UNQUOTED, cardinality: [0, 1] },
        female: { type: Value.BOOL, cardinality: [0, 1] },
        legacy_id: { type: Value.UNQUOTED, cardinality: [0, 1] },
        visible: { provide: { context: Context.TRIGGER, scope: Scope.COUNTRY }, cardinality: [0, 1] },
      },
    },
    remove_unit_leader_role: {
      type: Value.OBJECT,
      cardinality: ["0", "inf"],
      children: {
        character: { type: Value.UNQUOTED },
      },
    },
  },
};