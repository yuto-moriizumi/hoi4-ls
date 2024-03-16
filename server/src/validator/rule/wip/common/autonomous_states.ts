const autonomy: Rule = {
  children: {
    id: { type: Value.UNQUOTED },
    default: { type: Value.BOOL, cardinality: [0, 1] },
    is_puppet: { type: Value.BOOL, cardinality: [0, 1] },
    use_overlord_color: { type: Value.BOOL, cardinality: [0, 1] },
    min_freedom_level: { type: Value.UNQUOTED },
    peace_conference_initial_freedom: { type: Value.UNQUOTED, cardinality: [0, 1] },
    manpower_influence: { type: Value.UNQUOTED },
    rule: {
      children: {
        desc: { type: Value.UNQUOTED, cardinality: [0, 1] },
        enum: { type: Value.BOOL, cardinality: [0, 20] },
      },
    },
    modifier: {
      provide: { context: Context.MODIFIER, scope: Scope.COUNTRY },
    },
    ai_subject_wants_higher: {
      children: {
        factor: { type: Value.UNQUOTED },
      },
    },
    ai_overlord_wants_lower: {
      children: {
        factor: { type: Value.UNQUOTED },
      },
    },
    ai_overlord_wants_garrison: {
      provide: { context: Context.TRIGGER, scope: Scope.COUNTRY },
    },
    allowed: {
      provide: { context: Context.TRIGGER, scope: Scope.COUNTRY },
    },
    allowed_levels_filter: {
      cardinality: [1, "inf"],
    },
    use_for_peace_conference_weight: {
      children: {
        enum: { type: Value.UNQUOTED, cardinality: [0, 1] },
        provide: { context: Context.MODIFIER_RULE, scope: Scope.COUNTRY },
      },
      cardinality: [0, 1],
    },
    can_take_level: {
      provide: { context: Context.TRIGGER, scope: Scope.COUNTRY },
    },
    can_lose_level: {
      provide: { context: Context.TRIGGER, scope: Scope.COUNTRY },
    },
  },
};