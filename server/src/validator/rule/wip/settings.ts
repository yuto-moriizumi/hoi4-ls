const listMergeOptimisations: Rule = {
  children: {
    all_owned_state: { type: Value.UNQUOTED },
    any_owned_state: { type: Value.UNQUOTED },
    every_owned_state: { type: Value.UNQUOTED },
    random_owned_state: { type: Value.UNQUOTED },
    all_controlled_state: { type: Value.UNQUOTED },
    any_controlled_state: { type: Value.UNQUOTED },
    every_controlled_state: { type: Value.UNQUOTED },
    random_controlled_state: { type: Value.UNQUOTED },
    all_core_state: { type: Value.UNQUOTED },
    any_core_state: { type: Value.UNQUOTED },
    every_core_state: { type: Value.UNQUOTED },
    random_core_state: { type: Value.UNQUOTED },
    all_country_with_original_tag: { type: Value.UNQUOTED },
    any_country_with_original_tag: { type: Value.UNQUOTED },
    every_country_with_original_tag: { type: Value.UNQUOTED },
    random_country_with_original_tag: { type: Value.UNQUOTED },
    all_subject_country: { type: Value.UNQUOTED },
    any_subject_country: { type: Value.UNQUOTED },
    every_subject_country: { type: Value.UNQUOTED },
    random_subject_country: { type: Value.UNQUOTED },
    all_neighbor_country: { type: Value.UNQUOTED },
    any_neighbor_country: { type: Value.UNQUOTED },
    every_neighbor_country: { type: Value.UNQUOTED },
    random_neighbor_country: { type: Value.UNQUOTED },
    all_unit_leader: { type: Value.UNQUOTED },
    any_unit_leader: { type: Value.UNQUOTED },
    every_unit_leader: { type: Value.UNQUOTED },
    random_unit_leader: { type: Value.UNQUOTED },
    all_army_leader: { type: Value.UNQUOTED },
    any_army_leader: { type: Value.UNQUOTED },
    every_army_leader: { type: Value.UNQUOTED },
    random_army_leader: { type: Value.UNQUOTED },
    all_navy_leader: { type: Value.UNQUOTED },
    any_navy_leader: { type: Value.UNQUOTED },
    every_navy_leader: { type: Value.UNQUOTED },
    random_navy_leader: { type: Value.UNQUOTED },
  },
};