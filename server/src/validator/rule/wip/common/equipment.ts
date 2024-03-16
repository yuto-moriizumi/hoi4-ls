const types: Rule = {
  children: {
    type: [
      {
        context: Context.EQUIPMENT,
        skip_root_keys: ["equipments", "duplicate_archetypes"],
        path: "game/common/units/equipment",
        children: {
          subtype: [
            {
              context: Context.ARCHETYPE_EQUIP,
              children: {
                is_archetype: { type: Value.BOOL, cardinality: [0, 1], defaultValue: true },
                only_duplicate_archetype: { type: Value.BOOL, cardinality: [0, 1], defaultValue: true },
                is_chassis: { type: Value.BOOL, cardinality: [0, 1] },
                variant_name: {
                  children: {
                    value_set: { context: Context.EQUIPMENT_VARIANT, type: Value.UNQUOTED, cardinality: [1, "inf"] },
                  },
                },
              },
            },
            {
              context: Context.REGULAR_EQUIP,
              children: {
                is_archetype: { type: Value.BOOL, cardinality: [0, 1], defaultValue: false },
              },
            },
            {
              context: Context.NAVAL_EQUIP,
              children: {
                type: { type: Value.ENUM, context: Context.SHIP_UNITS, cardinality: [0, 1] },
                archetype: { type: Value.UNQUOTED, cardinality: [0, 1] },
              },
            },
            {
              context: Context.ARMOR_EQUIP,
              children: {
                type: { type: Value.ENUM, context: Context.LAND_UNITS, cardinality: [0, 1] },
                archetype: { type: Value.UNQUOTED, cardinality: [0, 1] },
              },
            },
            {
              context: Context.AIR_EQUIP,
              children: {
                type: { type: Value.ENUM, context: Context.AIR_UNITS, cardinality: [0, 1] },
                archetype: { type: Value.UNQUOTED, cardinality: [0, 1] },
              },
            },
            {
              context: Context.DESIGNABLE_EQUIP,
              children: {
                module_slots: [{ provide: { context: Context.MODULE_SLOTS, scope: Scope.COUNTRY } }],
              },
            },
          ],
        },
      },
      {
        context: Context.UPGRADE,
        skip_root_keys: ["upgrades"],
        path: "game/common/units/equipment/upgrades",
        children: {
          subtype: [
            {
              context: Context.NAVAL_UPGRADE,
              children: {
                cost: { type: Value.UNQUOTED },
              },
            },
            {
              context: Context.AIR_UPGRADE,
              children: {
                cost: { type: Value.UNQUOTED },
              },
            },
            {
              context: Context.LAND_UPGRADE,
              children: {
                cost: { type: Value.UNQUOTED },
              },
            },
          ],
        },
      },
      {
        context: Context.MODULE,
        skip_root_keys: ["equipment_modules"],
        path: "game/common/units/equipment/modules",
      },
      {
        context: Context.CRITICAL_PART,
        skip_root_keys: ["critical_parts"],
        path: "game/common/units/critical_parts",
      },
      {
        context: Context.DUPLICATE_ARCHETYPES,
        skip_root_keys: ["duplicate_archetypes"],
        path: "game/common/units/equipment",
      },
    ],
  },
};

const equipment: Rule = {
  children: {
    year: { type: Value.INT, cardinality: [0, 1] },
    is_archetype: { type: Value.BOOL, cardinality: [0, 1] },
    is_buildable: { type: Value.BOOL, cardinality: [0, 1] },
    is_convertable: { type: Value.BOOL, cardinality: [0, 1] },
    one_use_only: { type: Value.BOOL, cardinality: [0, 1] },
    active: { type: Value.BOOL, cardinality: [0, 1] },
    can_license: { type: Value.BOOL, cardinality: [0, 1] },
    sprite: { type: Value.UNQUOTED, cardinality: [0, 1] },
    provide: { context: Context.UNIT, scope: Scope.COUNTRY },
    interface_category: { type: Value.ENUM, context: Context.INTERFACE_CATEGORY, cardinality: [0, 1] },
    priority: [
      { type: Value.INT, cardinality: [0, 1] },
      {
        children: {
          enum: { context: Context.BASE_FACTOR, type: Value.FLOAT, cardinality: [0, 1] },
        },
      },
    ],
    can_be_produced: { provide: { context: Context.TRIGGER, scope: Scope.COUNTRY } },
    can_be_lend_leased: { provide: { context: Context.TRIGGER, scope: Scope.COUNTRY } },
    supply_truck: { type: Value.BOOL, cardinality: [0, 1] },
    subtype: {
      children: {
        archetype_equip: {
          children: {
            picture: { type: Value.UNQUOTED },
            group_by: { type: Value.ENUM, context: Context.EQUIP_GROUP_BY, cardinality: [0, 1] },
            family: { type: Value.UNQUOTED, cardinality: [0, 1] },
            interface_category: { type: Value.ENUM, context: Context.INTERFACE_CATEGORY, cardinality: [0, 1] },
            only_duplicate_archetype: { type: Value.BOOL, cardinality: [0, 1], defaultValue: true },
            variant_name: {
              children: {
                value_set: { context: Context.EQUIPMENT_VARIANT, type: Value.UNQUOTED, cardinality: [1, "inf"] },
              },
            },
            module_slots: { type: Value.UNQUOTED, cardinality: [0, 1] },
            for_each: {
              children: {},
            },
            forbid_mission_type: { type: Value.ENUM, context: Context.ALLOWED_AIR_UNIT_MISSIONS, cardinality: [1, "inf"] },
          },
        },
        air_equip: {
          children: {
            carrier_capable: { type: Value.BOOL, cardinality: [0, 1], defaultValue: true },
            air_map_icon_frame: { type: Value.INT, cardinality: [0, 1] },
            interface_overview_category_index: { type: Value.INT, cardinality: [0, 1] },
            allowed_types: { type: Value.ENUM, context: Context.AIR_UNITS, cardinality: [0, 1] },
            allow_mission_type: { type: Value.ENUM, context: Context.ALLOWED_AIR_UNIT_MISSIONS, cardinality: [0, 1] },
            type_override: { type: Value.ENUM, context: Context.MODULE_SLOTS, cardinality: [0, 1] },
            substitute: { type: Value.UNQUOTED, cardinality: [0, 1] },
            derived_variant_name: { type: Value.UNQUOTED, cardinality: [0, 1] },
            ai_type: { type: Value.ENUM, context: Context.ALLOWED_AI_TYPE_PLANES, cardinality: [0, 1] },
          },
        },
        regular_equip: {
          children: {
            abbreviation: { type: Value.UNQUOTED, cardinality: [0, 1] },
            derived_variant_name: { type: Value.UNQUOTED, cardinality: [0, 1] },
            archetype: { type: Value.UNQUOTED, cardinality: [0, 1] },
            parent: { type: Value.UNQUOTED, cardinality: [0, 1] },
          },
        },
      },
    },
    type: [
      { type: Value.ENUM, context: Context.UNIT_TYPES, cardinality: [0, 1] },
      {
        children: {},
      },
    ],
    provide: [
      { context: Context.UNIT_STAT, scope: Scope.COUNTRY },
      { context: Context.NAVAL_STAT, scope: Scope.COUNTRY },
      { context: Context.AIR_STAT, scope: Scope.COUNTRY },
    ],
    offensive_weapons: { type: Value.BOOL, cardinality: [0, 1] },
    resources: {
      children: {
        resource: { type: Value.INT, cardinality: [1, "inf"] },
      },
    },
    upgrades: [
      { provide: { context: Context.UPGRADE, scope: Scope.COUNTRY } },
    ],
  },
};

