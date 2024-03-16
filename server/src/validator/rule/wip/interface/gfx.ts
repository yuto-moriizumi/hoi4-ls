const types: Rule = {
  children: {
    type: {
      provide: { context: Context.SPRITETYPE, scope: Scope.GLOBAL },
      children: {
        path: {
          type: Value.UNQUOTED,
          cardinality: [0, "inf"],
        },
        skip_root_key: {
          type: Value.UNQUOTED,
        },
        path_extension: {
          type: Value.UNQUOTED,
        },
        name_field: {
          type: Value.UNQUOTED,
        },
        subtype: {
          children: {},
        },
      },
    },
  },
};

const spriteType: Rule = {
  children: {
    name: {
      type: Value.UNQUOTED,
      cardinality: [0, 1],
    },
    effectFile: {
      type: Value.UNQUOTED,
      cardinality: [0, 1],
    },
    noOfFrames: {
      type: Value.INT,
      cardinality: [0, 1],
    },
    animation_rate_fps: {
      type: Value.FLOAT,
      cardinality: [0, 1],
    },
    looping: {
      type: Value.BOOL,
      cardinality: [0, 1],
    },
    play_on_show: {
      type: Value.BOOL,
      cardinality: [0, 1],
    },
    animation: {
      children: {
        animationmaskfile: {
          type: Value.UNQUOTED,
          cardinality: [0, 1],
        },
        animationtexturefile: {
          type: Value.UNQUOTED,
          cardinality: [0, 1],
        },
        animationrotation: {
          type: Value.FLOAT,
          cardinality: [0, 1],
        },
        animationlooping: {
          type: Value.BOOL,
          cardinality: [0, 1],
        },
        animationtime: {
          type: Value.FLOAT,
          cardinality: [0, 1],
        },
        animationdelay: {
          type: Value.FLOAT,
          cardinality: [0, 1],
        },
        animationtype: {
          type: Value.UNQUOTED,
          cardinality: [0, 1],
        },
        animationblendmode: {
          type: Value.UNQUOTED,
          cardinality: [0, 1],
        },
        animationrotationoffset: {
          children: {
            x: { type: Value.FLOAT },
            y: { type: Value.FLOAT },
          },
          cardinality: [0, 1],
        },
        animationtexturescale: {
          children: {
            x: { type: Value.FLOAT },
            y: { type: Value.FLOAT },
          },
          cardinality: [0, 1],
        },
        animationframes: {
          type: Value.INT,
          cardinality: [1, "inf"],
        },
      },
      cardinality: [0, "inf"],
    },
    loadType: {
      type: Value.UNQUOTED,
      cardinality: [0, 1],
    },
    transparencecheck: {
      type: Value.BOOL,
      cardinality: [0, 1],
    },
    legacy_lazy_load: {
      type: Value.BOOL,
      cardinality: [0, 1],
    },
    pause_on_loop: {
      type: Value.FLOAT,
      cardinality: [0, 1],
    },
    alwaystransparent: {
      type: Value.BOOL,
      cardinality: [0, 1],
    },
    generate_mip_maps: {
      type: Value.BOOL,
      cardinality: [0, 1],
    },
    subtype: {
      children: {
        provide: { context: Context.DLC_PATH_TEXTUREFILE, scope: Scope.SPRITETYPE },
      },
    },
  },
};