import { effect } from "../effects";
import { modifier_rule } from "../modifier_rule";
import { modifier } from "../modifiers";
import { trigger } from "../triggers";
import { Scope } from "../types";
import {
  either,
  typeRef,
  obj,
  root,
  array,
  country,
  localisation,
  enumRefKey,
  literal,
  enumRef,
  datetime_field,
  float,
  value_set,
  int,
  value,
  variable_field,
  bool,
  filepath,
} from "../utils";

export const character_ids = ["id", "legacy_id"];
export const character_portrait_types = [
  "civilian",
  "army",
  "navy",
  "operative",
];
export const character_portrait_sizes = ["large", "small"];

const portraitset = {
  large: either(typeRef({}, "spriteType"), filepath({})),
  small: either(typeRef({}, "spriteType"), filepath({})),
};

const character = obj(
  {},
  {
    uninstanced: obj(
      {},
      {
        name: localisation(),
        portraits: obj(
          {},
          {
            [enumRefKey("character_portrait_types")]: obj(
              { cardinality: [1, 3] },
              {
                [enumRefKey("portraitset")]: obj(
                  { cardinality: [1, 2] },
                  { ...portraitset },
                ),
              },
            ),
          },
        ),
        allowed_civil_war: obj(
          {
            replace_scope: { this: Scope.CHARACTER, root: country() },
            cardinality: [0, 1],
          },
          { ...trigger },
        ),
        gender: either(
          literal({ cardinality: [0, 1] }, "female"),
          literal({ cardinality: [0, 1] }, "male"),
          literal({ cardinality: [0, 1] }, "undefined"),
        ),
      },
    ),
    country_leader: obj(
      {},
      {
        country_leader: obj(
          {},
          {
            ideology: enumRef({}, "sub_ideology"),
            desc: localisation({ cardinality: [0, 1] }),
            expire: datetime_field({ cardinality: [0, 1] }),
            name: localisation({ cardinality: [0, 1] }),
            traits: array({ cardinality: [0, Infinity] }, [
              typeRef({}, "country_leader_trait"),
            ]),
            research_bonus: obj(
              { cardinality: [0, 1] },
              {
                [enumRefKey("tech_category")]: float({
                  cardinality: [1, Infinity],
                }),
              },
            ),
            [enumRefKey("character_ids")]: value_set(
              { cardinality: [0, 1] },
              "country_leader_ids",
            ),
          },
        ),
      },
    ),
    corps_commander: obj(
      {},
      {
        corps_commander: obj(
          {},
          {
            desc: localisation({ cardinality: [0, 1] }),
            expire: datetime_field({ cardinality: [0, 1] }),
            skill: int({ cardinality: [1, 1] }),
            attack_skill: int({ cardinality: [1, 1] }),
            defense_skill: int({ cardinality: [1, 1] }),
            planning_skill: int({ cardinality: [1, 1] }),
            logistics_skill: int({ cardinality: [1, 1] }),
            [enumRefKey("character_ids")]: value_set(
              { cardinality: [0, 1] },
              "unit_leader_ids",
            ),
            name: localisation({ cardinality: [0, 1] }),
            traits: array({ cardinality: [0, Infinity] }, [
              typeRef({}, "unit_leader_trait"),
            ]),
            visible: obj(
              {
                replace_scope: { this: Scope.CHARACTER, root: country() },
                cardinality: [0, 1],
              },
              { ...trigger },
            ),
          },
        ),
      },
    ),
    field_marshal: obj(
      {},
      {
        field_marshal: obj(
          {},
          {
            desc: localisation({ cardinality: [0, 1] }),
            expire: datetime_field({ cardinality: [0, 1] }),
            skill: int({ cardinality: [1, 1] }),
            attack_skill: int({ cardinality: [1, 1] }),
            defense_skill: int({ cardinality: [1, 1] }),
            planning_skill: int({ cardinality: [1, 1] }),
            logistics_skill: int({ cardinality: [1, 1] }),
            [enumRefKey("character_ids")]: value_set(
              { cardinality: [0, 1] },
              "unit_leader_ids",
            ),
            name: localisation({ cardinality: [0, 1] }),
            traits: array({ cardinality: [0, Infinity] }, [
              typeRef({}, "unit_leader_trait"),
            ]),
            visible: obj(
              {
                replace_scope: { this: Scope.CHARACTER, root: country() },
                cardinality: [0, 1],
              },
              { ...trigger },
            ),
          },
        ),
      },
    ),
    navy_leader: obj(
      {},
      {
        navy_leader: obj(
          {},
          {
            desc: localisation({ cardinality: [0, 1] }),
            expire: datetime_field({ cardinality: [0, 1] }),
            skill: int({ cardinality: [1, 1] }),
            attack_skill: int({ cardinality: [1, 1] }),
            defense_skill: int({ cardinality: [1, 1] }),
            maneuvering_skill: int({ cardinality: [1, 1] }),
            coordination_skill: int({ cardinality: [1, 1] }),
            [enumRefKey("character_ids")]: value_set(
              { cardinality: [0, 1] },
              "unit_leader_ids",
            ),
            name: localisation({ cardinality: [0, 1] }),
            traits: array({ cardinality: [0, Infinity] }, [
              typeRef({}, "unit_leader_trait"),
            ]),
            visible: obj(
              {
                replace_scope: { this: Scope.CHARACTER, root: country() },
                cardinality: [0, 1],
              },
              { ...trigger },
            ),
          },
        ),
      },
    ),
    advisor: obj(
      {},
      {
        advisor: obj(
          { cardinality: [1, Infinity] },
          {
            slot: value({}, "character_advisor_slot"),
            name: localisation({ cardinality: [0, 1] }),
            desc: localisation({ cardinality: [0, 1] }),
            idea_token: value_set({}, "advisor_token"),
            allowed: obj(
              {
                replace_scope: { this: Scope.CHARACTER, root: country() },
                cardinality: [0, 1],
              },
              { ...trigger },
            ),
            visible: obj(
              {
                replace_scope: { this: Scope.CHARACTER, root: country() },
                cardinality: [0, 1],
              },
              { ...trigger },
            ),
            available: obj(
              {
                replace_scope: { this: Scope.CHARACTER, root: country() },
                cardinality: [0, 1],
              },
              { ...trigger },
            ),
            traits: array({ cardinality: [0, Infinity] }, [
              typeRef({}, "country_leader_trait"),
            ]),
            research_bonus: obj(
              { cardinality: [0, 1] },
              {
                [enumRefKey("tech_category")]: float({
                  cardinality: [1, Infinity],
                }),
              },
            ),
            ledger: enumRef({ cardinality: [0, 1] }, "ledgers"),
            cost: int({ cardinality: [0, 1] }),
            removal_cost: int({ cardinality: [0, 1] }),
            ai_will_do: obj(
              {
                replace_scope: { this: Scope.CHARACTER, root: country() },
                cardinality: [0, 1],
              },
              {
                [enumRefKey("base_factor")]: variable_field(),
                ...modifier_rule,
              },
            ),
            on_add: obj(
              {
                replace_scope: { this: Scope.CHARACTER, root: country() },
                cardinality: [0, Infinity],
              },
              { ...effect },
            ),
            on_remove: obj(
              {
                replace_scope: { this: Scope.CHARACTER, root: country() },
                cardinality: [0, Infinity],
              },
              { ...effect },
            ),
            do_effect: obj(
              {
                replace_scope: { this: Scope.CHARACTER, root: country() },
                cardinality: [0, 1],
              },
              { ...trigger },
            ),
            modifier: obj(
              {
                replace_scope: { this: Scope.CHARACTER, root: country() },
                cardinality: [0, 1],
              },
              { ...modifier },
            ),
            can_be_fired: bool({ cardinality: [0, 1] }),
          },
        ),
      },
    ),
  },
);

export const characterType = root(
  { path: "/common/characters", path_strict: true },
  { character },
);
