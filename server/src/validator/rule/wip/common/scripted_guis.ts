const types: Rule = {
  children: {
    type: {
      subtype: [
        {
          context: Context.SCRIPTED_GUI,
          scope: Scope.GAME,
          children: {
            path: { type: Value.UNQUOTED },
            skip_root_key: { type: Value.UNQUOTED },
            dynamic_lists: {
              children: {
                scalar: {
                  children: {
                    change_scope: { type: Value.BOOL, defaultValue: true },
                  },
                },
              },
            },
          },
        },
        { provide: { context: Context.ANY_CONTEXT, scope: Scope.SCRIPTED_GUI } },
        { provide: { context: Context.GLOBAL_CONTEXT, scope: Scope.SCRIPTED_GUI } },
        { provide: { context: Context.STATE_MAPICON_CONTEXT, scope: Scope.SCRIPTED_GUI } },
        { provide: { context: Context.COUNTRY_MAPICON_CONTEXT, scope: Scope.SCRIPTED_GUI } },
        { provide: { context: Context.STATE_CONTEXT, scope: Scope.SCRIPTED_GUI } },
        {
          context_type: { type: Value.UNQUOTED },
          cardinality: [0, "inf"],
        },
        {
          context_type: { type: Value.UNQUOTED },
          cardinality: [0, "inf"],
        },
        {
          context_type: { type: Value.UNQUOTED },
          cardinality: [0, "inf"],
        },
        { provide: { context: Context.PLAYER_CONTEXT, scope: Scope.SCRIPTED_GUI } },
      ],
    },
  },
};

const scripted_gui: Rule = {
  children: {
    window_name: { type: Value.UNQUOTED },
    context_type: { type: Value.UNQUOTED, cardinality: [0, 1] },
    parent_window_token: { type: Value.UNQUOTED, cardinality: [0, 1] },
    parent_window_name: {
      type: Value.UNQUOTED,
      cardinality: [0, "inf"],
      values: [
        {value: Value.UNQUOTED},
        {value: "<containerWindowType>_instance"}
      ]
    },
    dirty: { type: Value.UNQUOTED, cardinality: [0, "inf"] },
    properties: {
      children: {
      	scalar: {
          cardinality: ["~1", "inf"],
        	children: {
          	image: { type: Value.UNQUOTED, cardinality: [0, 1] },
          	frame: { type: Value.UNQUOTED, cardinality: [0, 1] },
          	x: { type: Value.UNQUOTED, cardinality: [0, 1] },
          	y: { type: Value.UNQUOTED, cardinality: [0, 1] },
            },
        },
      },
    },
    dynamic_lists: {
      children: {
      	scalar: {
          cardinality: ["~1", "inf"],
        	children: {
          	array: { type: Value.UNQUOTED },
          	change_scope: { type: Value.BOOL, cardinality: [0, 1] },
          	entry_container: { type: Value.UNQUOTED, cardinality: [0, 1] },
          	country_scope_entry_container: { type: Value.UNQUOTED, cardinality: [0, 1] },
          	index: { type: Value.UNQUOTED, cardinality: [0, 1] },
          	value: { type: Value.UNQUOTED, cardinality: [0, 1] },
          	ai_weights: {
            	children: {
              	scalar: {
                	cardinality: ["~1", "inf"],
              		children: {
                		ai_will_do: {
                  		children: {
                    		base_factor: { type: Value.UNQUOTED, cardinality: [0, 1] },
                    		modifier_rule: { provide: { context: Context.MODIFIER_RULE, scope: Scope.SCRIPTED_GUI } },
                  		},
                	},
              	},
            	},
          	},
          },
        },
      },
    },
    subtype: {
      any_context: {
        effects: {
          cardinality: [0, 1],
          children: {
            scalar: {
              cardinality: ["~1", "inf"],
              children: {
                effect: { provide: { context: Context.EFFECT, scope: Scope.SCRIPTED_GUI } },
              },
            },
          },
        },
        visible: {
          cardinality: [0, 1],
          children: {
            trigger: { provide: { context: Context.TRIGGER, scope: Scope.SCRIPTED_GUI } },
          },
        },
        triggers: {
          cardinality: [0, 1],
          children: {
            scalar: {
              cardinality: ["~1", "inf"],
              children: {
                trigger: { provide: { context: Context.TRIGGER, scope: Scope.SCRIPTED_GUI } },
              },
            },
          },
        },
        ai_test_scopes: { type: Value.UNQUOTED, cardinality: [0, "inf"] },
        ai_check_scope: {
          cardinality: [0, 1],
          children: {
            trigger: { provide: { context: Context.TRIGGER, scope: Scope.SCRIPTED_GUI } },
          },
        },
      },
    },
    ai_enabled: {
      cardinality: [0, 1],
      children: {
        trigger: { provide: { context: Context.TRIGGER, scope: Scope.SCRIPTED_GUI } },
      },
    },
    ai_check: {
      cardinality: [0, 1],
      children: {
        trigger: { provide: { context: Context.TRIGGER, scope: Scope.SCRIPTED_GUI } },
      },
    },
    ai_test_interval: { type: Value.UNQUOTED, cardinality: [0, 1] },
    ai_test_variance: { type: Value.UNQUOTED, cardinality: [0, 1] },
    ai_max_weight_taken_per_test: { type: Value.UNQUOTED, cardinality: [0, 1] },
    ai_test_parent: { type: Value.UNQUOTED, cardinality: [0, 1] },
    ai_weights: {
      children: {
        weight: { type: Value.UNQUOTED, cardinality: [0, 1] },
        scalar: {
          cardinality: [0, "inf"],
          children: {
            player_context: {
              children: {
                ai_will_do: {
                  children: {
                    base_factor: { type: Value.UNQUOTED, cardinality: [0, 1] },
                    modifier_rule: { provide: { context: Context.MODIFIER_RULE, scope: Scope.SCRIPTED_GUI } },
                  },
                },
                ignore_lower_weights: {
                  children: {
                  	base_factor: { type: Value.UNQUOTED, cardinality: [0, 1] },
                  	modifier_rule: { provide: { context: Context.MODIFIER_RULE, scope: Scope.SCRIPTED_GUI } },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
};