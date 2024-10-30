import { effect } from "../effects";
import { modifier_rule } from "../modifier_rule";
import { trigger } from "../triggers";
import {
  root,
  obj,
  bool,
  either,
  array,
  typeRef,
  enumRef,
  value,
  value_set,
  variable_field,
  scalar,
  enumRefKey,
  int,
  float,
  country,
  state,
  localisation,
} from "../utils";

export const context_type = [
  "global_context",
  "player_context",
  "selected_state_context",
  "selected_country_context",
  "decision_category",
  "diplomatic_action",
  "country_mapicon",
  "state_mapicon",
];

export const parent_window_token = [
  "top_bar",
  "topbar",
  "decision_tab",
  "technology_tab",
  "trade_tab",
  "construction_tab",
  "production_tab",
  "deployment_tab",
  "logistics_tab",
  "diplomacy_tab",
  "politics_tab",
  "tech_infantry_folder",
  "tech_support_folder",
  "tech_armor_folder",
  "tech_artillery_folder",
  "tech_land_doctrine_folder",
  "tech_naval_folder",
  "tech_naval_doctrine_folder",
  "tech_air_techs_folder",
  "tech_air_doctrine_folder",
  "tech_electronics_folder",
  "tech_industry_folder",
  "national_focus",
  "selected_state_view",
  "selected_country_view",
  "selected_country_view_info",
  "selected_country_view_diplomacy",
];

export const ai_test_scope_country = [
  "test_self_country",
  "test_enemy_countries",
  "test_ally_countries",
  "test_neighbouring_countries",
  "test_neighbouring_ally_countries",
  "test_neighbouring_enemy_countries",
  "test_if_only_major",
];

export const ai_test_scope_state = [
  "test_self_owned_states",
  "test_enemy_owned_states",
  "test_ally_owned_states",
  "test_self_controlled_states",
  "test_enemy_controlled_states",
  "test_ally_controlled_states",
  "test_neighbouring_states",
  "test_neighbouring_enemy_states",
  "test_neighbouring_ally_states",
  "test_our_neighbouring_states",
  "test_our_neighbouring_states_against_allies",
  "test_our_neighbouring_states_against_enemies",
  "test_contesded_states",
  "test_if_only_coastal",
];

