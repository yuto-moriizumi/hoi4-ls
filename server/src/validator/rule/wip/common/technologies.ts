const types: Rule = {
  children: [
    {
      type: { type: Value.UNQUOTED, provide: { context: Context.TECHNOLOGY, scope: Scope.GLOBAL } },
      children: {
        skip_root_key: { type: Value.UNQUOTED },
        path: { type: Value.UNQUOTED },
        subtype: {
          children: [
            { doctrine: { type: Value.BOOL } },
            {
              folder: {
                children: {
                  name: { type: Value.UNQUOTED },
                  position: { children: { x: { type: Value.UNQUOTED }, y: { type: Value.UNQUOTED } } },
                },
              },
            },
            {
              folder: {
                children: {
                  name: { type: Value.UNQUOTED },
                  position: { children: { x: { type: Value.UNQUOTED }, y: { type: Value.UNQUOTED } } },
                },
              },
            },
          ],
        },
      },
    },
    {
      type: {
        type: Value.UNQUOTED,
        provide: { context: Context.TECH_SHARING_GROUP, scope: Scope.GLOBAL },
        children: {
          path: { type: Value.UNQUOTED },
          name_field: { type: Value.UNQUOTED },
        },
      },
    },
  ],
};

const technology: Rule = {
  children: {
    doctrine_name: { type: Value.UNQUOTED, cardinality: [0, 1] },
    show_equipment_icon: { type: Value.BOOL, cardinality: [0, 1] },
    desc: { type: Value.UNQUOTED, cardinality: [0, 1] },
    xp_research_type: { type: Value.UNQUOTED, cardinality: [0, 1] },
    xp_research_cost: { type: Value.UNQUOTED, cardinality: [0, 1] },
    xp_boost_cost: { type: Value.UNQUOTED, cardinality: [0, 1] },
    xp_research_bonus: { type: Value.UNQUOTED, cardinality: [0, 1] },
    subtype: { children: { xp_unlock_cost: { type: Value.UNQUOTED } }, cardinality: [0, 1] },
    allow: { provide: { context: Context.TRIGGER, scope: Scope.TECHNOLOGY }, cardinality: ["~1", "inf"] },
    allow_branch: { provide: { context: Context.TRIGGER, scope: Scope.TECHNOLOGY }, cardinality: ["~1", "inf"] },
    xor: { children: [{ '<technology>': { type: Value.UNQUOTED, cardinality: ["~1", "inf"] } }], cardinality: [0, 1] },
    enable_subunits: { children: [{ '<unit>': { type: Value.UNQUOTED, cardinality: ["~1", "inf"] } }], cardinality: [0, "inf"] },
    enable_equipments: {
      children: [
        { limit: { provide: { context: Context.TRIGGER, scope: Scope.EQUIPMENT }, cardinality: [0, 1] } },
        { '<equipment>': { type: Value.UNQUOTED, cardinality: [0, "inf"] } },
        { '<duplicate_archetypes>': { type: Value.UNQUOTED, cardinality: [0, "inf"] } },
        { subtype: { children: { value_set: { type: Value.UNQUOTED, cardinality: ["~1", "inf"] } }, cardinality: [0, "inf"] } },
        { subtype: { children: { value_set: { type: Value.UNQUOTED, cardinality: ["~1", "inf"] } }, cardinality: [0, "inf"] } },
      ],
      cardinality: [0, "inf"]
    },
    enable_equipment_modules: { children: [{ '<module>': { type: Value.UNQUOTED, cardinality: ["~1", "inf"] } }], cardinality: [0, "inf"] },
    enable_building: {
      children: [
        { building: { type: Value.UNQUOTED } },
        { level: { type: Value.UNQUOTED } },
      ],
      cardinality: [0, "inf"]
    },
    enable_tactic: { type: Value.UNQUOTED, cardinality: [0, "inf"] },
    sub_technologies: { children: [{ '<technology>': { type: Value.UNQUOTED, cardinality: ["~1", 3] } }], cardinality: [0, 1] },
    path: {
      children: [
        { leads_to_tech: { type: Value.UNQUOTED } },
        { research_cost_coeff: { type: Value.UNQUOTED } },
      ],
      cardinality: [0, "inf"]
    },
    dependencies: { children: [{ '<technology>': { type: Value.UNQUOTED } }], cardinality: [0, 1] },
    research_cost: { type: Value.UNQUOTED, cardinality: [0, 1] },
    start_year: { type: Value.UNQUOTED, cardinality: [0, 1] },
    sub_tech_index: { type: Value.UNQUOTED, cardinality: [0, 1] },
    folder: {
      children: {
        name: { type: Value.UNQUOTED },
        position: { children: { x: { type: Value.UNQUOTED }, y: { type: Value.UNQUOTED } } },
      },
      cardinality: [0, "inf"]
    },
    doctrine: { type: Value.BOOL, cardinality: [0, 1] },
    ai_will_do: {
      children: [
        { base_factor: { type: Value.UNQUOTED } },
      ],
      provide: { context: Context.MODIFIER_RULE, scope: Scope.TECHNOLOGY },
      cardinality: [0, 1]
    },
    ai_research_weights: {
      children: [
        { enum: { type: Value.UNQUOTED, cardinality: [0, "inf"] } },
        { enum: { type: Value.UNQUOTED, cardinality: [0, "inf"] } },
        { enum: { type: Value.UNQUOTED, cardinality: [0, "inf"] } },
        { '<resource>': { type: Value.UNQUOTED, cardinality: [0, "inf"] } },
      ],
      cardinality: [0, 1]
    },
    categories: { children: [{ enum: { type: Value.UNQUOTED, cardinality: ["~1", "inf"] } }], cardinality: [0, 1] },
    enum: {
      children: [
        { unit_category: { children: { alias: { provide: { context: Context.STAT, scope: Scope.UNIT } } } } },
      ],
      cardinality: [0, "inf"]
    },
    '<unit>': {
      children: [
        { need: { children: { '<equipment>': { type: Value.UNQUOTED } }, cardinality: [1, "inf"] } },
        { battalion_mult: { children: { category: { type: Value.UNQUOTED }, add: { type: Value.BOOL } }, cardinality: [0, "inf"] } },
        { enum: { children: { alias: { provide: { context: Context.STAT, scope: Scope.UNIT } } } } },
      ],
      cardinality: [0, "inf"]
    },
    modifier: { provide: { context: Context.MODIFIER, scope: Scope.TECHNOLOGY }, cardinality: [0, 1] },
    on_research_complete_limit: { provide: { context: Context.TRIGGER, scope: Scope.TECHNOLOGY }, cardinality: [0, 1] },
    on_research_complete: { provide: { context: Context.EFFECT, scope: Scope.TECHNOLOGY }, cardinality: [0, 1] },
    force_use_small_tech_layout: { type: Value.BOOL, cardinality: [0, 1] },
    show_effect_as_desc: { type: Value.BOOL, cardinality: [0, 1] },
    nuclear_production: { type: Value.UNQUOTED, cardinality: [0, 1] },
  },
};

