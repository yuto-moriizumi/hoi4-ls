import { obj, array, literal } from "./utils";

export const values = obj(
  {},
  {
    value: array({}, [
      literal({}, "majors"),
      literal({}, "players"),
      literal({}, "country_list_scores"),
      literal({}, "sorted_country_list"),
      literal({}, "allies"),
      literal({}, "controlled_states"),
      literal({}, "core_states"),
      literal({}, "enemies"),
      literal({}, "exiles"),
      literal({}, "faction_members"),
      literal({}, "neighbors"),
      literal({}, "subjects"),
      literal({}, "subject_countries"),
      literal({}, "subject_states"),
      literal({}, "args"),
      literal({}, "political_advisor"),
      literal({}, "high_command"),
    ]),
  },
);
