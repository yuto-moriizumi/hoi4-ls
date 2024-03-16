const triggers: Rule[] = [
  { provide: { context: Context.TRIGGER, scope: Scope.ANY }},
  { provide: { context: Context.TRIGGER, scope: Scope.ANY }},
  { provide: { context: Context.TRIGGER, scope: Scope.ANY }},
  { trigger: { type: Value.UNQUOTED }},
  { trigger: { type: Value.BOOL, scopes: [Scope.COUNTRY, Scope.UNIT_LEADER, Scope.ACE] }},
  { trigger: { type: Value.UNQUOTED, scopes: [Scope.STATE] }},
  { trigger: { type: Value.UNQUOTED, scopes: [Scope.COUNTRY] }},
  { trigger: { type: Value.UNQUOTED, scopes: [Scope.COUNTRY] }},
  { trigger: { type: Value.BOOL, scopes: [Scope.COUNTRY] }},
  { trigger: { type: Value.UNQUOTED, scopes: [Scope.STATE] }},
  { trigger: { type: Value.UNQUOTED, scopes: [Scope.COUNTRY] }},
  { trigger: { type: Value.UNQUOTED, scopes: [Scope.STATE] }},
  { trigger: { type: Value.UNQUOTED, scopes: [Scope.STATE] }},
  { trigger: { type: Value.UNQUOTED, scopes: [Scope.STATE] }},
  { trigger: { type: Value.UNQUOTED, scopes: [Scope.STATE] }},
  { trigger: { type: Value.BOOL, scopes: [Scope.STATE] }},
  { trigger: { type: Value.BOOL, scopes: [Scope.STATE] }},
  { trigger: { type: Value.UNQUOTED, scopes: [Scope.STATE] }},
  { trigger: { type: Value.BOOL, scopes: [Scope.ANY] }},
  { trigger: { type: Value.UNQUOTED, scopes: [Scope.COUNTRY] }},
  { trigger: { type: Value.UNQUOTED, scopes: [Scope.COUNTRY] }},
  { trigger: { type: Value.UNQUOTED, scopes: [Scope.COUNTRY] }},
  { trigger: { type: Value.UNQUOTED, scopes: [Scope.COUNTRY] }},
  { trigger: { type: Value.UNQUOTED, scopes: [Scope.COUNTRY] }},
  { trigger: { children: {
      target: { type: Value.UNQUOTED, cardinality: [0, 1] },
      state: { type: Value.UNQUOTED, cardinality: [0, 1] },
      value: { type: Value.UNQUOTED }
    }, scopes: [Scope.COUNTRY]
  }},
  { trigger: { children: {
      state: { type: Value.UNQUOTED },
      value: { type: Value.UNQUOTED }
    }, scopes: [Scope.COUNTRY]
  }},
  { trigger: { children: {
      tag: { type: Value.UNQUOTED },
      token: { type: Value.UNQUOTED }
    }, scopes: [Scope.COUNTRY]
  }},
  { trigger: { type: Value.UNQUOTED, scopes: [Scope.STATE] }},
  { trigger: { type: Value.BOOL, scopes: [Scope.COUNTRY, Scope.COUNTRY] }},
  { trigger: { type: Value.BOOL, scopes: [Scope.COUNTRY, Scope.COUNTRY] }},
  { trigger: { type: Value.UNQUOTED, scopes: [Scope.COUNTRY] }},
  { trigger: { type: Value.UNQUOTED, scopes: [Scope.COUNTRY] }},
  { trigger: { type: Value.BOOL, scopes: [Scope.COUNTRY] }},
  { trigger: { type: Value.BOOL, scopes: [Scope.COUNTRY] }},
  { trigger: { type: Value.UNQUOTED, scopes: [Scope.COUNTRY] }},
  { trigger: { type: Value.BOOl, scopes: [Scope.COUNTRY, Scope.OPERATION] }},
  { trigger: { type: Value.BOOL, scopes: [Scope.COUNTRY, Scope.OPERATION] }},
  { trigger: { type: Value.BOOL, scopes: [Scope.OPERATIVE] }},
  { trigger: { type: Value.UNQUOTED, scopes: [Scope.COUNTRY] }},
  { trigger: { type: Value.UNQUOTED, scopes: [Scope.COUNTRY, Scope.STATE] }},
  { trigger: { type: Value.UNQUOTED, scopes: [Scope.COUNTRY, Scope.STATE] }},
  { trigger: { type: Value.UNQUOTED, scopes: [Scope.COUNTRY] }},
  { trigger: { type: Value.UNQUOTED, scopes: [Scope.COUNTRY] }},
  { trigger: { type: Value.BOOL, scopes: [Scope.COUNTRY] }},
  { trigger: { type: Value.BOOL, scopes: [Scope.COUNTRY] }},
  { trigger: { type: Value.UNQUOTED, scopes: [Scope.COUNTRY] }},
  { trigger: { type: Value.UNQUOTED, scopes: [Scope.COUNTRY] }},
  ...
];