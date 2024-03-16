const effects: RuleSet = {
  children: {
    add_collaboration: {
      children: {
        target: { type: Value.REFERENCE, reference: "country" },
        value: { type: Value.VARIABLE_FIELD },
      },
    },
    add_compliance: { type: Value.VARIABLE_FIELD },
    add_decryption: {
      children: {
        target: { type: Value.REFERENCE, reference: "country" },
        amount: { type: Value.VARIABLE_FIELD, optional: true },
        ratio: { type: Value.VARIABLE_FIELD, optional: true },
      },
    },
    add_divisional_commander_xp: { type: Value.INT },
    add_intel: {
      children: {
        target: { type: Value.REFERENCE, reference: "country" },
        civilian_intel: { type: Value.VARIABLE_FIELD, optional: true },
        army_intel: { type: Value.VARIABLE_FIELD, optional: true },
        navy_intel: { type: Value.VARIABLE_FIELD, optional: true },
        airforce_intel: { type: Value.VARIABLE_FIELD, optional: true },
      },
    },
    add_nationality: { type: Value.REFERENCE, reference: "country" },
    add_resistance: { type: Value.VARIABLE_FIELD },
    add_resistance_target: { type: Value.VARIABLE_FIELD },
    add_victory_points: {
      children: {
        province: { type: Value.ENUM, enum: "provinces" },
        value: { type: Value.VARIABLE_FIELD_32 },
      },
    },
    capture_operative: {
      children: {
        operative: { type: Value.REFERENCE, reference: "operative", optional: true },
        captured_by: { type: Value.REFERENCE, reference: "country", optional: true },
        ignore_death_chance: { type: Value.BOOL, optional: true },
      },
    },
    create_dynamic_country: {
      children: {
        original_tag: { type: Value.REFERENCE, reference: "country" },
        copy_tag: { type: Value.REFERENCE, reference: "country", optional: true },
      },
    },
    delete_units: {
      children: {
        division_template: { type: Value.SCALAR },
        disband: { type: Value.BOOL, optional: true },
      },
    },
    execute_operation_coordinated_strike: {
      children: {
        amount: { type: Value.INT },
      },
    },
    force_disable_resistance: {
      children: {
        clear: { type: Value.BOOL },
      },
    },
    force_enable_resistance: {
      children: {
        occupier: { type: Value.REFERENCE, reference: "country", optional: true },
        clear: { type: Value.BOOL, optional: true },
      },
    },
    force_operative_leader_into_hiding: { type: Value.BOOL },
    free_operative: {},
    harm_operative_leader: { type: Value.VARIABLE_FIELD },
    kill_operative: {
      children: {
        operative: { type: Value.REFERENCE, reference: "operative" },
        killed_by: { type: Value.REFERENCE, reference: "country", optional: true },
      },
    },
    mark_focus_tree_layout_dirty: { type: Value.BOOL },
    modulo_temp_variable: {
      children: {
        var: { type: Value.VARIABLE_SET, variableSet: "variable" },
        value: { type: Value.VARIABLE_FIELD_32 },
      },
    },
    modulo_variable: {
      children: {
        var: { type: Value.VARIABLE_SET, variableSet: "variable" },
        value: { type: Value.VARIABLE_FIELD_32 },
      },
    },
    random_controlled_state: {
      children: {
        prioritize: {
          type: Value.ARRAY,
          elementType: { type: Value.STATE },
          cardinality: [1, "inf"],
          optional: true,
        },
        limit: { optional: true }, // Implementation of limit would depend on the parsing context
      },
    },
    random_country_division: {
      children: {
        limit: { optional: true }, // Implementation would depend on context
      },
    },
    random_country_with_original_tag: {
      children: {
        original_tag_to_check: { type: Value.REFERENCE, reference: "country" },
      },
    },
    randomize_temp_variable: {
      children: {
        var: { type: Value.VARIABLE_FIELD_32 },
        distribution: { type: Value.ENUM, enum: ["uniform", "binomial"] },
        min: { type: Value.VARIABLE_FIELD_32, optional: true },
        max: { type: Value.VARIABLE_FIELD_32, optional: true },
        lambda: { type: Value.VARIABLE_FIELD_32, optional: true },
      },
    },
    randomize_variable: {
      children: {
        var: { type: Value.VARIABLE_FIELD_32 },
        distribution: { type: Value.ENUM, enum: ["uniform", "binomial"] },
        min: { type: Value.VARIABLE_FIELD_32, optional: true },
        max: { type: Value.VARIABLE_FIELD_32, optional: true },
      },
    },
    recall_volunteers_from: { type: Value.REFERENCE, reference: "country" },
    remove_resistance_target: { type: Value.VALUE, valueType: "resistance_target" },
    remove_wargoal: {
      children: {
        target: { type: Value.REFERENCE, reference: "country" },
        type: { type: Value.MIXED },
      },
    },
    set_collaboration: {
      children: {
        target: { type: Value.REFERENCE, reference: "country" },
        value: { type: Value.VARIABLE_FIELD },
      },
    },
    set_country_leader_description: {
      children: {
        desc: { type: Value.LOCALISATION },
        ideology: { type: Value.VARIABLE_FIELD, optional: true },
      },
    },
    set_country_leader_name: {
      children: {
        name: { type: Value.LOCALISATION_INLINE },
        ideology: { type: Value.MIXED, optional: true },
      },
    },
    set_country_leader_portrait: {
      children: {
        portrait: { type: Value.SPRITE_TYPE },
        ideology: { type: Value.MIXED, optional: true },
      },
    },
    set_faction_spymaster: { type: Value.BOOL },
    set_garrison_strength: { type: Value.VARIABLE_FIELD },
    set_leader_description: { type: Value.LOCALISATION },
    set_leader_name: { type: Value.LOCALISATION_INLINE },
    set_leader_portrait: { type: Value.SPRITE_TYPE },
    set_occupation_law: { type: Value.STRING },
    set_occupation_law_where_available: { type: Value.STRING },
    set_temp_variable_to_random: {
      children: {
        var: { type: Value.VARIABLE_SET, variableSet: "variable" },
        min: { type: Value.VARIABLE_FIELD_32, optional: true },
        max: { type: Value.VARIABLE_FIELD_32, optional: true },
        integer: { type: Value.BOOL, optional: true },
      },
    },
    set_variable_to_random: {
      children: {
        var: { type: Value.VARIABLE_SET, variableSet: "variable" },
        min: { type: Value.VARIABLE_FIELD_32, optional: true },
        max: { type: Value.VARIABLE_FIELD_32, optional: true },
        integer: { type: Value.BOOL, optional: true },
      },
    },
    set_victory_points: {
      children: {
        province: { type: Value.ENUM, enum: "provinces" },
        value: { type: Value.VARIABLE_FIELD_32 },
      },
    },
    start_peace_conference: {
      children: {
        tag: { type: Value.REFERENCE, reference: "country" },
        score_factor: { type: Value.FLOAT },
      },
    },
    teleport_armies: {
      // The detailed implementation would depend on additional context
    },
    turn_operative: {
      children: {
        operative: { type: Value.REFERENCE, reference: "operative", optional: true },
        turned_by: { type: Value.REFERENCE, reference: "country", optional: true },
      },
    },
  },
};