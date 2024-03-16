const types: Rule = {
  children: {
    type: {
      children: {
        path: { type: Value.UNQUOTED },
        skip_root_key: { type: Value.UNQUOTED },
        unique: { type: Value.BOOL, defaultValue: true },
        subtype: {
          type: Value.ARRAY,
          children: [
            {
              children: {
                top: {
                  children: {
                    type: { type: Value.UNQUOTED },
                  },
                },
              },
              key: "map_mode_top_none",
            },
            {
              children: {
                top: {},
              },
              key: "map_mode_top",
            },
            {
              children: {
                bottom: {
                  children: {
                    type: { type: Value.UNQUOTED },
                  },
                },
              },
              key: "map_mode_bot_non",
            },
            {
              children: {
                bottom: {},
              },
              key: "map_mode_bot",
            },
          ],
        },
      },
      key: "scripted_map_modes",
    },
  },
};

const scripted_map_modes: Rule = {
  children: {
    subtype: {
      type: Value.ARRAY,
      children: [
        {
          children: {
            top: {
              children: {
                type: { type: Value.UNQUOTED, cardinality: [1, 1] },
                color: {
                  cardinality: [0, 1],
                  children: {
                    provide: { context: Context.TRIGGER, scope: Scope.COUNTRY },
                  },
                },
                targets: {
                  cardinality: [0, 1],
                  children: {
                    provide: { context: Context.TRIGGER, scope: Scope.COUNTRY },
                  },
                },
                thickness: { type: Value.BOOL, cardinality: [0, 1] },
              },
            },
          },
          key: "map_mode_top",
        },
        {
          children: {
            bottom: {
              children: {
                type: { type: Value.UNQUOTED, cardinality: [1, 1] },
                color: {
                  cardinality: [0, 1],
                  children: {
                    provide: { context: Context.TRIGGER, scope: Scope.COUNTRY },
                  },
                },
                targets: {
                  cardinality: [0, 1],
                  children: {
                    provide: { context: Context.TRIGGER, scope: Scope.COUNTRY },
                  },
                },
                thickness: { type: Value.BOOL, cardinality: [0, 1] },
              },
            },
          },
          key: "map_mode_bot",
        },
      ],
    },
    far_text: { type: Value.UNQUOTED },
    near_text: { type: Value.UNQUOTED, cardinality: [0, 1] },
    update_daily: { type: Value.BOOL, cardinality: [0, 1] },
  },
};

const enums: Rule = {
  children: {
    enum: {
      type: Value.ARRAY,
      children: [
        {
          children: {
            name: { type: Value.UNQUOTED },
          },
          key: "map_modes",
        },
        {
          children: {
            none: { type: Value.UNQUOTED },
            country: { type: Value.UNQUOTED },
            state: { type: Value.UNQUOTED },
            faction: { type: Value.UNQUOTED },
            player: { type: Value.UNQUOTED },
          },
          key: "far_text_type",
        },
        {
          children: {
            none: { type: Value.UNQUOTED },
            country: { type: Value.UNQUOTED },
            state: { type: Value.UNQUOTED },
            state_controller: { type: Value.UNQUOTED },
            game_map_mode_country: { type: Value.UNQUOTED },
            game_map_mode_states: { type: Value.UNQUOTED },
            game_map_mode_diplomacy: { type: Value.UNQUOTED },
            game_map_mode_players: { type: Value.UNQUOTED },
            game_map_mode_factions: { type: Value.UNQUOTED },
            game_map_mode_ideology: { type: Value.UNQUOTED },
          },
          key: "map_mode_type",
        },
      ],
    },
  },
};