import { modifier } from "../modifiers";
import {
  root,
  obj,
  array,
  either,
  bool,
  int,
  float,
  localisation,
  scalar,
  enumRefKey,
  country,
} from "../utils";

export const game_rules = [
  "can_be_called_to_war",
  "can_be_spymaster",
  "can_boost_other_ideologies",
  "can_create_collaboration_government",
  "can_create_factions",
  "can_declare_war_on_same_ideology",
  "can_declare_war_without_wargoal_when_in_war",
  "can_decline_call_to_war",
  "can_force_government",
  "can_generate_female_aces",
  "can_guarantee_other_ideologies",
  "can_join_factions",
  "can_join_factions_not_allowed_diplomacy",
  "can_join_opposite_factions",
  "can_lower_tension",
  "can_not_declare_war",
  "can_occupy_non_war",
  "can_only_justify_war_on_threat_country",
  "can_puppet",
  "can_send_volunteers",
  "can_use_kamikaze_pilots",
  "contributes_operatives",
  "units_deployed_to_overlord",
  "can_boost_own_ideology",
  "can_generate_female_unit_leaders",
  "can_generate_female_country_leaders",
  "can_access_market",
];

export const ai_ideology = [
  "ai_fascist",
  "ai_communist",
  "ai_democratic",
  "ai_neutral",
];

export const sub_ideology = root(
  { path: "/common/ideologies" },
  {
    name: obj(
      {},
      {
        scalar: obj(
          {},
          {
            types: array({}, [
              obj(
                {},
                {
                  enum_name: array({}, []),
                },
              ),
            ]),
          },
        ),
      },
    ),
  },
);

export const ideologyType = root(
  { path: "/common/ideologies" },
  {
    ideologies: either(
      obj(
        {},
        {
          types: array({}, []),
        },
      ),
      obj(
        { cardinality: [0, 0] },
        {
          types: array({}, []),
        },
      ),
    ),
  },
);

const ideology = either(
  obj(
    {},
    {
      types: obj(
        {},
        {
          scalar: obj(
            {},
            {
              can_be_randomly_selected: bool({ cardinality: [0, 1] }),
              color: either(
                array({ cardinality: [3, 3] }, [int()]),
                array({ cardinality: [3, 3] }, [float()]),
              ),
            },
          ),
        },
      ),
      ai_ideology_wanted_units_factor: float(),
      dynamic_faction_names: array({}, [
        localisation({ cardinality: [0, Infinity] }),
        scalar({ cardinality: [0, Infinity] }),
      ]),
      color: array({ cardinality: [3, 3] }, [int()]),
      rules: obj(
        {},
        {
          can_force_government: bool(),
          can_puppet: bool(),
          can_send_volunteers: bool(),
          [enumRefKey("game_rules")]: bool({ cardinality: [0, 20] }),
        },
      ),
      can_host_government_in_exile: bool({ cardinality: [0, 1] }),
      war_impact_on_world_tension: float(),
      faction_impact_on_world_tension: float(),
      modifiers: obj(
        { push_scope: country() },
        {
          ...modifier,
        },
      ),
      faction_modifiers: obj(
        { push_scope: country() },
        {
          ...modifier,
        },
      ),
      can_be_boosted: bool({ cardinality: [0, 1] }),
      can_collaborate: bool({ cardinality: [0, 1] }),
      [enumRefKey("ai_ideology")]: bool({ cardinality: [0, 1] }),
    },
  ),
);

export const types = {
  ideology: ideology,
};
