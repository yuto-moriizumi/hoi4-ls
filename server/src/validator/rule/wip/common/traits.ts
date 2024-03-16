const types: Rule = {
  children: {
    type: [
      {
        children: {
          skip_root_key: { type: Value.UNQUOTED },
          path: { type: Value.UNQUOTED },
        },
      },
      {
        children: {
          path: { type: Value.UNQUOTED },
          skip_root_key: { type: Value.UNQUOTED },
          subtype: [
            { children: { type: { type: Value.UNQUOTED } } },
            { children: { type: { type: Value.UNQUOTED } } },
            { children: { type: { type: Value.UNQUOTED } } },
            { children: { type: { type: Value.UNQUOTED } } },
            { children: { type: { type: Value.UNQUOTED, cardinality: [0, "inf"] } } },
            { children: { type: { type: Value.UNQUOTED, cardinality: [0, "inf"] } } },
            {
              children: {
                type: { type: Value.UNQUOTED, cardinality: [0, "inf"] },
              },
            },
            {
              children: {
                trait_type: [
                  { type: Value.UNQUOTED },
                  { type: Value.UNQUOTED },
                ],
              },
            },
            { children: { gain_xp: {} } },
            { children: { gain_xp_leader: {} } },
            { children: { slot: { type: Value.UNQUOTED } } },
          ],
        },
      },
    ],
  },
};

const country_leader_trait: Rule = {
  children: {
    name: { type: Value.UNQUOTED, cardinality: [0, 1] },
    random: { type: Value.BOOL, cardinality: [0, 1] },
    sprite: { type: Value.UNQUOTED, cardinality: [0, 1] },
    provide: [
      { context: Context.MODIFIER, scope: Scope.COUNTRY },
      { context: Context.AI_STRATEGY_RULE, scope: Scope.COUNTRY },
    ],
    equipment_bonus: {
      children: {
        enum: {
          children: {
            instant: { type: Value.BOOL, cardinality: [0, 1] },
            provide: [
              { context: Context.UNIT_STAT, scope: Scope.COUNTRY },
              { context: Context.NAVAL_STAT, scope: Scope.COUNTRY },
              { context: Context.AIR_STAT, scope: Scope.COUNTRY },
            ],
          },
        },
        cardinality: [0, "inf"],
      },
    },
    provide: [
      { context: Context.TARGETED_MODIFIER_RULE, scope: Scope.COUNTRY },
      { context: Context.AI_STRATEGY_RULE, scope: Scope.COUNTRY },
    ],
    ai_will_do: {
      children: {
        enum: { children: { base_factor: { type: Value.UNQUOTED, cardinality: [0, 1] } } },
        provide: { context: Context.MODIFIER_RULE, scope: Scope.COUNTRY },
      },
    },
    command_cap: { type: Value.UNQUOTED, cardinality: [0, 1] },
  },
};

