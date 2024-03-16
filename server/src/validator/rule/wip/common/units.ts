const types: Rule = {
  children: {
    type: [
      {
        provide: { context: Context.UNIT, scope: Scope.GLOBAL },
        children: {
          skip_root_key: { type: Value.UNQUOTED },
          path: { type: Value.UNQUOTED },
          path_strict: { type: Value.BOOL, cardinality: [0, 1], defaultValue: true },
          subtype: [
            { children: { group: { type: Value.UNQUOTED } } },
            { children: { group: { type: Value.UNQUOTED } } },
            { children: { group: { type: Value.UNQUOTED } } },
            { children: { group: { type: Value.UNQUOTED } } },
            { children: { group: { type: Value.UNQUOTED } } },
            { children: { group: { type: Value.UNQUOTED } } },
            { children: { group: { type: Value.UNQUOTED } } },
            { children: { group: { type: Value.UNQUOTED } } },
            {
              children: {
                type: { type: Value.ENUM, cardinality: [0, "inf"], enumName: "air_units" },
                group: { type: Value.UNQUOTED }
              }
            },
            {
              children: {
                map_icon_category: { type: Value.ENUM, enumName: "ship_map_icons" }
              }
            }
          ]
        }
      },
      { children: { path: { type: Value.UNQUOTED } } },
      { children: { path: { type: Value.UNQUOTED } } }
    ]
  }
};

const unit: Rule = {
  children: {
    abbreviation: { type: Value.UNQUOTED, cardinality: [0, 1] },
    sprite: { type: Value.UNQUOTED },
    subtype: [
      {
        children: {
          group: { type: Value.UNQUOTED },
          need: {
            children: {
              equipment: { type: Value.INT, cardinality: [0, "inf"] },
              value: { type: Value.INT, cardinality: [0, 1], keyValue: "nsb_armor_variants" }
            }
          },
          ai_priority: { type: Value.INT },
          map_icon_category: { type: Value.ENUM, enumName: "land_map_icons" },
          cavalry: { type: Value.BOOL, cardinality: [0, 1] },
          special_forces: { type: Value.BOOL, cardinality: [0, 1] },
          marines: { type: Value.BOOL, cardinality: [0, 1] },
          mountaineers: { type: Value.BOOL, cardinality: [0, 1] },
          can_be_parachuted: { type: Value.BOOL, cardinality: [0, 1] },
          can_exfiltrate_from_coast: { type: Value.BOOL, cardinality: [0, 1] },
          affects_speed: { type: Value.BOOL, cardinality: [0, 1] },
          transport: { type: Value.UNQUOTED, cardinality: [0, 1] },
          type: { type: Value.ENUM, cardinality: [0, "inf"], enumName: "land_units" },
        }
      },
      {
        children: {
          group: { type: Value.UNQUOTED },
          need: {
            children: {
              equipment: { type: Value.INT, cardinality: [0, "inf"] },
              value: { type: Value.INT, cardinality: [0, 1], keyValue: "nsb_armor_variants" }
            }
          },
          ai_priority: { type: Value.INT },
          map_icon_category: { type: Value.ENUM, enumName: "land_map_icons" },
          cavalry: { type: Value.BOOL, cardinality: [0, 1] },
          special_forces: { type: Value.BOOL, cardinality: [0, 1] },
          marines: { type: Value.BOOL, cardinality: [0, 1] },
          mountaineers: { type: Value.BOOL, cardinality: [0, 1] },
          can_be_parachuted: { type: Value.BOOL, cardinality: [0, 1] },
          can_exfiltrate_from_coast: { type: Value.BOOL, cardinality: [0, 1] },
          affects_speed: { type: Value.BOOL, cardinality: [0, 1] },
          transport: { type: Value.UNQUOTED, cardinality: [0, 1] },
          type: { type: Value.ENUM, cardinality: [0, "inf"], enumName: "land_units" },
        }
      }
      // ... Similar structure for other `subtype` entries
    ],
    priority: { type: Value.INT },
    active: { type: Value.BOOL },
    own_equipment_fuel_consumption_mult: { type: Value.FLOAT, cardinality: [0, 1] },
    essential: { type: Value.UNQUOTED,  cardinality: [0, "inf"] },
    categories: { type: Value.ENUM,  cardinality: [0, "inf"], enumName: "unit_category" }
  }
};

