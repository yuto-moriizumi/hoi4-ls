const types: Rule = {
  children: [
    {
      type: {
        cardinality: [0, "inf"],
        children: {
          path: { type: Value.UNQUOTED },
          name_field: { type: Value.UNQUOTED },
        },
      },
    },
    {
      type: {
        cardinality: [0, "inf"],
        children: {
          path: { type: Value.UNQUOTED },
          skip_root_key: { type: Value.UNQUOTED },
        },
      },
    },
  ],
};

const state: Rule = {
  children: {
    id: { type: Value.UNQUOTED },
    name: { type: Value.UNQUOTED },
    resources: {
      cardinality: [0, "inf"],
      children: {
        resource: { type: Value.UNQUOTED, cardinality: [0, "inf"] },
      },
    },
    history: {
      cardinality: [0, "inf"],
      children: {
        owner: { type: Value.UNQUOTED },
        controller: { type: Value.UNQUOTED, cardinality: [0, 1] },
        victory_points: {
          cardinality: [2, 2],
          children: {
            provinces: { type: Value.UNQUOTED },
          },
        },
        buildings: {
          cardinality: [0, "inf"],
          children: {
            building: { type: Value.UNQUOTED, cardinality: [0, "inf"] },
            provinces: {
              cardinality: [0, "inf"],
              children: {
                building: { type: Value.UNQUOTED, cardinality: [0, "inf"] },
              },
            },
          },
        },
        date_field: {
          cardinality: [0, "inf"],
          children: {
            owner: { type: Value.UNQUOTED, cardinality: [0, 1] },
            controller: { type: Value.UNQUOTED, cardinality: [0, 1] },
            victory_points: {
              cardinality: [2, 2],
              children: {
                provinces: { type: Value.UNQUOTED },
              },
            },
            buildings: {
              cardinality: [0, "inf"],
              children: {
                building_state: { type: Value.UNQUOTED, cardinality: [0, "inf"] },
                provinces: {
                  cardinality: [0, "inf"],
                  children: {
                    building_provincial: { type: Value.UNQUOTED, cardinality: [0, "inf"] },
                  },
                },
              },
            },
          },
        },
        provide: { context: Context.EFFECT, scope: Scope.STATE },
      },
    },
    local_supplies: { type: Value.UNQUOTED, cardinality: [0, 1] },
    provinces: {
      cardinality: [0, "inf"],
      children: {
        provinces: { type: Value.UNQUOTED, cardinality: [0, "inf"] },
      },
    },
    manpower: { type: Value.UNQUOTED },
    buildings_max_level_factor: { type: Value.UNQUOTED, cardinality: [0, 1] },
    state_category: { type: Value.UNQUOTED },
    impassable: { type: Value.BOOL, cardinality: [0, 1], defaultValue: true },
  },
};

const state_category: Rule = {
  children: {
    local_building_slots: { type: Value.UNQUOTED },
    color: { type: Value.UNQUOTED, cardinality: [3, 3] },
  },
};