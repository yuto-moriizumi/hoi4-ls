const types: Rule = {
  children: {
    "type[scripted_trigger]": {
      children: {
        path: { type: Value.UNQUOTED },
        unique: { type: Value.BOOL },
      },
    },
    "type[scripted_effect]": {
      children: {
        path: { type: Value.UNQUOTED },
        unique: { type: Value.BOOL },
      },
    },
    "type[scripted_loc]": {
      children: {
        name_field: { type: Value.UNQUOTED },
        unique: { type: Value.BOOL },
        path: { type: Value.UNQUOTED },
      },
    },
  },
};

const scripted_trigger: Rule = {
  children: {
    trigger: {
      provide: { context: Context.TRIGGER, scope: Scope.SCRIPTED_TRIGGER },
    },
  },
};

const scripted_effect: Rule = {
  children: {
    effect: {
      provide: { context: Context.EFFECT, scope: Scope.SCRIPTED_EFFECT },
    },
  },
};

const scripted_loc: Rule = {
  children: {
    name: { type: Value.UNQUOTED, cardinality: [0, "inf"] },
    text: {
      children: {
        trigger: {
          provide: { context: Context.TRIGGER, scope: Scope.SCRIPTED_LOC },
          cardinality: [0, 1],
        },
        localization_key: [
          { type: Value.UNQUOTED, cardinality: [0, 1] },
          { type: Value.UNQUOTED, cardinality: [0, 1] },
        ],
        random_list: {
          children: {
            int: {
              children: {
                modifier_rule: {
                  provide: { context: Context.MODIFIER_RULE, scope: Scope.RANDOM_LIST },
                },
                localization_key: [
                  { type: Value.UNQUOTED },
                  { type: Value.UNQUOTED },
                ],
              },
              cardinality: [1, "inf"],
            },
          },
          cardinality: [0, 1],
        },
      },
    },
  },
};