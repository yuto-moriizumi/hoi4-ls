const types: Rule = {
  children: {
    type: {
      ai_area: {
        path: { type: Value.UNQUOTED },
        skip_root_key: { type: Value.UNQUOTED, optional: true },
        children: {},
      },
      ai_focus: {
        path: { type: Value.UNQUOTED },
        subtype: {
          research: {
            children: {},
          },
          national_focuses: {
            children: {
              ai_national_focuses: {
                children: {
                  focus: { type: Value.UNQUOTED, cardinality: [0, "inf"] },
                  shared_focus: { type: Value.UNQUOTED, cardinality: [0, "inf"] },
                },
              },
            },
          },
        },
      },
      ai_peace: {
        path: { type: Value.UNQUOTED },
        children: {},
      },
      ai_template: {
        path: { type: Value.UNQUOTED },
        children: {},
      },
      ai_equipment_design_group: {
        path: { type: Value.UNQUOTED },
        children: {},
      },
      ai_equipment_design: {
        path: { type: Value.UNQUOTED },
        skip_root_key: { type: Value.UNQUOTED, optional: true },
        children: {},
        provide: [
          { context: Context.TRIGGER, scope: Scope.COUNTRY },
          { context: Context.TRIGGER, scope: Scope.COUNTRY },
        ],
      },
    },
  },
};

const ai_area: Rule = {
  children: {
    continents: { type: Value.UNQUOTED, cardinality: [1, "inf"] },
    strategic_regions: { type: Value.UNQUOTED, cardinality: [0, "inf"] },
  },
};

const ai_focus: Rule = {
  children: {
    research: {
      children: {
        research: {
          children: {
            enum: {
              ai_research_areas: { type: Value.FLOAT, cardinality: [0, "inf"] },
              tech_category: { type: Value.FLOAT, cardinality: [0, "inf"] },
            },
          },
        },
      },
    },
    national_focuses: {
      children: {
        ai_national_focuses: {
          children: {
            focus: { type: Value.UNQUOTED, cardinality: [0, "inf"] },
            shared_focus: { type: Value.UNQUOTED, cardinality: [0, "inf"] },
          },
        },
      },
    },
  },
};

const ai_peace: Rule = {
  children: {
    enable: { provide: { context: Context.TRIGGER, scope: Scope.COUNTRY } },
    annex_randomness: { type: Value.INT },
    liberate_randomness: { type: Value.INT },
    puppet_randomness: { type: Value.INT },
    take_states_randomness: { type: Value.INT },
    force_government_randomness: { type: Value.INT },
    build_temp_vars: {
      cardinality: [0, 1],
      provide: { context: Context.TRIGGER, scope: Scope.COUNTRY },
    },
    annex: {
      cardinality: [0, 1],
      children: {
        base_factor: { type: Value.FLOAT },
        modifier_rule: { provide: { context: Context.TRIGGER, scope: Scope.COUNTRY } },
      },
    },
    liberate: {
      cardinality: [0, 1],
      children: {
        base_factor: { type: Value.FLOAT },
        modifier_rule: { provide: { context: Context.TRIGGER, scope: Scope.COUNTRY } },
      },
    },
    puppet: {
      cardinality: [0, 1],
      children: {
        base_factor: { type: Value.FLOAT },
        modifier_rule: { provide: { context: Context.TRIGGER, scope: Scope.COUNTRY } },
      },
    },
    puppet_all: {
      cardinality: [0, 1],
      children: {
        base_factor: { type: Value.FLOAT },
        modifier_rule: { provide: { context: Context.TRIGGER, scope: Scope.COUNTRY } },
      },
    },
    puppet_state: {
      cardinality: [0, 1],
      provide: { context: Context.TRIGGER, scope: Scope.STATE },
      children: {
        base_factor: { type: Value.FLOAT },
        modifier_rule: { provide: { context: Context.TRIGGER, scope: Scope.STATE } },
      },
    },
    take_states: {
      cardinality: [0, 1],
      provide: { context: Context.TRIGGER, scope: Scope.COUNTRY },
      children: {
        base_factor: { type: Value.FLOAT },
        modifier_rule: { provide: { context: Context.TRIGGER, scope: Scope.STATE } },
      },
    },
    force_government: {
      cardinality: [0, 1],
      children: {
        base_factor: { type: Value.FLOAT },
        modifier_rule: { provide: { context: Context.TRIGGER, scope: Scope.COUNTRY } },
      },
    },
  },
};

const ai_template: Rule = {
  children: {
    roles: { type: Value.UNQUOTED, cardinality: [0, "inf"] },
    available_for: { type: Value.UNQUOTED, cardinality: [0, 1] },
    blocked_for: { type: Value.UNQUOTED, cardinality: [0, 1] },
    match_to_count: { type: Value.FLOAT },
    upgrade_prio: { 
      children: {
        base_factor: { type: Value.FLOAT },
        modifier_rule: { provide: { context: Context.TRIGGER, scope: Scope.COUNTRY } },
      },
    },
    scalar: { 
      children: {
        upgrade_prio: { 
          children: {
            base_factor: { type: Value.FLOAT },
            modifier_rule: { provide: { context: Context.TRIGGER, scope: Scope.COUNTRY } },
          },
        },
        // Further structure follows the pattern shown above
      },
      cardinality: [1, 10],
    },
  },
};

const ai_equipment_design_group: Rule = {
  children: {
    category: { type: Value.UNQUOTED },
    blocked_for: { type: Value.UNQUOTED, cardinality: [0, 1] },
    available_for: { type: Value.UNQUOTED, cardinality: [0, 1] },
    roles: { type: Value.UNQUOTED },
    priority: { 
      children: {
        base_factor: { type: Value.FLOAT },
        modifier_rule: { provide: { context: Context.TRIGGER, scope: Scope.COUNTRY } },
      },
      cardinality: [0, 1],
    },
    ai_equipment_design: {
      design: {
        priority: { 
          children: {
              base_factor: { type: Value.FLOAT },
              modifier_rule: { provide: { context: Context.TRIGGER, scope: Scope.COUNTRY } },
          },
          cardinality: [0, 1],
        },
        name: { type: Value.UNQUOTED, optional: true },
        role_icon_index: { type: Value.INT, optional: true },
        enable: { provide: { context: Context.TRIGGER, scope: Scope.COUNTRY }, optional: true },
        visible: { type: Value.BOOL, optional: true },
        target_variant: { children: {}, cardinality: [0, 1] },
        requirements: { children: {}, optional: true },
        allowed_modules: { type: Value.UNQUOTED, cardinality: [0, "inf"] },
      },
      cardinality: [1, "inf"],
    },
  },
};