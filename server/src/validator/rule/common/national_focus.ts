import { effect } from "../effects";
import { modifier_rule } from "../modifier_rule";
import { modifier } from "../modifiers";
import { trigger } from "../triggers";
import {
  root,
  obj,
  typeDefKey,
  literal,
  either,
  array,
  localisation,
  enumRefKey,
  float,
  bool,
  typeRef,
  int,
  country,
  scopeRef,
  enumRef,
  value_set,
  scalar,
} from "../utils";

export const continousFocusTreeType = root(
  { path: "/common/continuous_focus" },
  {
    continous_focus_tree: obj(
      {},
      {
        [typeDefKey("continous_focus_tree")]: obj(
          {},
          { name_field: literal("id") },
        ),
      },
    ),
  },
);

export const focusType = root(
  { path: "/common/national_focus" },
  {
    focus_tree: obj(
      {},
      {
        [typeDefKey("focus")]: obj({}, { name_field: literal("id") }),
      },
    ),
  },
);

const focus_tree = obj(
  {},
  {
    id: localisation(),
    country: obj(
      {},
      {
        [enumRefKey("base_factor")]: float({ cardinality: [0, 1] }),
        ...modifier_rule,
      },
    ),
    default: bool({ cardinality: [0, 1] }),
    reset_on_civilwar: bool({ cardinality: [0, 1] }),
    shared_focus: typeRef({ cardinality: [0, Infinity] }, "shared_focus"),
    continuous_focus_position: obj(
      { cardinality: [0, 1] },
      {
        x: int(),
        y: int(),
      },
    ),
    initial_show_position: obj(
      { cardinality: [0, 1] },
      {
        focus: either(
          typeRef({ cardinality: [0, 1] }, "focus"),
          typeRef({ cardinality: [0, 1] }, "shared_focus"),
        ),
        x: int({ cardinality: [0, 1] }),
        y: int({ cardinality: [0, 1] }),
        offset: obj(
          { cardinality: [0, Infinity] },
          {
            x: int({ cardinality: [0, 1] }),
            y: int({ cardinality: [0, 1] }),
            trigger: obj({}, { ...trigger }),
          },
        ),
      },
    ),
    focus: obj(
      { cardinality: [0, Infinity] },
      {
        id: localisation(),
        text: localisation({ cardinality: [0, 1] }),
        icon: either(
          typeRef({ cardinality: [1, Infinity] }, "spriteType"),
          obj(
            {},
            {
              trigger: obj(
                {
                  replace_scope: { root: country(), this: country() },
                  cardinality: [0, 1],
                },
                {
                  ...trigger,
                },
              ),
              value: typeRef({ cardinality: [1, 1] }, "spriteType"),
            },
          ),
        ),
        text_icon: typeRef({ cardinality: [0, 1] }, "focus_style"),
        cost: float(),
        x: float(),
        y: float(),
        offset: obj(
          { cardinality: [0, Infinity] },
          {
            x: int({ cardinality: [0, 1] }),
            y: int({ cardinality: [0, 1] }),
            trigger: obj(
              { replace_scope: { root: country(), this: country() } },
              { ...trigger },
            ),
          },
        ),
        relative_position_id: either(
          typeRef({ cardinality: [0, 1] }, "focus"),
          typeRef({ cardinality: [0, 1] }, "shared_focus"),
        ),
        dynamic: bool({ cardinality: [0, 1] }, true),
        available_if_capitulated: bool({ cardinality: [0, 1] }, true),
        cancel_if_invalid: bool({ cardinality: [0, 1] }, false),
        continue_if_invalid: bool({ cardinality: [0, 1] }, true),
        cancelable: bool({ cardinality: [0, 1] }, false),
        bypass_if_unavailable: bool({ cardinality: [0, 1] }, true),
        will_lead_to_war_with: either(
          scopeRef({ cardinality: [0, Infinity] }, "country"),
          enumRef({ cardinality: [0, Infinity] }, "country_tags"),
        ),
        prerequisite: obj(
          { cardinality: [0, Infinity] },
          {
            focus: either(
              typeRef({ cardinality: [0, Infinity] }, "focus"),
              typeRef({ cardinality: [0, Infinity] }, "shared_focus"),
            ),
          },
        ),
        mutually_exclusive: obj(
          { cardinality: [0, Infinity] },
          {
            focus: either(
              typeRef({ cardinality: [0, Infinity] }, "focus"),
              typeRef({ cardinality: [0, Infinity] }, "shared_focus"),
            ),
          },
        ),
        bypass: obj(
          {
            replace_scope: { root: country(), this: country() },
            cardinality: [0, 1],
          },
          {
            ...trigger,
          },
        ),
        allow_branch: obj(
          {
            replace_scope: { root: country(), this: country() },
            cardinality: [0, 1],
          },
          {
            ...trigger,
          },
        ),
        available: obj(
          {
            replace_scope: { root: country(), this: country() },
            cardinality: [0, 1],
          },
          {
            ...trigger,
          },
        ),
        cancel: obj(
          {
            replace_scope: { root: country(), this: country() },
            cardinality: [0, 1],
          },
          {
            ...trigger,
          },
        ),
        historical_ai: obj({ cardinality: [0, 1] }, { ...trigger }),
        select_effect: obj(
          {
            replace_scope: { root: country(), this: country() },
            cardinality: [0, 1],
          },
          {
            ...effect,
          },
        ),
        cancel_effect: obj(
          {
            replace_scope: { root: country(), this: country() },
            cardinality: [0, 1],
          },
          {
            ...effect,
          },
        ),
        complete_tooltip: obj({ cardinality: [0, 1] }, { ...effect }),
        on_uncomplete: obj({ cardinality: [0, 1] }, { ...effect }),
        completion_reward: obj(
          {
            replace_scope: { root: country(), this: country() },
            cardinality: [1, 1],
          },
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
        search_filters: array({ cardinality: [1, Infinity] }, [
          value_set({}, "focus_filter"),
        ]),
      },
    ),
  },
);

export const focusTreeType = root(
  { path: "/common/national_focus" },
  {
    focus_tree: obj(
      {},
      {
        [typeDefKey("focus_tree")]: focus_tree,
      },
    ),
  },
);

const shared_focus = obj(
  {},
  {
    id: localisation(),
    text: localisation({ cardinality: [0, 1] }),
    icon: either(
      typeRef({ cardinality: [0, Infinity] }, "spriteType"),
      obj(
        {},
        {
          trigger: obj(
            {
              replace_scope: { root: country(), this: country() },
              cardinality: [0, 1],
            },
            {
              ...trigger,
            },
          ),
          value: typeRef({ cardinality: [1, 1] }, "spriteType"),
        },
      ),
    ),
    text_icon: typeRef({ cardinality: [0, 1] }, "focus_style"),
    cost: float(),
    x: int(),
    y: int(),
    offset: obj(
      { cardinality: [0, Infinity] },
      {
        x: int({ cardinality: [0, 1] }),
        y: int({ cardinality: [0, 1] }),
        trigger: obj(
          { replace_scope: { root: country(), this: country() } },
          { ...trigger },
        ),
      },
    ),
    relative_position_id: either(
      typeRef({ cardinality: [0, 1] }, "shared_focus"),
      typeRef({ cardinality: [0, 1] }, "focus"),
    ),
    dynamic: bool({ cardinality: [0, 1] }, true),
    available_if_capitulated: bool({ cardinality: [0, 1] }, true),
    cancel_if_invalid: bool({ cardinality: [0, 1] }, true),
    continue_if_invalid: bool({ cardinality: [0, 1] }, true),
    cancelable: bool({ cardinality: [0, 1] }, false),
    bypass_if_unavailable: bool({ cardinality: [0, 1] }, true),
    will_lead_to_war_with: either(
      scopeRef({ cardinality: [0, Infinity] }, "country"),
      enumRef({ cardinality: [0, Infinity] }, "country_tags"),
    ),
    prerequisite: obj(
      { cardinality: [0, Infinity] },
      {
        focus: either(
          typeRef({ cardinality: [0, Infinity] }, "shared_focus"),
          typeRef({ cardinality: [0, Infinity] }, "focus"),
        ),
      },
    ),
    mutually_exclusive: obj(
      { cardinality: [0, Infinity] },
      {
        focus: either(
          typeRef({ cardinality: [0, Infinity] }, "shared_focus"),
          typeRef({ cardinality: [0, Infinity] }, "focus"),
        ),
      },
    ),
    bypass: obj(
      {
        replace_scope: { root: country(), this: country() },
        cardinality: [0, 1],
      },
      {
        ...trigger,
      },
    ),
    allow_branch: obj(
      {
        replace_scope: { root: country(), this: country() },
        cardinality: [0, 1],
      },
      {
        ...trigger,
      },
    ),
    available: obj(
      {
        replace_scope: { root: country(), this: country() },
        cardinality: [0, 1],
      },
      {
        ...trigger,
      },
    ),
    cancel: obj(
      {
        replace_scope: { root: country(), this: country() },
        cardinality: [0, 1],
      },
      {
        ...trigger,
      },
    ),
    subtype: either(
      obj(
        {},
        {
          completion_reward: obj(
            {
              replace_scope: { root: country(), this: country() },
              cardinality: [1, 1],
            },
            {
              ...effect,
            },
          ),
        },
      ),
      obj(
        {},
        {
          joint_trigger: obj(
            {
              replace_scope: { root: country(), this: country() },
              cardinality: [1, 1],
            },
            {
              ...trigger,
            },
          ),
          completion_reward_joint_originator: obj(
            {
              replace_scope: { root: country(), this: country() },
              cardinality: [0, 1],
            },
            {
              ...effect,
            },
          ),
          completion_reward_joint_member: obj(
            {
              replace_scope: { root: country(), this: country() },
              cardinality: [0, 1],
            },
            {
              ...effect,
            },
          ),
          completion_reward: obj(
            {
              replace_scope: { root: country(), this: country() },
              cardinality: [0, 1],
            },
            {
              ...effect,
            },
          ),
        },
      ),
    ),
    historical_ai: obj({ cardinality: [0, 1] }, { ...trigger }),
    select_effect: obj({ cardinality: [0, 1] }, { ...effect }),
    complete_tooltip: obj({ cardinality: [0, 1] }, { ...effect }),
    on_uncomplete: obj({ cardinality: [0, 1] }, { ...effect }),
    search_filters: array({ cardinality: [1, Infinity] }, [
      value_set({}, "focus_filter"),
    ]),
  },
);

export const sharedFocusType = root(
  { path: "/common/national_focus" },
  {
    shared_focus: obj(
      {},
      {
        [typeDefKey("shared_focus")]: shared_focus,
      },
    ),
  },
);

const continous_focus_tree = obj(
  {},
  {
    id: localisation(),
    country: obj(
      {},
      {
        [enumRefKey("base_factor")]: float({ cardinality: [0, 1] }),
        ...modifier_rule,
      },
    ),
    default: bool({ cardinality: [0, 1] }),
    reset_on_civilwar: bool({ cardinality: [0, 1] }),
    position: obj(
      { cardinality: [0, 1] },
      {
        x: int(),
        y: int(),
      },
    ),
    focus: obj(
      { cardinality: [0, Infinity] },
      {
        id: localisation(),
        icon: either(
          typeRef({ cardinality: [1, Infinity] }, "spriteType"),
          obj(
            {},
            {
              trigger: obj(
                {
                  replace_scope: { root: country(), this: country() },
                  cardinality: [0, 1],
                },
                {
                  ...trigger,
                },
              ),
              value: typeRef({ cardinality: [1, 1] }, "spriteType"),
            },
          ),
        ),
        daily_cost: float(),
        available_if_capitulated: bool({ cardinality: [0, 1] }, true),
        available: obj(
          {
            replace_scope: { root: country(), this: country() },
            cardinality: [0, 1],
          },
          {
            ...trigger,
          },
        ),
        enable: obj(
          {
            replace_scope: { root: country(), this: country() },
            cardinality: [0, 1],
          },
          {
            ...trigger,
          },
        ),
        supports_ai_strategy: typeRef({ cardinality: [0, 1] }, "ai_focus"),
        modifier: obj({ cardinality: [0, 1] }, { ...modifier }),
        idea: enumRef({ cardinality: [0, 1] }, "idea_name"),
        select_effect: obj(
          {
            replace_scope: { root: country(), this: country() },
            cardinality: [0, 1],
          },
          {
            ...effect,
          },
        ),
        cancel_effect: obj(
          {
            replace_scope: { root: country(), this: country() },
            cardinality: [0, 1],
          },
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

export const continousFocusType = root(
  { path: "/common/continuous_focus" },
  {
    continuous_focus_palette: obj(
      {},
      {
        [typeDefKey("continous_focus")]: continous_focus_tree,
      },
    ),
  },
);

const style = obj(
  {},
  {
    name: scalar({ cardinality: [1, 1] }),
    default: bool({ cardinality: [0, 1] }, true),
    unavailable: typeRef({ cardinality: [1, 1] }, "spriteType"),
    completed: typeRef({ cardinality: [1, 1] }, "spriteType"),
    available: typeRef({ cardinality: [1, 1] }, "spriteType"),
    current: typeRef({ cardinality: [1, 1] }, "spriteType"),
  },
);

export const focusStyleType = root(
  { path: "/common/national_focus" },
  {
    style: obj(
      {},
      {
        [typeDefKey("focus_style")]: style,
      },
    ),
  },
);

const search_filter_prios = obj(
  {},
  {
    [typeDefKey("focus_filter")]: int({ cardinality: [0, Infinity] }),
  },
);

export const searchFilterPriosType = root(
  { path: "/common/national_focus" },
  {
    search_filter_prios,
  },
);
