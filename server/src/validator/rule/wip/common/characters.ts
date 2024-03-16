const types: Rule = {
  children: {
    type: {
      children: {
        path: { type: Value.UNQUOTED },
        path_strict: { type: Value.BOOL },
        skip_root_key: { type: Value.UNQUOTED },
        subtype: {
          children: [{
            instanced: {
              cardinality: ["~2", "inf"],
              children: {
                instance: {},
              },
            },
          }, {
            uninstanced: {},
          }, {
            country_leader: {
              cardinality: [1, "inf"],
              children: {
                country_leader: {},
              },
            },
          }, {
            country_leader: {
              cardinality: ["~2", "inf"],
              children: {
                instance: {
                  cardinality: [1, "inf"],
                  children: {
                    country_leader: {},
                  },
                },
              },
            },
          }, {
            corps_commander: {
              children: {
                corps_commander: {},
              },
            },
          }, {
            corps_commander: {
              cardinality: ["~2", "inf"],
              children: {
                instance: {
                  children: {
                    corps_commander: {},
                  },
                },
              },
            },
          }, {
            field_marshal: {
              children: {
                field_marshal: {},
              },
            },
          }, {
            field_marshal: {
              cardinality: ["~2", "inf"],
              children: {
                instance: {
                  children: {
                    field_marshal: {},
                  },
                },
              },
            },
          }, {
            navy_leader: {
              children: {
                navy_leader: {},
              },
            },
          }, {
            navy_leader: {
              cardinality: ["~2", "inf"],
              children: {
                instance: {
                  children: {
                    navy_leader: {},
                  },
                },
              },
            },
          }, {
            advisor: {
              cardinality: [1, "inf"],
              children: {
                advisor: {},
              },
            },
          }, {
            advisor: {
              cardinality: ["~2", "inf"],
              children: {
                instance: {
                  cardinality: [1, "inf"],
                  children: {
                    advisor: {},
                  },
                },
              },
            },
          }],
        },
      },
    },
  },
};

