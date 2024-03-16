const types: Rule = {
  children: {
    type: {
      cardinality: [0, "inf"],
      children: {
        name_field: { type: Value.UNQUOTED },
        path: [
          { value: "game/gfx/particles" },
          { value: "game/gfx/entities" },
          { value: "game/gfx/models" },
          { value: "game/gfx/particles" },
          { value: "game/gfx/particles/environment" },
          { value: "game/gfx/particles/infantry" },
          { value: "game/gfx/particles/vehicles" },
          { value: "game/gfx/entities" },
          { value: "game/gfx/models" },
        ],
        skip_root_key: { type: Value.UNQUOTED },
      },
    },
  },
};

const pdxparticle: Rule = {
  children: {
    name: { type: Value.UNQUOTED },
    type: { type: Value.UNQUOTED },
    scale: { type: Value.UNQUOTED, cardinality: [0, 1] },
  },
};

const particle: Rule = {
  children: {
    name: { type: Value.UNQUOTED },
    subsystem: {
      cardinality: [1, "inf"],
      children: {
        name: { type: Value.UNQUOTED, cardinality: [0, 1] },
        max_amount: { type: Value.UNQUOTED, cardinality: [0, 1] },
        slave_particles: { type: Value.UNQUOTED, cardinality: [0, 1] },
        emitter_type: { type: Value.UNQUOTED, cardinality: [0, 1] },
        invert: { type: Value.BOOL, cardinality: [0, 1] },
        trail: { type: Value.BOOL, cardinality: [0, 1] },
        local_space: { type: Value.BOOL, cardinality: [0, 1] },
        billboard: { type: Value.BOOL, cardinality: [0, 1] },
        hide: { type: Value.BOOL, cardinality: [0, 1] },
        texture: {
          children: {
            file: { type: Value.UNQUOTED },
            shader: { type: Value.UNQUOTED },
            x: { type: Value.UNQUOTED, cardinality: [0, 1] },
            y: { type: Value.UNQUOTED, cardinality: [0, 1] },
          },
          cardinality: [0, 1],
        },
        provide: [
          { context: Context.SUBSYSTEM_COLOR, scope: Scope.PARTICLE },
          { context: Context.EMISSION, scope: Scope.PARTICLE },
        ],
        position: {
          cardinality: [0, 1],
          children: {
            x: { type: Value.UNQUOTED, cardinality: [0, 1] },
            y: { type: Value.UNQUOTED, cardinality: [0, 1] },
            z: { type: Value.UNQUOTED, cardinality: [0, 1] },
          },
        },
        duration: { type: Value.UNQUOTED },
        life: [
          { type: Value.UNQUOTED, cardinality: [1, 2] },
          { type: Value.UNQUOTED },
        ],
        size: [
          { type: Value.UNQUOTED, cardinality: [1, 2] },
          { type: Value.UNQUOTED },
          { type: Value.UNQUOTED },
        ],
        rotation: [
          { type: Value.UNQUOTED, cardinality: [0, 1] },
          { type: Value.UNQUOTED, cardinality: [0, 1] },
          { type: Value.UNQUOTED, cardinality: [0, 1] },
        ],
        rotation_speed_roll: { type: Value.UNQUOTED, cardinality: [0, 1] },
        sort: { type: Value.UNQUOTED, cardinality: [0, 1] },
        rotation_speed: [
          { type: Value.UNQUOTED, cardinality: [0, 1] },
          { type: Value.UNQUOTED, cardinality: [0, 1] },
        ],
        rotation_speed_yaw: { type: Value.UNQUOTED, cardinality: [0, 1] },
        rotation_speed_pitch: { type: Value.UNQUOTED, cardinality: [0, 1] },
        sphere_emitter_radius: [
          { type: Value.UNQUOTED, cardinality: [0, 1] },
          { type: Value.UNQUOTED, cardinality: [0, 1] },
        ],
        sphere_emitter_yaw: [
          { type: Value.UNQUOTED, cardinality: [0, 1] },
          { type: Value.UNQUOTED, cardinality: [0, 1] },
        ],
        sphere_emitter_pitch: [
          { type: Value.UNQUOTED, cardinality: [0, 1] },
          { type: Value.UNQUOTED, cardinality: [0, 1] },
        ],
        start: [
          { type: Value.UNQUOTED, cardinality: [0, 1] },
          { type: Value.UNQUOTED, cardinality: [0, 1] },
        ],
        box_emitter_x: [
          { type: Value.UNQUOTED, cardinality: [0, 1] },
          { type: Value.UNQUOTED, cardinality: [0, 1] },
          { type: Value.UNQUOTED, cardinality: [0, 1] },
        ],
        box_emitter_y: [
          { type: Value.UNQUOTED, cardinality: [0, 1] },
          { type: Value.UNQUOTED, cardinality: [0, 1] },
        ],
        box_emitter_z: [
          { type: Value.UNQUOTED, cardinality: [0, 1] },
          { type: Value.UNQUOTED, cardinality: [0, 1] },
        ],
        velocity: [
          { type: Value.UNQUOTED, cardinality: [0, 1] },
          { type: Value.UNQUOTED, cardinality: [0, 1] },
        ],
        velocity_pitch: [
          { type: Value.UNQUOTED, cardinality: [0, 1] },
          { type: Value.UNQUOTED, cardinality: [0, 1] },
        ],
        velocity_yaw: [
          { type: Value.UNQUOTED, cardinality: [0, 1] },
          { type: Value.UNQUOTED, cardinality: [0, 1] },
        ],
        emitter_pitch: [
          { type: Value.UNQUOTED, cardinality: [0, 1] },
          { type: Value.UNQUOTED, cardinality: [0, 1] },
        ],
        emitter_yaw: [
          { type: Value.UNQUOTED, cardinality: [0, 1] },
          { type: Value.UNQUOTED, cardinality: [0, 1] },
        ],
        emission_pulse_duration: { type: Value.UNQUOTED, cardinality: [0, 1] },
        emission_pulse_silence: { type: Value.UNQUOTED, cardinality: [0, 1] },
        particle_pitch: [
          { type: Value.UNQUOTED, cardinality: [0, 1] },
          { type: Value.UNQUOTED, cardinality: [0, 1] },
        ],
        particle_yaw: [
          { type: Value.UNQUOTED, cardinality: [0, 1] },
          { type: Value.UNQUOTED, cardinality: [0, 1] },
        ],
        particle_roll: { type: Value.UNQUOTED, cardinality: [0, 1] },
        force: { type: Value.UNQUOTED, cardinality: [0, 1] },
      },
    },
    animation: {
      cardinality: [0, "inf"],
      children: {
        name: { type: Value.UNQUOTED },
        start: { type: Value.UNQUOTED },
        duration: { type: Value.UNQUOTED },
        repeat: { type: Value.BOOL, cardinality: [0, 1] },
        minValue: { type: Value.UNQUOTED },
        maxValue: { type: Value.UNQUOTED },
        curve: { type: Value.UNQUOTED, cardinality: [4, "inf"] },
        op: { type: Value.UNQUOTED },
        time: { type: Value.UNQUOTED },
      },
    },
    force: {
      cardinality: [0, "inf"],
      children: {
        name: { type: Value.UNQUOTED },
        type: { type: Value.UNQUOTED },
        position: { type: Value.UNQUOTED, cardinality: [0, 1] },
        direction: { type: Value.UNQUOTED, cardinality: [0, 1] },
        local_force: { type: Value.BOOL, cardinality: [0, 1] },
        yaw: { type: Value.UNQUOTED, cardinality: [0, 1] },
        division: { type: Value.UNQUOTED, cardinality: [0, 1] },
        amount: [
          { type: Value.UNQUOTED, cardinality: [0, 1] },
          { type: Value.UNQUOTED, cardinality: [0, 1] },
          { type: Value.UNQUOTED, cardinality: [0, 1] },
        ],
      },
    },
  },
};

