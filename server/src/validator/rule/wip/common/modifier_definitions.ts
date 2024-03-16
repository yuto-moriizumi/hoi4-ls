const types: Rule = {
  children: {
    type: {
      type: Value.UNQUOTED,
      provide: { context: Context.MODIFIER_DEFINITION, scope: Scope.GAME },
    },
  },
};

const modifier_definition: Rule = {
  children: {
    color_type: { type: Value.UNQUOTED, cardinality: [0, 1] },
    value_type: { type: Value.UNQUOTED, cardinality: [0, 1] },
    precision: { type: Value.UNQUOTED, cardinality: [0, 1] },
    postfix: { type: Value.UNQUOTED, cardinality: [0, 1] },
    category: { type: Value.UNQUOTED, cardinality: [0, "inf"] },
  },
};

const enums: Rule = {
  children: {
    modifier_color_type: {
      type: Value.UNQUOTED,
      cardinality: [0, "inf"],
    },
    modifier_value_type: {
      type: Value.UNQUOTED,
      cardinality: [0, "inf"],
    },
    modifier_post_fix: {
      type: Value.UNQUOTED,
      cardinality: [0, "inf"],
    },
    modifier_category: {
      type: Value.UNQUOTED,
      cardinality: [0, "inf"],
    },
  },
};