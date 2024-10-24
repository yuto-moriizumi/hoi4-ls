import { effect } from "../effects";
import {
  root,
  obj,
  float,
  typeRef,
  scalar,
  int,
  bool,
  typeRefKey,
  literal,
  enumRef,
  array,
  enumRefKey,
  valueRefKey,
  value,
  localisation,
  value_set,
  localisation_inline,
} from "../utils";

export const oobType = root(
  { path: "game/history/units" },
  {
    oob: obj(
      {},
      {
        start_equipment_factor: float({ cardinality: [0, 1] }),
        focus: obj(
          { cardinality: [0, 1] },
          {
            current: typeRef({}, "focus"),
            progress: float({ cardinality: [0, Infinity] }, 0),
          },
        ),
        division_template: obj(
          { cardinality: [0, Infinity] },
          {
            name: scalar(),
            division_names_group: typeRef(
              { cardinality: [0, 1] },
              "division_name",
            ),
            override_model: typeRef({ cardinality: [0, 1] }, "entity"),
            template_counter: int({ cardinality: [0, 1] }),
            is_locked: bool({ cardinality: [0, 1] }),
            force_allow_recruiting: bool({ cardinality: [0, 1] }),
            obsolete: bool({ cardinality: [0, 1] }),
            division_cap: int({ cardinality: [0, 1] }),
            regiments: obj(
              {},
              {
                [typeRefKey("unit.infantry")]: obj(
                  { cardinality: [0, 25] },
                  {
                    x: int({}, 0, 4),
                    y: int({}, 0, 4),
                  },
                ),
                [typeRefKey("unit.armor")]: obj(
                  { cardinality: [0, 25] },
                  {
                    x: int({}, 0, 4),
                    y: int({}, 0, 4),
                  },
                ),
                [typeRefKey("unit.mobile")]: obj(
                  { cardinality: [0, 25] },
                  {
                    x: int({}, 0, 4),
                    y: int({}, 0, 4),
                  },
                ),
                [typeRefKey("unit.combat_support")]: obj(
                  { cardinality: [0, 25] },
                  {
                    x: int({}, 0, 4),
                    y: int({}, 0, 4),
                  },
                ),
                [typeRefKey("unit.armor_combat_support")]: obj(
                  { cardinality: [0, 25] },
                  {
                    x: int({}, 0, 4),
                    y: int({}, 0, 4),
                  },
                ),
                [typeRefKey("unit.mobile_combat_support")]: obj(
                  { cardinality: [0, 25] },
                  {
                    x: int({}, 0, 4),
                    y: int({}, 0, 4),
                  },
                ),
              },
            ),
            support: obj(
              { cardinality: [0, 1] },
              {
                [typeRefKey("unit.support_unit")]: obj(
                  { cardinality: [1, 5] },
                  {
                    x: literal({}, 0),
                    y: int({}, 0, 4),
                  },
                ),
              },
            ),
            priority: int({ cardinality: [0, 1] }),
          },
        ),
        instant_effect: obj(
          { cardinality: [0, Infinity] },
          {
            ...effect,
          },
        ),
        units: obj(
          { cardinality: [0, 1] },
          {
            division: obj(
              { cardinality: [0, Infinity] },
              {
                name: scalar({ cardinality: [0, 1] }),
                division_name: obj(
                  { cardinality: [0, 1] },
                  {
                    is_name_ordered: bool(),
                    name_order: int({ cardinality: [0, 1] }),
                  },
                ),
                location: enumRef({}, "provinces"),
                division_template: scalar(),
                unique: array({ cardinality: [0, 1] }, [
                  scalar({ cardinality: [1, Infinity] }),
                ]),
                start_experience_factor: float({ cardinality: [0, 1] }, 0, 1),
                start_equipment_factor: float({ cardinality: [0, 1] }, 0, 1),
                start_manpower_factor: float({ cardinality: [0, 1] }, 0, 1),
                force_equipment_variants: obj(
                  { cardinality: [0, Infinity] },
                  {
                    [typeRefKey("equipment.regular_equip")]: obj(
                      { cardinality: [1, Infinity] },
                      {
                        owner: enumRef({}, "country_tags"),
                        creator: enumRef(
                          { cardinality: [0, 1] },
                          "country_tags",
                        ),
                        version_name: scalar({ cardinality: [0, 1] }),
                        amount: int({ cardinality: [0, 1] }),
                      },
                    ),
                  },
                ),
                officer: obj(
                  { cardinality: [0, Infinity] },
                  {
                    name: scalar(),
                    portraits: obj(
                      { cardinality: [0, 1] },
                      {
                        army: obj(
                          { cardinality: [1, 2] },
                          {
                            [enumRefKey("character_portrait_sizes")]: scalar(),
                          },
                        ),
                      },
                    ),
                  },
                ),
              },
            ),
            fleet: obj(
              { cardinality: [0, Infinity] },
              {
                name: scalar(),
                naval_base: enumRef({}, "provinces"),
                task_force: obj(
                  { cardinality: [1, Infinity] },
                  {
                    name: scalar(),
                    location: enumRef({}, "provinces"),
                    ship: obj(
                      { cardinality: [1, Infinity] },
                      {
                        name: scalar({ cardinality: [0, 1] }),
                        ordered_name: scalar({ cardinality: [0, 1] }),
                        pride_of_the_fleet: bool({ cardinality: [0, 1] }, true),
                        definition: typeRef({}, "unit.ship_unit"),
                        start_experience_factor: float(
                          { cardinality: [0, 1] },
                          0,
                          1,
                        ),
                        equipment: obj(
                          {},
                          {
                            [typeRefKey("equipment.naval_equip")]: obj(
                              {},
                              {
                                amount: int(),
                                owner: enumRef({}, "country_tags"),
                                version_name: scalar({ cardinality: [0, 1] }),
                                creator: enumRef(
                                  { cardinality: [0, 1] },
                                  "country_tags",
                                ),
                              },
                            ),
                          },
                        ),
                        air_wings: obj(
                          { cardinality: [0, 1] },
                          {
                            [typeRefKey("equipment.air_equip")]: obj(
                              { cardinality: [0, Infinity] },
                              {
                                owner: enumRef({}, "country_tags"),
                                creator: enumRef(
                                  { cardinality: [0, 1] },
                                  "country_tags",
                                ),
                                create_if_missing: bool({
                                  cardinality: [0, 1],
                                }),
                                amount: int(),
                              },
                            ),
                            [valueRefKey("bba_air_variants")]: obj(
                              { cardinality: [0, Infinity] },
                              {
                                owner: enumRef({}, "country_tags"),
                                creator: enumRef(
                                  { cardinality: [0, 1] },
                                  "country_tags",
                                ),
                                create_if_missing: bool({
                                  cardinality: [0, 1],
                                }),
                                amount: int(),
                              },
                            ),
                            ace: obj(
                              { cardinality: [0, Infinity] },
                              {
                                modifier: typeRef({}, "ace"),
                                name: localisation_inline(),
                                surname: localisation_inline(),
                                callsign: localisation_inline({
                                  cardinality: [0, 1],
                                }),
                                portrait: int({ cardinality: [0, 1] }),
                                is_female: bool({ cardinality: [0, 1] }, true),
                              },
                            ),
                            start_experience_factor: float(
                              { cardinality: [0, Infinity] },
                              0,
                              1,
                            ),
                            name: localisation_inline({
                              cardinality: [0, Infinity],
                            }),
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
        air_wings: obj(
          { cardinality: [0, 1] },
          {
            [typeRefKey("state")]: obj(
              { cardinality: [0, Infinity] },
              {
                [typeRefKey("equipment.air_equip")]: obj(
                  { cardinality: [0, Infinity] },
                  {
                    owner: enumRef({}, "country_tags"),
                    creator: enumRef({ cardinality: [0, 1] }, "country_tags"),
                    create_if_missing: bool({ cardinality: [0, 1] }),
                    amount: int(),
                    version_name: value({}, "variant_name"),
                  },
                ),
                [valueRefKey("bba_air_variants")]: obj(
                  { cardinality: [0, Infinity] },
                  {
                    owner: enumRef({}, "country_tags"),
                    creator: enumRef({ cardinality: [0, 1] }, "country_tags"),
                    create_if_missing: bool({ cardinality: [0, 1] }),
                    amount: int(),
                    version_name: value({}, "variant_name"),
                  },
                ),
                ace: obj(
                  { cardinality: [0, Infinity] },
                  {
                    modifier: typeRef({}, "ace"),
                    name: localisation_inline(),
                    surname: localisation_inline(),
                    callsign: localisation_inline({ cardinality: [0, 1] }),
                    portrait: int({ cardinality: [0, 1] }),
                    is_female: bool({ cardinality: [0, 1] }, true),
                  },
                ),
                start_experience_factor: float(
                  { cardinality: [0, Infinity] },
                  0,
                  1,
                ),
                name: localisation_inline({ cardinality: [0, Infinity] }),
              },
            ),
            scalar: obj(
              { cardinality: [0, Infinity] },
              {
                [typeRefKey("equipment.air_equip")]: obj(
                  { cardinality: [0, Infinity] },
                  {
                    owner: enumRef({}, "country_tags"),
                    creator: enumRef({ cardinality: [0, 1] }, "country_tags"),
                    create_if_missing: bool({ cardinality: [0, 1] }),
                    amount: int(),
                    version_name: value({}, "variant_name"),
                  },
                ),
                [valueRefKey("bba_air_variants")]: obj(
                  { cardinality: [0, Infinity] },
                  {
                    owner: enumRef({}, "country_tags"),
                    creator: enumRef({ cardinality: [0, 1] }, "country_tags"),
                    create_if_missing: bool({ cardinality: [0, 1] }),
                    amount: int(),
                    version_name: value({}, "variant_name"),
                  },
                ),
                ace: obj(
                  { cardinality: [0, Infinity] },
                  {
                    modifier: typeRef({}, "ace"),
                    name: localisation_inline(),
                    surname: localisation_inline(),
                    callsign: localisation_inline({ cardinality: [0, 1] }),
                    portrait: int({ cardinality: [0, 1] }),
                    is_female: bool({ cardinality: [0, 1] }, true),
                  },
                ),
                start_experience_factor: float(
                  { cardinality: [0, Infinity] },
                  0,
                  1,
                ),
                name: localisation_inline({ cardinality: [0, Infinity] }),
              },
            ),
          },
        ),
        navy_leader: obj(
          { cardinality: [0, Infinity] },
          {
            name: scalar(),
            desc: localisation({ cardinality: [0, 1] }),
            picture: scalar({ cardinality: [0, 1] }),
            portrait_path: scalar({ cardinality: [0, 1] }),
            flags: obj(
              { cardinality: [0, 1] },
              {
                [valueRefKey("leader_flag")]: obj(
                  { cardinality: [1, Infinity] },
                  {
                    value: literal({}, 1),
                  },
                ),
              },
            ),
            gfx: scalar({ cardinality: [0, 1] }),
            traits: array({}, [
              typeRef({ cardinality: [0, Infinity] }, "unit_leader_trait"),
            ]),
            skill: int({ cardinality: [1, 1] }),
            attack_skill: int({ cardinality: [1, 1] }),
            defense_skill: int({ cardinality: [1, 1] }),
            maneuvering_skill: int({ cardinality: [1, 1] }),
            coordination_skill: int({ cardinality: [1, 1] }),
            id: value_set({ cardinality: [0, 1] }, "unit_leader_ids"),
            female: bool({ cardinality: [0, 1] }),
          },
        ),
        field_marshal: obj(
          { cardinality: [0, Infinity] },
          {
            name: scalar(),
            desc: localisation({ cardinality: [0, 1] }),
            picture: scalar({ cardinality: [0, 1] }),
            portrait_path: scalar({ cardinality: [0, 1] }),
            flags: obj(
              { cardinality: [0, 1] },
              {
                [valueRefKey("leader_flag")]: obj(
                  { cardinality: [1, Infinity] },
                  {
                    value: literal({}, 1),
                  },
                ),
              },
            ),
            gfx: scalar({ cardinality: [0, 1] }),
            traits: array({}, [
              typeRef({ cardinality: [0, Infinity] }, "unit_leader_trait"),
            ]),
            skill: int({ cardinality: [1, 1] }),
            attack_skill: int({ cardinality: [1, 1] }),
            defense_skill: int({ cardinality: [1, 1] }),
            planning_skill: int({ cardinality: [1, 1] }),
            logistics_skill: int({ cardinality: [1, 1] }),
            id: value_set({ cardinality: [0, 1] }, "unit_leader_ids"),
            female: bool({ cardinality: [0, 1] }),
          },
        ),
        corps_commander: obj(
          { cardinality: [0, Infinity] },
          {
            name: scalar({ cardinality: [0, 1] }),
            desc: localisation({ cardinality: [0, 1] }),
            picture: scalar({ cardinality: [0, 1] }),
            portrait_path: scalar({ cardinality: [0, 1] }),
            flags: obj(
              { cardinality: [0, 1] },
              {
                [valueRefKey("leader_flag")]: obj(
                  { cardinality: [1, Infinity] },
                  {
                    value: literal({}, 1),
                  },
                ),
              },
            ),
            gfx: scalar({ cardinality: [0, 1] }),
            traits: array({}, [
              typeRef({ cardinality: [0, Infinity] }, "unit_leader_trait"),
            ]),
            skill: int({ cardinality: [1, 1] }),
            attack_skill: int({ cardinality: [1, 1] }),
            defense_skill: int({ cardinality: [1, 1] }),
            planning_skill: int({ cardinality: [1, 1] }),
            logistics_skill: int({ cardinality: [1, 1] }),
            id: value_set({ cardinality: [0, 1] }, "unit_leader_ids"),
            female: bool({ cardinality: [0, 1] }),
          },
        ),
      },
    ),
  },
);
