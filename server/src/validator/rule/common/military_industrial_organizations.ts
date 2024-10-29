import { effect } from "../effects";
import { modifier_rule } from "../modifier_rule";
import { modifier } from "../modifiers";
import { trigger } from "../triggers";
import { Scope } from "../types";
import {
  root,
  obj,
  country,
  scalar,
  typeRef,
  array,
  enumRef,
  float,
  int,
  enumRefKey,
  value_set,
  variable_field,
  bool,
  value,
  literal,
} from "../utils";

export const militaryIndustrialOrganizationType = root(
  { path: "/common/military_industrial_organization/organizations" },
  {
    military_industrial_organization: obj(
      {
        replace_scope: {
          this: Scope.MILITARY_INDUSTRIAL_ORGANIZATION,
          from: country(),
        },
      },
      {
        name: scalar({ cardinality: [0, 1] }),
        icon: typeRef({ cardinality: [0, 1] }, "spriteType"),
        background: typeRef({ cardinality: [0, 1] }, "spriteType"),
        include: typeRef(
          { cardinality: [0, 1] },
          "military_industrial_organization",
        ),
        allowed: obj(
          { replace_scope: { this: country() }, cardinality: [0, 1] },
          { ...trigger },
        ),
        visible: obj({ cardinality: [0, 1] }, { ...trigger }),
        available: obj({ cardinality: [0, 1] }, { ...trigger }),
        equipment_type: array({ cardinality: [0, 1] }, [
          enumRef({ cardinality: [0, Infinity] }, "equipment_bonus_type"),
          typeRef({ cardinality: [0, Infinity] }, "equipment_group"),
          typeRef({ cardinality: [0, Infinity] }, "equipment.archetype_equip"),
        ]),
        research_categories: array({ cardinality: [0, 1] }, [
          enumRef({ cardinality: [1, Infinity] }, "tech_category"),
          typeRef({ cardinality: [0, Infinity] }, "equipment_group"),
          typeRef({ cardinality: [0, Infinity] }, "equipment.archetype_equip"),
        ]),
        on_design_team_assigned_to_tech: obj(
          { cardinality: [0, 1] },
          { ...effect },
        ),
        on_design_team_assigned_to_variant: obj(
          { cardinality: [0, 1] },
          { ...effect },
        ),
        on_industrial_manufacturer_assigned: obj(
          { cardinality: [0, 1] },
          { ...effect },
        ),
        on_tech_research_cancelled: obj({ cardinality: [0, 1] }, { ...effect }),
        on_tech_research_completed: obj({ cardinality: [0, 1] }, { ...effect }),
        on_industrial_manufacturer_unassigned: obj(
          { cardinality: [0, 1] },
          { ...effect },
        ),
        research_bonus: float({ cardinality: [0, 1] }),
        task_capacity: int({ cardinality: [0, 1] }),
        tree_header_text: array({ cardinality: [0, Infinity] }, [
          obj(
            {},
            {
              text: scalar(),
              x: float(),
            },
          ),
        ]),
        ai_will_do: obj(
          { cardinality: [0, 1] },
          {
            [enumRefKey("base_factor")]: float({ cardinality: [0, 1] }),
            ...modifier_rule,
          },
        ),
        initial_trait: obj(
          { cardinality: [0, 1] },
          {
            token: value_set({ cardinality: [0, 1] }, "mio_trait_token"),
            name: scalar({ cardinality: [0, 1] }),
            icon: typeRef({ cardinality: [0, 1] }, "spriteType"),
            limit_to_equipment_type: array({ cardinality: [0, 1] }, [
              enumRef({ cardinality: [0, Infinity] }, "equipment_bonus_type"),
              typeRef({ cardinality: [0, Infinity] }, "equipment_group"),
              enumRef({ cardinality: [0, Infinity] }, "tech_category"),
            ]),
            equipment_bonus: obj(
              { cardinality: [0, 1] },
              {
                [enumRefKey("equipment_stat")]: variable_field({
                  cardinality: [1, Infinity],
                }),
              },
            ),
            production_bonus: obj(
              { cardinality: [0, 1] },
              {
                [enumRefKey("production_stat")]: variable_field({
                  cardinality: [1, Infinity],
                }),
              },
            ),
            organization_modifier: obj(
              { cardinality: [0, 1] },
              { ...modifier },
            ),
          },
        ),
        trait: array({ cardinality: [0, Infinity] }, [
          obj(
            {},
            {
              token: value_set({}, "mio_trait_token"),
              name: scalar({ cardinality: [0, 1] }),
              icon: typeRef({ cardinality: [0, 1] }, "spriteType"),
              special_trait_background: bool({ cardinality: [0, 1] }, true),
              parent: obj(
                { cardinality: [0, 1] },
                {
                  traits: array({ cardinality: [1, Infinity] }, [
                    value({}, "mio_trait_token"),
                  ]),
                  num_parents_needed: int({ cardinality: [0, 1] }, 1, Infinity),
                },
              ),
              any_parent: array({ cardinality: [0, Infinity] }, [
                value({}, "mio_trait_token"),
              ]),
              all_parents: array({ cardinality: [0, Infinity] }, [
                value({}, "mio_trait_token"),
              ]),
              mutually_exclusive: array({ cardinality: [0, 1] }, [
                value({}, "mio_trait_token"),
              ]),
              visible: obj({ cardinality: [0, 1] }, { ...trigger }),
              available: obj({ cardinality: [0, 1] }, { ...trigger }),
              on_complete: obj({ cardinality: [0, 1] }, { ...effect }),
              limit_to_equipment_type: array({ cardinality: [0, 1] }, [
                enumRef({ cardinality: [0, Infinity] }, "equipment_bonus_type"),
                typeRef({ cardinality: [0, Infinity] }, "equipment_group"),
                enumRef({ cardinality: [0, Infinity] }, "tech_category"),
              ]),
              equipment_bonus: obj(
                { cardinality: [0, 1] },
                {
                  [enumRefKey("equipment_stat")]: variable_field({
                    cardinality: [1, Infinity],
                  }),
                },
              ),
              production_bonus: obj(
                { cardinality: [0, 1] },
                {
                  [enumRefKey("production_stat")]: variable_field({
                    cardinality: [1, Infinity],
                  }),
                },
              ),
              organization_modifier: obj(
                { cardinality: [0, 1] },
                { ...modifier },
              ),
              position: obj(
                {},
                {
                  x: float({ cardinality: [0, 1] }, -9, 9),
                  y: float(),
                },
              ),
              relative_position_id: value(
                { cardinality: [0, 1] },
                "mio_trait_token",
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
        ]),
        delete_included_values: array({ cardinality: [0, 1] }, [
          literal({}, "name"),
          literal({}, "icon"),
          literal({}, "allowed"),
          literal({}, "visible"),
          literal({}, "available"),
          literal({}, "equipment_type"),
          literal({}, "research_categories"),
          literal({}, "on_design_team_assigned_to_tech"),
          literal({}, "on_design_team_assigned_to_variant"),
          literal({}, "on_industrial_manufacturer_assigned"),
          literal({}, "on_tech_research_cancelled"),
          literal({}, "on_tech_research_completed"),
          literal({}, "on_industrial_manufacturer_unassigned"),
          literal({}, "research_bonus"),
          literal({}, "task_capacity"),
          literal({}, "tree_header_text"),
          literal({}, "ai_will_do"),
        ]),
        add_trait: array({ cardinality: [0, Infinity] }, [
          obj(
            {},
            {
              token: value_set({}, "mio_trait_token"),
              name: scalar({ cardinality: [0, 1] }),
              icon: typeRef({ cardinality: [0, 1] }, "spriteType"),
              special_trait_background: bool({ cardinality: [0, 1] }, true),
              parent: obj(
                { cardinality: [0, 1] },
                {
                  traits: array({ cardinality: [1, Infinity] }, [
                    value({}, "mio_trait_token"),
                  ]),
                  num_parents_needed: int({ cardinality: [0, 1] }, 1, Infinity),
                },
              ),
              any_parent: array({ cardinality: [0, Infinity] }, [
                value({}, "mio_trait_token"),
              ]),
              all_parents: array({ cardinality: [0, Infinity] }, [
                value({}, "mio_trait_token"),
              ]),
              mutually_exclusive: array({ cardinality: [0, 1] }, [
                value({}, "mio_trait_token"),
              ]),
              visible: obj({ cardinality: [0, 1] }, { ...trigger }),
              available: obj({ cardinality: [0, 1] }, { ...trigger }),
              on_complete: obj({ cardinality: [0, 1] }, { ...effect }),
              limit_to_equipment_type: array({ cardinality: [0, 1] }, [
                enumRef({ cardinality: [0, Infinity] }, "equipment_bonus_type"),
                typeRef({ cardinality: [0, Infinity] }, "equipment_group"),
                enumRef({ cardinality: [0, Infinity] }, "tech_category"),
              ]),
              equipment_bonus: obj(
                { cardinality: [0, 1] },
                {
                  [enumRefKey("equipment_stat")]: variable_field({
                    cardinality: [1, Infinity],
                  }),
                },
              ),
              production_bonus: obj(
                { cardinality: [0, 1] },
                {
                  [enumRefKey("production_stat")]: variable_field({
                    cardinality: [1, Infinity],
                  }),
                },
              ),
              organization_modifier: obj(
                { cardinality: [0, 1] },
                { ...modifier },
              ),
              position: obj(
                {},
                {
                  x: float({ cardinality: [0, 1] }, -9, 9),
                  y: float(),
                },
              ),
              relative_position_id: value(
                { cardinality: [0, 1] },
                "mio_trait_token",
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
        ]),
        remove_trait: array({ cardinality: [0, Infinity] }, [
          value({}, "mio_trait_token"),
        ]),
        override_trait: array({ cardinality: [0, Infinity] }, [
          obj(
            {},
            {
              token: value_set({}, "mio_trait_token"),
              name: scalar({ cardinality: [0, 1] }),
              icon: typeRef({ cardinality: [0, 1] }, "spriteType"),
              special_trait_background: bool({ cardinality: [0, 1] }, true),
              parent: obj(
                { cardinality: [0, 1] },
                {
                  traits: array({ cardinality: [1, Infinity] }, [
                    value({}, "mio_trait_token"),
                  ]),
                  num_parents_needed: int({ cardinality: [0, 1] }, 1, Infinity),
                },
              ),
              any_parent: array({ cardinality: [0, Infinity] }, [
                value({}, "mio_trait_token"),
              ]),
              all_parents: array({ cardinality: [0, Infinity] }, [
                value({}, "mio_trait_token"),
              ]),
              mutually_exclusive: array({ cardinality: [0, 1] }, [
                value({}, "mio_trait_token"),
              ]),
              visible: obj({ cardinality: [0, 1] }, { ...trigger }),
              available: obj({ cardinality: [0, 1] }, { ...trigger }),
              on_complete: obj({ cardinality: [0, 1] }, { ...effect }),
              limit_to_equipment_type: array({ cardinality: [0, 1] }, [
                enumRef({ cardinality: [0, Infinity] }, "equipment_bonus_type"),
                typeRef({ cardinality: [0, Infinity] }, "equipment_group"),
                enumRef({ cardinality: [0, Infinity] }, "tech_category"),
              ]),
              equipment_bonus: obj(
                { cardinality: [0, 1] },
                {
                  [enumRefKey("equipment_stat")]: variable_field({
                    cardinality: [1, Infinity],
                  }),
                },
              ),
              production_bonus: obj(
                { cardinality: [0, 1] },
                {
                  [enumRefKey("production_stat")]: variable_field({
                    cardinality: [1, Infinity],
                  }),
                },
              ),
              organization_modifier: obj(
                { cardinality: [0, 1] },
                { ...modifier },
              ),
              position: obj(
                {},
                {
                  x: float({ cardinality: [0, 1] }, -9, 9),
                  y: float(),
                },
              ),
              relative_position_id: value(
                { cardinality: [0, 1] },
                "mio_trait_token",
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
        ]),
      },
    ),
  },
);
