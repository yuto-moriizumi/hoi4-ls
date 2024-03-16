const example: Rule = {
  children: {
    trigger: [
      { provide: { context: Context.LONGEST_WAR_LENGTH, scope: Scope.COUNTRY } },
      {
        cardinality: [0, "inf"],
        children: {
          tag: { type: Value.UNQUOTED },
          months: { type: Value.UNQUOTED },
        },
        provide: { context: Context.WAR_LENGTH_WITH, scope: Scope.COUNTRY },
      },
    ],
  },
};