const scripted_gui = obj(
  {},
  {
    window_name: typeRef({}, "containerWindowType"),
    context_type: enumRef({ cardinality: [0, 1] }, context_type),
    mapmode: typeRef({ cardinality: [0, 1] }, "scripted_map_modes"),
    parent_window_token: enumRef({ cardinality: [0, 1] }, parent_window_token),
    parent_scripted_gui: typeRef({ cardinality: [0, 1] }, "scripted_gui"),
    parent_window_name: either(
      typeRef({ cardinality: [0, 1] }, "containerWindowType"),
      typeRef({ cardinality: [0, 1] }, "containerWindowType_instance"),
      value({ cardinality: [0, 1] }, "containerWindowTypeChild"),
    ),
    dirty: value_set({ cardinality: [0, Infinity] }, "variable"),
    properties: obj(
      { cardinality: [0, 1] },
      {
        scalar: obj(
          { cardinality: [1, Infinity] },
          {
            image: localisation({ cardinality: [0, 1] }),
            frame: variable_field({ cardinality: [0, 1] }),
            x: variable_field({ cardinality: [0, 1] }),
            y: variable_field({ cardinality: [0, 1] }),
          },
        ),
      },
    ),
    dynamic_lists: obj(
      { cardinality: [0, 1] },
      {
        scalar: obj(
          { cardinality: [1, Infinity] },
          {
            array: variable_field(),
            change_scope: bool({}, true),
            entry_container: scalar({ cardinality: [0, 1] }),
            country_scope_entry_container: scalar({ cardinality: [0, 1] }),
            index: value_set({ cardinality: [0, 1] }, "variable"),
            value: value_set({ cardinality: [0, 1] }, "variable"),
            ai_weights: obj(
              { cardinality: [0, 1] },
              {
                scalar: obj(
                  { cardinality: [1, Infinity] },
                  {
                    ai_will_do: obj(
                      {},
                      {
                        [enumRefKey("base_factor")]: variable_field({
                          cardinality: [0, 1],
                        }),
                        ...modifier_rule,
                      },
                    ),
                  },
                ),
              },
            ),
          },
        ),
      },
    ),
    subtype: obj(
      {},
      {
        any_context: obj(
          {},
          {
            effects: obj(
              { cardinality: [0, 1] },
              {
                scalar: obj(
                  { cardinality: [1, Infinity] },
                  {
                    ...effect,
                  },
                ),
              },
            ),
            visible: obj(
              { cardinality: [0, 1] },
              {
                ...trigger,
              },
            ),
            triggers: obj(
              { cardinality: [0, 1] },
              {
                scalar: obj(
                  { cardinality: [1, Infinity] },
                  {
                    ...trigger,
                  },
                ),
              },
            ),
            ai_test_scopes: array({ cardinality: [0, Infinity] }, [
              enumRef({}, ai_test_scope_country),
              enumRef({}, ai_test_scope_state),
            ]),
            ai_check_scope: obj(
              { cardinality: [0, 1] },
              {
                scalar: obj(
                  { cardinality: [1, Infinity] },
                  {
                    ...trigger,
                  },
                ),
              },
            ),
          },
        ),
        global_context: obj(
          {},
          {
            effects: obj(
              { cardinality: [0, 1] },
              {
                scalar: obj(
                  { cardinality: [1, Infinity] },
                  {
                    ...effect,
                  },
                ),
              },
            ),
            visible: obj(
              { cardinality: [0, 1] },
              {
                ...trigger,
              },
            ),
            triggers: obj(
              { cardinality: [0, 1] },
              {
                scalar: obj(
                  { cardinality: [1, Infinity] },
                  {
                    ...trigger,
                  },
                ),
              },
            ),
            ai_test_scopes: array({ cardinality: [0, Infinity] }, [
              enumRef({}, ai_test_scope_country),
              enumRef({}, ai_test_scope_state),
            ]),
            ai_check_scope: obj(
              { cardinality: [0, 1] },
              {
                scalar: obj(
                  { cardinality: [1, Infinity] },
                  {
                    ...trigger,
                  },
                ),
              },
            ),
          },
        ),
        player_context: obj(
          {},
          {
            visible: obj(
              { cardinality: [0, 1] },
              {
                ...trigger,
              },
            ),
            effects: obj(
              { cardinality: [0, 1] },
              {
                scalar: obj(
                  { cardinality: [1, Infinity] },
                  {
                    ...effect,
                  },
                ),
              },
            ),
            triggers: obj(
              { cardinality: [0, 1] },
              {
                scalar: obj(
                  { cardinality: [1, Infinity] },
                  {
                    ...trigger,
                  },
                ),
              },
            ),
          },
        ),
        country_context: obj(
          {},
          {
            visible: obj(
              { cardinality: [0, 1] },
              {
                ...trigger,
              },
            ),
            effects: obj(
              { cardinality: [0, 1] },
              {
                scalar: obj(
                  { cardinality: [1, Infinity] },
                  {
                    ...effect,
                  },
                ),
              },
            ),
            triggers: obj(
              { cardinality: [0, 1] },
              {
                scalar: obj(
                  { cardinality: [1, Infinity] },
                  {
                    ...trigger,
                  },
                ),
              },
            ),
            ai_test_scopes: array({ cardinality: [0, Infinity] }, [
              enumRef({}, ai_test_scope_country),
            ]),
            ai_check_scope: obj(
              { cardinality: [0, 1] },
              {
                scalar: obj(
                  { cardinality: [1, Infinity] },
                  {
                    ...trigger,
                  },
                ),
              },
            ),
          },
        ),
        state_context: obj(
          {},
          {
            visible: obj(
              { cardinality: [0, 1] },
              {
                ...trigger,
              },
            ),
            effects: obj(
              { cardinality: [0, 1] },
              {
                scalar: obj(
                  { cardinality: [1, Infinity] },
                  {
                    ...effect,
                  },
                ),
              },
            ),
            triggers: obj(
              { cardinality: [0, 1] },
              {
                scalar: obj(
                  { cardinality: [1, Infinity] },
                  {
                    ...trigger,
                  },
                ),
              },
            ),
            ai_test_scopes: array({ cardinality: [0, Infinity] }, [
              enumRef({}, ai_test_scope_state),
            ]),
            ai_check_scope: obj(
              { cardinality: [0, 1] },
              {
                scalar: obj(
                  { cardinality: [1, Infinity] },
                  {
                    ...trigger,
                  },
                ),
              },
            ),
          },
        ),
        country_mapicon_context: obj(
          {},
          {
            visible: obj(
              { cardinality: [0, 1] },
              {
                ...trigger,
              },
            ),
            effects: obj(
              { cardinality: [0, 1] },
              {
                scalar: obj(
                  { cardinality: [1, Infinity] },
                  {
                    ...effect,
                  },
                ),
              },
            ),
            triggers: obj(
              { cardinality: [0, 1] },
              {
                scalar: obj(
                  { cardinality: [1, Infinity] },
                  {
                    ...trigger,
                  },
                ),
              },
            ),
            mapicon_targets: obj(
              { cardinality: [0, 1] },
              {
                target_array: either(value({}, "array"), ...variable_field()),
                target_trigger: obj(
                  { cardinality: [0, 1] },
                  {
                    scalar: obj(
                      { cardinality: [1, Infinity] },
                      {
                        ...trigger,
                      },
                    ),
                  },
                ),
              },
            ),
            ai_test_scopes: array({ cardinality: [0, Infinity] }, [
              enumRef({}, ai_test_scope_state),
            ]),
            ai_check_scope: obj(
              { cardinality: [0, 1] },
              {
                scalar: obj(
                  { cardinality: [1, Infinity] },
                  {
                    ...trigger,
                  },
                ),
              },
            ),
          },
        ),
        state_mapicon_context: obj(
          {},
          {
            visible: obj(
              { cardinality: [0, 1] },
              {
                ...trigger,
              },
            ),
            effects: obj(
              { cardinality: [0, 1] },
              {
                scalar: obj(
                  { cardinality: [1, Infinity] },
                  {
                    ...effect,
                  },
                ),
              },
            ),
            triggers: obj(
              { cardinality: [0, 1] },
              {
                scalar: obj(
                  { cardinality: [1, Infinity] },
                  {
                    ...trigger,
                  },
                ),
              },
            ),
            mapicon_targets: obj(
              { cardinality: [0, 1] },
              {
                target_array: either(value({}, "array"), ...variable_field()),
                target_trigger: obj(
                  { cardinality: [0, 1] },
                  {
                    scalar: obj(
                      { cardinality: [1, Infinity] },
                      {
                        ...trigger,
                      },
                    ),
                  },
                ),
              },
            ),
            ai_test_scopes: array({ cardinality: [0, Infinity] }, [
              enumRef({}, ai_test_scope_state),
            ]),
            ai_check_scope: obj(
              { cardinality: [0, 1] },
              {
                scalar: obj(
                  { cardinality: [1, Infinity] },
                  {
                    ...trigger,
                  },
                ),
              },
            ),
          },
        ),
      },
    ),
    ai_enabled: obj(
      { cardinality: [0, 1] },
      {
        scalar: obj(
          { cardinality: [1, Infinity] },
          {
            ...trigger,
          },
        ),
      },
    ),
    ai_check: obj(
      { cardinality: [0, 1] },
      {
        scalar: obj(
          { cardinality: [1, Infinity] },
          {
            ...trigger,
          },
        ),
      },
    ),
    ai_test_interval: int({ cardinality: [0, 1] }),
    ai_test_variance: float({ cardinality: [0, 1] }),
    ai_max_weight_taken_per_test: int({ cardinality: [0, 1] }),
    ai_test_parent: typeRef({ cardinality: [0, 1] }, "scripted_gui"),
    ai_weights: obj(
      { cardinality: [0, 1] },
      {
        weight: int(),
        scalar: obj(
          { cardinality: [1, Infinity] },
          {
            player_context: obj(
              {},
              {
                ai_will_do: obj(
                  { replace_scope: { root: country(), this: country() } },
                  {
                    [enumRefKey("base_factor")]: variable_field({
                      cardinality: [0, 1],
                    }),
                    ...modifier_rule,
                  },
                ),
                ignore_lower_weights: obj(
                  {
                    cardinality: [0, 1],
                    replace_scope: { root: country(), this: country() },
                  },
                  {
                    [enumRefKey("base_factor")]: variable_field({
                      cardinality: [0, 1],
                    }),
                    ...modifier_rule,
                  },
                ),
              },
            ),
            country_context: obj(
              {},
              {
                ai_will_do: obj(
                  { replace_scope: { root: country(), this: country() } },
                  {
                    [enumRefKey("base_factor")]: variable_field({
                      cardinality: [0, 1],
                    }),
                    ...modifier_rule,
                  },
                ),
                ignore_lower_weights: obj(
                  {
                    cardinality: [0, 1],
                    replace_scope: { root: country(), this: country() },
                  },
                  {
                    [enumRefKey("base_factor")]: variable_field({
                      cardinality: [0, 1],
                    }),
                    ...modifier_rule,
                  },
                ),
              },
            ),
            state_context: obj(
              {},
              {
                ai_will_do: obj(
                  { replace_scope: { root: country(), this: state() } },
                  {
                    [enumRefKey("base_factor")]: variable_field({
                      cardinality: [0, 1],
                    }),
                    ...modifier_rule,
                  },
                ),
                ignore_lower_weights: obj(
                  {
                    cardinality: [0, 1],
                    replace_scope: { root: country(), this: state() },
                  },
                  {
                    [enumRefKey("base_factor")]: variable_field({
                      cardinality: [0, 1],
                    }),
                    ...modifier_rule,
                  },
                ),
              },
            ),
            country_mapicon_context: obj(
              {},
              {
                ai_will_do: obj(
                  { replace_scope: { root: country(), this: country() } },
                  {
                    [enumRefKey("base_factor")]: variable_field({
                      cardinality: [0, 1],
                    }),
                    ...modifier_rule,
                  },
                ),
                ignore_lower_weights: obj(
                  {
                    cardinality: [0, 1],
                    replace_scope: { root: country(), this: country() },
                  },
                  {
                    [enumRefKey("base_factor")]: variable_field({
                      cardinality: [0, 1],
                    }),
                    ...modifier_rule,
                  },
                ),
              },
            ),
            state_mapicon_context: obj(
              {},
              {
                ai_will_do: obj(
                  { replace_scope: { root: country(), this: state() } },
                  {
                    [enumRefKey("base_factor")]: variable_field({
                      cardinality: [0, 1],
                    }),
                    ...modifier_rule,
                  },
                ),
                ignore_lower_weights: obj(
                  {
                    cardinality: [0, 1],
                    replace_scope: { root: country(), this: state() },
                  },
                  {
                    [enumRefKey("base_factor")]: variable_field({
                      cardinality: [0, 1],
                    }),
                    ...modifier_rule,
                  },
                ),
              },
            ),
          },
        ),
      },
    ),
  },
);

