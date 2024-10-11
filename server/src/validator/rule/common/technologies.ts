import { effect } from "../effects";
import { modifier_rule } from "../modifier_rule";
import { modifier } from "../modifiers";
import { unit_stat, naval_stat, air_stat } from "../temp_modifiers";
import { trigger } from "../triggers";
import {
  root,
  obj,
  bool,
  literal,
  float,
  scalar,
  country,
  localisation,
  enumRef,
  int,
  array,
  typeRef,
  value_set,
  enumRefKey,
  typeRefKey,
} from "../utils";

const technology = obj(
  { replace_scope: { this: country(), root: country() } },
  {
    doctrine_name: scalar({ cardinality: [0, 1] }),
    show_equipment_icon: bool({ cardinality: [0, 1] }),
    desc: localisation({ cardinality: [0, 1] }),
    xp_research_type: enumRef({ cardinality: [0, 1] }, "experience_types"),
    xp_research_cost: int({ cardinality: [0, 1] }),
    xp_boost_cost: int({ cardinality: [0, 1] }),
    xp_research_bonus: float({ cardinality: [0, 1] }),
    xp_unlock_cost: int({ cardinality: [0, 1] }),
    allow: obj({ cardinality: [0, Infinity] }, { ...trigger }),
    allow_branch: obj({ cardinality: [0, Infinity] }, { ...trigger }),
    xor: array({ cardinality: [0, Infinity] }, [typeRef({}, "technology")]),
    enable_subunits: array({ cardinality: [0, Infinity] }, [
      typeRef({ cardinality: [0, Infinity] }, "unit"),
    ]),
    enable_equipments: obj(
      { cardinality: [0, Infinity] },
      {
        limit: obj({}, { ...trigger }),
        equipment: typeRef({ cardinality: [0, Infinity] }, "equipment"),
        duplicate_archetypes: typeRef(
          { cardinality: [0, Infinity] },
          "duplicate_archetypes",
        ),
        nsb_armor_tech: array({ cardinality: [0, Infinity] }, [
          value_set({}, "nsb_armor_variants"),
        ]),
        bba_air_tech: array({ cardinality: [0, Infinity] }, [
          value_set({}, "bba_air_variants"),
        ]),
      },
    ),
    enable_equipment_modules: array({ cardinality: [0, Infinity] }, [
      typeRef({}, "module"),
    ]),
    enable_building: obj(
      { cardinality: [0, Infinity] },
      {
        building: typeRef({}, "building"),
        level: int(),
      },
    ),
    enable_tactic: typeRef({ cardinality: [0, Infinity] }, "combat_tactic"),
    sub_technologies: array({ cardinality: [0, 3] }, [
      typeRef({}, "technology"),
    ]),
    path: obj(
      { cardinality: [0, Infinity] },
      {
        leads_to_tech: typeRef({ cardinality: [0, 1] }, "technology"),
        research_cost_coeff: float(),
      },
    ),
    dependencies: obj(
      { cardinality: [0, Infinity] },
      {
        technology: int({ cardinality: [0, Infinity] }),
      },
    ),
    research_cost: float({ cardinality: [0, 1] }),
    start_year: int({ cardinality: [0, 1] }),
    sub_tech_index: int({ cardinality: [0, 1] }),
    folder: obj(
      { cardinality: [0, Infinity] },
      {
        name: enumRef({}, "tech_folder"),
        position: obj(
          {},
          {
            x: float(),
            y: float(),
          },
        ),
      },
    ),
    doctrine: bool({ cardinality: [0, 1] }),
    ai_will_do: obj(
      { cardinality: [0, 1] },
      {
        [enumRefKey("base_factor")]: float({ cardinality: [0, 1] }),
        ...modifier_rule,
      },
    ),
    ai_research_weights: obj(
      { cardinality: [0, 1] },
      {
        [enumRefKey("ai_research_areas")]: float({
          cardinality: [0, Infinity],
        }),
        [enumRefKey("tech_category")]: float({ cardinality: [0, Infinity] }),
        [enumRefKey("unit_types")]: float({ cardinality: [0, Infinity] }),
        [typeRefKey("resource")]: float({ cardinality: [0, Infinity] }),
      },
    ),
    categories: array({ cardinality: [0, Infinity] }, [
      enumRef({}, "tech_category"),
    ]),
    unit_category: obj(
      { cardinality: [0, Infinity] },
      {
        ...unit_stat,
        ...naval_stat,
        ...air_stat,
      },
    ),
    unit: obj(
      { cardinality: [0, Infinity] },
      {
        need: obj(
          { cardinality: [1, Infinity] },
          {
            equipment: int(),
          },
        ),
        ...unit_stat,
        ...naval_stat,
        ...air_stat,
        battalion_mult: obj(
          { cardinality: [0, Infinity] },
          {
            category: enumRef({ cardinality: [1, Infinity] }, "unit_category"),
            ...unit_stat,
            add: bool({ cardinality: [0, 1] }),
          },
        ),
        [enumRefKey("region_weather")]: obj(
          { cardinality: [0, Infinity] },
          {
            ...unit_stat,
            ...naval_stat,
            ...air_stat,
          },
        ),
      },
    ),
    modifier: obj({ cardinality: [0, 1] }, { ...modifier }),
    on_research_complete_limit: obj({ cardinality: [0, 1] }, { ...trigger }),
    on_research_complete: obj({ cardinality: [0, 1] }, { ...effect }),
    force_use_small_tech_layout: bool({ cardinality: [0, 1] }, true),
    show_effect_as_desc: bool({ cardinality: [0, 1] }),
    nuclear_production: float({ cardinality: [0, 1] }),
    ...modifier,
    ...unit_stat,
    ...naval_stat,
    ...air_stat,
  },
);

