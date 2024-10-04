import { effect } from "../effects";
import { modifier_rule } from "../modifier_rule";
import { modifier } from "../modifiers";
import { trigger } from "../triggers";
import {
  root,
  typeDefKey,
  obj,
  either,
  bool,
  scalar,
  enumRef,
  typeRef,
  array,
  country,
  int,
  enumRefKey,
  float,
  localisation,
  state,
  scopeRef,
  variable_field,
  valueRef,
} from "../utils";

// TODO: Support subtype validation
// const decisionEither = either(
//   obj(
//     {},
//     {
//       state_target: bool({}, true),
//       days_mission_timeout: scalar(),
//     },
//   ),
//   obj(
//     {},
//     {
//       state_target: enumRef({}, "continents"),
//       days_mission_timeout: scalar(),
//     },
//   ),
//   obj(
//     {},
//     {
//       state_target: typeRef({}, "any_owned_state"),
//       days_mission_timeout: scalar(),
//     },
//   ),
//   obj(
//     {},
//     {
//       state_target: typeRef({}, "any_controlled_state"),
//       days_mission_timeout: scalar(),
//     },
//   ),
//   obj(
//     {},
//     {
//       days_mission_timeout: scalar(),
//     },
//   ),
//   obj(
//     {},
//     {
//       state_target: bool({}, true),
//     },
//   ),
//   obj(
//     {},
//     {
//       state_target: enumRef({}, "continents"),
//     },
//   ),
//   obj(
//     {},
//     {
//       state_target: typeRef({}, "any_owned_state"),
//     },
//   ),
//   obj(
//     {},
//     {
//       state_target: typeRef({}, "any_controlled_state"),
//     },
//   ),
//   obj(
//     {},
//     {
//       target_trigger: obj({}),
//     },
//   ),
//   obj(
//     {},
//     {
//       targets: obj({}),
//     },
//   ),
//   obj(
//     {},
//     {
//       target_array: scalar(),
//     },
//   ),
//   obj(
//     {},
//     {
//       custom_cost_trigger: obj({}),
//     },
//   ),
//   obj(
//     {},
//     {
//       days_remove: scalar(),
//     },
//   ),
//   obj(
//     {},
//     {
//       days_mission_timeout: scalar(),
//     },
//   ),
//   array({}, []),
// );

