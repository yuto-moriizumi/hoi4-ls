const types: Rule = {
  children: {
    type: {
      cardinality: [0, "inf"],
      children: {
        skip_root_key: { type: Value.UNQUOTED },
        path: { type: Value.UNQUOTED },
        subtype: [
          {
            provide: { context: Context.REGULAR, scope: Scope.IDEOLOGY },
            children: {
              types: {},
            },
          },
          {
            provide: { context: Context.PREDEFINED, scope: Scope.IDEOLOGY },
            cardinality: [0, 0],
            children: {
              types: {},
            },
          },
        ],
      },
    },
  },
};

const ideology: Rule = {
  children: {
    subtype: {
      provide: { context: Context.REGULAR, scope: Scope.IDEOLOGY },
      children: {
        types: {
          cardinality: [0, "inf"],
          children: {
            scalar: {
              children: {
                can_be_randomly_selected: { type: Value.BOOL, cardinality: [0, 1] },
                color: [
                  { type: Value.UNQUOTED, cardinality: [3, 3] },
                  { type: Value.UNQUOTED, cardinality: [3, 3] },
                ],
              },
            },
          },
        },
        ai_ideology_wanted_units_factor: { type: Value.UNQUOTED },
        dynamic_faction_names: { type: Value.UNQUOTED, cardinality: [0, "inf"] },
        color: { type: Value.UNQUOTED, cardinality: [3, 3] },
        rules: {
          children: {
            can_force_government: { type: Value.BOOL },
            can_puppet: { type: Value.BOOL },
            can_send_volunteers: { type: Value.BOOL },
            enum: { type: Value.BOOL, cardinality: [0, 20], provide: { context: Context.GAME_RULES, scope: Scope.IDEOLOGY } },
          },
        },
        can_host_government_in_exile: { type: Value.BOOL, cardinality: [0, 1] },
        war_impact_on_world_tension: { type: Value.UNQUOTED },
        faction_impact_on_world_tension: { type: Value.UNQUOTED },
        modifiers: {
          cardinality: [0, "inf"],
          provide: { context: Context.MODIFIER, scope: Scope.COUNTRY },
        },
        faction_modifiers: {
          cardinality: [0, "inf"],
          provide: { context: Context.MODIFIER, scope: Scope.COUNTRY },
        },
        can_be_boosted: { type: Value.BOOL, cardinality: [0, 1] },
        can_collaborate: { type: Value.BOOL, cardinality: [0, 1] },
        enum: { type: Value.BOOL, cardinality: [0, 1], provide: { context: Context.AI_IDEOLOGY, scope: Scope.IDEOLOGY } },
      },
    },
  },
};

const enums: Rule = {
  children: {
    enum: [
      { type: Value.UNQUOTED, provide: { context: Context.GAME_RULES, scope: Scope.ENUMS } },
      { type: Value.UNQUOTED, provide: { context: Context.AI_IDEOLOGY, scope: Scope.ENUMS } },
    ],
    complex_enum: {
      children: {
        subtype: {
          cardinality: [0, "inf"],
          children: {
            path: { type: Value.UNQUOTED },
            name: {
              children: {
                scalar: {
                  children: {
                    types: {
                      children: {
                        enum_name: {},
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
};