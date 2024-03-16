const types: Rule = {
  children: {
    type: {
      type: Value.UNQUOTED,
      cardinality: [0, "inf"],
      children: {
        path: { type: Value.UNQUOTED },
        subtype: {
          children: {
            compliance: { type: Value.UNQUOTED },
            resistance: { type: Value.UNQUOTED },
            core: { type: Value.UNQUOTED },
            state: { type: Value.UNQUOTED },
          },
        },
      },
    },
  },
};

const resistance_compliance_modifier: Rule = {
  children: {
    type: { type: Value.UNQUOTED },
    icon: { type: Value.UNQUOTED },
    small_icon: { type: Value.UNQUOTED },
    threshold: { type: Value.UNQUOTED },
    margin: { type: Value.UNQUOTED },
    alert_level: { type: Value.UNQUOTED, cardinality: [0, 1] },
    alert_margin: { type: Value.UNQUOTED, cardinality: [0, 1] },
    state_modifier: {
      cardinality: [0, "inf"],
      provide: { context: Context.MODIFIER, scope: Scope.STATE },
    },
    subtype: {
      children: {
        core: {
          cardinality: [0, "inf"],
          children: {
            visible: {
              cardinality: [0, "inf"],
              provide: { context: Context.TRIGGER, scope: Scope.COUNTRY },
            },
            enabled: {
              cardinality: [0, "inf"],
              provide: { context: Context.TRIGGER, scope: Scope.COUNTRY },
            },
            on_enable: {
              cardinality: [0, "inf"],
              provide: { context: Context.EFFECT, scope: Scope.COUNTRY },
            },
            on_disable: {
              cardinality: [0, "inf"],
              provide: { context: Context.EFFECT, scope: Scope.COUNTRY },
            },
          },
        },
        state: {
          cardinality: [0, "inf"],
          children: {
            visible: {
              cardinality: [0, "inf"],
              provide: { context: Context.TRIGGER, scope: Scope.STATE },
            },
            enabled: {
              cardinality: [0, "inf"],
              provide: { context: Context.TRIGGER, scope: Scope.STATE },
            },
            on_enable: {
              cardinality: [0, "inf"],
              provide: { context: Context.EFFECT, scope: Scope.STATE },
            },
            on_disable: {
              cardinality: [0, "inf"],
              provide: { context: Context.EFFECT, scope: Scope.STATE },
            },
          },
        },
      },
    },
  },
};

const enums: Rule = {
  children: {
    enum: {
      type: Value.UNQUOTED,
      cardinality: [0, "inf"],
      children: {
        resistance_compliance_modifier_types: { type: Value.UNQUOTED },
        compliance_modifier_types: { type: Value.UNQUOTED },
        resistance_modifier_types: { type: Value.UNQUOTED },
        resistance_compliance_core_modifier_types: { type: Value.UNQUOTED },
        resistance_compliance_state_modifier_types: { type: Value.UNQUOTED },
      },
    },
  },
};