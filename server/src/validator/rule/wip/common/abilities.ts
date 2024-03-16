const rules: Rule = {
  children: {
    types: {
      children: {
        type: {
          provide: {
            path: "game/common/abilities",
            skipRootKey: "ability",
            context: Context.ABILITY,
            scope: Scope.NONE,
          },
        },
      },
    },
    ability: {
      children: {
        name: { type: Value.UNQUOTED },
        desc: { type: Value.UNQUOTED },
        icon: { type: Value.UNQUOTED, cardinality: [0, 1] },
        sound_effect: { type: Value.UNQUOTED, cardinality: [0, 1] },
        type: { type: Value.ENUM, enumName: "ability_unit_leader_types" },
        allowed: {
          cardinality: [0, 1],
          provide: { context: Context.TRIGGER, scope: Scope.COUNTRY },
        },
        cost: { type: Value.FLOAT },
        duration: { type: Value.INT },
        cooldown: { type: Value.INT, cardinality: [0, 1] },
        unit_modifiers: {
          cardinality: [0, 1],
          provide: [
            { context: Context.MODIFIER, scope: Scope.UNIT },
            { context: Context.UNIT_STAT, scope: Scope.UNIT },
          ],
        },
        one_time_effect: {
          cardinality: [0, 1],
          provide: { context: Context.EFFECT, scope: Scope.NONE },
        },
        cancelable: { type: Value.BOOL, cardinality: [0, 1] },
        ai_will_do: {
          cardinality: [0, 1],
          children: {
            enum: { type: Value.FLOAT, cardinality: [0, 1] },
            modifier_rule: {
              cardinality: [0, "inf"],
              provide: {
                context: Context.MODIFIER_RULE,
                scope: Scope.NONE,
              },
            },
          },
        },
      },
    },
    enums: {
      children: {
        enum: {
          ability_unit_leader_types: { values: ["army_leader"] },
        },
      },
    },
  },
};