const decision_category = obj(
  {},
  {
    icon: either(
      scalar({ cardinality: [0, Infinity] }),
      obj(
        {
          replace_scope: { this: country(), root: country() },
          cardinality: [0, Infinity],
        },
        {
          key: scalar(),
          trigger: obj({}, trigger),
        },
      ),
    ),
    picture: scalar({ cardinality: [0, 1] }),
    priority: either(
      int({ cardinality: [0, 1] }),
      obj(
        {
          replace_scope: { this: country(), root: country() },
          cardinality: [0, 1],
        },
        {
          [enumRefKey("base_factor")]: float({ cardinality: [0, 1] }),
          ...modifier_rule,
        },
      ),
    ),
    visible_when_empty: bool({ cardinality: [0, 1] }),
    available: obj(
      {
        replace_scope: { this: country(), root: country() },
        cardinality: [0, 1],
      },
      {
        ...trigger,
      },
    ),
    allowed: obj(
      {
        replace_scope: { this: country(), root: country() },
        cardinality: [0, 1],
      },
      {
        ...trigger,
      },
    ),
    visible: obj(
      {
        replace_scope: { this: country(), root: country() },
        cardinality: [0, 1],
      },
      {
        ...trigger,
      },
    ),
    cancel_trigger: obj(
      {
        replace_scope: { this: country(), root: country() },
        cardinality: [0, 1],
      },
      {
        ...trigger,
      },
    ),
    custom_icon: obj(
      { cardinality: [0, Infinity] },
      {
        tag: enumRef({}, "country_tags"),
        value: scalar(),
        desc: localisation(),
        visible: obj({}, { ...trigger }),
      },
    ),
    highlight_states: obj(
      {
        replace_scope: { this: state(), root: country() },
        cardinality: [0, 1],
      },
      {
        highlight_states_trigger: obj({ cardinality: [0, 1] }, { ...trigger }),
        highlight_state_targets: obj(
          { cardinality: [0, 1] },
          {
            state: either(
              typeRef({ cardinality: [0, Infinity] }, "state"),
              scopeRef({ cardinality: [0, Infinity] }, "state"),
              ...variable_field({ cardinality: [0, Infinity] }),
            ),
          },
        ),
        highlight_provinces: array({ cardinality: [0, 1] }, [
          enumRef({ cardinality: [0, Infinity] }, "provinces"),
        ]),
        highlight_only_provinces: bool({ cardinality: [0, 1] }),
        highlight_color_before_active: int({ cardinality: [0, 1] }),
        highlight_color_while_active: int({ cardinality: [0, 1] }),
      },
    ),
    visibility_type: enumRef(
      { cardinality: [0, 1] },
      "targeted_decisions_state_map_modes",
    ),
    on_map_area: obj(
      { cardinality: [0, Infinity] },
      {
        name: localisation(),
        zoom: int(),
        state: typeRef({ cardinality: [0, 1] }, "state"),
        targets: array({ cardinality: [0, 1] }, [
          typeRef({ cardinality: [0, Infinity] }, "state"),
        ]),
        target_array: either(
          valueRef({ cardinality: [0, Infinity] }, "array"),
          ...variable_field({ cardinality: [0, Infinity] }),
        ),
        target_trigger: obj(
          {
            replace_scope: { this: country(), root: country(), from: state() },
            cardinality: [0, 1],
          },
          {
            ...trigger,
          },
        ),
        target_root_trigger: obj(
          {
            replace_scope: { this: country(), root: country() },
            cardinality: [0, 1],
          },
          {
            ...trigger,
          },
        ),
      },
    ),
    scripted_gui: typeRef({ cardinality: [0, 1] }, "scripted_gui"),
  },
);

