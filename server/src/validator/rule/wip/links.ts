const links: Rule = {
  children: {
    owner: {
      children: {
        output_scope: { type: Value.UNQUOTED },
        input_scopes: {
          type: Value.UNQUOTED,
          cardinality: [0, "inf"],
        },
      },
    },
    controller: {
      children: {
        output_scope: { type: Value.UNQUOTED },
        input_scopes: { type: Value.UNQUOTED },
      },
    },
    capital_scope: {
      children: {
        output_scope: { type: Value.UNQUOTED },
        input_scopes: { type: Value.UNQUOTED },
      },
    },
    capital: {
      children: {
        output_scope: { type: Value.UNQUOTED },
        input_scopes: { type: Value.UNQUOTED },
      },
    },
    global: {
      children: {
        output_scope: { type: Value.UNQUOTED },
        input_scopes: { type: Value.UNQUOTED },
      },
    },
    state: {
      children: {
        output_scope: { type: Value.UNQUOTED },
        from_data: { type: Value.BOOL },
        data_source: { type: Value.UNQUOTED },
      },
    },
    country: {
      children: {
        output_scope: { type: Value.UNQUOTED },
        from_data: { type: Value.BOOL },
        data_source: { type: Value.UNQUOTED },
      },
    },
    character: {
      children: {
        output_scope: { type: Value.UNQUOTED },
        input_scopes:  { type: Value.UNQUOTED },
        from_data: { type: Value.BOOL },
        data_source: { type: Value.UNQUOTED },
      },
    },
    var: {
      children: {
        from_data: { type: Value.BOOL },
        type: { type: Value.UNQUOTED },
        prefix: { type: Value.UNQUOTED },
        data_source: { type: Value.UNQUOTED },
      },
    },
    temp_var: {
      children: {
        from_data: { type: Value.BOOL },
        type: { type: Value.UNQUOTED },
        prefix: { type: Value.UNQUOTED },
        data_source: { type: Value.UNQUOTED },
      },
    },
    event_target: {
      children: {
        desc: { type: Value.UNQUOTED },
        from_data: { type: Value.BOOL },
        type: { type: Value.UNQUOTED },
        prefix: { type: Value.UNQUOTED },
        data_source: { type: Value.UNQUOTED },
      },
    },
    global_event_target: {
      children: {
        desc: { type: Value.UNQUOTED },
        from_data: { type: Value.BOOL },
        type: { type: Value.UNQUOTED },
        prefix: { type: Value.UNQUOTED },
        data_source: { type: Value.UNQUOTED },
      },
    },
    token: {
      children: {
        desc: { type: Value.UNQUOTED },
        from_data: { type: Value.BOOL },
        type: { type: Value.UNQUOTED },
        prefix: { type: Value.UNQUOTED },
        data: [
          { type: Value.UNQUOTED },
          { type: Value.UNQUOTED },
          { type: Value.UNQUOTED },
          { type: Value.UNQUOTED },
          { type: Value.UNQUOTED },
        ],
      },
    },
    mio: {
      children: {
        prefix: { type: Value.UNQUOTED },
        output_scope: { type: Value.UNQUOTED },
        input_scopes: { type: Value.UNQUOTED },
        from_data: { type: Value.BOOL },
        data_source: { type: Value.UNQUOTED },
      },
    },
  },
};