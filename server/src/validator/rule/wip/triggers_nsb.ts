const trigger: Rule = {
  children: {
    any_core_state: {
      cardinality: [0, 1],
      provide: {context: Context.TRIGGER, scope: Scope.STATE},
      children: {
        tooltip: {type: Value.UNQUOTED}
      }
    },
    all_core_state: {
      cardinality: [0, 1],
      provide: {context: Context.TRIGGER, scope: Scope.STATE},
      children: {
        tooltip: {type: Value.UNQUOTED}
      }
    },
    any_subject_country: {
      cardinality: [0, 1],
      provide: {context: Context.TRIGGER, scope: Scope.COUNTRY},
      children: {
        tooltip: {type: Value.UNQUOTED}
      }
    },
    all_subject_countries: {
      cardinality: [0, 1],
      provide: {context: Context.TRIGGER, scope: Scope.COUNTRY},
      children: {
        tooltip: {type: Value.UNQUOTED}
      }
    },
    has_railway_level: {
      provide: {context: Context.TRIGGER, scope: Scope.ANY},
      children: {
        level: {type: Value.UNQUOTED},
        state: {type: Value.UNQUOTED, cardinality: [0, "inf"]},
      }
    },
    has_available_resources_in_country: {
      provide: {context: Context.TRIGGER, scope: Scope.COUNTRY},
      children: {
        resource: {type: Value.UNQUOTED},
        amount: {type: Value.UNQUOTED},
      }
    },
    has_resources_rights: [
      {
        provide: {context: Context.TRIGGER, scope: Scope.COUNTRY},
        children: {
          state: {type: Value.UNQUOTED, cardinality: [0, "inf"]},
          resources: {type: Value.UNQUOTED, cardinality: [1, "inf"]},
        }
      },
      {
        provide: {context: Context.TRIGGER, scope: Scope.STATE},
        children: {
          receiver: {type: Value.UNQUOTED},
          resources: {type: Value.UNQUOTED, cardinality: [1, "inf"]},
        }
      }
    ],
    any_character: {
      cardinality: [0, 1],
      provide: {context: Context.TRIGGER, scope: Scope.CHARACTER},
      children: {
        tooltip: {type: Value.UNQUOTED}
      }
    },
    all_character: {
      cardinality: [0, 1],
      provide: {context: Context.TRIGGER, scope: Scope.CHARACTER},
      children: {
        tooltip: {type: Value.UNQUOTED}
      }
    },
    ... // Other triggers converted similarly
    has_advisor_role: {
      provide: {context: Context.TRIGGER, scope: Scope.CHARACTER},
      children: {
        allowed_advisor_role: {type: Value.UNQUOTED},
      }
    },
    any_country_with_core: {
      cardinality: [0, 1],
      provide: {context: Context.TRIGGER, scope: Scope.COUNTRY},
      children: {
        tooltip: {type: Value.UNQUOTED}
      }
    },
  },
};