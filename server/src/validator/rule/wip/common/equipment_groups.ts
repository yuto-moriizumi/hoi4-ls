const types: Rule = {
  children: {
    type: {
      cardinality: ["equipment_group", "equipment_group"],
      provide: { context: Context.EQUIPMENT_GROUP, scope: Scope.GAME },
      path: { type: Value.UNQUOTED },
    },
  },
};

const equipment_group: Rule = {
  children: {
    description: { type: Value.UNQUOTED, cardinality: [0, 1] },
    equipment_type: {
      cardinality: [0, "inf"],
      children: {
        enum: { type: Value.UNQUOTED, cardinality: [0, "inf"] },
        equipment_group: { type: Value.UNQUOTED, cardinality: [0, "inf"] },
      },
    },
  },
};