onst balanceOfPowerType = root(
  { path: "game/common/bop" },
  {
    balance_of_power: obj(
      {},
      {
        initial_value: float({ cardinality: [0, 1] }, -1, 1),
        left_side: value({}, "bop_side"),
        right_side: value({}, "bop_side"),
        decision_category: typeRef({}, "decision_category"),
        ranga: array(
          { cardinality: [0, Infinity] },
          obj({}, {
            id: value_set({}, "bop_range_id"),
            min: float({}, -1, 1),
            max: float({}, -1, 1),
            modifier: obj(
              { replace_scope: { this: country(), root: country() }, cardinality: [0, 1] },
              {
                ...modifier,
              }
            ),
            on_activate: obj(
              { replace_scope: { this: country(), root: country() }, cardinality: [0, 1] },
              {
                limit: obj(
                  { cardinality: [0, Infinity] },
                  {
                    ...trigger,
                  }
                ),
                ...effect,
              }
            ),
            on_deactivate: obj(
              { replace_scope: { this: country(), root: country() }, cardinality: [0, 1] },
              {
                limit: obj(
                  { cardinality: [0, Infinity] },
                  {
                    ...trigger,
                  }
                ),
                ...effect,
              }
            ),
          })
        ),
        side: array(
          { cardinality: [2, Infinity] },
          obj({}, {
            id: value_set({}, "bop_side"),
            icon: typeRef({}, "spriteType"),
            range: array(
              { cardinality: [1, Infinity] },
              obj({}, {
                id: value_set({}, "bop_range_id"),
                min: float({}, -1, 1),
                max: float({}, -1, 1),
                modifier: obj(
                  { replace_scope: { this: country(), root: country() }, cardinality: [0, 1] },
                  {
                    ...modifier,
                  }
                ),
                on_activate: obj(
                  { replace_scope: { this: country(), root: country() }, cardinality: [0, 1] },
                  {
                    limit: obj(
                      { cardinality: [0, Infinity] },
                      {
                        ...trigger,
                      }
                    ),
                    ...effect,
                  }
                ),
                on_deactivate: obj(
                  { replace_scope: { this: country(), root: country() }, cardinality: [0, 1] },
                  {
                    limit: obj(
                      { cardinality: [0, Infinity] },
                      {
                        ...trigger,
                      }
                    ),
                    ...effect,
                  }
                ),
              })
            ),
          })
        ),
      }
    ),
  }
);
