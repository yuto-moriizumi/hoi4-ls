const types: Rule = {
  children: {
    type: {
      cardinality: [0, "inf"],
      children: {
        path: { type: Value.UNQUOTED },
        unique: { type: Value.BOOL, defaultValue: true },
      },
      provide: { context: Context.ACHIEVEMENT, scope: Scope.COUNTRY },
    },
  },
};

const achievement: Rule = {
  children: {
    possible: {
      cardinality: [0, "inf"],
      provide: { context: Context.TRIGGER, scope: Scope.COUNTRY },
    },
    happened: {
      cardinality: [0, "inf"],
      provide: { context: Context.TRIGGER, scope: Scope.COUNTRY },
    },
  },
};

const enums: Rule = {
  children: {
    complex_enum: {
      cardinality: [0, "inf"],
      children: {
        path: { type: Value.UNQUOTED },
        unique: { type: Value.BOOL, defaultValue: true },
        start_from_root: { type: Value.BOOL, defaultValue: true },
        name: {
          children: {
            unique_id: { type: Value.UNQUOTED },
          },
          provide: { context: Context.MOD_ACHIEVEMENT_ID, scope: Scope.COUNTRY },
        },
      },
    },
  },
};