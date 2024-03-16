const country_tag_alias: Rule = {
  children: {
    path: { type: Value.UNQUOTED },
    subtype: [
      {
        children: {
          variable: { type: Value.UNQUOTED },
        },
      },
      {
        children: {
          global_event_target: { type: Value.UNQUOTED },
        },
      },
      {
        children: {
          event_target: { type: Value.UNQUOTED },
        },
      },
      {},
    ],
  },
};

const country_tag_alias: Rule = {
  children: {
    subtype: [
      {
        children: {
          variable: { type: Value.UNQUOTED },
        },
      },
      {
        children: {
          global_event_target: { type: Value.UNQUOTED },
        },
      },
      {
        children: {
          event_target: { type: Value.UNQUOTED },
        },
      },
      {
        cardinality: [0, 1],
        children: {
          original_tag: { type: Value.UNQUOTED },
          targets: {
            cardinality: [0, "inf"],
            children: [
              { type: Value.UNQUOTED },
              { type: Value.UNQUOTED },
              { type: Value.UNQUOTED },
            ],
          },
          target_array: [
            { type: Value.UNQUOTED, cardinality: [0, 1] },
            { type: Value.UNQUOTED, cardinality: [0, 1] },
          ],
          country_score: {
            cardinality: [0, 1],
            children: {
              enum: { type: Value.UNQUOTED },
            },
            provide: { context: Context.TRIGGER, scope: Scope.COUNTRY },
          },
          fallback: { type: Value.UNQUOTED, cardinality: [0, 1] },
          provide: { context: Context.TRIGGER, scope: Scope.COUNTRY },
        },
      },
    ],
    fallback: [
      { type: Value.UNQUOTED, cardinality: [0, 1] },
      { type: Value.UNQUOTED, cardinality: [0, 1] },
    ],
  },
};

const enums: Rule = {
  children: {
    complex_enum: {
      children: {
        path: { type: Value.UNQUOTED },
        start_from_root: { type: Value.BOOL, cardinality: [0, 1], defaultValue: true },
        name: {
          children: {
            enum_name: {},
          },
        },
      },
    },
  },
};