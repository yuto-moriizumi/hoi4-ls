import {
  root,
  obj,
  typeDefKey,
  literal,
  scalar,
  filepath,
  float,
  array,
  typeRef,
  int,
  either,
  enumRef,
  bool,
  enumRefKey,
} from "../utils";

const pdxmesh = obj(
  {},
  {
    name: scalar(),
    file: filepath({}, ""),
    scale: float({ cardinality: [0, 1] }),
    animation: array({ cardinality: [0, Infinity], severity: "warning" }, [
      obj(
        {},
        {
          id: scalar(),
          type: typeRef({}, "model_animation"),
        },
      ),
    ]),
    meshsettings: array({ cardinality: [0, Infinity] }, [
      obj(
        {},
        {
          name: scalar({ cardinality: [0, 1] }),
          index: int({ cardinality: [0, 1] }),
          texture_diffuse: scalar({ cardinality: [0, 1] }),
          texture_normal: scalar({ cardinality: [0, 1] }),
          texture_specular: scalar({ cardinality: [0, 1] }),
          shader: scalar({ cardinality: [0, 1] }),
        },
      ),
    ]),
    cull_distance: float({ cardinality: [0, 1] }),
  },
);

export const pdxmeshType = root(
  { path: "gfx" },
  {
    objectTypes: obj(
      {},
      {
        [typeDefKey("pdxmesh")]: pdxmesh,
      },
    ),
  },
);

const entity = obj(
  {},
  {
    clone: typeRef({ cardinality: [0, 1] }, "entity"),
    name: scalar(),
    pdxmesh: either(
      typeRef({ cardinality: [0, 1], severity: "warning" }, "pdxmesh"),
      literal({ cardinality: [0, 1] }, "empty_mesh"),
    ),
    version: int({ cardinality: [0, 1] }),
    cull_radius: float({ cardinality: [0, 1] }),
    scale: float({ cardinality: [0, 1] }),
    locator: array({ cardinality: [0, Infinity] }, [
      obj(
        {},
        {
          name: scalar(),
          position: array({ cardinality: [3, 3] }, [float()]),
          rotation: array({ cardinality: [0, 1] }, [
            float({ cardinality: [3, 3] }),
          ]),
        },
      ),
    ]),
    default_state: either(
      enumRef({ cardinality: [0, 1] }, "model_states"),
      literal({ cardinality: [0, 1] }, "no_state"),
    ),
    get_state_from_parent: bool({ cardinality: [0, 1] }),
    state: array({ cardinality: [0, Infinity] }, [
      obj(
        {},
        {
          name: scalar(),
          state_time: float({ cardinality: [0, 1] }),
          next_state: enumRef({ cardinality: [0, 1] }, "model_states"),
          animation: enumRef({ cardinality: [0, 1] }, "model_animations"),
          animation_speed: float({ cardinality: [0, 1] }),
          animation_blend_time: float({ cardinality: [0, 1] }),
          looping: bool({ cardinality: [0, 1] }),
          chance: float({ cardinality: [0, 1] }),
          time_offset: array({ cardinality: [0, 1] }, [
            float({ cardinality: [2, 2] }),
          ]),
          propagate_state: array({ cardinality: [0, Infinity] }, [
            obj(
              {},
              {
                [enumRefKey("model_attachments")]: enumRef({}, "model_states"),
              },
            ),
          ]),
          game_data: obj(
            { cardinality: [0, 1] },
            {
              hitmiss_effect: array({ cardinality: [0, Infinity] }, [
                obj(
                  {},
                  {
                    time: float(),
                    type: enumRef({}, "hitmiss_effect_types"),
                  },
                ),
              ]),
            },
          ),
          event: array({ cardinality: [0, Infinity] }, [
            obj(
              {},
              {
                id: enumRef({ cardinality: [0, 1] }, "entity_state_event_ids"),
                trigger_once: bool({ cardinality: [0, 1] }),
                node: scalar({ cardinality: [0, 1] }),
                entity: typeRef({ cardinality: [0, 1] }, "entity"),
                life: float({ cardinality: [0, 1] }),
                time: float({ cardinality: [0, 1] }),
                particle: typeRef({ cardinality: [0, 1] }, "pdxparticle"),
                keep_particle: bool({ cardinality: [0, 1] }),
                sound: obj(
                  { cardinality: [0, 1] },
                  {
                    soundeffect: scalar(),
                  },
                ),
                light: typeRef({ cardinality: [0, 1] }, "light"),
              },
            ),
          ]),
        },
      ),
    ]),
    attach: array({ cardinality: [0, Infinity] }, [
      obj(
        {},
        {
          name: scalar(),
          scalar: array({ cardinality: [2, 2] }, [typeRef({}, "entity")]),
        },
      ),
    ]),
    game_data: obj(
      { cardinality: [0, 1] },
      {
        texture_anim_speed: float(),
      },
    ),
  },
);

export const entityType = root(
  { path: "gfx" },
  {
    objectTypes: obj(
      {},
      {
        [typeDefKey("entity")]: entity,
      },
    ),
  },
);

const model_animation = obj(
  {},
  {
    name: scalar(),
    file: scalar(),
  },
);

export const modelAnimationType = root(
  { path: "gfx" },
  {
    objectTypes: obj(
      {},
      {
        [typeDefKey("model_animation")]: model_animation,
      },
    ),
  },
);

export const hitmiss_effect_types = ["big", "small"];

export const entity_state_event_ids = [
  "a_1_bomb",
  "a_1_crash",
  "a_1_fire",
  "a_1_firebomb",
  "a_1_idle",
  "a_1_supply",
  "a_2_bomb",
  "a_2_crash",
  "a_2_fire",
  "a_2_firebomb",
  "a_2_idle",
  "a_2_supply",
  "a_3_bomb",
  "a_3_crash",
  "a_3_fire",
  "a_3_firebomb",
  "a_3_idle",
  "a_3_supply",
  "a_bomb",
  "a_crash",
  "a_explode",
  "a_fire",
  "a_firebomb",
  "a_idle",
  "a_supply",
  "d_1_crash",
  "d_1_fire",
  "d_1_idle",
  "d_2_crash",
  "d_2_fire",
  "d_2_idle",
  "d_3_crash",
  "d_3_fire",
  "d_3_idle",
  "d_bomb",
  "d_crash",
  "d_fire",
  "d_idle",
];
