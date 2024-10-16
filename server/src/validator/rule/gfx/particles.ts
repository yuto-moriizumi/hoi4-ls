import {
  root,
  obj,
  typeDefKey,
  scalar,
  typeRef,
  float,
  int,
  enumRef,
  bool,
  filepath,
  array,
  either,
} from "../utils";

const pdxparticle = obj(
  {},
  {
    name: scalar(),
    type: typeRef({}, "particle"),
    scale: float({ cardinality: [0, 1] }),
  },
);

export const pdxparticleType = root(
  { path: "game/gfx/particles" },
  {
    objectTypes: obj(
      {},
      {
        [typeDefKey("pdxparticle")]: pdxparticle,
      },
    ),
  },
);

const subsystem_color = {
  color: obj(
    { cardinality: [0, Infinity] },
    {
      r: array({ cardinality: [0, 1] }, [float({}, 0.0, 255.0)]),
      g: array({ cardinality: [0, 1] }, [float({}, 0.0, 255.0)]),
      b: array({ cardinality: [0, 1] }, [float({}, 0.0, 255.0)]),
      alpha: either(
        array({ cardinality: [0, 1] }, [float({}, 0.0, 255.0)]),
        scalar({ cardinality: [0, 2] }),
      ),
      x: either(
        scalar({ cardinality: [0, 1] }),
        array({ cardinality: [0, Infinity] }, [scalar()]),
      ),
      y: either(
        scalar({ cardinality: [0, 1] }),
        array({ cardinality: [0, Infinity] }, [scalar()]),
      ),
      z: either(
        scalar({ cardinality: [0, 1] }),
        array({ cardinality: [0, Infinity] }, [scalar()]),
      ),
    },
  ),
};

const emission = either(
  float(),
  scalar(),
  array({ cardinality: [1, 2] }, [float()]),
);

