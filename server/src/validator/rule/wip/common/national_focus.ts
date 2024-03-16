const types: Rule = {
  children: {
    type: [
      {
        context: Context.FOCUS_STYLE,
        children: {
          path: { type: Value.UNQUOTED },
          name_field: { type: Value.UNQUOTED },
          unique: { type: Value.YES },
        },
      },
      {
        context: Context.FOCUS_TREE,
        children: {
          path: { type: Value.UNQUOTED },
          name_field: { type: Value.UNQUOTED },
          unique: { type: Value.YES },
        },
      },
      {
        context: Context.CONTINUOUS_FOCUS_PALETTE,
        children: {
          path: { type: Value.UNQUOTED },
          name_field: { type: Value.UNQUOTED },
          unique: { type: Value.YES },
        },
      },
      {
        context: Context.FOCUS,
        children: {
          path: { type: Value.UNQUOTED },
          skip_root_key: { type: Value.UNQUOTED },
          name_field: { type: Value.UNQUOTED },
          unique: { type: Value.YES },
        },
      },
      {
        context: Context.CONTINUOUS_FOCUS,
        children: {
          path: { type: Value.UNQUOTED },
          skip_root_key: { type: Value.UNQUOTED },
          name_field: { type: Value.UNQUOTED },
          unique: { type: Value.YES },
        },
      },
      {
        context: ["JOINT_FOCUS", "SHARED_FOCUS"],
        children: {
          path: { type: Value.UNQUOTED },
          name_field: { type: Value.UNQUOTED },
          unique: { type: Value.YES },
          subtype: [
            {
              context: Context.SHARED_FOCUS,
              children: {},
            },
            {
              context: Context.JOINT_FOCUS,
              children: {},
            },
          ],
        },
      },
    ],
  },
};

const focus_tree: Rule = {
  children: {
    id: { type: Value.UNQUOTED },
    country: {
      children: {
        enum: { type: Value.FLOAT, cardinality: [0, 1] },
        modifier_rule: {
          provide: { context: Context.MODIFIER_RULE, scope: Scope.COUNTRY },
        },
      },
    },
    default: { type: Value.BOOL, cardinality: [0, 1] },
    reset_on_civilwar: { type: Value.BOOL, cardinality: [0, 1] },
    shared_focus: { type: Value.UNQUOTED, cardinality: [0, "inf"] },
    continuous_focus_position: {
      children: {
        x: { type: Value.INT, cardinality: [0, 1] },
        y: { type: Value.INT, cardinality: [0, 1] },
      },
    },
    initial_show_position: {
      cardinality: [0, 1],
      children: {
        focus: { type: Value.UNQUOTED, cardinality: [0, "inf"] }, // Adjusted for multiple focus references
        x: { type: Value.INT, cardinality: [0, 1] },
        y: { type: Value.INT, cardinality: [0, 1] },
        offset: {
          children: {
            x: { type: Value.INT, cardinality: [0, 1] },
            y: { type: Value.INT, cardinality: [0, 1] },
            trigger: {
              provide: { context: Context.TRIGGER, scope: Scope.COUNTRY },
            },
          },
          cardinality: [0, "inf"],
        },
      },
    },
    focus: {
      children: {
        id: { type: Value.UNQUOTED },
        text: { type: Value.UNQUOTED, cardinality: [0, 1] },
        icon: {
          type: Value.UNQUOTED,
          cardinality: [0, "inf"],
        },
        text_icon: { type: Value.UNQUOTED, cardinality: [0, 1] },
        cost: { type: Value.FLOAT },
        x: { type: Value.FLOAT },
        y: { type: Value.FLOAT },
        offset: {
          children: {
            x: { type: Value.INT, cardinality: [0, 1] },
            y: { type: Value.INT, cardinality: [0, 1] },
            trigger: {
              provide: { context: Context.TRIGGER, scope: Scope.COUNTRY },
            },
          },
          cardinality: [0, "inf"],
        },
        relative_position_id: { type: Value.UNQUOTED, cardinality: [0, 1] },
        dynamic: { type: Value.BOOL, cardinality: [0, 1], defaultValue: false },
        available_if_capitulated: { type: Value.BOOL, cardinality: [0, 1], defaultValue: false },
        cancel_if_invalid: { type: Value.BOOL, cardinality: [0, 1], defaultValue: true },
        continue_if_invalid: { type: Value.BOOL, cardinality: [0, 1], defaultValue: false },
        cancelable: { type: Value.BOOL, cardinality: [0, 1], defaultValue: true },
        bypass_if_unavailable: { type: Value.BOOL, cardinality: [0, 1], defaultValue: false },
        will_lead_to_war_with: { type: Value.UNQUOTED, cardinality: [0, "inf"] },
        prerequisite: {
          children: {
            focus: { type: Value.UNQUOTED, cardinality: [0, "inf"] },
          },
          cardinality: [0, "inf"],
        },
        mutually_exclusive: {
          children: {
            focus: { type: Value.UNQUOTED, cardinality: [0, "inf"] },
          },
          cardinality: [0, "inf"],
        },
        bypass: {
          provide: { context: Context.TRIGGER, scope: Scope.COUNTRY },
          cardinality: [0, 1],
        },
        allow_branch: {
          provide: { context: Context.TRIGGER, scope: Scope.COUNTRY },
          cardinality: [0, 1],
        },
        available: {
          provide: { context: Context.TRIGGER, scope: Scope.COUNTRY },
          cardinality: [0, 1],
        },
        cancel: {
          provide: { context: Context.TRIGGER, scope: Scope.COUNTRY },
          cardinality: [0, 1],
        },
        ai_will_do: {
          children: {
            enum: { type: Value.FLOAT, cardinality: [0, 1] },
            modifier_rule: {
              provide: { context: Context.MODIFIER_RULE, scope: Scope.COUNTRY },
            },
          },
          cardinality: [0, 1],
        },
        search_filters: {
          cardinality: [0, 1],
          children: {
            value_set: { type: Value.FOCUS_FILTER, cardinality: [0, "inf"] },
          },
        },
      },
      cardinality: [0, "inf"],
    },
  },
};

