import { effect } from "../effects";
import { modifier_rule } from "../modifier_rule";
import { modifier } from "../modifiers";
import {
  targeted_modifier_rule,
  unit_stat,
  naval_stat,
  air_stat,
} from "../temp_modifiers";
import { trigger } from "../triggers";
import {
  root,
  obj,
  typeDefKey,
  country,
  typeRef,
  localisation,
  either,
  bool,
  scalar,
  int,
  enumRefKey,
  float,
  array,
  enumRef,
  valueRefKey,
} from "../utils";

// TODO: Support this
// export const ideaCategoriesType = root(
//   { path: "game/common/ideas" },
//   {
//     ideas: obj(
//       {},
//       {
//         [typeDefKey("idea_categories")]: obj(),
//       },
//     ),
//   },
// );

const idea = obj(
  { replace_scope: { this: country(), root: country() } },
  {
    [typeDefKey("idea_category.no_slot")]: obj(
      { cardinality: [1, Infinity] },
      {
        scalar: obj(
          {},
          {
            name: localisation({ cardinality: [0, 1] }),
            cancel_if_invalid: either(
              bool({ cardinality: [0, 1] }, false),
              bool({ cardinality: [0, 1] }, true),
            ),
            visible: obj(
              { cardinality: [0, 1] },
              {
                ...trigger,
              },
            ),
            allowed: obj(
              { cardinality: [0, 1] },
              {
                ...trigger,
              },
            ),
            cancel: obj(
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
            allowed_civil_war: obj(
              { cardinality: [0, 1] },
              {
                ...trigger,
              },
            ),
            picture: scalar({ cardinality: [0, 1] }),
            cost: int({ cardinality: [0, 1] }),
            removal_cost: int({ cardinality: [0, 1] }),
            modifier: obj(
              { cardinality: [0, 1], push_scope: country() },
              {
                ...modifier,
              },
            ),
            ...targeted_modifier_rule,
            rule: obj(
              { cardinality: [0, 1] },
              {
                [enumRefKey("game_rules")]: bool({
                  cardinality: [1, Infinity],
                }),
                desc: scalar({ cardinality: [0, 1] }),
              },
            ),
            research_bonus: obj(
              { cardinality: [0, 1] },
              {
                [enumRefKey("tech_category")]: float({ cardinality: [1, 10] }),
              },
            ),
            equipment_bonus: obj(
              { cardinality: [0, 1] },
              {
                [enumRefKey("equipment_bonus_type")]: obj(
                  { cardinality: [0, Infinity] },
                  {
                    instant: bool({ cardinality: [0, 1] }),
                    ...unit_stat,
                    ...naval_stat,
                    ...air_stat,
                  },
                ),
              },
            ),
            traits: array({ cardinality: [1, Infinity] }, [
              typeRef({}, "country_leader_trait"),
            ]),
            on_add: obj(
              { cardinality: [0, Infinity] },
              {
                ...effect,
              },
            ),
            on_remove: obj(
              { cardinality: [0, Infinity] },
              {
                ...effect,
              },
            ),
            do_effect: obj(
              { cardinality: [0, 1] },
              {
                ...trigger,
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
    ),
    [valueRefKey("idea_slot")]: obj(
      { cardinality: [0, Infinity] },
      {
        law: bool({ cardinality: [0, 1] }),
        use_list_view: bool({ cardinality: [0, 1] }),
        designer: bool({ cardinality: [0, 1] }),
        scalar: obj(
          {},
          {
            name: localisation({ cardinality: [0, 1] }),
            level: int({ cardinality: [0, 1] }),
            default: bool({ cardinality: [0, 1] }),
            cancel_if_invalid: either(
              bool({ cardinality: [0, 1] }, false),
              bool({ cardinality: [0, 1] }, true),
            ),
            cancel: obj(
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
            allowed: obj(
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
            allowed_civil_war: obj(
              { cardinality: [0, 1] },
              {
                ...trigger,
              },
            ),
            allowed_to_remove: obj(
              { cardinality: [0, 1] },
              {
                ...trigger,
              },
            ),
            picture: scalar({ cardinality: [0, 1] }),
            cost: int({ cardinality: [0, 1] }),
            removal_cost: int({ cardinality: [0, 1] }),
            modifier: obj(
              { cardinality: [0, 1], push_scope: country() },
              modifier,
            ),
            ...targeted_modifier_rule,
            rule: obj(
              { cardinality: [0, 1] },
              {
                [enumRefKey("game_rules")]: bool({
                  cardinality: [1, Infinity],
                }),
                desc: scalar({ cardinality: [0, 1] }),
              },
            ),
            equipment_bonus: obj(
              { cardinality: [0, 1] },
              {
                [enumRefKey("equipment_bonus_type")]: obj(
                  { cardinality: [0, Infinity] },
                  {
                    instant: bool({ cardinality: [0, 1] }),
                    ...unit_stat,
                    ...naval_stat,
                    ...air_stat,
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
            traits: array({ cardinality: [1, Infinity] }, [
              typeRef({}, "country_leader_trait"),
            ]),
            on_add: obj(
              { cardinality: [0, Infinity] },
              {
                ...effect,
              },
            ),
            on_remove: obj(
              { cardinality: [0, Infinity] },
              {
                ...effect,
              },
            ),
            do_effect: obj(
              { cardinality: [0, 1] },
              {
                ...trigger,
              },
            ),
            research_bonus: obj(
              { cardinality: [0, 1] },
              {
                [enumRefKey("tech_category")]: float({ cardinality: [1, 10] }),
              },
            ),
            ledger: enumRef({ cardinality: [0, 1] }, "ledgers"),
          },
        ),
      },
    ),
    [valueRefKey("character_advisor_slot")]: obj(
      { cardinality: [0, Infinity] },
      {
        law: bool({ cardinality: [0, 1] }),
        use_list_view: bool({ cardinality: [0, 1] }),
        designer: bool({ cardinality: [0, 1] }),
        scalar: obj(
          {},
          {
            name: localisation({ cardinality: [0, 1] }),
            level: int({ cardinality: [0, 1] }),
            default: bool({ cardinality: [0, 1] }),
            cancel_if_invalid: either(
              bool({ cardinality: [0, 1] }, false),
              bool({ cardinality: [0, 1] }, true),
            ),
            cancel: obj(
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
            allowed: obj(
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
            allowed_civil_war: obj(
              { cardinality: [0, 1] },
              {
                ...trigger,
              },
            ),
            allowed_to_remove: obj(
              { cardinality: [0, 1] },
              {
                ...trigger,
              },
            ),
            picture: scalar({ cardinality: [0, 1] }),
            cost: int({ cardinality: [0, 1] }),
            removal_cost: int({ cardinality: [0, 1] }),
            modifier: obj(
              { cardinality: [0, 1], push_scope: country() },
              {
                ...modifier,
              },
            ),
            ...targeted_modifier_rule,
            rule: obj(
              { cardinality: [0, 1] },
              {
                [enumRefKey("game_rules")]: bool({
                  cardinality: [1, Infinity],
                }),
                desc: scalar({ cardinality: [0, 1] }),
              },
            ),
            equipment_bonus: obj(
              { cardinality: [0, 1] },
              {
                [enumRefKey("equipment_bonus_type")]: obj(
                  { cardinality: [0, Infinity] },
                  {
                    instant: bool({ cardinality: [0, 1] }),
                    ...unit_stat,
                    ...naval_stat,
                    ...air_stat,
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
            traits: array({ cardinality: [1, Infinity] }, [
              typeRef({}, "country_leader_trait"),
            ]),
            on_add: obj(
              { cardinality: [0, Infinity] },
              {
                ...effect,
              },
            ),
            on_remove: obj(
              { cardinality: [0, Infinity] },
              {
                ...effect,
              },
            ),
            do_effect: obj(
              { cardinality: [0, 1] },
              {
                ...trigger,
              },
            ),
            research_bonus: obj(
              { cardinality: [0, 1] },
              {
                [enumRefKey("tech_category")]: float({ cardinality: [1, 10] }),
              },
            ),
            ledger: enumRef({ cardinality: [0, 1] }, "ledgers"),
          },
        ),
      },
    ),
    [enumRefKey("allowed_advisor_role")]: array(
      { cardinality: [0, Infinity] },
      [],
    ),
  },
);

export const ideaType = root(
  { path: "game/common/ideas" },
  {
    [typeDefKey("idea")]: idea,
  },
);

export const ledgers = [
  "army",
  "navy",
  "air",
  "military",
  "invalid",
  "civilian",
  "hidden",
  "all",
];
