const types: Rule = {
  children: {
    type: {
      cardinality: [0, "inf"],
      children: {
        path: { type: Value.UNQUOTED },
        type_per_file: { type: Value.BOOL },
      },
    },
  },
};

const oob: Rule = {
  children: {
    start_equipment_factor: { type: Value.NUMBER, cardinality: [0, 1] },
    focus: {
      cardinality: [0, 1],
      children: {
        current: { type: Value.UNQUOTED },
        progress: { type: Value.NUMBER, cardinality: [0, "inf"] },
      },
    },
    division_template: {
      cardinality: [0, "inf"],
      children: {
        name: { type: Value.UNQUOTED },
        division_names_group: { type: Value.UNQUOTED, cardinality: [0, 1] },
        override_model: { type: Value.UNQUOTED, cardinality: [0, 1] },
        template_counter: { type: Value.NUMBER, cardinality: [0, 1] },
        is_locked: { type: Value.BOOL, cardinality: [0, 1] },
        force_allow_recruiting: { type: Value.BOOL, cardinality: [0, 1] },
        obsolete: { type: Value.BOOL, cardinality: [0, 1] },
        division_cap: { type: Value.NUMBER, cardinality: [0, 1] },
        regiments: {
          cardinality: [0, "inf"],
          children: {
            // Repetition for each unit type omitted for brevity
          },
        },
        support: {
          cardinality: [0, 1],
          children: {
            // Similar to regiments structure, omitted for brevity
          },
        },
        template_counter: { type: Value.NUMBER, cardinality: [0, 1] },
        priority: { type: Value.NUMBER, cardinality: [0, 1] },
      },
    },
    instant_effect: {
      cardinality: [0, "inf"],
      provide: { context: Context.EFFECT, scope: Scope.COUNTRY },
    },
    units: {
      cardinality: [0, 1],
      children: {
        division: {
          cardinality: [0, "inf"],
          children: {
            name: { type: Value.UNQUOTED, cardinality: [0, 1] },
            division_name: {
              cardinality: [0, 1],
              children: {
                is_name_ordered: { type: Value.BOOL },
                name_order: { type: Value.NUMBER, cardinality: [0, 1] },
              },
            },
            location: { type: Value.UNQUOTED },
            division_template: { type: Value.UNQUOTED },
            // Omission of 'unique' and other repeated structures for brevity
          },
        },
        fleet: {
          cardinality: [0, "inf"],
          children: {
            // Fleet details omitted for brevity
          },
        },
      },
    },
    air_wings: {
      cardinality: [0, 1],
      children: {
        // Air wing details omitted for brevity
      },
    },
    navy_leader: {
      cardinality: [0, "inf"],
      children: {
        name: { type: Value.UNQUOTED },
        desc: { type: Value.UNQUOTED, cardinality: [0, 1] },
        picture: { type: Value.UNQUOTED, cardinality: [0, 1] },
        portrait_path: { type: Value.UNQUOTED, cardinality: [0, 1] },
        flags: {
          cardinality: [0, 1],
          children: {
            // Flags details omitted for brevity
          },
        },
        gfx: { type: Value.UNQUOTED, cardinality: [0, 1] },
        traits: { cardinality: [0, "inf"] },
        skill: { type: Value.NUMBER },
        attack_skill: { type: Value.NUMBER },
        defense_skill: { type: Value.NUMBER },
        maneuvering_skill: { type: Value.NUMBER },
        coordination_skill: { type: Value.NUMBER },
        id: { type: Value.UNQUOTED, cardinality: [0, 1] },
        female: { type: Value.BOOL, cardinality: [0, 1] },
      },
    },
    field_marshal: {
      // Similar to navy_leader, omitted for brevity
    },
    corps_commander: {
      // Similar to navy_leader and field_marshal, omitted for brevity
    },
  },
};