const unit_leader_trait: Rule = {
  children: {
    type: [
      { type: Value.UNQUOTED },
      { children: { enum: { type: Value.UNQUOTED, cardinality: ["~1", "inf"] } } },
    ],
    trait_type: { type: Value.UNQUOTED, cardinality: [0, 1] },
    subtype: [
      {
        children: {
          enum: [
            { children: { unit_leader_skills: { type: Value.UNQUOTED, cardinality: [0, 4] } } },
            { children: { army_leader_skill_factors: { type: Value.UNQUOTED, cardinality: [0, 4] } } },
          ],
        },
      },
      {
        children: {
          enum: [
            { children: { army_leader_skill_factors: { type: Value.UNQUOTED, cardinality: [0, 4] } } },
            { children: { naval_leader_skill_factors: { type: Value.UNQUOTED, cardinality: [0, 4] } } },
          ],
        },
      },
      {
        children: {
          gain_xp_on_spotting: { type: Value.UNQUOTED, cardinality: [0, 1] },
          sub_unit_modifiers: {
            children: {
              unit: {
                provide: [
                  { context: Context.UNIT_STAT, scope: Scope.UNIT_LEADER },
                  { context: Context.NAVAL_STAT, scope: Scope.UNIT_LEADER },
                  { context: Context.AIR_STAT, scope: Scope.UNIT_LEADER },
                ],
                cardinality: [1, "inf"],
              },
            },
          },
          enum: { children: { naval_leader_skill_factors: { type: Value.UNQUOTED, cardinality: [0, 4] } } },
        },
      },
      {
        children: {
          gain_xp: {
            provide: { context: Context.TRIGGER, scope: Scope.UNIT_LEADER, cardinality: [0, 1] },
          },
          gain_xp_leader: {
            provide: { context: Context.TRIGGER, scope: Scope.UNIT_LEADER, cardinality: [0, 1] },
          },
          cost: { type: Value.UNQUOTED },
          gui_row: { type: Value.UNQUOTED },
          gui_column: { type: Value.UNQUOTED, cardinality: [0, 1] },
          custom_gain_xp_trigger_tooltip: { type: Value.UNQUOTED, cardinality: [0, 1] },
        },
      },
      {
        children: {
          gui_row: { type: Value.UNQUOTED },
          gui_column: { type: Value.UNQUOTED, cardinality: [0, 1] },
          parent: { type: Value.UNQUOTED, cardinality: [0, 5] },
          mutually_exclusive: { type: Value.UNQUOTED, cardinality: [0, 5] },
          prerequisites: {
            provide: { context: Context.TRIGGER, scope: Scope.UNIT_LEADER, cardinality: [0, 1] },
          },
          custom_prerequisite_tooltip: { type: Value.UNQUOTED, cardinality: [0, 1] },
          num_parents_needed: { type: Value.UNQUOTED, cardinality: [0, 1] },
        },
      },
      {
        children: {
          slot: { type: Value.UNQUOTED },
          specialist_advisor_trait: { type: Value.UNQUOTED },
          expert_advisor_trait: { type: Value.UNQUOTED },
          genius_advisor_trait: { type: Value.UNQUOTED },
        },
      },
    ],
    field_marshal_modifier: {
      provide: [
        { context: Context.MODIFIER, scope: Scope.UNIT_LEADER },
        { context: Context.UNIT_LEADER_MODIFIER, scope: Scope.UNIT_LEADER },
      ],
      cardinality: [0, 1],
    },
    corps_commander_modifier: {
      provide: [
        { context: Context.MODIFIER, scope: Scope.UNIT_LEADER },
        { context: Context.UNIT_LEADER_MODIFIER, scope: Scope.UNIT_LEADER },
      ],
      cardinality: [0, 1],
    },
    custom_effect_tooltip: { type: Value.UNQUOTED, cardinality: [0, 1] },
    override_effect_tooltip: { type: Value.UNQUOTED, cardinality: [0, 1] },
    allowed: {
      provide: { context: Context.TRIGGER, scope: Scope.UNIT_LEADER, cardinality: [0, 1] },
    },
    modifier: {
      provide: [
        { context: Context.MODIFIER, scope: Scope.UNIT_LEADER },
        { context: Context.UNIT_LEADER_MODIFIER, scope: Scope.UNIT_LEADER },
      ],
      cardinality: [0, 1],
    },
    non_shared_modifier: {
      provide: [
        { context: Context.MODIFIER, scope: Scope.UNIT_LEADER },
        { context: Context.UNIT_LEADER_MODIFIER, scope: Scope.UNIT_LEADER },
      ],
      cardinality: [0, 1],
    },
    enable_ability: { type: Value.UNQUOTED, cardinality: [0, 5] },
    new_commander_weight: {
      children: {
        enum: { children: { base_factor: { type: Value.UNQUOTED, cardinality: [0, 1] } } },
        provide: { context: Context.MODIFIER_RULE, scope: Scope.UNIT_LEADER },
      },
    },
    trait_xp_factor: {
      children: {
        unit_leader_trait: { type: Value.UNQUOTED, cardinality: [1, "inf"] },
      },
    },
    ai_will_do: {
      children: {
        enum: { children: { base_factor: { type: Value.UNQUOTED, cardinality: [0, 1] } } },
        provide: { context: Context.MODIFIER_RULE, scope: Scope.UNIT_LEADER },
      },
    },
    unit_trigger: {
      provide: { context: Context.TRIGGER, scope: Scope.UNIT, cardinality: [0, 1] },
    },
    unit_type: {
      children: {
        type: { type: Value.UNQUOTED, cardinality: [1, "inf"] },
      },
    },
    any_parent: {
      children: {
        unit_leader_trait: { type: Value.UNQUOTED, cardinality: [1, "inf"] },
      },
    },
    parent: {
      children: {
        traits: { type: Value.UNQUOTED, cardinality: [1, "inf"] },
        num_parents_needed: { type: Value.UNQUOTED },
      },
    },
  },
};

const enums: Rule = {
  children: {
    enum: [
      {
        children: {
          unit_leader_skills: {
            type: Value.UNQUOTED,
            enumValues: ["attack_skill", "defense_skill", "logistics_skill", "planning_skill"],
          },
        },
      },
      {
        children: {
          army_leader_skill_factors: {
            type: Value.UNQUOTED,
            enumValues: ["attack_skill_factor", "defense_skill_factor", "logistics_skill_factor", "planning_skill_factor"],
          },
        },
      },
      {
        children: {
          naval_leader_skill_factors: {
            type: Value.UNQUOTED,
            enumValues: ["attack_skill_factor", "coordination_skill_factor", "maneuvering_skill_factor", "planning_skill_factor"],
          },
        },
      },
      {
        children: {
          unit_leader_types: {
            type: Value.UNQUOTED,
            enumValues: ["all", "corps_commander", "field_marshal", "navy", "land", "operative"],
          },
        },
      },
      {
        children: {
          trait_types: {
            type: Value.UNQUOTED,
            enumValues: ["assignable_terrain_trait", "basic_terrain_trait", "personality_trait", "assignable_trait", "status_trait", "exile", "basic_trait"],
          },
        },
      },
      {
        children: {
          combat_modifiers: {
            type: Value.UNQUOTED,
            enumValues: ["fort_attack", "river_crossing", "amphibious_attack", "paradrop"],
          },
        },
      },
    ],
  },
};