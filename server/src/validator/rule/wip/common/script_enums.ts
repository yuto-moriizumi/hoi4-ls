const enums: Rule = {
  children: {
    complex_enum: [
      {
        provide: { context: Context.ALLOWED_ADVISOR_ROLE, scope: Scope.GLOBAL },
        children: {
          path: { type: Value.UNQUOTED },
          path_file: { type: Value.UNQUOTED },
          start_from_root: { type: Value.BOOL, defaultValue: true },
          name: {
            children: {
              script_enum_advisor_slot_type: { type: Value.UNQUOTED },
            },
          },
        },
      },
      {
        provide: { context: Context.EQUIPMENT_BONUS_TYPE, scope: Scope.GLOBAL },
        children: {
          path: { type: Value.UNQUOTED },
          path_file: { type: Value.UNQUOTED },
          start_from_root: { type: Value.BOOL, defaultValue: true },
          name: {
            children: {
              script_enum_equipment_bonus_type: { type: Value.UNQUOTED },
            },
          },
        },
      },
      {
        provide: { context: Context.PRODUCTION_STAT, scope: Scope.GLOBAL },
        children: {
          path: { type: Value.UNQUOTED },
          path_file: { type: Value.UNQUOTED },
          start_from_root: { type: Value.BOOL, defaultValue: true },
          name: {
            children: {
              script_enum_production_stat: { type: Value.UNQUOTED },
            },
          },
        },
      },
      {
        provide: { context: Context.EQUIPMENT_STAT, scope: Scope.GLOBAL },
        children: {
          path: { type: Value.UNQUOTED },
          path_file: { type: Value.UNQUOTED },
          start_from_root: { type: Value.BOOL, defaultValue: true },
          name: {
            children: {
              script_enum_equipment_stat: { type: Value.UNQUOTED },
            },
          },
        },
      },
    ],
  },
};