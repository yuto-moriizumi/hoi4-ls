import { trigger } from "../triggers";
import {
  obj,
  localisation,
  bool,
  array,
  enumRef,
  int,
  root,
  typeDefKey,
} from "../utils";

export const adjaceny_rule = obj(
  {},
  {
    name: localisation(),
    is_friend: obj({ cardinality: [0, 1] }, { ...trigger }),
    is_neutral: obj({ cardinality: [0, 1] }, { ...trigger }),
    is_enemy: obj({ cardinality: [0, 1] }, { ...trigger }),
    contested: obj(
      {},
      {
        army: bool(),
        navy: bool(),
        submarine: bool(),
        trade: bool(),
      },
    ),
    enemy: obj(
      {},
      {
        army: bool(),
        navy: bool(),
        submarine: bool(),
        trade: bool(),
      },
    ),
    friend: obj(
      {},
      {
        army: bool(),
        navy: bool(),
        submarine: bool(),
        trade: bool(),
      },
    ),
    neutral: obj(
      {},
      {
        army: bool(),
        navy: bool(),
        submarine: bool(),
        trade: bool(),
      },
    ),
    required_provinces: array({}, [
      enumRef({ cardinality: [1, 10] }, "provinces"),
    ]),
    icon: int(),
    offset: array({}, [int({ cardinality: [3, 3] })]),
    is_disabled: obj(
      { cardinality: [0, 1] },
      {
        ...trigger,
        tooltip: localisation(),
      },
    ),
  },
);

export const airports = obj(
  { cardinality: [1, Infinity] },
  {
    state: array({}, [enumRef({}, "provinces")]),
  },
);

export const rocketsites = obj(
  { cardinality: [1, Infinity] },
  {
    state: array({}, [enumRef({}, "provinces")]),
  },
);

export const myAdjacenyRuleType = root(
  { path: "/map" },
  {
    adjacency_rule: obj(
      {},
      {
        [typeDefKey("adjaceny_rule")]: adjaceny_rule,
      },
    ),
  },
);

export const myAirportsType = root(
  { path: "/map" },
  {
    airports: obj(
      {},
      {
        [typeDefKey("airports")]: airports,
      },
    ),
  },
);

export const myRocketsitesType = root(
  { path: "/map" },
  {
    rocketsites: obj(
      {},
      {
        [typeDefKey("rocketsites")]: rocketsites,
      },
    ),
  },
);
