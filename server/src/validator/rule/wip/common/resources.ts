const types: Rule = {
  children: {
    type: {
      provide: { context: Context.RESOURCE, scope: Scope.GAME },
    },
  },
};

const resource: Rule = {
  children: {
    icon_frame: { type: Value.UNQUOTED },
    cic: { type: Value.UNQUOTED },
    convoys: { type: Value.UNQUOTED },
  },
};