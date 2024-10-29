import { effect } from "../effects";
import { modifier_rule } from "../modifier_rule";
import { modifier } from "../modifiers";
import { unit_leader_modifier } from "../temp_modifiers";
import { trigger } from "../triggers";
import { Scope } from "../types";
import {
  root,
  obj,
  typeRef,
  localisation,
  int,
  bool,
  float,
  typeRefKey,
  enumRefKey,
  country,
  array,
  scopeRef,
  state,
  either,
  literal,
  Enum,
} from "../utils";

export const operationType = root(
  { path: "/common/operations" },
  {
    operation: obj(
      {},
      {
        icon: typeRef({}, "spriteType"),
        map_icon: typeRef({}, "spriteType"),
        name: localisation(),
        desc: localisation(),
        priority: int({ cardinality: [0, 1] }),
        days: int(),
        danger_level: int({ cardinality: [0, 1] }),
        operatives: int(),
        is_captured_cipher: bool({ cardinality: [0, 1] }),
        network_strength: int({}, 0, 100),
        prevent_captured_operative_to_die: bool({ cardinality: [0, 1] }),
        is_staged_coup: bool({ cardinality: [0, 1] }, true),
        cost_multiplier: float({ cardinality: [0, 1] }),
        experience: float({ cardinality: [0, 1] }),
        scale_cost_independent_of_target: bool({ cardinality: [0, 1] }),
        phases: obj(
          { cardinality: [1, Infinity] },
          {
            [typeRefKey("operation_phase")]: obj(
              { cardinality: [1, Infinity] },
              {
                [enumRefKey("base_factor")]: float({ cardinality: [0, 1] }),
                ...modifier_rule,
              },
            ),
          },
        ),
        ai_will_do: obj(
          { cardinality: [0, 1] },
          {
            [enumRefKey("base_factor")]: float({ cardinality: [0, 1] }),
            ...modifier_rule,
          },
        ),
        allowed: obj(
          { replace_scope: { this: country(), root: country() } },
          {
            ...trigger,
          },
        ),
        available: obj(
          {
            replace_scope: {
              this: country(),
              root: country(),
              from: country(),
            },
          },
          {
            ...trigger,
          },
        ),
        visible: obj(
          {
            replace_scope: {
              this: country(),
              root: country(),
              from: country(),
            },
            cardinality: [0, 1],
          },
          {
            ...trigger,
          },
        ),
        risk_chance: float({ cardinality: [0, 1] }, 0, 1),
        risk_modifiers: array({ cardinality: [0, 1] }, [
          Enum(Object.keys(modifier)),
          Enum(Object.keys(unit_leader_modifier)),
        ]),
        awarded_tokens: array({ cardinality: [0, 1] }, [
          typeRef({ cardinality: [1, Infinity] }, "operation_token"),
        ]),
        cost_modifiers: array({ cardinality: [0, 1] }, [
          Enum(Object.keys(modifier)),
          Enum(Object.keys(unit_leader_modifier)),
        ]),
        operation_target: obj(
          {
            replace_scope: { this: country(), root: country() },
            cardinality: [0, 1],
          },
          {
            targets: array({ cardinality: [1, Infinity] }, [
              scopeRef({}, "country"),
            ]),
          },
        ),
        selection_target: obj(
          {
            replace_scope: {
              this: country(),
              root: country(),
              from: country(),
              fromfrom: state(),
            },
            cardinality: [0, 1],
          },
          {
            targets: array({ cardinality: [1, Infinity] }, [
              scopeRef({}, "country"),
            ]),
          },
        ),
        selection_target_state: obj(
          {
            replace_scope: { this: state(), root: state() },
            cardinality: [0, 1],
          },
          {
            ...trigger,
          },
        ),
        target_type: either(
          literal({ cardinality: [0, 1] }, "province"),
          literal({ cardinality: [0, 1] }, "strategic_region"),
        ),
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
        required_tokens: array({ cardinality: [0, 1] }, [
          typeRef({ cardinality: [0, Infinity] }, "operation_token"),
        ]),
        target_weight: obj(
          {
            replace_scope: {
              this: country(),
              root: country(),
              from: country(),
              fromfrom: state(),
            },
            cardinality: [0, 1],
          },
          {
            [enumRefKey("base_factor")]: float({ cardinality: [0, 1] }),
            ...modifier_rule,
          },
        ),
        requirements: obj(
          {
            replace_scope: {
              this: country(),
              root: country(),
              from: country(),
            },
            cardinality: [0, 1],
          },
          {
            ...trigger,
          },
        ),
        return_on_complete: bool({ cardinality: [0, 1] }, true),
        on_start: obj(
          {
            replace_scope: {
              this: Scope.OPERATION,
              root: country(),
              from: country(),
            },
            cardinality: [0, 1],
          },
          {
            ...effect,
          },
        ),
        outcome_potential: obj(
          {
            replace_scope: {
              this: country(),
              root: country(),
              from: country(),
              fromfrom: state(),
            },
            cardinality: [0, 1],
          },
          {
            ...effect,
          },
        ),
        outcome_extra_chance: float({ cardinality: [0, 1] }, 0, 1),
        outcome_modifiers: array({ cardinality: [0, 1] }, [
          Enum(Object.keys(modifier)),
          Enum(Object.keys(unit_leader_modifier)),
        ]),
        outcome_execute: obj(
          {
            replace_scope: {
              this: country(),
              root: country(),
              from: country(),
              fromfrom: state(),
            },
            cardinality: [0, 1],
          },
          {
            ...effect,
          },
        ),
        outcome_extra_execute: obj(
          {
            replace_scope: {
              this: country(),
              root: country(),
              from: country(),
              fromfrom: state(),
            },
            cardinality: [0, 1],
          },
          {
            ...effect,
          },
        ),
        will_lead_to_war_with: bool({ cardinality: [0, 1] }),
      },
    ),
  },
);
