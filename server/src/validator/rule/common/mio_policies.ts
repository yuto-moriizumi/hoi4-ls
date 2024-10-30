import { effect } from "../effects";
import { modifier_rule } from "../modifier_rule";
import { modifier } from "../modifiers";
import { trigger } from "../triggers";
import {
  root,
  obj,
  country,
  scalar,
  int,
  enumRefKey,
  variable_field,
  typeRefKey,
  float,
  military_industrial_organization,
} from "../utils";

export const mioPolicyType = root(
  { path: "/common/military_industrial_organization/policies" },
  {
    military_industrial_organization: obj(
      {
        replace_scope: {
          this: military_industrial_organization(),
          from: country(),
        },
      },
      {
        name: scalar({ cardinality: [0, 1] }),
        icon: scalar({ cardinality: [0, 1] }),
        cost: int({ cardinality: [0, 1] }),
        cooldown: int({ cardinality: [0, 1] }),
        allowed: obj(
          { cardinality: [0, 1] },
          {
            ...trigger,
          },
        ),
        visible: obj(
          { cardinality: [0, 1] },
          {
            ...trigger,
          },
        ),
        available: obj(
          { cardinality: [0, 1] },
          {
            ...trigger,
          },
        ),
        equipment_bonus: obj(
          { cardinality: [0, 1] },
          {
            [enumRefKey("equipment_bonus_type")]: obj(
              { cardinality: [0, Infinity] },
              {
                [enumRefKey("equipment_stat")]: variable_field({
                  cardinality: [0, Infinity],
                }),
                [enumRefKey("production_stat")]: variable_field({
                  cardinality: [0, Infinity],
                }),
              },
            ),
            [typeRefKey("equipment_group")]: obj(
              { cardinality: [0, Infinity] },
              {
                [enumRefKey("equipment_stat")]: variable_field({
                  cardinality: [0, Infinity],
                }),
                [enumRefKey("production_stat")]: variable_field({
                  cardinality: [0, Infinity],
                }),
              },
            ),
            same_as_mio: obj(
              { cardinality: [0, Infinity] },
              {
                [enumRefKey("equipment_stat")]: variable_field({
                  cardinality: [0, Infinity],
                }),
                [enumRefKey("production_stat")]: variable_field({
                  cardinality: [0, Infinity],
                }),
              },
            ),
          },
        ),
        production_bonus: obj(
          { cardinality: [0, 1] },
          {
            [enumRefKey("equipment_bonus_type")]: obj(
              { cardinality: [1, Infinity] },
              {
                [enumRefKey("production_stat")]: variable_field({
                  cardinality: [1, Infinity],
                }),
              },
            ),
            [typeRefKey("equipment_group")]: obj(
              { cardinality: [0, Infinity] },
              {
                [enumRefKey("production_stat")]: variable_field({
                  cardinality: [1, Infinity],
                }),
              },
            ),
            same_as_mio: obj(
              { cardinality: [0, Infinity] },
              {
                [enumRefKey("production_stat")]: variable_field({
                  cardinality: [1, Infinity],
                }),
              },
            ),
          },
        ),
        organization_modifier: obj(
          { cardinality: [0, 1] },
          {
            ...modifier,
          },
        ),
        on_add: obj(
          { cardinality: [0, 1] },
          {
            ...effect,
          },
        ),
        on_remove: obj(
          { cardinality: [0, 1] },
          {
            ...effect,
          },
        ),
        ai_will_do: obj(
          { cardinality: [0, 1] },
          {
            [enumRefKey("base_factor")]: float({ cardinality: [0, 1] }),
            ...modifier_rule,
          },
        ),
      },
    ),
  },
);
