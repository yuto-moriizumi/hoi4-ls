const types: Rule = {
  children: {
    type: {
      cardinality: [0, "inf"],
      children: {
        path: { type: Value.UNQUOTED },
        subtype: [
          { type: Value.UNQUOTED },
          { type: Value.UNQUOTED, children: { name: { type: Value.UNQUOTED } } },
          { type: Value.UNQUOTED, children: { unique: { type: Value.BOOL, defaultValue: true } } }
        ]
      }
    }
  }
};

const portrait: Rule = {
  children: {
    subtype: {
      cardinality: [0, 1],
      children: {
        name: { type: Value.UNQUOTED, cardinality: [0, 1] }
      }
    },
    male: { provide: { context: Context.GENDERPORTRAIT, scope: Scope.SINGLE_ALIAS }, cardinality: [0, 1] },
    female: { provide: { context: Context.GENDERPORTRAIT, scope: Scope.SINGLE_ALIAS }, cardinality: [0, 1] },
    army: { provide: { context: Context.PORTRAITS, scope: Scope.SINGLE_ALIAS }, cardinality: [0, 1] },
    navy: { provide: { context: Context.PORTRAITS, scope: Scope.SINGLE_ALIAS }, cardinality: [0, 1] },
    operative: { provide: { context: Context.PORTRAITS, scope: Scope.SINGLE_ALIAS }, cardinality: [0, 1] },
    political: {
      cardinality: [0, 1],
      children: {
        enum: { provide: { context: Context.PORTRAITS, scope: Scope.SINGLE_ALIAS }, cardinality: [0, "inf"] },
        '<ideology>': { provide: { context: Context.PORTRAITS, scope: Scope.SINGLE_ALIAS }, cardinality: [0, "inf"] }
      }
    }
  }
};

const single_alias: Rule = {
  children: {
    portraits: {
      cardinality: [0, 1],
      children: {
        male: { provide: { context: Context.GENDERPORTRAIT, scope: Scope.SINGLE_ALIAS }, cardinality: [0, 1] },
        female: { provide: { context: Context.GENDERPORTRAIT, scope: Scope.SINGLE_ALIAS }, cardinality: [0, 1] }
      }
    }
  }
};

const single_alias_genderportrait: Rule = {
  children: {
    '<spriteType>': { type: Value.UNQUOTED, cardinality: [0, "inf"] },
    filepath: [
    	{ type: Value.UNQUOTED, cardinality: [0, "inf"] },
    	{ type: Value.UNQUOTED, cardinality: [0, "inf"] },
    	{ type: Value.UNQUOTED, cardinality: [0, "inf"] },
    	{ type: Value.UNQUOTED, cardinality: [0, "inf"] },
    	{ type: Value.UNQUOTED, cardinality: [0, "inf"] },
    	{ type: Value.UNQUOTED, cardinality: [0, "inf"] },
    	{ type: Value.UNQUOTED, cardinality: [0, "inf"] },
    	{ type: Value.UNQUOTED, cardinality: [0, "inf"] },
    	{ type: Value.UNQUOTED, cardinality: [0, "inf"] },
    	{ type: Value.UNQUOTED, cardinality: [0, "inf"] },
    	{ type: Value.UNQUOTED, cardinality: [0, "inf"] },
    	{ type: Value.UNQUOTED, cardinality: [0, "inf"] },
    	{ type: Value.UNQUOTED, cardinality: [0, "inf"] },
    	{ type: Value.UNQUOTED, cardinality: [0, "inf"] },
    	{ type: Value.UNQUOTED, cardinality: [0, "inf"] },
    	{ type: Value.UNQUOTED, cardinality: [0, "inf"] },
    	{ type: Value.UNQUOTED, cardinality: [0, "inf"] },
    	{ type: Value.UNQUOTED, cardinality: [0, "inf"] },
    	{ type: Value.UNQUOTED, cardinality: [0, "inf"] },
    	{ type: Value.UNQUOTED, cardinality: [0, "inf"] },
    	{ type: Value.UNQUOTED, cardinality: [0, "inf"] },
    	{ type: Value.UNQUOTED, cardinality: [0, "inf"] },
    	{ type: Value.UNQUOTED, cardinality: [0, "inf"] },
    	{ type: Value.UNQUOTED, cardinality: [0, "inf"] },
    	{ type: Value.UNQUOTED, cardinality: [0, "inf"] },
    	{ type: Value.UNQUOTED, cardinality: [0, "inf"] },
    	{ type: Value.UNQUOTED, cardinality: [0, "inf"] },
    	{ type: Value.UNQUOTED, cardinality: [0, "inf"] },
    	{ type: Value.UNQUOTED, cardinality: [0, "inf"] },
    	{ type: Value.UNQUOTED, cardinality: [0, "inf"] }
    ]
  }
};