import { effects } from "../effects";
import { modifier_rule } from "../modifier_rule";
import { triggers } from "../triggers";
import { RootObjectEntryDescriptor, Scope, Value } from "../types";
import { Enum, int, localisation } from "../utils";
import { int_variable_field, variable_field } from "../variable_field";

export const decision_category: RootObjectEntryDescriptor = {
  children: {
    icon: [
      { type: Value.UNQUOTED, cardinality: [0, Infinity] },
      {
        cardinality: [0, Infinity],
        children: {
          key: { type: Value.UNQUOTED },
          trigger: { ...triggers },
        },
      },
    ],
    picture: { type: Value.UNQUOTED, cardinality: [0, 1] },
    priority: [
      { type: Value.INT, cardinality: [0, 1] },
      {
        cardinality: [0, 1],
        children: {
          base_factor: { type: Value.FLOAT },
          ...modifier_rule,
        },
      },
    ],
    visible_when_empty: { type: Value.BOOL, cardinality: [0, 1] },
    available: {
      cardinality: [0, 1],
      children: { ...triggers },
      replaceScope: { this: Scope.COUNTRY, root: Scope.COUNTRY },
    },
    allowed: {
      cardinality: [0, 1],
      children: { ...triggers },
      replaceScope: { this: Scope.COUNTRY, root: Scope.COUNTRY },
    },
    visible: {
      cardinality: [0, 1],
      children: { ...triggers },
      replaceScope: { this: Scope.COUNTRY, root: Scope.COUNTRY },
    },
    cancel_trigger: {
      cardinality: [0, 1],
      children: { ...triggers },
      replaceScope: { this: Scope.COUNTRY, root: Scope.COUNTRY },
    },
    custom_icon: {
      cardinality: [0, Infinity],
      children: {
        tag: Enum("country_tags"),
        value: { type: Value.UNQUOTED },
        desc: localisation(),
        visible: { ...triggers },
      },
    },
    highlight_states: {
      cardinality: [0, 1],
      replaceScope: { this: Scope.STATE, root: Scope.COUNTRY },
      children: {
        highlight_states_trigger: {
          cardinality: [0, 1],
          children: { ...triggers },
        },
        highlight_state_targets: {
          cardinality: [0, 1],
          dynamicChildren: [
            { key: "state", value: Value.REFERENCE_TO },
            { key: "state", value: Scope.STATE },
            { key: "state", value: variable_field },
          ],
          children: {},
        },
        highlight_provinces: {
          cardinality: [0, 1],
          type: Value.ARRAY,
          values: Enum("provinces"),
        },
        highlight_color_before_active: { type: Value.INT, cardinality: [0, 1] },
        highlight_color_while_active: { type: Value.INT, cardinality: [0, 1] },
      },
    },
    visibility_type: {
      type: Enum("targeted_decisions_state_map_modes"),
      cardinality: [0, 1],
    },
    on_map_area: {
      cardinality: [0, Infinity],
      children: {
        name: localisation(),
        zoom: int(),
        state: { type: Value.REFERENCE_TO, cardinality: [0, 1] },
        targets: {
          type: Value.ARRAY,
          values: Value.REFERENCE_TO,
          cardinality: [0, Infinity],
        },
        target_array: [
          { type: Value.UNQUOTED, cardinality: [0, Infinity] },
          {
            type: Value.UNQUOTED,
            cardinality: [0, Infinity],
            values: variable_field,
          },
        ],
        target_trigger: {
          cardinality: [0, 1],
          children: { ...triggers },
          replaceScope: {
            this: Scope.COUNTRY,
            root: Scope.COUNTRY,
            from: Scope.STATE,
          },
        },
        target_root_trigger: {
          cardinality: [0, 1],
          children: { ...triggers },
          replaceScope: { this: Scope.COUNTRY, root: Scope.COUNTRY },
        },
      },
    },
    scripted_gui: {
      type: Value.REFERENCE_TO,
      cardinality: [0, 1],
    },
  },
};

