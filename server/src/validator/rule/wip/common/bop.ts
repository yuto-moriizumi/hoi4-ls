const types: Rule = {
  children: {
    type: {
      type: Value.UNQUOTED,
      provide: { context: Context.BALANCE_OF_POWER, scope: Scope.GAME },
    },
  },
};

const balance_of_power: Rule = {
  children: {
    initial_value: { type: Value.NUMBER, cardinality: [0, 1] },
    left_side: { type: Value.UNQUOTED },
    right_side: { type: Value.UNQUOTED },
    decision_category: { type: Value.UNQUOTED },
    range: {
      cardinality: [0, "inf"],
      children: {
        id: { type: Value.UNQUOTED },
        min: { type: Value.NUMBER },
        max: { type: Value.NUMBER },
        modifier: {
          cardinality: [0, "inf"],
          provide: { context: Context.MODIFIER, scope: Scope.COUNTRY },
        },
        on_activate: {
          cardinality: [0, 1],
          children: {
            limit: {
              cardinality: [0, "inf"],
              provide: { context: Context.TRIGGER, scope: Scope.COUNTRY },
            },
            effect: {
              cardinality: [0, "inf"],
              provide: { context: Context.EFFECT, scope: Scope.COUNTRY },
            },
          },
        },
        on_deactivate: {
          cardinality: [0, 1],
          children: {
            limit: {
              cardinality: [0, "inf"],
              provide: { context: Context.TRIGGER, scope: Scope.COUNTRY },
            },
            effect: {
              cardinality: [0, "inf"],
              provide: { context: Context.EFFECT, scope: Scope.COUNTRY },
            },
          },
        },
      },
    },
    side: {
      cardinality: [2, "inf"],
      children: {
        id: { type: Value.UNQUOTED },
        icon: { type: Value.UNQUOTED },
        range: {
          cardinality: [1, "inf"],
          children: {
            id: { type: Value.UNQUOTED },
            min: { type: Value.NUMBER },
            max: { type: Value.NUMBER },
            modifier: {
              cardinality: [0, "inf"],
              provide: { context: Context.MODIFIER, scope: Scope.COUNTRY },
            },
            on_activate: {
              cardinality: [0, 1],
              children: {
                limit: {
                  cardinality: [0, "inf"],
                  provide: { context: Context.TRIGGER, scope: Scope.COUNTRY },
                },
                effect: {
                  cardinality: [0, "inf"],
                  provide: { context: Context.EFFECT, scope: Scope.COUNTRY },
                },
              },
            },
            on_deactivate: {
              cardinality: [0, 1],
              children: {
                limit: {
                  cardinality: [0, "inf"],
                  provide: { context: Context.TRIGGER, scope: Scope.COUNTRY },
                },
                effect: {
                  cardinality: [0, "inf"],
                  provide: { context: Context.EFFECT, scope: Scope.COUNTRY },
                },
              },
            },
          },
        },
      },
    },
  },
};