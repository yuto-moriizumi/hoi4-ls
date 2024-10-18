import {
  obj,
  country,
  enumRefKey,
  bool,
  either,
  scopeRef,
  enumRef,
  scalar,
  localisation,
  typeRef,
} from "./utils";

export const effect = {
  add_relation_rule_override: obj(
    { scope: [country()] },
    {
      [enumRefKey("game_rules")]: bool(),
      target: either(
        scopeRef({ cardinality: [0, 1] }, country()),
        enumRef({ cardinality: [0, 1] }, "country_tags"),
      ),
      trigger: scalar({ cardinality: [0, 1] }),
      usage_desc: localisation({ cardinality: [0, 1] }),
    },
  ),
  remove_relation_rule_override: obj(
    { scope: [country()] },
    {
      [enumRefKey("game_rules")]: bool(),
      target: either(
        scopeRef({ cardinality: [0, 1] }, country()),
        enumRef({ cardinality: [0, 1] }, "country_tags"),
      ),
      trigger: scalar({ cardinality: [0, 1] }),
      usage_desc: localisation({ cardinality: [0, 1] }),
    },
  ),
  remove_decision_on_cooldown: typeRef({}, "decision"),
};
