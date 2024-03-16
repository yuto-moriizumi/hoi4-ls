const types: Rule = {
  children: {
    type: {
      type: Value.UNQUOTED,
      children: {
        skip_root_key: { type: Value.UNQUOTED },
        path: { type: Value.UNQUOTED, cardinality: [0, "inf"] },
        path_extension: { type: Value.UNQUOTED },
        name_field: { type: Value.UNQUOTED },
      },
    },
  },
};

const pdxmesh: Rule = {
  children: {
    name: { type: Value.UNQUOTED },
    provide: { context: Context.DLC_PATH_FILE, scope: Scope.PDXMESH },
    scale: { type: Value.FLOAT, cardinality: [0, 1] },
    animation: {
      type: Value.UNQUOTED,
      cardinality: [0, "inf"],
      children: {
        id: { type: Value.UNQUOTED },
        type: { type: Value.UNQUOTED },
      },
    },
    meshsettings: {
      type: Value.UNQUOTED,
      cardinality: [0, "inf"],
      children: {
        name: { type: Value.UNQUOTED, cardinality: [0, 1] },
        index: { type: Value.INT, cardinality: [0, 1] },
        texture_diffuse: { type: Value.UNQUOTED, cardinality: [0, 1] },
        texture_normal: { type: Value.UNQUOTED, cardinality: [0, 1] },
        texture_specular: { type: Value.UNQUOTED, cardinality: [0, 1] },
        shader: { type: Value.UNQUOTED, cardinality: [0, 1] },
      },
    },
    cull_distance: { type: Value.FLOAT, cardinality: [0, 1] },
  },
};

const entity: Rule = {
  children: {
    clone: { type: Value.UNQUOTED, cardinality: [0, 1] },
    name: { type: Value.UNQUOTED },
    pdxmesh: { type: Value.UNQUOTED, cardinality: [0, 1], defaultValue: "empty_mesh" },
    version: { type: Value.INT, cardinality: [0, 1] },
    cull_radius: { type: Value.FLOAT, cardinality: [0, 1] },
    scale: { type: Value.FLOAT, cardinality: [0, 1] },
    locator: {
      type: Value.UNQUOTED,
      cardinality: [0, "inf"],
      children: {
        name: { type: Value.UNQUOTED },
        position: { type: Value.FLOAT, cardinality: [3, 3] },
        rotation: { type: Value.FLOAT, cardinality: [3, 3], cardinality: [0, 1] },
      },
    },
    default_state: { type: Value.ENUM, cardinality: [0, 1], defaultValue: "no_state" },
    get_state_from_parent: { type: Value.BOOL, cardinality: [0, 1] },
    state: {
      type: Value.UNQUOTED,
      cardinality: [0, "inf"],
      children: {
        name: { type: Value.UNQUOTED },
        state_time: { type: Value.FLOAT, cardinality: [0, 1] },
        next_state: { type: Value.ENUM, cardinality: [0, 1] },
        animation: { type: Value.ENUM, cardinality: [0, 1] },
        animation_speed: { type: Value.FLOAT, cardinality: [0, 1] },
        animation_blend_time: { type: Value.FLOAT, cardinality: [0, 1] },
        looping: { type: Value.BOOL, cardinality: [0, 1] },
        chance: { type: Value.FLOAT, cardinality: [0, 1] },
        time_offset: { type: Value.FLOAT, cardinality: [2, 2] },
        propagate_state: {
          type: Value.ENUM,
          cardinality: [0, "inf"],
        },
        game_data: {
          type: Value.UNQUOTED,
          cardinality: [0, "inf"],
          children: {
            hitmiss_effect: {
              type: Value.UNQUOTED,
              cardinality: [0, "inf"],
              children: {
                time: { type: Value.FLOAT },
                type: { type: Value.ENUM },
              },
            },
          },
        },
        event: {
          type: Value.UNQUOTED,
          cardinality: [0, "inf"],
          children: {
            id: { type: Value.ENUM, cardinality: [0, 1] },
            trigger_once: { type: Value.BOOL, cardinality: [0, 1] },
            node: { type: Value.UNQUOTED, cardinality: [0, 1] },
            entity: { type: Value.UNQUOTED, cardinality: [0, 1] },
            life: { type: Value.FLOAT, cardinality: [0, 1] },
            time: { type: Value.FLOAT, cardinality: [0, 1] },
            particle: { type: Value.UNQUOTED, cardinality: [0, 1] },
            keep_particle: { type: Value.BOOL, cardinality: [0, 1] },
            sound: {
              type: Value.UNQUOTED,
              children: {
                soundeffect: { type: Value.UNQUOTED },
              },
            },
            light: { type: Value.UNQUOTED, cardinality: [0, 1] },
          },
        },
      },
    },
    attach: {
      type: Value.UNQUOTED,
      cardinality: [0, "inf"],
      children: {
        name: { type: Value.UNQUOTED },
        scalar: { type: Value.UNQUOTED, cardinality: [2, 2] },
      },
    },
    game_data: {
      type: Value.UNQUOTED,
      children: {
        texture_anim_speed: { type: Value.FLOAT, cardinality: [0, 1] },
      },
    },
  },
};

const model_animation: Rule = {
  children: {
    name: { type: Value.UNQUOTED },
    file: { type: Value.UNQUOTED },
  },
};

const enums: Rule = {
  children: {
    hitmiss_effect_types: {
      type: Value.UNQUOTED,
      cardinality: [0, "inf"],
    },
    entity_state_event_ids: {
      type: Value.UNQUOTED,
      cardinality: [0, "inf"],
    },
    model_animations: {
      path: "gfx",
      start_from_root: true,
      name: "objectTypes/pdxmesh/animation/id",
    },
    model_states: {
      path: "gfx",
      start_from_root: true,
      name: "entity/state/name",
    },
    model_locators: {
      path: "gfx",
      start_from_root: true,
      name: "entity/locator/name",
    },
    model_attachments: {
      path: "gfx",
      start_from_root: true,
      name: "entity/attach/name",
    },
  },
};