const character: Rule = {
  children: {
    subtype: {
      children: {
        uninstanced: {
          children: {
            name: { type: Value.UNQUOTED, cardinality: [0, 1] },
            portraits: {
              children: {
                enum: {
                  cardinality: ["~1", 2],
                  provide: { context: Context.PORTRAITSET, scope: Scope.COUNTRY },
                },
              },
            },
            allowed_civil_war: {
              cardinality: [0, 1],
              provide: { context: Context.TRIGGER, scope: Scope.COUNTRY },
            },
            gender: { type: Value.UNQUOTED, cardinality: [0, 1] },
          },
        },
        country_leader: {
          cardinality: [1, "inf"],
          children: {
            country_leader: {
              children: {
                ideology: { type: Value.UNQUOTED },
                desc: { type: Value.UNQUOTED, cardinality: [0, 1] },
                expire: { type: Value.UNQUOTED, cardinality: [0, 1] },
                name: { type: Value.UNQUOTED, cardinality: [0, 1] },
                traits: { cardinality: [0, "inf"] },
                research_bonus: {
                  children: {
                    enum: { type: Value.UNQUOTED, cardinality: [1, "inf"] },
                  },
                },
                enum: { type: Value.UNQUOTED },
              },
            },
          },
        },
        corps_commander: {
          children: {
            corps_commander: {
              children: {
                desc: { type: Value.UNQUOTED, cardinality: [0, 1] },
                expire: { type: Value.UNQUOTED, cardinality: [0, 1] },
                skill: { type: Value.UNQUOTED },
                attack_skill: { type: Value.UNQUOTED },
                defense_skill: { type: Value.UNQUOTED },
                planning_skill: { type: Value.UNQUOTED },
                logistics_skill: { type: Value.UNQUOTED },
                enum: { type: Value.UNQUOTED, cardinality: [0, 1] },
                name: { type: Value.UNQUOTED, cardinality: [0, 1] },
                traits: { cardinality: [0, "inf"] },
                visible: {
                  cardinality: [0, 1],
                  provide: { context: Context.TRIGGER, scope: Scope.COUNTRY },
                },
              },
            },
          },
        },
        field_marshal: {
          children: {
            field_marshal: {
              children: {
                desc: { type: Value.UNQUOTED, cardinality: [0, 1] },
                expire: { type: Value.UNQUOTED, cardinality: [0, 1] },
                skill: { type: Value.UNQUOTED },
                attack_skill: { type: Value.UNQUOTED },
                defense_skill: { type: Value.UNQUOTED },
                planning_skill: { type: Value.UNQUOTED },
                logistics_skill: { type: Value.UNQUOTED },
                enum: { type: Value.UNQUOTED, cardinality: [0, 1] },
                traits: { cardinality: [0, "inf"] },
                visible: {
                  cardinality: [0, 1],
                  provide: { context: Context.TRIGGER, scope: Scope.COUNTRY },
                },
              },
            },
          },
        },
        navy_leader: {
          children: {
            navy_leader: {
              children: {
                desc: { type: Value.UNQUOTED, cardinality: [0, 1] },
                expire: { type: Value.UNQUOTED, cardinality: [0, 1] },
                skill: { type: Value.UNQUOTED },
                attack_skill: { type: Value.UNQUOTED },
                defense_skill: { type: Value.UNQUOTED },
                maneuvering_skill: { type: Value.UNQUOTED },
                coordination_skill: { type: Value.UNQUOTED },
                enum: { type: Value.UNQUOTED, cardinality: [0, 1] },
                name: { type: Value.UNQUOTED, cardinality: [0, 1] },
                traits: { cardinality: [0, "inf"] },
                visible: {
                  cardinality: [0, 1],
                  provide: { context: Context.TRIGGER, scope: Scope.COUNTRY },
                },
              },
            },
          },
        },
        advisor: {
          cardinality: [1, "inf"],
          children: {
            advisor: {
              children: {
                slot: { type: Value.UNQUOTED },
                name: { type: Value.UNQUOTED, cardinality: [0, 1] },
                desc: { type: Value.UNQUOTED, cardinality: [0, 1] },
                idea_token: { type: Value.UNQUOTED },
                allowed: {
                  cardinality: [0, 1],
                  provide: { context: Context.TRIGGER, scope: Scope.COUNTRY },
                },
                visible: {
                  cardinality: [0, 1],
                  provide: { context: Context.TRIGGER, scope: Scope.COUNTRY },
                },
                available: {
                  cardinality: [0, 1],
                  provide: { context: Context.TRIGGER, scope: Scope.COUNTRY },
                },
                traits: { cardinality: [0, "inf"] },
                research_bonus: {
                  children: {
                    enum: { type: Value.UNQUOTED, cardinality: [1, "inf"] },
                  },
                },
                ledger: { type: Value.UNQUOTED, cardinality: [0, 1] },
                cost: { type: Value.UNQUOTED, cardinality: [0, 1] },
                removal_cost: { type: Value.UNQUOTED, cardinality: [0, 1] },
                ai_will_do: {
                  provide: { context: Context.MODIFIER_RULE, scope: Scope.COUNTRY },
                  cardinality: [0, 1],
                },
                on_add: {
                  provide: { context: Context.EFFECT, scope: Scope.COUNTRY },
                  cardinality: [0, "inf"],
                },
                on_remove: {
                  provide: { context: Context.EFFECT, scope: Scope.COUNTRY },
                  cardinality: [0, "inf"],
                },
                do_effect: {
                  cardinality: [0, 1],
                  provide: { context: Context.TRIGGER, scope: Scope.COUNTRY },
                },
                modifier: {
                  cardinality: [0, 1],
                  provide: { context: Context.MODIFIER, scope: Scope.COUNTRY },
                },
                can_be_fired: { type: Value.BOOL, cardinality: [0, 1] },
              },
            },
          },
        },
        instanced: {
          cardinality: ["~2", "inf"],
          children: {
            instance: {
              children: {
                allowed: {
                  cardinality: [0, 1],
                  provide: { context: Context.TRIGGER, scope: Scope.COUNTRY },
                },
                name: { type: Value.UNQUOTED, cardinality: [0, 1] },
                portraits: {
                  children: {
                    enum: {
                      cardinality: ["~1", 2],
                      provide: { context: Context.PORTRAITSET, scope: Scope.COUNTRY },
                    },
                  },
                },
                gender: { type: Value.UNQUOTED, cardinality: [0, 1] },
                allowed_civil_war: {
                  cardinality: [0, 1],
                  provide: { context: Context.TRIGGER, scope: Scope.COUNTRY },
                },
                country_leader: {
                  cardinality: [0, "inf"],
                  children: {
                    country_leader: {
                      children: {
                        ideology: { type: Value.UNQUOTED },
                        desc: { type: Value.UNQUOTED, cardinality: [0, 1] },
                        expire: { type: Value.UNQUOTED, cardinality: [0, 1] },
                        name: { type: Value.UNQUOTED, cardinality: [0, 1] },
                        traits: { cardinality: [0, "inf"] },
                        research_bonus: {
                          children: {
                            enum: { type: Value.UNQUOTED, cardinality: [1, "inf"] },
                          },
                        },
                        enum: { type: Value.UNQUOTED },
                      },
                    },
                  },
                },
                corps_commander: {
                  cardinality: [0, 1],
                  children: {
                    corps_commander: {
                      children: {
                        desc: { type: Value.UNQUOTED, cardinality: [0, 1] },
                        expire: { type: Value.UNQUOTED, cardinality: [0, 1] },
                        skill: { type: Value.UNQUOTED },
                        attack_skill: { type: Value.UNQUOTED },
                        defense_skill: { type: Value.UNQUOTED },
                        planning_skill: { type: Value.UNQUOTED },
                        logistics_skill: { type: Value.UNQUOTED },
                        enum: { type: Value.UNQUOTED, cardinality: [0, 1] },
                        name: { type: Value.UNQUOTED, cardinality: [0, 1] },
                        traits: { cardinality: [0, "inf"] },
                        visible: {
                          cardinality: [0, 1],
                          provide: { context: Context.TRIGGER, scope: Scope.COUNTRY },
                        },
                      },
                    },
                  },
                },
                field_marshal: {
                  cardinality: [0, 1],
                  children: {
                    field_marshal: {
                      children: {
                        desc: { type: Value.UNQUOTED, cardinality: [0, 1] },
                        expire: { type: Value.UNQUOTED, cardinality: [0, 1] },
                        skill: { type: Value.UNQUOTED },
                        attack_skill: { type: Value.UNQUOTED },
                        defense_skill: { type: Value.UNQUOTED },
                        planning_skill: { type: Value.UNQUOTED },
                        logistics_skill: { type: Value.UNQUOTED },
                        enum: { type: Value.UNQUOTED, cardinality: [0, 1] },
                        traits: { cardinality: [0, "inf"] },
                        visible: {
                          cardinality: [0, 1],
                          provide: { context: Context.TRIGGER, scope: Scope.COUNTRY },
                        },
                      },
                    },
                  },
                },
                navy_leader: {
                  cardinality: [0, 1],
                  children: {
                    navy_leader: {
                      children: {
                        desc: { type: Value.UNQUOTED, cardinality: [0, 1] },
                        expire: { type: Value.UNQUOTED, cardinality: [0, 1] },
                        skill: { type: Value.UNQUOTED },
                        attack_skill: { type: Value.UNQUOTED },
                        defense_skill: { type: Value.UNQUOTED },
                        maneuvering_skill: { type: Value.UNQUOTED },
                        coordination_skill: { type: Value.UNQUOTED },
                        enum: { type: Value.UNQUOTED, cardinality: [0, 1] },
                        name: { type: Value.UNQUOTED, cardinality: [0, 1] },
                        traits: { cardinality: [0, "inf"] },
                        visible: {
                          cardinality: [0, 1],
                          provide: { context: Context.TRIGGER, scope: Scope.COUNTRY },
                        },
                      },
                    },
                  },
                },
                advisor: {
                  cardinality: [0, "inf"],
                  children: {
                    advisor: {
                      children: {
                        slot: { type: Value.UNQUOTED },
                        idea_token: { type: Value.UNQUOTED },
                        name: { type: Value.UNQUOTED, cardinality: [0, 1] },
                        desc: { type: Value.UNQUOTED, cardinality: [0, 1] },
                        allowed: {
                          cardinality: [0, 1],
                          provide: { context: Context.TRIGGER, scope: Scope.COUNTRY },
                        },
                        visible: {
                          cardinality: [0, 1],
                          provide: { context: Context.TRIGGER, scope: Scope.COUNTRY },
                        },
                        available: {
                          cardinality: [0, 1],
                          provide: { context: Context.TRIGGER, scope: Scope.COUNTRY },
                        },
                        traits: { cardinality: [0, "inf"] },
                        research_bonus: {
                          children: {
                            enum: { type: Value.UNQUOTED, cardinality: [1, "inf"] },
                          },
                        },
                        ledger: { type: Value.UNQUOTED, cardinality: [0, 1] },
                        cost: { type: Value.UNQUOTED, cardinality: [0, 1] },
                        removal_cost: { type: Value.UNQUOTED, cardinality: [0, 1] },
                        ai_will_do: {
                          provide: { context: Context.MODIFIER_RULE, scope: Scope.COUNTRY },
                          cardinality: [0, 1],
                        },
                        on_add: {
                          provide: { context: Context.EFFECT, scope: Scope.COUNTRY },
                          cardinality: [0, "inf"],
                        },
                        on_remove: {
                          provide: { context: Context.EFFECT, scope: Scope.COUNTRY },
                          cardinality: [0, "inf"],
                        },
                        do_effect: {
                          cardinality: [0, 1],
                          provide: { context: Context.TRIGGER, scope: Scope.COUNTRY },
                        },
                        modifier: {
                          cardinality: [0, 1],
                          provide: { context: Context.MODIFIER, scope: Scope.COUNTRY },
                        },
                        can_be_fired: { type: Value.BOOL, cardinality: [0, 1] },
                      },
                    },
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

const enums: Rule = {
  children: {
    enum: {
      children: {
        character_ids: {
          children: {
            id: {},
            legacy_id: {},
          },
        },
        character_portrait_types: {
          children: {
            civilian: {},
            army: {},
            navy: {},
          },
        },
        character_portrait_sizes: {
          children: {
            large: {},
            small: {},
          },
        },
      },
    },
  },
};