const alias: Rule = {
  children: {
    subsystem_color: {
      children: {
        r: { type: Value.UNQUOTED, cardinality: [0, 1] },
        g: { type: Value.UNQUOTED, cardinality: [0, 1] },
        b: { type: Value.UNQUOTED, cardinality: [0, 1] },
        alpha: [
          { type: Value.UNQUOTED, cardinality: [0, 1] },
          { type: Value.UNQUOTED, cardinality: [0, 2] },
        ],
        x: { type: Value.UNQUOTED, cardinality: [0, 1] },
        y: { type: Value.UNQUOTED, cardinality: [0, 1] },
        z: { type: Value.UNQUOTED, cardinality: [0, 1] },
      },
    },
    emission: [
      { type: Value.UNQUOTED },
      { type: Value.UNQUOTED },
      { type: Value.UNQUOTED, cardinality: [1, 2] },
    ],
  },
};

const enums: Rule = {
  children: {
    emitter_type: {
      values: ["point", "sphere", "box"],
    },
    animation_life: {
      values: ["life", "life_abs", "system", "spawn"],
    },
    force_type: {
      values: ["friction", "planar", "point", "spin", "turbulence", "vortex"],
    },
    sort_type: {
      values: ["depth", "age"],
    },
    particle_force: {
      children: {
        path: { type: Value.UNQUOTED },
        name: {
          children: {
            force: {
              children: {
                name: { type: Value.UNQUOTED },
              },
            },
          },
        },
      },
    },
  },
};