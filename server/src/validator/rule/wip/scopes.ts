const scopes: Rule = {
  Country: {
    provide: { context: Context.TRIGGER, scope: Scope.COUNTRY },
  },
  State: {
    provide: { context: Context.TRIGGER, scope: Scope.STATE },
    provide: { context: Context.EFFECT, scope: Scope.STATE },
  },
  Character: {
    provide: { context: Context.NONE, scope: Scope.CHARACTER },
  },
  "Unit Leader": {
    provide: { context: Context.NONE, scope: Scope.UNIT_LEADER },
  },
  Operative: {
    provide: { context: Context.NONE, scope: Scope.OPERATIVE },
  },
  Combat: {
    provide: { context: Context.NONE, scope: Scope.COMBAT },
  },
  Air: {
    provide: { context: Context.NONE, scope: Scope.AIR },
  },
  Aggressive: {
    provide: { context: Context.NONE, scope: Scope.AGGRESSIVE },
  },
  Ai: {
    provide: { context: Context.NONE, scope: Scope.AI },
  },
  Army: {
    provide: { context: Context.NONE, scope: Scope.ARMY },
  },
  Autonomy: {
    provide: { context: Context.NONE, scope: Scope.AUTONOMY },
  },
  Defensive: {
    provide: { context: Context.NONE, scope: Scope.DEFENSIVE },
  },
  "Government in Exile": {
    provide: { context: Context.NONE, scope: Scope.GOVERNMENT_IN_EXILE },
  },
  "Intelligence Agency": {
    provide: { context: Context.NONE, scope: Scope.INTELLIGENCE_AGENCY },
  },
  "Military Advancements": {
    provide: { context: Context.NONE, scope: Scope.MILITARY_ADVANCEMENTS },
  },
  "Military Industrial Organizations": {
    provide: { context: Context.NONE, scope: Scope.MILITARY_INDUSTRIAL_ORGANIZATION },
  },
  Naval: {
    provide: { context: Context.NONE, scope: Scope.NAVAL },
  },
  Peace: {
    provide: { context: Context.NONE, scope: Scope.PEACE },
  },
  Politics: {
    provide: { context: Context.NONE, scope: Scope.POLITICS },
  },
  "War Production": {
    provide: { context: Context.NONE, scope: Scope.WAR_PRODUCTION },
  },
  Operation: {
    provide: { context: Context.NONE, scope: Scope.OPERATION },
  },
  Invalid: {
    provide: { context: Context.NONE, scope: Scope.INVALID },
  },
  Unit: {
    provide: { context: Context.NONE, scope: Scope.UNIT },
  },
};