const tech_sharing_group: Rule = {
  children: {
    id: { type: Value.UNQUOTED },
    name: { type: Value.UNQUOTED },
    desc: { type: Value.UNQUOTED },
    picture: { type: Value.UNQUOTED },
    research_sharing_per_country_bonus: { type: Value.UNQUOTED },
    is_faction_sharing: { type: Value.BOOL, cardinality: [0, 1] },
    categories: { children: { enum: { type: Value.UNQUOTED, cardinality: ["~1", "inf"] } }, cardinality: [0, 1] },
    available: { provide: { context: Context.TRIGGER, scope: Scope.TECH_SHARING_GROUP }, cardinality: [0, 1] },
  },
};

const enums: Rule = {
  children: [
    {
      complex_enum: {
        type: Value.UNQUOTED,
        provide: { context: Context.TECH_CATEGORY, scope: Scope.GLOBAL },
        children: {
          path: { type: Value.UNQUOTED },
          start_from_root: { type: Value.BOOL },
          name: {
            children: {
              technology_categories: { children: { enum_name: { type: Value.UNQUOTED } } },
            },
          },
        },
      },
    },
    {
      complex_enum: {
        type: Value.UNQUOTED,
        provide: { context: Context.TECH_FOLDER, scope: Scope.GLOBAL },
        children: {
          path: { type: Value.UNQUOTED },
          start_from_root: { type: Value.BOOL },
          name: {
            children: {
              technology_folders: {
                children: {
                  enum_name: { type: Value.UNQUOTED },
                  enum_name: {},
                },
              },
            },
          },
        },
      },
    },
  ],
};