const tech_sharing_group = obj(
  {},
  {
    id: scalar(),
    name: localisation(),
    desc: localisation(),
    picture: typeRef({}, "spriteType"),
    research_sharing_per_country_bonus: float(),
    is_faction_sharing: bool({ cardinality: [0, 1] }, true),
    categories: array({ cardinality: [0, Infinity] }, [
      enumRef({}, "tech_category"),
    ]),
    available: obj({ cardinality: [0, 1] }, { ...trigger }),
  },
);

export const techSharingGroupType = root(
  { path: "game/common/technology_sharing" },
  {
    tech_sharing_group,
  },
);

export const complex_enum = {
  tech_category: root(
    { path: "game/common/technology_tags", start_from_root: true },
    {
      name: array({}, [
        obj(
          {},
          {
            technology_categories: array({}, [literal({}, "enum_name")]),
          },
        ),
      ]),
    },
  ),
  tech_folder: root(
    { path: "game/common/technology_tags", start_from_root: true },
    {
      name: array({}, [
        obj(
          {},
          {
            technology_folders: array({}, [
              literal({}, "enum_name"),
              array({}, [literal({}, "enum_name")]),
            ]),
          },
        ),
      ]),
    },
  ),
};

export const technologyType = root(
  { path: "game/common/technologies" },
  {
    technologies: technology,
    // technologies: either(
    //   obj(
    //     {},
    //     {
    //       doctrine: bool({}, true),
    //     },
    //   ),
    //   obj(
    //     {},
    //     {
    //       folder: obj(
    //         {},
    //         {
    //           name: literal({}, "nsb_armour_folder"),
    //           position: obj(
    //             {},
    //             {
    //               x: float(),
    //               y: float(),
    //             },
    //           ),
    //         },
    //       ),
    //     },
    //   ),
    //   obj(
    //     {},
    //     {
    //       folder: obj(
    //         {},
    //         {
    //           name: literal({}, "bba_air_techs_folder"),
    //           position: obj(
    //             {},
    //             {
    //               x: float(),
    //               y: float(),
    //             },
    //           ),
    //         },
    //       ),
    //     },
    //   ),
    // ),
  },
);