const shared_focus: Rule = {
  children: {
    id: { type: Value.UNQUOTED },
    text: { type: Value.UNQUOTED, cardinality: [0, 1] },
    icon: {
      type: Value.UNQUOTED,
      cardinality: [0, "inf"],
    },
    text_icon: { type: Value.UNQUOTED, cardinality: [0, 1] },
    cost: { type: Value.FLOAT },
    x: { type: Value.INT },
    y: { type: Value.INT },
    offset: {
      cardinality: [0, "inf"],
      children: {
        x: { type: Value.INT, cardinality: [0, 1] },
        y: { type: Value.INT, cardinality: [0, 1] },
        trigger: {
          provide: { context: Context.TRIGGER, scope: Scope.COUNTRY },
        },
      },
    },
    relative_position_id: { type: Value.UNQUOTED, cardinality: [0, 1] },
    dynamic: { type: Value.BOOL, cardinality: [0, 1], defaultValue: false },
    available_if_capitulated: { type: Value.BOOL, cardinality: [0, 1], defaultValue: false },
    cancel_if_invalid: { type: Value.BOOL, cardinality: [0, 1], defaultValue: false },
    continue_if_invalid: { type: Value.BOOL, cardinality: [0, 1], defaultValue: false },
    cancelable: { type: Value.BOOL, cardinality: [0, 1], defaultValue: true },
    bypass_if_unavailable: { type: Value.BOOL, cardinality: [0, 1], defaultValue: false },
    will_lead_to_war_with: { type: Value.UNQUOTED, cardinality: [0, "inf"] },
    prerequisite: {
      children: {
        focus: { type: Value.UNQUOTED, cardinality: [0, "inf"] },
      },
      cardinality: [0, "inf"],
    },
    mutually_exclusive: {
      children: {
        focus: { type: Value.UNQUOTED, cardinality: [0, "inf"] },
      },
      cardinality: [0, "inf"],
    },
    bypass: {
      provide: { context: Context.TRIGGER, scope: Scope.COUNTRY },
      cardinality: [0, 1],
    },
    allow_branch: {
      provide: { context: Context.TRIGGER, scope: Scope.COUNTRY },
      cardinality: [0, 1],
    },
    available: {
      provide: { context: Context.TRIGGER, scope: Scope.COUNTRY },
      cardinality: [0, 1],
    },
    cancel: {
      provide: { context: Context.TRIGGER, scope: Scope.COUNTRY },
      cardinality: [0, 1],
    },
    subtype: {
      joint_focus: {
        children: {
          joint_trigger: {
            provide: { context: Context.TRIGGER, scope: Scope.COUNTRY },
          },
          completion_reward_joint_originator: {
            provide: { context: Context.EFFECT, scope: Scope.COUNTRY },
          },
          completion_reward_joint_member: {
            provide: { context: Context.EFFECT, scope: Scope.COUNTRY },
          },
          completion_reward: {
            provide: { context: Context.EFFECT, scope: Scope.COUNTRY },
          },
        },
      },
      shared: {
        children: {
          completion_reward: {
            provide: { context: Context.EFFECT, scope: Scope.COUNTRY },
          },
        },
      },
    },
    ai_will_do: {
      children: {
        enum: { type: Value.FLOAT, cardinality: [0, 1] },
        modifier_rule: {
          provide: { context: Context.MODIFIER_RULE, scope: Scope.COUNTRY },
        },
      },
      cardinality: [0, 1],
    },
    search_filters: {
      cardinality: [0, 1],
      children: {
        value_set: { type: Value.FOCUS_FILTER, cardinality: [0, "inf"] },
      },
    },
  },
};

