import { trigger } from "../triggers";
import {
  obj,
  country,
  localisation,
  state,
  int,
  float,
  root,
  typeDefKey,
} from "../utils";

const wargoal = obj(
  { replace_scope: { this: country(), root: country(), prev: country() } },
  {
    war_name: localisation({ cardinality: [0, 1] }),
    allowed: obj({ cardinality: [1, Infinity] }, { ...trigger }),
    available: obj({ cardinality: [1, Infinity] }, { ...trigger }),
    take_states: obj(
      {
        replace_scope: { this: state(), root: country(), prev: country() },
        cardinality: [0, 1],
      },
      { ...trigger },
    ),
    puppet: obj({ cardinality: [0, 1] }, { ...trigger }),
    liberate: obj({ cardinality: [0, 1] }, { ...trigger }),
    generate_base_cost: int({ cardinality: [0, 1] }),
    generate_per_state_cost: int({ cardinality: [0, 1] }),
    take_states_limit: int({ cardinality: [0, 1] }),
    take_states_cost: int({ cardinality: [0, 1] }),
    puppet_cost: int({ cardinality: [0, 1] }),
    annex_threat_factor: float({ cardinality: [0, 1] }),
    annex_cost: int({ cardinality: [0, 1] }),
    force_government_cost: int({ cardinality: [0, 1] }),
    take_states_threat_factor: float({ cardinality: [0, 1] }),
    expire: int({ cardinality: [0, 1] }),
    threat: float({ cardinality: [0, 1] }),
  },
);

export const wargoalType = root(
  { path: "/common/wargoals" },
  {
    wargoal_types: obj(
      {},
      {
        [typeDefKey("wargoal")]: wargoal,
      },
    ),
  },
);
