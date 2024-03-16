const types: Rule = {
  children: {
    type: {
      children: {
        path: { type: Value.UNQUOTED },
        skip_root_key: { type: Value.UNQUOTED },
        subtype: {
          children: {
            slot: {
              cardinality: [1, "inf"],
              type: Value.UNQUOTED,
            },
            character_slot: {
              cardinality: [1, "inf"],
              type: Value.UNQUOTED,
            },
            miltary_spirit: {
              type: Value.UNQUOTED,
            },
            no_slot: {},
          },
          provide: {
            context: Context.SUBTYPE,
            scope: Scope.LOCAL,
          },
        },
      },
    },
  },
};

const idea_category: Rule = {
  children: {
    hidden: { type: Value.BOOL, cardinality: [0, 1], defaultValue: false },
    subtype: {
      children: {
        no_slot: {
          cardinality: [0, 1],
          type: Value.UNQUOTED,
        },
        miltary_spirit: {
          children: {
            politics_tab: { type: Value.BOOL, cardinality: ["~1", 1] },
          },
          type: Value.UNQUOTED,
        },
        slot: {
          cardinality: [1, "inf"],
          type: Value.UNQUOTED,
        },
        character_slot: {
          cardinality: [1, "inf"],
          type: Value.UNQUOTED,
        },
      },
      provide: {
        context: Context.SUBTYPE,
        scope: Scope.LOCAL,
      },
    },
    cost: { type: Value.UNQUOTED, cardinality: [0, 1] },
    removal_cost: { type: Value.UNQUOTED, cardinality: [0, 1] },
    ledger: { type: Value.UNQUOTED, cardinality: [0, 1] },
  },
};

const enums: Rule = {
  children: {
    enum: {
      children: {
        military_spirit_types: {
          children: {
            army_spirit: {},
            navy_spirit: {},
            air_spirit: {},
          },
        },
      },
    },
  },
};