const continuous_focus_tree: Rule = {
  children: {
    id: { type: Value.UNQUOTED },
    country: {
      children: {
        enum: { type: Value.FLOAT, cardinality: [0, 1] },
        modifier_rule: {
          provide: { context: Context.MODIFIER_RULE, scope: Scope.COUNTRY },
        },
      },
    },
    default: { type: Value.BOOL, cardinality: [0, 1] },
    reset_on_civilwar: { type: Value.BOOL, cardinality: [0, 1] },
    position: {
      children: {
        x: { type: Value.INT, cardinality: [0, 1] },
        y: { type: Value.INT, cardinality: [0, 1] },
      },
    },
    focus: {
      children: {
        id: { type: Value.UNQUOTED },
        icon: {
          type: Value.UNQUOTED,
          cardinality: [0, "inf"],
        },
        daily_cost: { type: Value.FLOAT },
        available_if_capitulated: { type: Value.BOOL, cardinality: [0, 1], defaultValue: false },
        available: {
          provide: { context: Context.TRIGGER, scope: Scope.COUNTRY },
          cardinality: [0, 1],
        },
        enable: {
          provide: { context: Context.TRIGGER, scope: Scope.COUNTRY },
          cardinality: [0, 1],
        },
        supports_ai_strategy: { type: Value.AI_FOCUS },
        modifier: {
          provide: { context: Context.MODIFIER, scope: Scope.COUNTRY },
          cardinality: [0, 1],
        },
        idea: { type: Value.ENUM, cardinality: [0, 1] },
        select_effect: {
          provide: { context: Context.EFFECT, scope: Scope.COUNTRY },
          cardinality: [0, 1],
        },
        cancel_effect: {
          provide: { context: Context.EFFECT, scope: Scope.COUNTRY },
          cardinality: [0, 1],
        },
        ai_will_do: {
          children: {
            enum: { type: Value.FLOAT, cardinality: [0, 1] },
            modifier_rule: {
              provide: { context: Context.MODIFIER_RULE, scope: Scope.COUNTRY },
            },
          },
        },
      },
      cardinality: [0, "inf"],
    },
  },
};

const style: Rule = {
  children: {
    name: { type: Value.UNQUOTED },
    default: { type: Value.BOOL, cardinality: [0, 1], defaultValue: false },
    unavailable: { type: Value.UNQUOTED },
    completed: { type: Value.UNQUOTED },
    available: { type: Value.UNQUOTED },
    current: { type: Value.UNQUOTED },
  },
};