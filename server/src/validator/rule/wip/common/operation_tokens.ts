types: {
  provide: { context: Context.OPERATION_TOKEN, scope: Scope.GAME },
},
operation_token: {
  children: {
    name: { type: Value.UNQUOTED },
    desc: { type: Value.UNQUOTED },
    icon: { type: Value.UNQUOTED },
    text_icon: { type: Value.UNQUOTED },
    targeted_modifier: { type: Value.UNQUOTED, cardinality: [0, "inf"] },
    intel_source: { type: Value.ENUM, cardinality: [0, 1] },
    intel_gain: { type: Value.FLOAT, cardinality: [0, 1] },
  },
},
enums: {
  children: {
    intel_types: {
      children: {
        navy: { type: Value.UNQUOTED },
        army: { type: Value.UNQUOTED },
        civilian: { type: Value.UNQUOTED },
        airforce: { type: Value.UNQUOTED },
      },
    },
  },
},