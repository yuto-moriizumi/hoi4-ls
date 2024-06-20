const conversion: Rule = {
  children: {
    common: { type: Value.UNQUOTED, cardinality: [0, Infinity] },
    events: { type: Value.UNQUOTED, cardinality: [0, Infinity] },
    gfx: { type: Value.UNQUOTED, cardinality: [0, Infinity] },
    history: { type: Value.UNQUOTED, cardinality: [0, Infinity] },
    interface: { type: Value.UNQUOTED, cardinality: [0, Infinity] },
    localisation: { type: Value.UNQUOTED, cardinality: [0, Infinity] },
    portraits: { type: Value.UNQUOTED, cardinality: [0, Infinity] },
    map: { type: Value.UNQUOTED, cardinality: [0, Infinity] },
    dlc: { type: Value.UNQUOTED, cardinality: [0, Infinity] },
  },
};
