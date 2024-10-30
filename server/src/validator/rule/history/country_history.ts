import { effect } from "../effects";
import {
  obj,
  typeRef,
  either,
  value,
  scopeRef,
  float,
  root,
  typeDefKey,
} from "../utils";

const country_history = obj(
  {},
  {
    capital: typeRef({}, "state"),
    oob: typeRef({ cardinality: [0, 1] }, "oob"),
    ...effect,
    recruit_character: either(
      typeRef({ cardinality: [0, Infinity] }, "character"),
      value({ cardinality: [0, Infinity] }, "event_target"),
      value({ cardinality: [0, Infinity] }, "global_event_target"),
      scopeRef({ cardinality: [0, Infinity] }, "character"),
    ),
    starting_train_buffer: float({ cardinality: [0, Infinity] }),
    date_field: obj(
      { cardinality: [0, Infinity] },
      {
        capital: typeRef({ cardinality: [0, 1] }, "state"),
        oob: typeRef({ cardinality: [0, Infinity] }, "oob"),
        ...effect,
        recruit_character: either(
          typeRef({ cardinality: [0, Infinity] }, "character"),
          value({ cardinality: [0, Infinity] }, "event_target"),
          value({ cardinality: [0, Infinity] }, "global_event_target"),
          scopeRef({ cardinality: [0, Infinity] }, "character"),
        ),
      },
    ),
  },
);

export const countryHistoryType = root(
  { path: "/history/countries" },
  {
    country_history: obj(
      {},
      {
        [typeDefKey("country_history")]: country_history,
      },
    ),
  },
);
