const mio_policy: Rule = {
  children: {
    name: { type: Value.UNQUOTED, cardinality: [0, 1] },
    icon: { type: Value.UNQUOTED, cardinality: [0, 1] },
    cost: { type: Value.INT, cardinality: [0, 1] },
    cooldown: { type: Value.INT, cardinality: [0, 1] },
    allowed: {
      cardinality: [0, 1],
      provide: { context: Context.TRIGGER, scope: Scope.COUNTRY },
    },
    visible: {
      cardinality: [0, 1],
      provide: { context: Context.TRIGGER, scope: Scope.COUNTRY },
    },
    available: {
      cardinality: [0, 1],
      provide: { context: Context.TRIGGER, scope: Scope.COUNTRY },
    },
    equipment_bonus: {
      cardinality: [0, 1],
      children: {
        enum: {
          cardinality: [0, "inf"],
          children: { type: Value.UNQUOTED }
        },
        "<equipment_group>": {
          cardinality: [0, "inf"],
          children: { type: Value.UNQUOTED }
        },
        same_as_mio: {
          cardinality: [0, "inf"],
          children: { type: Value.UNQUOTED }
        },
      },
    },
    production_bonus: {
      cardinality: [0, 1],
      children: {
        enum: {
          cardinality: [0, "inf"],
          children: { type: Value.UNQUOTED }
        },
        "<equipment_group>": {
          cardinality: [0, "inf"],
          children: { type: Value.UNQUOTED }
        },
        same_as_mio: {
          cardinality: [0, "inf"],
          children: { type: Value.UNQUOTED }
        },
      },
    },
    organization_modifier: {
      cardinality: [0, 1],
      provide: { context: Context.MODIFIER, scope: Scope.COUNTRY },
    },
    on_add: {
      cardinality: [0, 1],
      provide: { context: Context.EFFECT, scope: Scope.COUNTRY },
    },
    on_remove: {
      cardinality: [0, 1],
      provide: { context: Context.EFFECT, scope: Scope.COUNTRY },
    },
    ai_will_do: {
      cardinality: [0, 1],
      children: {
        enum: {
          type: Value.FLOAT,
          cardinality: [0, 1]
        },
        children: {
          provide: { 
            context: Context.MODIFIER_RULE, 
            scope: Scope.COUNTRY 
          },
        },
      },
    },
  },
};