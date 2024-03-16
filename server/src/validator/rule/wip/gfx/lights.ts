const types: Rule = {
  children: {
    type: {
      cardinality: [0, "inf"],
      children: {
        path: { type: Value.UNQUOTED, cardinality: [0, "inf"] },
        name_field: { type: Value.UNQUOTED },
      },
      provide: { context: Context.LIGHT, scope: Scope.GLOBAL },
    },
  },
};

const light: Rule = {
  children: {
    name: { type: Value.UNQUOTED },
    color: {
      children: {
        r: { type: Value.FLOAT },
        g: { type: Value.FLOAT },
        b: { type: Value.FLOAT },
      },
    },
    intensity: { provide: { context: Context.INTENSITY, scope: Scope.LIGHT }, cardinality: [0, 1] },
    radius: { type: Value.FLOAT },
    falloff: { type: Value.FLOAT },
    duration: { type: Value.FLOAT, cardinality: [0, 1] },
    position: {
      children: {
        x: { type: Value.INT },
        y: { type: Value.INT },
        z: { type: Value.INT },
      },
    },
    animation: {
      cardinality: [0, 1],
      children: {
        name: { type: Value.UNQUOTED },
        start: { type: Value.FLOAT },
        duration: { type: Value.FLOAT },
        repeat: { type: Value.BOOL, cardinality: [0, 1], defaultValue: false },
        op: { type: Value.ENUM, enumName: "animation_op" },
        minValue: { type: Value.FLOAT, cardinality: [0, 1] },
        maxValue: { type: Value.FLOAT, cardinality: [0, 1] },
        curve: {
          type: Value.FLOAT,
          cardinality: [4, "inf"],
        },
      },
    },
  },
};

const enums: Rule = {
  children: {
    enum: {
      cardinality: [0, "inf"],
      children: {
        animation_op: {
          values: ["MUL", "ADD", "ABS"],
        },
      },
    },
    complex_enum: {
      cardinality: [0, "inf"],
      children: {
        light_animations: {
          children: {
            path: { type: Value.UNQUOTED, cardinality: [0, "inf"] },
            name: {
              children: {
                animation: {
                  children: {
                    name: { type: Value.ENUM, enumName: "enum_name" },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
};