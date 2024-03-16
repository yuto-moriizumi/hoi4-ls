const types: Rule = {
  children: {
    type: [
      {
        children: {
          path: { type: Value.UNQUOTED },
          subtype: [
            {
              provide: { context: Context.DEFAULT, scope: Scope.GRAPHIC_DB },
            },
            {
              provide: { context: Context.COUNTRY, scope: Scope.GRAPHIC_DB },
            },
          ],
        },
      },
    ],
  },
};

const graphic_db: Rule = {
  children: {
    enum: [
      {
        cardinality: [1, "inf"],
        children: {
          pool: {
            children: {
              limit: {
                provide: { context: Context.TRIGGER, scope: Scope.POOL },
                cardinality: [0, 1],
              },
              weight: { type: Value.UNQUOTED, cardinality: [0, 1] },
              icons: {
                children: {
                  filepath: { type: Value.UNQUOTED, cardinality: [0, "inf"] },
                },
              },
              models: {
                children: {
                  "<entity>": { type: Value.UNQUOTED, cardinality: [0, "inf"] },
                },
              },
            },
          },
        },
      },
    ],
  },
};