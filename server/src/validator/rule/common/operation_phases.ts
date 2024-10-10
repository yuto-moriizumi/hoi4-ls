import { trigger } from "../triggers";
import {
  root,
  obj,
  typeDefKey,
  localisation,
  typeRef,
  country,
  bool,
  typeRefKey,
  int,
  either,
} from "../utils";

const operation_phase = obj(
  {},
  {
    name: localisation(),
    desc: localisation(),
    icon: typeRef({}, "spriteType"),
    picture: typeRef({}, "spriteType"),
    outcome: localisation({ cardinality: [0, 1] }),
    map_icon: typeRef({ cardinality: [0, 1] }, "spriteType"),
    outcome_extra: localisation({ cardinality: [0, 1] }),
    risk_extra: localisation({ cardinality: [0, 1] }),
    requirements: obj(
      {
        replace_scope: { this: country(), root: country(), from: country() },
        cardinality: [0, 1],
      },
      { ...trigger },
    ),
    return_on_complete: bool({ cardinality: [0, 1] }),
    equipment: obj(
      { cardinality: [0, 1] },
      {
        [typeRefKey("equipment")]: int({ cardinality: [0, Infinity] }),
        civilian_factories: either(
          int({ cardinality: [0, Infinity] }),
          obj(
            { cardinality: [0, Infinity] },
            {
              amount: int(),
              days: int(),
            },
          ),
        ),
      },
    ),
  },
);

export const operationPhaseType = root(
  { path: "game/common/operation_phases" },
  {
    operation_phase: obj(
      {},
      {
        [typeDefKey("operation_phase")]: operation_phase,
      },
    ),
  },
);
