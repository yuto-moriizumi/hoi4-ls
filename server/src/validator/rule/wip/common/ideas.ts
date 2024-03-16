const types: Rule = {
  children: {
    type: { 
      provide: { context: Context.IDEA, scope: Scope.COUNTRY },
      path: { type: Value.UNQUOTED }
    }
  },
};

const idea: Rule = {
  children: {
    "<idea_category.no_slot>": {
      children: {
        name: { type: Value.UNQUOTED, cardinality: [0, 1] },
        cancel_if_invalid: { type: Value.BOOL, cardinality: [0, 1], defaultValue: false },
        visible: {
          cardinality: [0, 1],
          provide: { context: Context.TRIGGER, scope: Scope.COUNTRY },
        },
        allowed: {
          cardinality: [0, 1],
          provide: { context: Context.TRIGGER, scope: Scope.COUNTRY },
        },
        cancel: {
          cardinality: [0, 1],
          provide: { context: Context.TRIGGER, scope: Scope.COUNTRY },
        },
        available: {
          cardinality: [0, 1],
          provide: { context: Context.TRIGGER, scope: Scope.COUNTRY },
        },
        allowed_civil_war: {
          cardinality: [0, 1],
          provide: { context: Context.TRIGGER, scope: Scope.COUNTRY },
        },
        picture: { type: Value.UNQUOTED, cardinality: [0, 1] },
        cost: { type: Value.INT, cardinality: [0, 1] },
        removal_cost: { type: Value.INT, cardinality: [0, 1] },
        modifier: {
          cardinality: [0, 1],
          provide: { context: Context.MODIFIER, scope: Scope.COUNTRY },
        },
        rule: {
          cardinality: [0, 1],
          children: {
            enum: { type: Value.BOOL, cardinality: ["~1", "inf"] },
            desc: { type: Value.UNQUOTED, cardinality: [0, 1] },
          },
        },
        research_bonus: {
          cardinality: [0, 1],
          children: {
            enum: { type: Value.FLOAT, cardinality: [1, 10] },
          },
        },
        equipment_bonus: {
          cardinality: [0, 1],
          children: {
            enum: {
              children: {
                instant: { type: Value.BOOL, cardinality: [0, 1] },
              },
              cardinality: [0, "inf"],
              provide: [
                { context: Context.UNIT_STAT, scope: Scope.COUNTRY },
                { context: Context.NAVAL_STAT, scope: Scope.COUNTRY },
                { context: Context.AIR_STAT, scope: Scope.COUNTRY }
              ],
            },
          },
        },
        traits: {
          type: Value.UNQUOTED,
          cardinality: [0, 1]
        },
        on_add: {
          provide: { context: Context.EFFECT, scope: Scope.COUNTRY },
          cardinality: [0, "inf"]
        },
        on_remove: {
          provide: { context: Context.EFFECT, scope: Scope.COUNTRY },
          cardinality: [0, "inf"]
        },
        do_effect: {
          provide: { context: Context.TRIGGER, scope: Scope.COUNTRY },
          cardinality: [0, 1]
        },
        ai_will_do: {
          cardinality: [0, 1],
          children: {
            enum: { type: Value.FLOAT, cardinality: [0, 1] },
          },
          provide: { context: Context.MODIFIER_RULE, scope: Scope.COUNTRY },
        },
      },
      cardinality: [0, "inf"],
    },
    "value[idea_slot]": {
      children: {
        law: { type: Value.BOOL, cardinality: [0, 1] },
        use_list_view: { type: Value.BOOL, cardinality: [0, 1] },
        designer: { type: Value.BOOL, cardinality: [0, 1] },
        scalar: {
          children: {
            name: { type: Value.UNQUOTED, cardinality: [0, 1] },
            level: { type: Value.INT, cardinality: [0, 1] },
            default: { type: Value.BOOL, cardinality: [0, 1] },
            cancel_if_invalid: { type: Value.BOOL, cardinality: [0, 1], defaultValue: false },
            visible: {
              provide: { context: Context.TRIGGER, scope: Scope.COUNTRY },
              cardinality: [0, 1],
            },
            allowed: {
              provide: { context: Context.TRIGGER, scope: Scope.COUNTRY },
              cardinality: [0, 1],
            },
            available: {
              provide: { context: Context.TRIGGER, scope: Scope.COUNTRY },
              cardinality: [0, 1],
            },
            allowed_civil_war: {
              provide: { context: Context.TRIGGER, scope: Scope.COUNTRY },
              cardinality: [0, 1],
            },
            allowed_to_remove: {
              provide: { context: Context.TRIGGER, scope: Scope.COUNTRY },
              cardinality: [0, 1],
            },
            picture: { type: Value.UNQUOTED, cardinality: [0, 1] },
            cost: { type: Value.INT, cardinality: [0, 1] },
            removal_cost: { type: Value.INT, cardinality: [0, 1] },
            modifier: {
              provide: { context: Context.MODIFIER, scope: Scope.COUNTRY },
              cardinality: [0, 1],
            },
            equipment_bonus: {
              cardinality: [0, 1],
              children: {
                enum: {
                  children: {
                    instant: { type: Value.BOOL, cardinality: [0, 1] },
                  },
                  cardinality: [0, "inf"],
                  provide: [
                    { context: Context.UNIT_STAT, scope: Scope.COUNTRY },
                    { context: Context.NAVAL_STAT, scope: Scope.COUNTRY },
                    { context: Context.AIR_STAT, scope: Scope.COUNTRY }
                  ],
                },
              },
            },
            traits: {
              type: Value.UNQUOTED,
              cardinality: [0, 1]
            },
            on_add: {
              provide: { context: Context.EFFECT, scope: Scope.COUNTRY },
              cardinality: [0, "inf"]
            },
            on_remove: {
              provide: { context: Context.EFFECT, scope: Scope.COUNTRY },
              cardinality: [0, "inf"]
            },
          },
          cardinality: [0, 1],
        },
      },
      cardinality: [0, "inf"],
    },
    "value[character_advisor_slot]": {
      children: {
        law: { type: Value.BOOL, cardinality: [0, 1] },
        use_list_view: { type: Value.BOOL, cardinality: [0, 1] },
        designer: { type: Value.BOOL, cardinality: [0, 1] },
        scalar: {
          children: {
            name: { type: Value.UNQUOTED, cardinality: [0, 1] },
            level: { type: Value.INT, cardinality: [0, 1] },
            default: { type: Value.BOOL, cardinality: [0, 1] },
            cancel_if_invalid: { type: Value.BOOL, cardinality: [0, 1], defaultValue: false },
            visible: {
              provide: { context: Context.TRIGGER, scope: Scope.COUNTRY },
              cardinality: [0, 1],
            },
            allowed: {
              provide: { context: Context.TRIGGER, scope: Scope.COUNTRY },
              cardinality: [0, 1],
            },
            available: {
              provide: { context: Context.TRIGGER, scope: Scope.COUNTRY },
              cardinality: [0, 1],
            },
            allowed_civil_war: {
              provide: { context: Context.TRIGGER, scope: Scope.COUNTRY },
              cardinality: [0, 1],
            },
            allowed_to_remove: {
              provide: { context: Context.TRIGGER, scope: Scope.COUNTRY },
              cardinality: [0, 1],
            },
            picture: { type: Value.UNQUOTED, cardinality: [0, 1] },
            cost: { type: Value.INT, cardinality: [0, 1] },
            removal_cost: { type: Value.INT, cardinality: [0, 1] },
            modifier: {
              provide: { context: Context.MODIFIER, scope: Scope.COUNTRY },
              cardinality: [0, 1],
            },
            rule: {
              cardinality: [0, 1],
              children: {
                enum: { type: Value.BOOL, cardinality: ["~1", "inf"] },
                desc: { type: Value.UNQUOTED, cardinality: [0, 1] },
              },
            },
            equipment_bonus: {
              cardinality: [0, 1],
              children: {
                enum: {
                  children: {
                    instant: { type: Value.BOOL, cardinality: [0, 1] },
                  },
                  cardinality: [0, "inf"],
                  provide: [
                    { context: Context.UNIT_STAT, scope: Scope.COUNTRY },
                    { context: Context.NAVAL_STAT, scope: Scope.COUNTRY },
                    { context: Context.AIR_STAT, scope: Scope.COUNTRY }
                  ],
                },
              },
            },
            traits: {
              type: Value.UNQUOTED,
              cardinality: [0, 1]
            },
            on_add: {
              provide: { context: Context.EFFECT, scope: Scope.COUNTRY },
              cardinality: [0, "inf"]
            },
            on_remove: {
              provide: { context: Context.EFFECT, scope: Scope.COUNTRY },
              cardinality: [0, "inf"]
            },
          },
          cardinality: [0, 1],
        },
      },
      cardinality: [0, "inf"],
    },
    "enum[allowed_advisor_role]": {
      type: Value.UNQUOTED,
    },
  },
};

const enums: Rule = {
  children: {
    enum: {
      children: {
        ledgers: {
          type: Value.ENUM,
        }
      }
    }
  }
};