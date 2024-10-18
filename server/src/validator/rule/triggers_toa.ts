import { int, country, obj, either, enumRef, scopeRef } from "./utils";

export const trigger = {
  longest_war_length: int({ scope: [country()] }),
  war_length_with: obj(
    { scope: [country()] },
    {
      tag: either(enumRef({}, "country_tags"), scopeRef({}, country())),
      months: int(),
    },
  ),
};
