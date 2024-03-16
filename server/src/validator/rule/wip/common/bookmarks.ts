const types: Rule = {
  children: {
    type: {
      provide: { context: Context.BOOKMARK, scope: Scope.FILE },
      children: {
        path: { type: Value.UNQUOTED },
        skip_root_key: { type: Value.UNQUOTED },
      },
    },
  },
};

const bookmark: Rule = {
  children: {
    name: { type: Value.UNQUOTED },
    desc: { type: Value.UNQUOTED },
    date: { type: Value.UNQUOTED },
    picture: { type: Value.UNQUOTED },
    default_country: { type: Value.UNQUOTED, cardinality: [7, "inf"] },
    default: { type: Value.BOOL, cardinality: [0, 1] },
    "---": [{
      cardinality: [0, 1],
      children: {
        minor: { type: Value.BOOL, defaultValue: true },
        history: { type: Value.UNQUOTED },
      },
    }],
    effect: {
      children: {
        randomize_weather: [{ type: Value.UNQUOTED }, { type: Value.UNQUOTED }],
      },
    },
  },
};