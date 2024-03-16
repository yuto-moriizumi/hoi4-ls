const country: Rule = {
  children: {
    is_one_state_island: {
      provide: { context: Context.TRIGGER, scope: Scope.STATE },
    },
    is_military_industrial_organization: {
      provide: { context: Context.TRIGGER, scope: Scope.MILITARY_INDUSTRIAL_ORGANIZATION },
    },
    has_mio_size: {
      provide: { context: Context.TRIGGER, scope: Scope.MILITARY_INDUSTRIAL_ORGANIZATION },
    },
    has_mio_equipment_type: [
      {
        provide: { context: Context.TRIGGER, scope: Scope.MILITARY_INDUSTRIAL_ORGANIZATION },
      },
      {
        provide: { context: Context.TRIGGER, scope: Scope.MILITARY_INDUSTRIAL_ORGANIZATION },
      },
      {
        provide: { context: Context.TRIGGER, scope: Scope.MILITARY_INDUSTRIAL_ORGANIZATION },
      }
    ],
    has_military_industrial_organization: {
      provide: { context: Context.TRIGGER, scope: Scope.COUNTRY },
    },
    is_mio_available: {
      provide: { context: Context.TRIGGER, scope: Scope.MILITARY_INDUSTRIAL_ORGANIZATION },
    },
    is_mio_visible: {
      provide: { context: Context.TRIGGER, scope: Scope.MILITARY_INDUSTRIAL_ORGANIZATION },
    },
    is_mio_assigned_to_task: {
      provide: { context: Context.TRIGGER, scope: Scope.MILITARY_INDUSTRIAL_ORGANIZATION },
    },
    has_mio_trait: {
      provide: { context: Context.TRIGGER, scope: Scope.MILITARY_INDUSTRIAL_ORGANIZATION },
    },
    is_mio_trait_completed: {
      provide: { context: Context.TRIGGER, scope: Scope.MILITARY_INDUSTRIAL_ORGANIZATION },
    },
    has_mio_number_of_completed_traits: {
      provide: { context: Context.TRIGGER, scope: Scope.MILITARY_INDUSTRIAL_ORGANIZATION },
    },
    num_planes_stationed_in_regions: {
      provide: { context: Context.TRIGGER, scope: Scope.COUNTRY },
    },
    has_mio_flag: [
      {
        provide: { context: Context.TRIGGER, scope: Scope.MILITARY_INDUSTRIAL_ORGANIZATION },
      },
      {
        children: {
          flag: { type: Value.UNQUOTED },
          value: { type: Value.UNQUOTED, cardinality: [0, 1] },
          days: { type: Value.UNQUOTED, cardinality: [0, 1] },
        },
        provide: { context: Context.TRIGGER, scope: Scope.MILITARY_INDUSTRIAL_ORGANIZATION },
      }
    ],
  },
};