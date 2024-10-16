import { effect } from "../effects";
import { Scope } from "../types";
import {
  obj,
  int,
  localisation,
  typeRefKey,
  float,
  enumRef,
  array,
  enumRefKey,
  typeRef,
  bool,
  root,
  typeDefKey,
} from "../utils";

const state = obj(
  { replace_scope: { this: Scope.STATE, root: Scope.STATE } },
  {
    id: int(),
    name: localisation(),
    resources: obj(
      { cardinality: [0, 1] },
      {
        [typeRefKey("resource")]: float({ cardinality: [1, Infinity] }),
      },
    ),
    history: obj(
      {},
      {
        owner: enumRef({}, "country_tags"),
        controller: enumRef({ cardinality: [0, 1] }, "country_tags"),
        victory_points: array({ cardinality: [0, Infinity] }, [
          enumRef({ cardinality: [2, 2] }, "provinces"),
        ]),
        buildings: obj(
          { cardinality: [0, 1] },
          {
            [typeRefKey("building")]: int(
              { cardinality: [0, Infinity] },
              0,
              20,
            ),
            [enumRefKey("provinces")]: obj(
              { cardinality: [0, Infinity] },
              {
                [typeRefKey("building")]: int(
                  { cardinality: [0, Infinity] },
                  0,
                  20,
                ),
              },
            ),
          },
        ),
        ...effect,
        date_field: obj(
          { cardinality: [0, Infinity] },
          {
            owner: enumRef({ cardinality: [0, 1] }, "country_tags"),
            controller: enumRef({ cardinality: [0, 1] }, "country_tags"),
            victory_points: array({ cardinality: [0, Infinity] }, [
              enumRef({ cardinality: [2, 2] }, "provinces"),
            ]),
            buildings: obj(
              { cardinality: [0, 1] },
              {
                [typeRefKey("building.state")]: int(
                  { cardinality: [0, Infinity] },
                  0,
                  20,
                ),
                [enumRefKey("provinces")]: obj(
                  { cardinality: [0, Infinity] },
                  {
                    [typeRefKey("building.provincial")]: int(
                      { cardinality: [0, Infinity] },
                      0,
                      20,
                    ),
                  },
                ),
              },
            ),
            ...effect,
          },
        ),
      },
    ),
    local_supplies: float({ cardinality: [0, 1] }, 0, 20),
    provinces: array({ cardinality: [1, Infinity] }, [
      enumRef({ cardinality: [1, Infinity] }, "provinces"),
    ]),
    manpower: int({}, 0, Infinity),
    buildings_max_level_factor: float({ cardinality: [0, 1] }),
    state_category: typeRef({}, "state_category"),
    impassable: bool({ cardinality: [0, 1] }, true),
  },
);

const state_category = obj(
  {},
  {
    local_building_slots: int(),
    color: array({}, [int({ cardinality: [3, 3] })]),
  },
);

export const stateType = root(
  { path: "game/history/states" },
  {
    id: obj(
      {},
      {
        [typeDefKey("state")]: state,
      },
    ),
  },
);

export const stateCategoryType = root(
  { path: "game/common/state_category" },
  {
    state_categories: obj(
      {},
      {
        [typeDefKey("state_category")]: state_category,
      },
    ),
  },
);