export const scriptedGuiType = root(
  { path: "/common/scripted_guis" },
  {
    scripted_gui,
    // any_context: obj(
    //   {},
    //   {
    //     dynamic_lists: obj(
    //       {},
    //       {
    //         scalar: obj(
    //           {},
    //           {
    //             change_scope: bool({}, true),
    //           },
    //         ),
    //       },
    //     ),
    //   },
    // ),
    // global_context: obj(
    //   { only_if_not: ["any_context"] },
    //   {
    //     context_type: literal({}, "global_context"),
    //   },
    // ),
    // state_mapicon_context: obj(
    //   { only_if_not: ["any_context"] },
    //   {
    //     context_type: literal({}, "state_mapicon"),
    //   },
    // ),
    // country_mapicon_context: obj(
    //   { only_if_not: ["any_context"] },
    //   {
    //     context_type: literal({}, "country_mapicon"),
    //   },
    // ),
    // state_context: obj(
    //   { only_if_not: ["any_context"] },
    //   {
    //     context_type: literal({}, "selected_state_context"),
    //   },
    // ),
    // country_context: either(
    //   obj(
    //     { only_if_not: ["any_context"] },
    //     {
    //       context_type: literal({}, "diplomatic_action"),
    //     },
    //   ),
    //   obj(
    //     { only_if_not: ["any_context"] },
    //     {
    //       context_type: literal({}, "decision_category"),
    //     },
    //   ),
    //   obj(
    //     { only_if_not: ["any_context"] },
    //     {
    //       context_type: literal({}, "selected_country_context"),
    //     },
    //   ),
    // ),
    // player_context: array(
    //   {
    //     only_if_not: [
    //       "any_context",
    //       "country_context",
    //       "state_context",
    //       "global_context",
    //       "country_mapicon_context",
    //       "state_mapicon_context",
    //     ],
    //   },
    //   [],
    // ),
  },
);