export const decision: RootObjectEntryDescriptor = {
  children: {
    icon: [
      { type: Value.UNQUOTED, cardinality: [0, Infinity] },
      {
        cardinality: [0, Infinity],
        children: {
          key: { type: Value.UNQUOTED },
          trigger: { ...triggers },
        },
      },
    ],
    cosmetic_tag: { type: Enum("country_tags"), cardinality: [0, 1] },
    cosmetic_ideology: { type: Scope.IDEOLOGY, cardinality: [0, 1] },
    priority: [
      { type: Value.INT, cardinality: [0, 1] },
      {
        cardinality: [0, 1],
        children: {
          base_factor: { type: Value.FLOAT },
          ...modifier_rule,
        },
      },
    ],
    name: localisation(),
    desc: localisation(),
    fire_only_once: { type: Value.BOOL, cardinality: [0, 1] },
    ai_hint_pp_cost: { type: Value.INT, cardinality: [0, 1] },
    state_target: { type: boolean(NO), cardinality: [0, 1] },
    cancel_if_not_visible: { type: Value.BOOL, cardinality: [0, 1] },
    allowed: {
      children: { ...triggers },
      cardinality: [0, 1],
      replaceScope: { this: Scope.COUNTRY, root: Scope.COUNTRY },
    },
    cost: int_variable_field,
    highlight_color_before_active: { type: Value.INT, cardinality: [0, 1] },
    highlight_color_while_active: { type: Value.INT, cardinality: [0, 1] },
    days_re_enable: int_variable_field,
    fixed_random_seed: { type: Value.BOOL, cardinality: [0, 1] },
    on_map_mode: {
      type: Enum("targeted_decisions_state_map_modes"),
      cardinality: [0, 1],
    },
    subtype: [
      {
        // country subtype
        children: {
          available: {
            cardinality: [0, 1],
            children: { ...triggers },
            replaceScope: {
              this: Scope.COUNTRY,
              root: Scope.COUNTRY,
              from: Scope.COUNTRY,
            },
          },
          visible: {
            cardinality: [0, 1],
            children: { ...triggers },
            replaceScope: {
              this: Scope.COUNTRY,
              root: Scope.COUNTRY,
              from: Scope.COUNTRY,
            },
          },
          complete_effect: {
            cardinality: [0, 1],
            children: { ...effects },
            replaceScope: {
              this: Scope.COUNTRY,
              root: Scope.COUNTRY,
              from: Scope.COUNTRY,
            },
          },
          remove_effect: {
            cardinality: [0, 1],
            children: { ...effects },
            replaceScope: {
              this: Scope.COUNTRY,
              root: Scope.COUNTRY,
              from: Scope.COUNTRY,
            },
          },
          cancel_effect: {
            cardinality: [0, 1],
            children: { ...effects },
            replaceScope: {
              this: Scope.COUNTRY,
              root: Scope.COUNTRY,
              from: Scope.COUNTRY,
            },
          },
          ai_will_do: {
            cardinality: [0, 1],
            children: modifier_rule,
          },
          target_non_existing: { type: Value.BOOL, cardinality: [0, 1] },
        },
      },
      {
        // custom_cost subtype
        children: {
          custom_cost_trigger: {
            cardinality: [0, 1],
            children: { ...triggers },
            replaceScope: { this: Scope.COUNTRY, root: Scope.COUNTRY },
          },
          custom_cost_text: localisation(),
        },
      },
      {
        // timed subtype
        children: {
          cancel_trigger: {
            cardinality: [0, 1],
            children: { ...triggers },
            replaceScope: {
              this: Scope.COUNTRY,
              root: Scope.COUNTRY,
              from: Scope.COUNTRY,
            },
          },
          remove_trigger: {
            cardinality: [0, 1],
            children: { ...triggers },
            replaceScope: {
              this: Scope.COUNTRY,
              root: Scope.COUNTRY,
              from: Scope.COUNTRY,
            },
          },
          days_remove: int_variable_field({
            cardinality: [0, 1],
          }),
          alias_name: {
            cardinality: [0, Infinity],
            children: {
              targeted_modifier_rule: modifier_rule,
            },
          },
          modifier: {
            cardinality: [0, 1],
            children: { ...triggers },
            replaceScope: {
              this: Scope.COUNTRY,
              root: Scope.COUNTRY,
              from: Scope.COUNTRY,
            },
          },
        },
      },
      {
        // mission subtype
        children: {
          activation: {
            children: { ...triggers },
            replaceScope: {
              this: Scope.COUNTRY,
              root: Scope.COUNTRY,
              from: Scope.COUNTRY,
            },
          },
          is_good: { type: Value.BOOL },
          days_mission_timeout: int_variable_field,
          timeout_effect: {
            cardinality: [0, 1],
            children: effects,
            replaceScope: {
              this: Scope.COUNTRY,
              root: Scope.COUNTRY,
              from: Scope.COUNTRY,
            },
          },
          selectable_mission: {
            type: Value.BOOL,
            cardinality: [0, 1],
          },
          cancel_trigger: {
            cardinality: [0, 1],
            children: triggers,
            replaceScope: {
              this: Scope.COUNTRY,
              root: Scope.COUNTRY,
              from: Scope.COUNTRY,
            },
          },
        },
      },
      {
        state_mission: {
          // state_mission subtype
          children: [
            {
              cardinality: [0, 1],
              children: {
                activation: {
                  children: { ...triggers },
                  replaceScope: {
                    this: Scope.COUNTRY,
                    root: Scope.COUNTRY,
                    from: Scope.STATE,
                  },
                },
                is_good: { type: Value.BOOL },
                days_mission_timeout: int_variable_field,
                timeout_effect: {
                  cardinality: [0, 1],
                  children: effects,
                  replaceScope: {
                    this: Scope.COUNTRY,
                    root: Scope.COUNTRY,
                    from: Scope.STATE,
                  },
                },
                state_target: [
                  { type: Value.BOOL, cardinality: [0, 1] },
                  Enum("continents"),
                  {
                    type: Value.REFERENCE_TO,
                    tag: "owned_state",
                    cardinality: [0, 1],
                  },
                  {
                    type: Scope.STATE,
                    values: Enum("any_controlled_state"),
                    cardinality: [0, 1],
                  },
                ],
                selectable_mission: { type: Value.BOOL, cardinality: [0, 1] },
                cancel_trigger: {
                  cardinality: [0, 1],
                  children: triggers,
                  replaceScope: {
                    this: Scope.COUNTRY,
                    root: Scope.COUNTRY,
                    from: Scope.STATE,
                  },
                },
              },
            },
          ],
        },
      },
      {
        // targeted subtype
        children: [
          {
            target_trigger: {
              cardinality: [0, 1],
              children: { ...triggers },
              replaceScope: {
                this: Scope.COUNTRY,
                root: Scope.COUNTRY,
                from: Scope.COUNTRY,
              },
            },
            targets: {
              type: Value.ARRAY,
              cardinality: [0, 1],
              values: [Scope.COUNTRY, Enum("country_tags"), variable_field],
            },
            targets_dynamic: { type: Value.BOOL, cardinality: [0, 1] },
            target_root_trigger: {
              cardinality: [0, 1],
              children: { ...triggers },
              replaceScope: {
                this: Scope.COUNTRY,
                root: Scope.COUNTRY,
                from: Scope.COUNTRY,
              },
            },
            highlight_states: {
              cardinality: [0, 1],
              replaceScope: {
                this: Scope.STATE,
                root: Scope.COUNTRY,
                from: Scope.COUNTRY,
              },
              children: {
                highlight_states_trigger: {
                  cardinality: [0, 1],
                  children: { ...triggers },
                },
                highlight_state_targets: {
                  cardinality: [0, 1],
                  dynamicChildren: [
                    { key: "state", value: Value.REFERENCE_TO },
                    { key: "state", value: Scope.STATE },
                    { key: "state", value: variable_field },
                  ],
                },
                highlight_provinces: {
                  cardinality: [0, 1],
                  type: Value.ARRAY,
                  values: Enum("provinces"),
                },
              },
            },
            alias_name: {
              cardinality: [0, Infinity],
              children: {
                targeted_modifier_rule: modifier_rule,
              },
            },
            target_array: [
              { type: Value.UNQUOTED, cardinality: [0, Infinity] },
              { type: variable_field.UNQUOTED, cardinality: [0, Infinity] },
            ],
            target_non_existing: { type: Value.BOOL, cardinality: [0, 1] },
          },
        ],
      },
      {
        // state_targeted subtype
        children: {
          visible: {
            cardinality: [0, 1],
            children: { ...triggers },
            replaceScope: {
              root: Scope.COUNTRY,
              this: Scope.COUNTRY,
              from: Scope.STATE,
            },
          },
          available: {
            cardinality: [0, 1],
            children: { ...triggers },
            replaceScope: {
              root: Scope.COUNTRY,
              this: Scope.COUNTRY,
              from: Scope.STATE,
            },
          },
          cancel_trigger: {
            cardinality: [0, 1],
            children: { ...triggers },
            replaceScope: {
              root: Scope.COUNTRY,
              this: Scope.COUNTRY,
              from: Scope.STATE,
            },
          },
          complete_effect: {
            cardinality: [0, 1],
            children: { ...effects },
            replaceScope: {
              root: Scope.COUNTRY,
              this: Scope.COUNTRY,
              from: Scope.STATE,
            },
          },
          remove_effect: {
            cardinality: [0, 1],
            children: effects,
            replaceScope: {
              root: Scope.COUNTRY,
              this: Scope.COUNTRY,
              from: Scope.STATE,
            },
          },
          cancel_effect: {
            cardinality: [0, 1],
            children: { ...effects },
            replaceScope: {
              root: Scope.COUNTRY,
              this: Scope.COUNTRY,
              from: Scope.STATE,
            },
          },
          target_trigger: {
            cardinality: [0, 1],
            children: { ...triggers },
            replaceScope: {
              root: Scope.COUNTRY,
              this: Scope.COUNTRY,
              from: Scope.STATE,
            },
          },
          state_target: [
            { type: Value.BOOL, cardinality: [0, 1] },
            Enum("continents"),
            {
              type: Value.REFERENCE_TO,
              tag: "owned_state",
              cardinality: [0, 1],
            },
            {
              type: Scope.STATE,
              values: Enum("any_controlled_state"),
              cardinality: [0, 1],
            },
          ],
          targets: {
            type: Value.ARRAY,
            cardinality: [0, 1],
            values: [
              Value.REFERENCE_TO,
              variable_field.STRING_VARIABLE_FIELD,
              { type: Scope.STATE },
            ],
          },
          target_root_trigger: {
            cardinality: [0, 1],
            children: { ...triggers },
            replaceScope: {
              root: Scope.COUNTRY,
              this: Scope.COUNTRY,
              from: Scope.STATE,
            },
          },
          alias_name: {
            cardinality: [0, Infinity],
            children: {
              targeted_modifier_rule: modifier_rule,
            },
          },
          target_array: [
            { type: Value.UNQUOTED, cardinality: [0, Infinity] },
            {
              type: variable_field.UNQUOTED,
              cardinality: [0, Infinity],
              key: "target_array",
            },
          ],
          ai_will_do: {
            cardinality: [0, 1],
            dynamicChildren: [
              {
                key: Enum("base_factor"),
                value: variable_field.STRING_VARIABLE_FIELD,
              },
              { key: "ai_will_do", value: modifier_rule },
            ],
            replaceScope: {
              root: Scope.COUNTRY,
              this: Scope.COUNTRY,
              from: Scope.STATE,
            },
          },
        },
      },
    ],
  },
};
