const types: Rule = {
  children: {
    type: {
      children: {
        military_industrial_organization: {
          path: { type: Value.UNQUOTED },
        },
      },
    },
    military_industrial_organization: {
      children: {
        name: { type: Value.UNQUOTED, cardinality: [0, 1] },
        icon: { type: Value.UNQUOTED, cardinality: [0, 1] },
        background: { type: Value.UNQUOTED, cardinality: [0, 1] },
        include: { type: Value.UNQUOTED, cardinality: [0, 1] },
        allowed: { provide: { context: Context.TRIGGER, scope: Scope.COUNTRY }, cardinality: [0, "inf"] },
        visible: { provide: { context: Context.TRIGGER, scope: Scope.COUNTRY }, cardinality: [0, "inf"] },
        available: { provide: { context: Context.TRIGGER, scope: Scope.COUNTRY }, cardinality: [0, "inf"] },
        equipment_type: {
          children: {
            enum: { type: Value.UNQUOTED, cardinality: [0, "inf"] },
            equipment_group: { type: Value.UNQUOTED, cardinality: [0, "inf"] },
            equipment_archetype_equip: { type: Value.UNQUOTED, cardinality: [0, "inf"] },
          },
          cardinality: [0, 1],
        },
        research_categories: {
          children: {
            enum: { type: Value.UNQUOTED, cardinality: [0, "inf"] },
            equipment_group: { type: Value.UNQUOTED, cardinality: [0, "inf"] },
            equipment_archetype_equip: { type: Value.UNQUOTED, cardinality: [0, "inf"] },
          },
          cardinality: [0, 1],
        },
        on_design_team_assigned_to_tech: { provide: { context: Context.EFFECT, scope: Scope.COUNTRY }, cardinality: [0, "inf"] },
        on_design_team_assigned_to_variant: { provide: { context: Context.EFFECT, scope: Scope.COUNTRY }, cardinality: [0, "inf"] },
        on_industrial_manufacturer_assigned: { provide: { context: Context.EFFECT, scope: Scope.COUNTRY }, cardinality: [0, "inf"] },
        on_tech_research_cancelled: { provide: { context: Context.EFFECT, scope: Scope.COUNTRY }, cardinality: [0, "inf"] },
        on_tech_research_completed: { provide: { context: Context.EFFECT, scope: Scope.COUNTRY }, cardinality: [0, "inf"] },
        on_industrial_manufacturer_unassigned: { provide: { context: Context.EFFECT, scope: Scope.COUNTRY }, cardinality: [0, "inf"] },
        research_bonus: { type: Value.UNQUOTED, cardinality: [0, 1] },
        task_capacity: { type: Value.UNQUOTED, cardinality: [0, 1] },
        tree_header_text: {
          children: {
            text: { type: Value.UNQUOTED },
            x: { type: Value.UNQUOTED },
          },
          cardinality: [0, "inf"],
        },
        ai_will_do: {
          children: {
            enum: { type: Value.UNQUOTED, cardinality: [0, 1] },
            alias_name: { provide: { context: Context.MODIFIER_RULE, scope: Scope.COUNTRY }, cardinality: [0, "inf"] },
          },
          cardinality: [0, 1],
        },
        initial_trait: {
          children: {
            token: { type: Value.UNQUOTED, cardinality: [0, 1] },
            name: { type: Value.UNQUOTED, cardinality: [0, 1] },
            icon: { type: Value.UNQUOTED, cardinality: [0, 1] },
            limit_to_equipment_type: {
              children: {
                enum: { type: Value.UNQUOTED, cardinality: [0, "inf"] },
                equipment_group: { type: Value.UNQUOTED, cardinality: [0, "inf"] },
                tech_category: { type: Value.UNQUOTED, cardinality: [0, "inf"] },
              },
              cardinality: [0, 1],
            },
            equipment_bonus: { provide: { context: Context.VARIABLE_FIELD, scope: Scope.COUNTRY }, cardinality: [0, "inf"] },
            production_bonus: { provide: { context: Context.VARIABLE_FIELD, scope: Scope.COUNTRY }, cardinality: [0, "inf"] },
            organization_modifier: { provide: { context: Context.MODIFIER, scope: Scope.COUNTRY }, cardinality: [0, "inf"] },
          },
          cardinality: [0, 1],
        },
        trait: {
          children: {
            token: { type: Value.UNQUOTED },
            name: { type: Value.UNQUOTED, cardinality: [0, 1] },
            icon: { type: Value.UNQUOTED, cardinality: [0, 1] },
            special_trait_background: {
              type: Value.BOOL,
              cardinality: [0, 1],
              defaultValue: false,
            },
            parent: {
              children: {
                traits: { type: Value.UNQUOTED, cardinality: [1, "inf"] },
                num_parents_needed: { type: Value.UNQUOTED, cardinality: [0, 1] },
              },
              cardinality: [0, 1],
            },
            any_parent: { type: Value.UNQUOTED, cardinality: [0, "inf"] },
            all_parents: { type: Value.UNQUOTED, cardinality: [0, "inf"] },
            mutually_exclusive: { type: Value.UNQUOTED, cardinality: [0, 1] },
            visible: { provide: { context: Context.TRIGGER, scope: Scope.COUNTRY }, cardinality: [0, "inf"] },
            available: { provide: { context: Context.TRIGGER, scope: Scope.COUNTRY }, cardinality: [0, "inf"] },
            on_complete: { provide: { context: Context.EFFECT, scope: Scope.COUNTRY }, cardinality: [0, "inf"] },
            limit_to_equipment_type: {
              children: {
                enum: { type: Value.UNQUOTED, cardinality: [0, "inf"] },
                equipment_group: { type: Value.UNQUOTED, cardinality: [0, "inf"] },
                tech_category: { type: Value.UNQUOTED, cardinality: [0, "inf"] },
              },
              cardinality: [0, 1],
            },
            equipment_bonus: { provide: { context: Context.VARIABLE_FIELD, scope: Scope.COUNTRY }, cardinality: [0, "inf"] },
            production_bonus: { provide: { context: Context.VARIABLE_FIELD, scope: Scope.COUNTRY }, cardinality: [0, "inf"] },
            organization_modifier: { provide: { context: Context.MODIFIER, scope: Scope.COUNTRY }, cardinality: [0, "inf"] },
            position: {
              children: {
                x: { type: Value.UNQUOTED },
                y: { type: Value.UNQUOTED },
              },
              cardinality: [0, 1],
            },
            relative_position_id: { type: Value.UNQUOTED, cardinality: [0, 1] },
            ai_will_do: {
              children: {
                enum: { type: Value.UNQUOTED, cardinality: [0, 1] },
                alias_name: { provide: { context: Context.MODIFIER_RULE, scope: Scope.COUNTRY }, cardinality: [0, "inf"] },
              },
              cardinality: [0, 1],
            },
          },
          cardinality: [0, "inf"],
        },
        delete_included_values: {
          children: {
            name: { type: Value.UNQUOTED, cardinality: [0, 1] },
            icon: { type: Value.UNQUOTED, cardinality: [0, 1] },
            allowed: { type: Value.UNQUOTED, cardinality: [0, 1] },
            visible: { type: Value.UNQUOTED, cardinality: [0, 1] },
            available: { type: Value.UNQUOTED, cardinality: [0, 1] },
            equipment_type: { type: Value.UNQUOTED, cardinality: [0, 1] },
            research_categories: { type: Value.UNQUOTED, cardinality: [0, 1] },
            on_design_team_assigned_to_tech: { type: Value.UNQUOTED, cardinality: [0, 1] },
            on_design_team_assigned_to_variant: { type: Value.UNQUOTED, cardinality: [0, 1] },
            on_industrial_manufacturer_assigned: { type: Value.UNQUOTED, cardinality: [0, 1] },
            on_tech_research_cancelled: { type: Value.UNQUOTED, cardinality: [0, 1] },
            on_tech_research_completed: { type: Value.UNQUOTED, cardinality: [0, 1] },
            on_industrial_manufacturer_unassigned: { type: Value.UNQUOTED, cardinality: [0, 1] },
            research_bonus: { type: Value.UNQUOTED, cardinality: [0, 1] },
            task_capacity: { type: Value.UNQUOTED, cardinality: [0, 1] },
            tree_header_text: { type: Value.UNQUOTED, cardinality: [0, 1] },
            ai_will_do: { type: Value.UNQUOTED, cardinality: [0, 1] },
          },
          cardinality: [0, 1],
        },
        add_trait: {
          children: {
            token: { type: Value.UNQUOTED },
            name: { type: Value.UNQUOTED, cardinality: [0, 1] },
            icon: { type: Value.UNQUOTED, cardinality: [0, 1] },
            special_trait_background: {
              type: Value.BOOL,
              cardinality: [0, 1],
              defaultValue: false,
            },
            parent: {
              children: {
                traits: { type: Value.UNQUOTED, cardinality: [1, "inf"] },
                num_parents_needed: { type: Value.UNQUOTED, cardinality: [0, 1] },
              },
              cardinality: [0, 1],
            },
            any_parent: { type: Value.UNQUOTED, cardinality: [0, "inf"] },
            all_parents: { type: Value.UNQUOTED, cardinality: [0, "inf"] },
            mutually_exclusive: { type: Value.UNQUOTED, cardinality: [0, 1] },
            visible: { provide: { context: Context.TRIGGER, scope: Scope.COUNTRY }, cardinality: [0, "inf"] },
            available: { provide: { context: Context.TRIGGER, scope: Scope.COUNTRY }, cardinality: [0, "inf"] },
            on_complete: { provide: { context: Context.EFFECT, scope: Scope.COUNTRY }, cardinality: [0, "inf"] },
            limit_to_equipment_type: {
              children: {
                enum: { type: Value.UNQUOTED, cardinality: [0, "inf"] },
                equipment_group: { type: Value.UNQUOTED, cardinality: [0, "inf"] },
                tech_category: { type: Value.UNQUOTED, cardinality: [0, "inf"] },
              },
              cardinality: [0, 1],
            },
            equipment_bonus: { provide: { context: Context.VARIABLE_FIELD, scope: Scope.COUNTRY }, cardinality: [0, "inf"] },
            production_bonus: { provide: { context: Context.VARIABLE_FIELD, scope: Scope.COUNTRY }, cardinality: [0, "inf"] },
            organization_modifier: { provide: { context: Context.MODIFIER, scope: Scope.COUNTRY }, cardinality: [0, "inf"] },
            position: {
              children: {
                x: { type: Value.UNQUOTED },
                y: { type: Value.UNQUOTED },
              },
              cardinality: [0, 1],
            },
            relative_position_id: { type: Value.UNQUOTED, cardinality: [0, 1] },
            ai_will_do: {
              children: {
                enum: { type: Value.UNQUOTED, cardinality: [0, 1] },
                alias_name: { provide: { context: Context.MODIFIER_RULE, scope: Scope.COUNTRY }, cardinality: [0, "inf"] },
              },
              cardinality: [0, 1],
            },
          },
          cardinality: [0, "inf"],
        },
        remove_trait: { type: Value.UNQUOTED, cardinality: [0, "inf"] },
        override_trait: {
          children: {
            token: { type: Value.UNQUOTED },
            name: { type: Value.UNQUOTED, cardinality: [0, 1] },
            icon: { type: Value.UNQUOTED, cardinality: [0, 1] },
            special_trait_background: {
              type: Value.BOOL,
              cardinality: [0, 1],
              defaultValue: false,
            },
            parent: {
              children: {
                traits: { type: Value.UNQUOTED, cardinality: [1, "inf"] },
                num_parents_needed: { type: Value.UNQUOTED, cardinality: [0, 1] },
              },
              cardinality: [0, 1],
            },
            any_parent: { type: Value.UNQUOTED, cardinality: [0, "inf"] },
            all_parents: { type: Value.UNQUOTED, cardinality: [0, "inf"] },
            mutually_exclusive: { type: Value.UNQUOTED, cardinality: [0, 1] },
            visible: { provide: { context: Context.TRIGGER, scope: Scope.COUNTRY }, cardinality: [0, "inf"] },
            available: { provide: { context: Context.TRIGGER, scope: Scope.COUNTRY }, cardinality: [0, "inf"] },
            on_complete: { provide: { context: Context.EFFECT, scope: Scope.COUNTRY }, cardinality: [0, "inf"] },
            limit_to_equipment_type: {
              children: {
                enum: { type: Value.UNQUOTED, cardinality: [0, "inf"] },
                equipment_group: { type: Value.UNQUOTED, cardinality: [0, "inf"] },
                tech_category: { type: Value.UNQUOTED, cardinality: [0, "inf"] },
              },
              cardinality: [0, 1],
            },
            equipment_bonus: { provide: { context: Context.VARIABLE_FIELD, scope: Scope.COUNTRY }, cardinality: [0, "inf"] },
            production_bonus: { provide: { context: Context.VARIABLE_FIELD, scope: Scope.COUNTRY }, cardinality: [0, "inf"] },
            organization_modifier: { provide: { context: Context.MODIFIER, scope: Scope.COUNTRY }, cardinality: [0, "inf"] },
            position: {
              children: {
                x: { type: Value.UNQUOTED },
                y: { type: Value.UNQUOTED },
              },
              cardinality: [0, 1],
            },
            relative_position_id: { type: Value.UNQUOTED, cardinality: [0, 1] },
            ai_will_do: {
              children: {
                enum: { type: Value.UNQUOTED, cardinality: [0, 1] },
                alias_name: { provide: { context: Context.MODIFIER_RULE, scope: Scope.COUNTRY }, cardinality: [0, "inf"] },
              },
              cardinality: [0, 1],
            },
          },
          cardinality: [0, "inf"],
        },
      },
    },
  },
};