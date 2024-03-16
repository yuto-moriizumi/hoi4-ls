const triggers: Rule = {
  children: {
    has_resources_in_country: {
      type: Value.OBJECT,
      children: {
        resource: { type: Value.UNQUOTED },
        amount: { type: Value.INT, cardinality: [0, 1] },
      },
    },
    has_bombing_war_support: {
      type: Value.FLOAT,
      cardinality: [0, 1],
      defaultValue: false,
    },
    has_convoys_war_support: {
      type: Value.FLOAT,
      cardinality: [0, 1],
      defaultValue: false,
    },
    has_casualties_war_support: {
      type: Value.FLOAT,
      cardinality: [0, 1],
      defaultValue: false,
    },
    impassable: {
      type: Value.BOOL,
    },
    has_intelligence_agency: {
      type: Value.BOOL,
    },
    has_core_occupation_modifier: {
      type: Value.OBJECT,
      children: {
        occupied_country_tag: { type: Value.UNQUOTED },
        modifier: { type: Value.UNQUOTED },
      },
    },
    controls_province: {
      type: Value.UNQUOTED,
      cardinality: [0, "inf"],
    },
    hidden_trigger: {
      type: Value.OBJECT,
      children: {
        // Dynamic, based on usage context
      },
    },
    enum: {
      type: Value.OBJECT,
      children: {
        unit_types: { type: Value.UNQUOTED, cardinality: [0, 1] },
      },
    },
    opponent: {
      type: Value.OBJECT,
      children: {
        // Dynamic, based on usage context
      },
    },
    ideology: {
      type: Value.INT,
      cardinality: [0, "inf"],
    },
    building: {
      type: Value.INT,
      cardinality: [0, "inf"],
    },
    is_fighting_in_weather: {
      type: Value.UNQUOTED,
    },
    casualties_inflicted_by: {
      type: Value.OBJECT,
      children: {
        opponent: { type: Value.UNQUOTED },
        thousands: { type: Value.INT },
      },
    },
    has_mined: {
      type: Value.OBJECT,
      children: {
        target: { type: Value.UNQUOTED },
        value: { type: Value.INT },
      },
    },
    received_expeditionary_forces: {
      type: Value.OBJECT,
      children: {
        sender: { type: Value.UNQUOTED },
        value: { type: Value.INT },
      },
    },
    has_mines: {
      type: Value.OBJECT,
      children: {
        region: { type: Value.UNQUOTED },
        amount: { type: Value.INT },
      },
    },
    naval_strength_comparison: {
      type: Value.OBJECT,
      children: {
        other: { type: Value.UNQUOTED, cardinality: [0, 1] },
        tooltip: { type: Value.UNQUOTED, cardinality: [0, 1] },
        ratio: { type: Value.FLOAT, cardinality: [0, 1] },
        sub_unit_def_weights: {
          type: Value.OBJECT,
          // More complex nesting could go here
        },
      },
    },
    fuel_ratio: {
      type: Value.FLOAT,
    },
    days_since_last_strategic_bombing: {
      type: Value.INT,
    },
    mine_threat: {
      type: Value.FLOAT,
    },
    convoy_threat: {
      type: Value.FLOAT,
    },
  },
};