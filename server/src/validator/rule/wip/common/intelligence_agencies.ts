const country: Rule = {
  children: {
    types: {
      children: {
        type: {
          children: {
            path: { type: Value.UNQUOTED },
          },
          provide: { context: Context.INTELLIGENCE_AGENCY, scope: Scope.COUNTRY },
        },
      },
    },
    intelligence_agency: {
      children: {
        picture: { type: Value.UNQUOTED },
        names: {
          children: {
            localisation: { type: Value.UNQUOTED, cardinality: [0, "inf"] },
            localisation_inline: { type: Value.UNQUOTED, cardinality: [0, "inf"] },
          },
        },
        default: {
          cardinality: ["~1", "inf"],
          provide: { context: Context.TRIGGER, scope: Scope.COUNTRY },
        },
        available: {
          cardinality: ["~1", "inf"],
          provide: { context: Context.TRIGGER, scope: Scope.COUNTRY },
        },
      },
    },
  },
};