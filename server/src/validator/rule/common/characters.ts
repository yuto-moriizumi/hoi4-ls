import { triggers } from "../triggers";
import { effects } from "../effects";
import { modifier_rule } from "../modifier_rule";
import { modifiers } from "../modifiers";
import { portraitset } from "../portraitset";
import {
  BaseEntryDescriptor,
  Entries,
  EntryDescriptor,
  ObjectValueDescriptor,
  RootObjectEntryDescriptor,
  Scope,
  Value,
  ValueDescriptor,
} from "../types";
import { variable_field } from "../variable_field";
import { Enum, int, localisation, number, ref, valueSet } from "../utils";
import { ledgers } from "../enums";

const unitLeaderTraitsEntry: EntryDescriptor = {
  cardinality: [0, Infinity],
  type: Value.ARRAY,
  values: ref("unit_leader_trait"),
};

const countryLeaderTraitsEntry: EntryDescriptor = {
  cardinality: [0, Infinity],
  type: Value.ARRAY,
  values: ref("country_leader_trait"),
};

export const character: RootObjectEntryDescriptor = {
  children: {
    uninstanced: {
      children: {
        name: { type: Value.LOCALISATION, cardinality: [0, 1] },
        portraits: {
          dynamicChildren: [
            {
              cardinality: [0, 2],
              key: Enum("character_portrait_types"),
              value: { children: portraitset },
            },
          ],
          children: {},
        } satisfies EntryDescriptor,
        allowed_civil_war: {
          cardinality: [0, 1],
          replaceScope: { this: Scope.CHARACTER, root: Scope.COUNTRY },
          children: triggers,
        },
        gender: {
          type: Value.ENUM,
          values: ["female", "male", "undefined"],
          cardinality: [0, 1],
        },
      },
    },
    country_leader: {
      children: {
        country_leader: {
          children: {
            ideology: ref("sub_ideology"),
            desc: { type: Value.LOCALISATION, cardinality: [0, 1] },
            expire: { type: Value.DATETIME, cardinality: [0, 1] },
            name: { type: Value.LOCALISATION, cardinality: [0, 1] },
            traits: countryLeaderTraitsEntry,
            research_bonus: {
              cardinality: [0, 1],
              children: {},
              dynamicChildren: [
                {
                  key: ref("tech_category"),
                  value: number(),
                },
              ],
            },
          },
          dynamicChildren: [
            {
              key: Enum("character_ids"),
              value: {
                type: Value.UNQUOTED,
                referencedBy: "country_leader_ids",
              },
            },
          ],
        } satisfies EntryDescriptor,
      },
    },
    corps_commander: {
      children: {
        corps_commander: {
          children: {
            desc: { type: Value.LOCALISATION, cardinality: [0, 1] },
            expire: { type: Value.DATETIME, cardinality: [0, 1] },
            skill: int(),
            attack_skill: int(),
            defense_skill: int(),
            planning_skill: int(),
            logistics_skill: int(),
            character_ids: {
              type: Value.UNQUOTED,
              referencedBy: "unit_leader_ids",
              cardinality: [0, 1],
            },
            name: { type: Value.LOCALISATION, cardinality: [0, 1] },
            traits: unitLeaderTraitsEntry,
            visible: {
              cardinality: [0, 1],
              replaceScope: { this: Scope.CHARACTER, root: Scope.COUNTRY },
              children: triggers,
            },
          },
        },
      },
    },
    field_marshal: {
      children: {
        field_marshal: {
          children: {
            desc: { type: Value.LOCALISATION, cardinality: [0, 1] },
            expire: { type: Value.DATETIME, cardinality: [0, 1] },
            skill: int(),
            attack_skill: int(),
            defense_skill: int(),
            planning_skill: int(),
            logistics_skill: int(),
            character_ids: {
              type: Value.UNQUOTED,
              referencedBy: "unit_leader_ids",
              cardinality: [0, 1],
            },
            name: { type: Value.LOCALISATION, cardinality: [0, 1] },
            traits: unitLeaderTraitsEntry,
            visible: {
              cardinality: [0, 1],
              replaceScope: { this: Scope.CHARACTER, root: Scope.COUNTRY },
              children: triggers,
            },
          },
        },
      },
    },
    navy_leader: {
      children: {
        navy_leader: {
          children: {
            desc: { type: Value.LOCALISATION, cardinality: [0, 1] },
            expire: { type: Value.DATETIME, cardinality: [0, 1] },
            skill: int(),
            attack_skill: int(),
            defense_skill: int(),
            maneuvering_skill: int(),
            coordination_skill: int(),
            character_ids: {
              type: Value.UNQUOTED,
              referencedBy: "unit_leader_ids",
              cardinality: [0, 1],
            },
            name: { type: Value.LOCALISATION, cardinality: [0, 1] },
            traits: unitLeaderTraitsEntry,
            visible: {
              cardinality: [0, 1],
              replaceScope: { this: Scope.CHARACTER, root: Scope.COUNTRY },
              children: triggers,
            },
          },
        },
      },
    },
    advisor: {
      children: {
        advisor: {
          cardinality: [1, Infinity],
          children: {
            slot: ref("character_advisor_slot"),
            name: { type: Value.LOCALISATION, cardinality: [0, 1] },
            desc: { type: Value.LOCALISATION, cardinality: [0, 1] },
            idea_token: { type: Value.UNQUOTED, referencedBy: "advisor_token" },
            allowed: {
              replaceScope: { this: Scope.CHARACTER, root: Scope.COUNTRY },
              cardinality: [0, 1],
              children: triggers,
            },
            visible: {
              replaceScope: { this: Scope.CHARACTER, root: Scope.COUNTRY },
              cardinality: [0, 1],
              children: triggers,
            },
            available: {
              replaceScope: { this: Scope.CHARACTER, root: Scope.COUNTRY },
              cardinality: [0, 1],
              children: triggers,
            },
            traits: unitLeaderTraitsEntry,
            research_bonus: {
              cardinality: [0, 1],
              children: {},
              dynamicChildren: [
                {
                  key: ref("tech_category"),
                  value: number(),
                },
              ],
            },
            ledger: {
              type: Value.ENUM,
              values: ledgers,
              cardinality: [0, 1],
            },
            cost: { type: Value.INT, cardinality: [0, 1] },
            removal_cost: { type: Value.INT, cardinality: [0, 1] },
            ai_will_do: {
              replaceScope: { this: Scope.CHARACTER, root: Scope.COUNTRY },
              cardinality: [0, 1],
              children: {
                base_factor: variable_field,
                ...modifier_rule,
              },
            },
            on_add: {
              cardinality: [0, Infinity],
              replaceScope: { this: Scope.CHARACTER, root: Scope.COUNTRY },
              children: effects,
            },
            on_remove: {
              cardinality: [0, Infinity],
              replaceScope: { this: Scope.CHARACTER, root: Scope.COUNTRY },
              children: effects,
            },
            do_effect: {
              replaceScope: { this: Scope.CHARACTER, root: Scope.COUNTRY },
              cardinality: [0, 1],
              children: triggers,
            },
            modifier: {
              replaceScope: { this: Scope.CHARACTER, root: Scope.COUNTRY },
              cardinality: [0, 1],
              children: modifiers,
            },
            can_be_fired: { type: Value.BOOL, cardinality: [0, 1] },
          },
        },
      },
    },
    instanced: {
      children: {
        instance: {
          replaceScope: { this: Scope.CHARACTER, root: Scope.COUNTRY },
          cardinality: [2, Infinity],
          children: {
            allowed: {
              children: triggers,
            },
            name: localisation(),
            portraits: {
              cardinality: [1, 2],
              children: {},
              dynamicChildren: [
                {
                  key: Enum("character_portrait_types"),
                  value: { children: portraitset },
                },
              ],
            },
            gender: {
              type: Value.ENUM,
              values: ["female", "male", "undefined"],
              cardinality: [0, 1],
            },
            allowed_civil_war: {
              replaceScope: { this: Scope.CHARACTER, root: Scope.COUNTRY },
              children: triggers,
            },
            corps_commander: {
              children: {
                desc: { type: Value.LOCALISATION, cardinality: [0, 1] },
                expire: { type: Value.DATETIME, cardinality: [0, 1] },
                skill: int(),
                attack_skill: int(),
                defense_skill: int(),
                planning_skill: int(),
                logistics_skill: int(),
                character_ids: {
                  cardinality: [0, 1],
                  children: {},
                  dynamicChildren: [
                    {
                      key: Enum("character_ids"),
                      value: valueSet("unit_leader_ids"),
                    },
                  ],
                },
                name: { type: Value.LOCALISATION, cardinality: [0, 1] },
                traits: unitLeaderTraitsEntry,
                visible: {
                  cardinality: [0, 1],
                  replaceScope: { this: Scope.CHARACTER, root: Scope.COUNTRY },
                  children: triggers,
                },
              },
              dynamicChildren: [
                {
                  key: Enum("character_ids"),
                  value: valueSet("unit_leader_ids"),
                },
              ],
            },
            field_marshal: {
              children: {
                desc: { type: Value.LOCALISATION, cardinality: [0, 1] },
                expire: { type: Value.DATETIME, cardinality: [0, 1] },
                skill: int(),
                attack_skill: int(),
                defense_skill: int(),
                planning_skill: int(),
                logistics_skill: int(),
                character_ids: {
                  cardinality: [0, 1],
                  children: {},
                  dynamicChildren: [
                    {
                      key: Enum("character_ids"),
                      value: valueSet("unit_leader_ids"),
                    },
                  ],
                },
                name: { type: Value.LOCALISATION, cardinality: [0, 1] },
                traits: unitLeaderTraitsEntry,
                visible: {
                  cardinality: [0, 1],
                  replaceScope: { this: Scope.CHARACTER, root: Scope.COUNTRY },
                  children: triggers,
                },
              },
            },
            navy_leader: {
              children: {
                desc: { type: Value.LOCALISATION, cardinality: [0, 1] },
                expire: { type: Value.DATETIME, cardinality: [0, 1] },
                skill: int(),
                attack_skill: int(),
                defense_skill: int(),
                maneuvering_skill: int(),
                coordination_skill: int(),
                character_ids: {
                  cardinality: [0, 1],
                  children: {},
                  dynamicChildren: [
                    {
                      key: Enum("character_ids"),
                      value: valueSet("unit_leader_ids"),
                    },
                  ],
                },
                name: { type: Value.LOCALISATION, cardinality: [0, 1] },
                traits: unitLeaderTraitsEntry,
                visible: {
                  cardinality: [0, 1],
                  replaceScope: { this: Scope.CHARACTER, root: Scope.COUNTRY },
                  children: triggers,
                },
              },
            },
            advisor: {
              children: {},
              dynamicChildren: [
                {
                  key: {
                    type: Value.REFERENCE_TO,
                    tag: "character_advisor_slot",
                  },
                  value: {
                    type: Value.OBJECT,
                    children: {
                      slot: {
                        type: Value.REFERENCE_TO,
                        tag: "character_advisor_slot",
                      },
                      idea_token: {
                        type: Value.UNQUOTED,
                        referencedBy: "advisor_token",
                      },
                      name: { type: Value.LOCALISATION, cardinality: [0, 1] },
                      desc: { type: Value.LOCALISATION, cardinality: [0, 1] },
                      allowed: { cardinality: [0, 1], children: triggers },
                      visible: { cardinality: [0, 1], children: triggers },
                      available: { cardinality: [0, 1], children: triggers },
                      traits: countryLeaderTraitsEntry,
                      research_bonus: {
                        cardinality: [0, 1],
                        children: {},
                        dynamicChildren: [
                          {
                            key: Enum("tech_category"),
                            value: number(),
                          },
                        ],
                      },
                      ledger: {
                        type: Value.ENUM,
                        values: ledgers,
                        cardinality: [0, 1],
                      },
                      cost: { type: Value.INT, cardinality: [0, 1] },
                      removal_cost: { type: Value.INT, cardinality: [0, 1] },
                      ai_will_do: {
                        cardinality: [0, 1],
                        children: {
                          base_factor: variable_field,
                          ...modifier_rule,
                        },
                      },
                      on_add: {
                        cardinality: [0, Infinity],
                        children: effects,
                      },
                      on_remove: {
                        cardinality: [0, Infinity],
                        children: effects,
                      },
                      do_effect: {
                        cardinality: [0, 1],
                        children: triggers,
                      },
                      modifier: {
                        cardinality: [0, 1],
                        children: modifiers,
                      },
                      can_be_fired: { type: Value.BOOL, cardinality: [0, 1] },
                    } satisfies Entries,
                  } satisfies ValueDescriptor,
                },
              ],
            } satisfies ObjectValueDescriptor & BaseEntryDescriptor,
          } satisfies Entries,
        },
      },
    },
  },
};
