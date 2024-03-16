const types: Rule = {
  children: {
    type_country_history: {
      cardinality: [0, "inf"],
      children: {
        path: { type: Value.UNQUOTED },
        type_per_file: { type: Value.BOOL, defaultValue: true },
      },
    },
  },
};

const country_history: Rule = {
  children: {
    capital: { type: Value.UNQUOTED },
    oob: { type: Value.UNQUOTED, cardinality: [0, 1] },
    provide: { context: Context.EFFECT, scope: Scope.COUNTRY_HISTORY },
    recruit_character: {
      type: Value.UNQUOTED,
      cardinality: [0, "inf"],
      options: [
        { value: "<character>" },
        { value: "value[event_target]" },
        { value: "value[global_event_target]" },
        { value: "scope[character]" },
      ],
    },
    starting_train_buffer: { type: Value.UNQUOTED, cardinality: [0, "inf"] },
    date_field: {
      cardinality: [0, "inf"],
      children: {
        capital: { type: Value.UNQUOTED, cardinality: [0, 1] },
        oob: { type: Value.UNQUOTED, cardinality: [0, "inf"] },
        provide: { context: Context.EFFECT, scope: Scope.COUNTRY_HISTORY_DATE_FIELD },
        recruit_character: {
          type: Value.UNQUOTED,
          cardinality: [0, "inf"],
          options: [
            { value: "<character>" },
            { value: "value[event_target]" },
            { value: "value[global_event_target]" },
            { value: "scope[character]" },
          ],
        },
      },
    },
  },
};