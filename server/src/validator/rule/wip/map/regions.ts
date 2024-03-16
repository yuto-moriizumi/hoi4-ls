const types: Rule = {
  children: {
    supply_area: {
      path: { type: Value.UNQUOTED },
      name_field: { type: Value.UNQUOTED },
    },
    strategic_region: {
      path: { type: Value.UNQUOTED },
      name_field: { type: Value.UNQUOTED },
    },
  },
};

const supply_area: Rule = {
  children: {
    id: { type: Value.INT },
    name: { type: Value.UNQUOTED },
    value: { type: Value.INT },
    states: {
      cardinality: [1, "inf"],
      children: {
        state: { type: Value.UNQUOTED },
      },
    },
  },
};

const strategic_region: Rule = {
  children: {
    id: { type: Value.INT },
    name: { type: Value.UNQUOTED },
    provinces: {
      cardinality: [0, "inf"],
      children: {
        provinces: { type: Value.ENUM },
      },
    },
    naval_terrain: {
      cardinality: [0, 1],
      type: Value.UNQUOTED,
    },
    static_modifiers: {
      cardinality: [1, "inf"],
      children: {
        static_modifier: { type: Value.UNQUOTED, cardinality: ["always", "always"] },
      },
    },
    weather: {
      cardinality: [0, "inf"],
      children: {
        period: {
          children: {
            between: {
              cardinality: [2, 2],
              children: {
                float: { type: Value.FLOAT },
              },
            },
            temperature: {
              cardinality: [2, 2],
              type: Value.FLOAT,
            },
            temperature_day_night: {
              cardinality: [2, 2],
              children: {
                float: { type: Value.FLOAT },
              },
            },
            enum: {
              cardinality: [7, 8],
              type: Value.FLOAT,
            },
            min_snow_level: { type: Value.FLOAT },
          },
        },
      },
    },
  },
};

const enums: Rule = {
  children: {
    region_weather: {
      children: {
        no_phenomenon: { type: Value.UNQUOTED },
        rain_light: { type: Value.UNQUOTED },
        rain_heavy: { type: Value.UNQUOTED },
        snow: { type: Value.UNQUOTED },
        blizzard: { type: Value.UNQUOTED },
        arctic_water: { type: Value.UNQUOTED },
        mud: { type: Value.UNQUOTED },
        sandstorm: { type: Value.UNQUOTED },
      },
    },
    provinces: {
      path: { type: Value.UNQUOTED },
      name: {
        children: {
          provinces: {
            children: {
              enum_name: { type: Value.UNQUOTED },
            },
          },
        },
      },
    },
  },
};