const ship_name: Rule = {
  children: {
    name: { type: Value.UNQUOTED },
    for_countries: {
      type: Value.ENUM,
      cardinality: [0, "inf"],
      enumName: "country_tags"
    },
    can_use: { provide: { context: Context.TRIGGER, scope: Scope.COUNTRY } },
    type: { type: Value.UNQUOTED },
    ship_types: {
      children: {
        equipment: { type: Value.UNQUOTED, cardinality: [0, "inf"], keyValue: "naval_equip" },
        unit: { type: Value.UNQUOTED, cardinality: [0, "inf"], keyValue: "ship_unit" },
        enum: { type: Value.ENUM, cardinality: [0, "inf"], enumName: "ship_units" },
      }
    },
    link_numbering_with: { type: Value.UNQUOTED, cardinality: [0, "inf"], keyValue: "ship_name" },
    prefix: { type: Value.UNQUOTED, cardinality: [0, 1] },
    fallback_name: { type: Value.UNQUOTED, cardinality: [0, 1] },
    unique: { type: Value.UNQUOTED, cardinality: [0, "inf"] },
    unordered: {
      children: {
        int: {
          type: Value.UNQUOTED
        }
      },
      cardinality: [0, "inf"]
    },
    ordered: {
      children: {
        int: {
          type: Value.UNQUOTED,
          cardinality: [1, 2]
        }
      },
      cardinality: [0, "inf"]
    }
  }
};

const division_name: Rule = {
  children: {
    name: { type: Value.UNQUOTED },
    for_countries: { 
      type: Value.ENUM,
      cardinality: [0, "inf"],
      enumName: "country_tags"
    },
    can_use: { provide: { context: Context.TRIGGER, scope: Scope.COUNTRY } },
    division_types: { type: Value.UNQUOTED, cardinality: [0, 1], keyValue: "unit" },
    link_numbering_with: { type: Value.UNQUOTED, cardinality: [0, "inf"], keyValue: "division_name" },
    fallback_name: { type: Value.UNQUOTED, cardinality: [0, 1] },
    unordered: {
      children: {
        int: {
          type: Value.UNQUOTED
        }
      },
      cardinality: [0, "inf"]
    },
    ordered: {
      children: {
        int: {
          type: Value.UNQUOTED,
          cardinality: [1, 2]
        }
      },
      cardinality: [0, "inf"]
    }
  }
};

const enums: Rule = {
  children: {
    enum: {
      type: Value.ENUM,
      children: {
        land_map_icons: { values: ["infantry", "armored", "other"] },
        ship_map_icons: { values: ["ship", "transport", "uboat"] },
        unit_groups: { values: ["infantry", "support", "mobile", "armor"] },
        // Additional enum definitions...
      }
    },
    complex_enum: {
      children: {
        unit_category: {
          children: {
            path: { type: Value.UNQUOTED },
            start_from_root: { type: Value.BOOL, cardinality: [0, 1], defaultValue: true },
            name: {
              children: {
                sub_unit_categories: { type: Value.ENUM, enumName: "enum_name" }
              }
            }
          }
        },
        sub_unit_modifiers: {
          children: {
            path: { type: Value.UNQUOTED },
            start_from_root: { type: Value.BOOL, cardinality: [0, 1], defaultValue: true },
            name: {
              children: {
                sub_unit_modifiers: { type: Value.ENUM, enumName: "enum_name" }
              }
            }
          }
        }
      }
    }
  }
};