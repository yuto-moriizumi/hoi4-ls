const types: Rule = {
  children: {
    type_country_file: {
      children: {
        path: { type: Value.UNQUOTED },
        type_per_file: { type: Value.BOOL, defaultValue: true },
        subtype_country: {
          type: Value.ARRAY,
          children: {
            color: { type: Value.UNQUOTED, cardinality: [0, "inf"] },
            graphical_culture: { type: Value.UNQUOTED, cardinality: [0, "inf"] },
            graphical_culture_2d: { type: Value.UNQUOTED, cardinality: [0, "inf"] },
          },
        },
        subtype_cosmetic: {
          cardinality: [1, "inf"],
          children: {
            scalar: {
              children: {
                color: {
                  type: Value.ARRAY,
                  children: [
                    { type: Value.UNQUOTED, cardinality: [3, 3] },
                    { type: Value.UNQUOTED, cardinality: [3, 3] },
                  ],
                },
                color_ui: {
                  type: Value.ARRAY,
                  cardinality: [0, 1],
                  children: [
                    { type: Value.UNQUOTED, cardinality: [3, 3] },
                    { type: Value.UNQUOTED, cardinality: [3, 3] },
                  ],
                },
              },
            },
          },
        },
      },
    },
    type_country_tag_file: {
      children: {
        path: { type: Value.UNQUOTED },
        type_per_file: { type: Value.BOOL, defaultValue: true },
      },
    },
  },
};

const country_tag_file: Rule = {
  children: {
    dynamic_tags: { type: Value.BOOL, cardinality: [0, 1] },
    scalar: { type: Value.UNQUOTED, cardinality: [0, "inf"] },
  },
};

const country_file: Rule = {
  children: {
    subtype_country: {
      cardinality: [0, "inf"],
      children: {
        graphical_culture: { type: Value.UNQUOTED },
        graphical_culture_2d: { type: Value.UNQUOTED },
        color: {
          type: Value.ARRAY,
          children: [
            { type: Value.UNQUOTED, cardinality: [3, 3] },
            { type: Value.UNQUOTED, cardinality: [3, 3] },
          ],
        },
      },
    },
    subtype_cosmetic: {
      cardinality: [1, "inf"],
      children: {
        scalar: {
          children: {
            color: {
              type: Value.ARRAY,
              children: [
                { type: Value.UNQUOTED, cardinality: [3, 3] },
                { type: Value.UNQUOTED, cardinality: [3, 3] },
              ],
            },
            color_ui: {
              type: Value.ARRAY,
              cardinality: [0, 1],
              children: [
                { type: Value.UNQUOTED, cardinality: [3, 3] },
                { type: Value.UNQUOTED, cardinality: [3, 3] },
              ],
            },
          },
        },
      },
    },
  },
};

const enums: Rule = {
  children: {
    complex_enum_country_tags: {
      children: {
        path: { type: Value.UNQUOTED },
        start_from_root: { type: Value.BOOL, defaultValue: true },
        name: {
          children: {
            enum_name: { type: Value.UNQUOTED },
          },
        },
      },
    },
    complex_enum_explicit_country_tags: {
      children: {
        path: { type: Value.UNQUOTED },
        start_from_root: { type: Value.BOOL, defaultValue: true },
        name: {
          children: {
            enum_name: { type: Value.UNQUOTED },
          },
        },
      },
    },
  },
};