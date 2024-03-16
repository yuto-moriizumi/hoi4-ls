const types: Rule = {
  children: {
    type: [
      {
        provide: { context: Context.ADJACENY_RULE, scope: Scope.COUNTRY },
        children: {
          path: { type: Value.UNQUOTED },
          path_file: { type: Value.UNQUOTED },
          name_field: { type: Value.UNQUOTED },
        },
      },
      {
        provide: { context: Context.AIRPORTS, scope: Scope.COUNTRY },
        children: {
          path: { type: Value.UNQUOTED },
          path_file: { type: Value.UNQUOTED },
          type_per_file: { type: Value.BOOL },
        },
      },
      {
        provide: { context: Context.ROCKETSITES, scope: Scope.COUNTRY },
        children: {
          path: { type: Value.UNQUOTED },
          path_file: { type: Value.UNQUOTED },
          type_per_file: { type: Value.BOOL },
        },
      },
    ],
  },
};

const adjaceny_rule: Rule = {
  children: {
    name: { type: Value.UNQUOTED },
    is_friend: { provide: { context: Context.TRIGGER, scope: Scope.COUNTRY } },
    is_neutral: { provide: { context: Context.TRIGGER, scope: Scope.COUNTRY } },
    is_enemy: { provide: { context: Context.TRIGGER, scope: Scope.COUNTRY } },
    contested: {
      children: {
        army: { type: Value.BOOL },
        navy: { type: Value.BOOL },
        submarine: { type: Value.BOOL },
        trade: { type: Value.BOOL },
      },
    },
    enemy: {
      children: {
        army: { type: Value.BOOL },
        navy: { type: Value.BOOL },
        submarine: { type: Value.BOOL },
        trade: { type: Value.BOOL },
      },
    },
    friend: {
      children: {
        army: { type: Value.BOOL },
        navy: { type: Value.BOOL },
        submarine: { type: Value.BOOL },
        trade: { type: Value.BOOL },
      },
    },
    neutral: {
      children: {
        army: { type: Value.BOOL },
        navy: { type: Value.BOOL },
        submarine: { type: Value.BOOL },
        trade: { type: Value.BOOL },
      },
    },
    required_provinces: {
      cardinality: [1, 10],
      children: {
        enum: { type: Value.UNQUOTED },
      },
    },
    icon: { type: Value.UNQUOTED },
    offset: {
      cardinality: [3, 3],
      children: {
        int: { type: Value.UNQUOTED },
      },
    },
    is_disabled: {
      provide: { context: Context.TRIGGER, scope: Scope.COUNTRY },
      children: {
        tooltip: { type: Value.UNQUOTED },
      },
    },
  },
};

const airports: Rule = {
  children: {
    "<state>": { cardinality: [1, "inf"], children: { enum: { type: Value.UNQUOTED } } },
  },
};

const rocketsites: Rule = {
  children: {
    "<state>": { cardinality: [1, "inf"], children: { enum: { type: Value.UNQUOTED } } },
  },
};

const enums: Rule = {
  children: {
    complex_enum: {
      provide: { context: Context.CONTINENTS, scope: Scope.COUNTRY },
      children: {
        path: { type: Value.UNQUOTED },
        path_file: { type: Value.UNQUOTED },
        name: {
          children: {
            enum_name: { type: Value.UNQUOTED },
          },
        },
      },
    },
  },
};