const upgrade: Rule = {
  children: {
    abbreviation: { type: Value.UNQUOTED, cardinality: [0, 1] },
    max_level: { type: Value.INT },
    provide: [
      { context: Context.UNIT_STAT, scope: Scope.COUNTRY },
      { context: Context.NAVAL_STAT, scope: Scope.COUNTRY },
      { context: Context.AIR_STAT, scope: Scope.COUNTRY },
    ],
    subtype: [
      {
        context: Context.NAVAL_UPGRADE,
        children: {
          cost: { type: Value.UNQUOTED },
          provide: { context: Context.NAVAL_STAT, scope: Scope.COUNTRY },
        },
      },
      {
        context: Context.AIR_UPGRADE,
        children: {
          cost: { type: Value.UNQUOTED },
          provide: { context: Context.AIR_STAT, scope: Scope.COUNTRY },
        },
      },
      {
        context: Context.LAND_UPGRADE,
        children: {
          cost: { type: Value.UNQUOTED },
          level_requirement: {
            children: {
              int: { provide: { context: Context.TRIGGER, scope: Scope.COUNTRY } },
            },
          },
        },
      },
    ],
  },
};

const module: Rule = {
  children: {
    abbreviation: { type: Value.UNQUOTED, cardinality: [0, 1] },
    category: { type: Value.ENUM, context: Context.MODULE_CATEGORIES },
    gui_category: { type: Value.ENUM, context: Context.MODULE_CATEGORIES, cardinality: [0, 1] },
    parent: { type: Value.UNQUOTED, cardinality: [0, 1] },
    gfx: { type: Value.UNQUOTED, cardinality: [0, 1] },
    sfx: { type: Value.UNQUOTED, cardinality: [0, 1] },
    add_equipment_type: [
      { type: Value.ENUM, context: Context.UNIT_TYPES, cardinality: [0, 1] },
      {
        children: {},
      },
    ],
    add_stats: {
      provide: [
        { context: Context.UNIT_STAT, scope: Scope.COUNTRY },
        { context: Context.NAVAL_STAT, scope: Scope.COUNTRY },
        { context: Context.AIR_STAT, scope: Scope.COUNTRY },
      ],
    },
    manpower: { type: Value.INT, cardinality: [0, 1] },
    build_cost_resources: {
      children: {
        resource: { type: Value.INT, cardinality: [0, 10] },
      },
    },
  },
};

const critical_part: Rule = {
  children: {
    icon: { type: Value.UNQUOTED },
    frame: { type: Value.INT },
    stat_penalties: { provide: { context: Context.NAVAL_STAT, scope: Scope.COUNTRY } },
    modifier: { provide: { context: Context.NAVAL_STAT, scope: Scope.COUNTRY } },
    str_damage: { type: Value.FLOAT, cardinality: [0, 1] },
    org_damage: { type: Value.FLOAT, cardinality: [0, 1] },
    str_damage_multiplier: { type: Value.FLOAT, cardinality: [0, 1] },
    org_damage_multiplier: { type: Value.FLOAT, cardinality: [0, 1] },
    chance: { type: Value.FLOAT, cardinality: [0, 1] },
    base_damage_instance: { type: Value.FLOAT, cardinality: [0, 1] },
    damage_instance_per_added_module: { type: Value.FLOAT, cardinality: [0, 1] },
    max_damage_instance: { type: Value.FLOAT, cardinality: [0, 1] },
  },
};