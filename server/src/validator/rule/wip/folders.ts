const conversion: Rule = {
  children: {
    common: { type: Value.UNQUOTED, cardinality: [0, "inf"] },
    events: { type: Value.UNQUOTED, cardinality: [0, "inf"] },
    gfx: { type: Value.UNQUOTED, cardinality: [0, "inf"] },
    history: { type: Value.UNQUOTED, cardinality: [0, "inf"] },
    interface: { type: Value.UNQUOTED, cardinality: [0, "inf"] },
    localisation: { type: Value.UNQUOTED, cardinality: [0, "inf"] },
    portraits: { type: Value.UNQUOTED, cardinality: [0, "inf"] },
    map: { type: Value.UNQUOTED, cardinality: [0, "inf"] },
    dlc: { type: Value.UNQUOTED, cardinality: [0, "inf"] },
  },
};