const particle = obj(
  {},
  {
    name: scalar(),
    subsystem: obj(
      { cardinality: [1, Infinity] },
      {
        name: scalar({ cardinality: [0, 1] }),
        max_amount: int({ cardinality: [0, 1] }),
        slave_particles: int({ cardinality: [0, 1] }),
        emitter_type: enumRef({ cardinality: [0, 1] }, "emitter_type"),
        invert: bool({ cardinality: [0, 1] }),
        trail: bool({ cardinality: [0, 1] }),
        local_space: bool({ cardinality: [0, 1] }),
        billboard: bool({ cardinality: [0, 1] }),
        hide: bool({ cardinality: [0, 1] }),
        texture: obj(
          { cardinality: [0, 1] },
          {
            file: filepath({}, ""),
            shader: scalar(),
            x: int({ cardinality: [0, 1] }),
            y: int({ cardinality: [0, 1] }),
          },
        ),
        ...subsystem_color,
        position: obj(
          { cardinality: [0, 1] },
          {
            x: float({ cardinality: [0, 1] }),
            y: float({ cardinality: [0, 1] }),
            z: float({ cardinality: [0, 1] }),
          },
        ),
        duration: float(),
        life: either(array({ cardinality: [1, 2] }, [float()]), float()),
        emission,
        size: either(
          array({ cardinality: [1, 2] }, [scalar()]),
          float(),
          scalar(),
        ),
        rotation: either(
          float({ cardinality: [0, 1] }),
          scalar({ cardinality: [0, 1] }),
          array({ cardinality: [1, 2] }, [scalar()]),
        ),
        rotation_speed_roll: array({ cardinality: [2, 2] }, [float()]),
        sort: enumRef({ cardinality: [0, 1] }, "sort_type"),
        rotation_speed: either(
          float({ cardinality: [0, 1] }),
          array({ cardinality: [2, 2] }, [float()]),
        ),
        rotation_speed_yaw: either(
          float({ cardinality: [0, 1] }),
          array({ cardinality: [2, 2] }, [float()]),
        ),
        rotation_speed_pitch: either(
          float({ cardinality: [0, 1] }),
          array({ cardinality: [2, 2] }, [float()]),
        ),
        sphere_emitter_radius: either(
          float({ cardinality: [0, 1] }),
          array({ cardinality: [2, 2] }, [scalar()]),
        ),
        sphere_emitter_yaw: either(
          float({ cardinality: [0, 1] }),
          array({ cardinality: [2, 2] }, [float()]),
        ),
        sphere_emitter_pitch: either(
          float({ cardinality: [0, 1] }),
          array({ cardinality: [2, 2] }, [float()]),
        ),
        start: either(
          float({ cardinality: [0, 1] }),
          array({ cardinality: [1, 2] }, [float()]),
        ),
        box_emitter_x: either(
          float({ cardinality: [0, 1] }),
          scalar({ cardinality: [0, 1] }),
          array({ cardinality: [2, 2] }, [float()]),
        ),
        box_emitter_y: either(
          float({ cardinality: [0, 1] }),
          scalar({ cardinality: [0, 1] }),
          array({ cardinality: [2, 2] }, [float()]),
        ),
        box_emitter_z: either(
          float({ cardinality: [0, 1] }),
          scalar({ cardinality: [0, 1] }),
          array({ cardinality: [2, 2] }, [float()]),
        ),
        velocity: either(
          scalar({ cardinality: [0, 1] }),
          array({ cardinality: [1, Infinity] }, [scalar()]),
        ),
        velocity_pitch: either(
          float({ cardinality: [0, 1] }),
          array({ cardinality: [2, 2] }, [float()]),
        ),
        velocity_yaw: either(
          float({ cardinality: [0, 1] }),
          array({ cardinality: [2, 2] }, [float()]),
        ),
        emitter_pitch: either(
          scalar({ cardinality: [0, 1] }),
          array({ cardinality: [1, Infinity] }, [scalar()]),
        ),
        emitter_yaw: either(
          scalar({ cardinality: [0, 1] }),
          array({ cardinality: [1, Infinity] }, [scalar()]),
        ),
        emission_pulse_duration: float({ cardinality: [0, 1] }),
        emission_pulse_silence: float({ cardinality: [0, 1] }),
        particle_pitch: either(
          float({ cardinality: [0, 1] }),
          array({ cardinality: [2, 2] }, [float()]),
        ),
        particle_yaw: either(
          float({ cardinality: [0, 1] }),
          array({ cardinality: [2, 2] }, [float()]),
        ),
        particle_roll: array({ cardinality: [2, 2] }, [float()]),
        force: scalar({ cardinality: [0, 1] }),
        mass: either(
          float({ cardinality: [0, 1] }),
          array({ cardinality: [0, Infinity] }, [float()]),
        ),
        childsystem: obj(
          { cardinality: [0, 1] },
          {
            name: scalar({ cardinality: [0, 1] }),
            max_amount: int({ cardinality: [0, 1] }),
            slave_particles: int({ cardinality: [0, 1] }),
            emitter_type: enumRef({ cardinality: [0, 1] }, "emitter_type"),
            invert: bool({ cardinality: [0, 1] }),
            trail: bool({ cardinality: [0, 1] }),
            local_space: bool({ cardinality: [0, 1] }),
            billboard: bool({ cardinality: [0, 1] }),
            hide: bool({ cardinality: [0, 1] }),
            texture: obj(
              { cardinality: [0, 1] },
              {
                file: filepath({}, ""),
                shader: scalar(),
                x: int({ cardinality: [0, 1] }),
                y: int({ cardinality: [0, 1] }),
              },
            ),
            ...subsystem_color,
            position: obj(
              { cardinality: [0, 1] },
              {
                x: float({ cardinality: [0, 1] }),
                y: float({ cardinality: [0, 1] }),
                z: float({ cardinality: [0, 1] }),
              },
            ),
            duration: float(),
            life: either(array({ cardinality: [1, 2] }, [float()]), float()),
            emission,
            size: either(array({ cardinality: [1, 2] }, [scalar()]), float()),
            rotation: either(
              float({ cardinality: [0, 1] }),
              array({ cardinality: [1, 2] }, [scalar()]),
            ),
            rotation_speed_roll: array({ cardinality: [2, 2] }, [float()]),
            sort: enumRef({ cardinality: [0, 1] }, "sort_type"),
            rotation_speed: either(
              float({ cardinality: [0, 1] }),
              array({ cardinality: [2, 2] }, [float()]),
            ),
            rotation_speed_yaw: either(
              float({ cardinality: [0, 1] }),
              array({ cardinality: [2, 2] }, [float()]),
            ),
            rotation_speed_pitch: either(
              float({ cardinality: [0, 1] }),
              array({ cardinality: [2, 2] }, [float()]),
            ),
            sphere_emitter_radius: either(
              float({ cardinality: [0, 1] }),
              array({ cardinality: [2, 2] }, [scalar()]),
            ),
            sphere_emitter_yaw: either(
              float({ cardinality: [0, 1] }),
              array({ cardinality: [2, 2] }, [float()]),
            ),
            sphere_emitter_pitch: either(
              float({ cardinality: [0, 1] }),
              array({ cardinality: [2, 2] }, [float()]),
            ),
            start: either(
              float({ cardinality: [0, 1] }),
              array({ cardinality: [1, 2] }, [float()]),
            ),
            box_emitter_x: either(
              float({ cardinality: [0, 1] }),
              scalar({ cardinality: [0, 1] }),
              array({ cardinality: [2, 2] }, [float()]),
            ),
            box_emitter_y: either(
              float({ cardinality: [0, 1] }),
              scalar({ cardinality: [0, 1] }),
              array({ cardinality: [2, 2] }, [float()]),
            ),
            box_emitter_z: either(
              float({ cardinality: [0, 1] }),
              scalar({ cardinality: [0, 1] }),
              array({ cardinality: [2, 2] }, [float()]),
            ),
            velocity: either(
              scalar({ cardinality: [0, 1] }),
              array({ cardinality: [1, Infinity] }, [scalar()]),
            ),
            velocity_pitch: either(
              float({ cardinality: [0, 1] }),
              array({ cardinality: [2, 2] }, [float()]),
            ),
            velocity_yaw: either(
              float({ cardinality: [0, 1] }),
              array({ cardinality: [2, 2] }, [float()]),
            ),
            emitter_pitch: either(
              scalar({ cardinality: [0, 1] }),
              array({ cardinality: [1, Infinity] }, [scalar()]),
            ),
            emitter_yaw: either(
              scalar({ cardinality: [0, 1] }),
              array({ cardinality: [1, Infinity] }, [scalar()]),
            ),
            emission_pulse_duration: float({ cardinality: [0, 1] }),
            emission_pulse_silence: float({ cardinality: [0, 1] }),
            particle_pitch: either(
              float({ cardinality: [0, 1] }),
              array({ cardinality: [2, 2] }, [float()]),
            ),
            particle_yaw: either(
              float({ cardinality: [0, 1] }),
              array({ cardinality: [2, 2] }, [float()]),
            ),
            particle_roll: array({ cardinality: [2, 2] }, [float()]),
            force: scalar({ cardinality: [0, 1] }),
          },
        ),
      },
    ),
    animation: obj(
      { cardinality: [0, Infinity] },
      {
        name: scalar(),
        start: float(),
        duration: float(),
        repeat: bool({ cardinality: [0, 1] }),
        minValue: float(),
        maxValue: float(),
        curve: array({ cardinality: [4, Infinity] }, [float()]),
        op: enumRef({}, "animation_op"),
        time: enumRef({}, "animation_life"),
      },
    ),
    force: obj(
      { cardinality: [0, Infinity] },
      {
        name: scalar(),
        type: enumRef({}, "force_type"),
        position: array({ cardinality: [3, 3] }, [float()]),
        direction: array({ cardinality: [3, 3] }, [float()]),
        local_force: bool({ cardinality: [0, 1] }),
        yaw: float({ cardinality: [0, 1] }),
        division: int({ cardinality: [0, 1] }),
        amount: either(
          float({ cardinality: [0, 1] }),
          array({}, [float()]),
          scalar({ cardinality: [0, 1] }),
        ),
      },
    ),
  },
);

export const particleType = root(
  { path: "game/gfx/particles" },
  {
    [typeDefKey("particle")]: particle,
  },
);

export const emitter_type = ["point", "sphere", "box"];
export const animation_life = ["life", "life_abs", "system", "spawn"];
export const force_type = [
  "friction",
  "planar",
  "point",
  "spin",
  "turbulence",
  "vortex",
];
export const sort_type = ["depth", "age", "distance"];