const decision = obj(
  {},
  {
    icon: either(
      scalar({ cardinality: [0, Infinity] }),
      obj(
        {
          replace_scope: { this: country(), root: country() },
          cardinality: [0, Infinity],
        },
        {
          key: scalar(),
          trigger: obj({}, trigger),
        },
      ),
    ),
    cosmetic_tag: enumRef({ cardinality: [0, 1] }, "country_tags"),
    cosmetic_ideology: typeRef({ cardinality: [0, 1] }, "ideology"),
    priority: either(
      int({ cardinality: [0, 1] }),
      obj(
        {
          replace_scope: { this: country(), root: country() },
          cardinality: [0, 1],
        },
        {
          [enumRefKey("base_factor")]: float({ cardinality: [0, 1] }),
          ...modifier_rule,
        },
      ),
    ),
    name: localisation({ cardinality: [0, 1] }),
    desc: localisation({ cardinality: [0, 1] }),
    fire_only_once: bool({ cardinality: [0, 1] }),
    ai_hint_pp_cost: int({ cardinality: [0, 1] }),
    state_target: bool({ cardinality: [0, 1] }, false),
    cost: variable_field({ cardinality: [0, 1] }),
    highlight_states: obj(
      {
        replace_scope: { this: state(), root: country() },
        cardinality: [0, 1],
      },
      {
        highlight_states_trigger: obj({ cardinality: [0, 1] }, { ...trigger }),
        highlight_state_targets: obj(
          { cardinality: [0, 1] },
          {
            state: either(
              typeRef({ cardinality: [0, Infinity] }, "state"),
              scopeRef({ cardinality: [0, Infinity] }, "state"),
              ...variable_field({ cardinality: [0, Infinity] }),
            ),
          },
        ),
        highlight_provinces: array({ cardinality: [0, 1] }, [
          enumRef({ cardinality: [0, Infinity] }, "provinces"),
        ]),
        highlight_only_provinces: bool({ cardinality: [0, 1] }),
        highlight_color_before_active: int({ cardinality: [0, 1] }),
        highlight_color_while_active: int({ cardinality: [0, 1] }),
      },
    ),
    highlight_color_before_active: int({ cardinality: [0, 1] }),
    highlight_color_while_active: int({ cardinality: [0, 1] }),
    subtype: obj(
      {},
      {
        country: obj(
          {},
          {
            available: obj(
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
            complete_effect: obj(
              {
                replace_scope: {
                  this: country(),
                  root: country(),
                  from: country(),
                },
                cardinality: [0, 1],
              },
              {
                ...effect,
              },
            ),
            remove_effect: obj(
              {
                replace_scope: {
                  this: country(),
                  root: country(),
                  from: country(),
                },
                cardinality: [0, 1],
              },
              {
                ...effect,
              },
            ),
            cancel_effect: obj(
              {
                replace_scope: {
                  this: country(),
                  root: country(),
                  from: country(),
                },
                cardinality: [0, 1],
              },
              {
                ...effect,
              },
            ),
            ai_will_do: obj(
              {
                replace_scope: {
                  this: country(),
                  root: country(),
                  from: country(),
                },
                cardinality: [0, 1],
              },
              {
                [enumRefKey("base_factor")]: variable_field({
                  cardinality: [0, 1],
                }),
                ...modifier_rule,
              },
            ),
            target_non_existing: bool({ cardinality: [0, 1] }),
          },
        ),
        custom_cost: obj(
          {},
          {
            custom_cost_trigger: obj(
              { replace_scope: { this: country(), root: country() } },
              {
                ...trigger,
              },
            ),
            custom_cost_text: localisation(),
          },
        ),
        timed: obj(
          {},
          {
            cancel_trigger: obj(
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
            remove_trigger: obj(
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
            days_remove: variable_field({ cardinality: [0, 1] }),
            modifier: obj(
              {
                replace_scope: {
                  this: country(),
                  root: country(),
                  from: country(),
                },
                cardinality: [0, 1],
              },
              {
                ...modifier,
              },
            ),
          },
        ),
        mission: obj(
          {},
          {
            activation: obj(
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
            is_good: bool(),
            days_mission_timeout: variable_field(),
            timeout_effect: obj(
              {
                replace_scope: {
                  this: country(),
                  root: country(),
                  from: country(),
                },
                cardinality: [0, 1],
              },
              {
                ...effect,
              },
            ),
            selectable_mission: bool({ cardinality: [0, 1] }),
            cancel_trigger: obj(
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
          },
        ),
        state_mission: obj(
          {},
          {
            activation: obj(
              {
                replace_scope: {
                  this: country(),
                  root: country(),
                  from: state(),
                },
              },
              {
                ...trigger,
              },
            ),
            is_good: bool(),
            days_mission_timeout: variable_field(),
            timeout_effect: obj(
              {
                replace_scope: {
                  this: country(),
                  root: country(),
                  from: state(),
                },
                cardinality: [0, 1],
              },
              {
                ...effect,
              },
            ),
            state_target: either(
              bool({ cardinality: [0, 1] }, true),
              enumRef({ cardinality: [0, 1] }, "continents"),
              typeRef({ cardinality: [0, 1] }, "any_owned_state"),
              typeRef({ cardinality: [0, 1] }, "any_controlled_state"),
            ),
            selectable_mission: bool({ cardinality: [0, 1] }),
            cancel_trigger: obj(
              {
                replace_scope: {
                  this: country(),
                  root: country(),
                  from: state(),
                },
                cardinality: [0, 1],
              },
              {
                ...trigger,
              },
            ),
          },
        ),
        targeted: obj(
          {},
          {
            target_trigger: obj(
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
            targets: array({ cardinality: [0, 1] }, [
              scopeRef({ cardinality: [0, Infinity] }, "country"),
              enumRef({ cardinality: [0, Infinity] }, "country_tags"),
              valueRef({ cardinality: [0, Infinity] }, "variable"),
              ...variable_field({ cardinality: [0, Infinity] }),
            ]),
            targets_dynamic: bool({ cardinality: [0, 1] }),
            target_root_trigger: obj(
              {
                replace_scope: { this: country(), root: country() },
                cardinality: [0, 1],
              },
              {
                ...trigger,
              },
            ),
            highlight_states: obj(
              {
                replace_scope: {
                  this: state(),
                  root: country(),
                  from: country(),
                },
                cardinality: [0, 1],
              },
              {
                highlight_states_trigger: obj(
                  { cardinality: [0, 1] },
                  { ...trigger },
                ),
                highlight_state_targets: obj(
                  { cardinality: [0, 1] },
                  {
                    state: either(
                      typeRef({ cardinality: [0, Infinity] }, "state"),
                      scopeRef({ cardinality: [0, Infinity] }, "state"),
                      ...variable_field({ cardinality: [0, Infinity] }),
                    ),
                  },
                ),
                highlight_provinces: array({ cardinality: [0, 1] }, [
                  enumRef({ cardinality: [0, Infinity] }, "provinces"),
                ]),
                highlight_only_provinces: bool({ cardinality: [0, 1] }),
              },
            ),
            target_array: either(
              valueRef({ cardinality: [0, Infinity] }, "array"),
              ...variable_field({ cardinality: [0, Infinity] }),
            ),
            target_non_existing: bool({ cardinality: [0, 1] }),
          },
        ),
        state_targeted: obj(
          {},
          {
            visible: obj(
              {
                replace_scope: {
                  root: country(),
                  this: country(),
                  from: state(),
                },
                cardinality: [0, 1],
              },
              {
                ...trigger,
              },
            ),
            available: obj(
              {
                replace_scope: {
                  root: country(),
                  this: country(),
                  from: state(),
                },
                cardinality: [0, 1],
              },
              {
                ...trigger,
              },
            ),
            cancel_trigger: obj(
              {
                replace_scope: {
                  this: country(),
                  root: country(),
                  from: state(),
                },
                cardinality: [0, 1],
              },
              {
                ...trigger,
              },
            ),
            complete_effect: obj(
              {
                replace_scope: {
                  root: country(),
                  this: country(),
                  from: state(),
                },
                cardinality: [0, 1],
              },
              {
                ...effect,
              },
            ),
            remove_effect: obj(
              {
                replace_scope: {
                  root: country(),
                  this: country(),
                  from: state(),
                },
                cardinality: [0, 1],
              },
              {
                ...effect,
              },
            ),
            cancel_effect: obj(
              {
                replace_scope: {
                  root: country(),
                  this: country(),
                  from: state(),
                },
                cardinality: [0, 1],
              },
              {
                ...effect,
              },
            ),
            target_trigger: obj(
              {
                replace_scope: {
                  root: country(),
                  this: country(),
                  from: state(),
                },
                cardinality: [0, 1],
              },
              {
                ...trigger,
              },
            ),
            state_target: either(
              bool({ cardinality: [0, 1] }, true),
              enumRef({ cardinality: [0, 1] }, "continents"),
              typeRef({ cardinality: [0, 1] }, "any_owned_state"),
              typeRef({ cardinality: [0, 1] }, "any_controlled_state"),
            ),
            targets: array({ cardinality: [0, 1] }, [
              typeRef({ cardinality: [0, Infinity] }, "state"),
              valueRef({ cardinality: [0, Infinity] }, "variable"),
              ...variable_field({ cardinality: [0, Infinity] }),
            ]),
            target_root_trigger: obj(
              {
                replace_scope: { this: country(), root: country() },
                cardinality: [0, 1],
              },
              {
                ...trigger,
              },
            ),
          },
        ),
      },
    ),
  },
);

export const decisionType = root(
  { path: "game/common/decisions", path_strict: true },
  {
    [typeDefKey("decision")]: decision,
  },
);

export const decisionCategoryType = root(
  { path: "game/common/decisions/categories" },
  {
    [typeDefKey("decision_category")]: decision_category,
  },
);

export const war_with_on = [
  "war_with_on_remove",
  "war_with_on_complete",
  "war_with_on_timeout",
];
export const war_with_target_on = [
  "war_with_target_on_remove",
  "war_with_target_on_complete",
  "war_with_target_on_timeout",
];
export const targeted_decisions_state_map_modes = [
  "map_only",
  "decision_view_only",
  "map_and_decisions_view",
];
