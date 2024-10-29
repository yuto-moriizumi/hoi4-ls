import {
  root,
  obj,
  typeDefKey,
  literal,
  scalar,
  array,
  float,
  int,
  bool,
  enumRef,
  either,
} from "../utils";

const light = obj(
  {},
  {
    name: scalar(),
    color: obj(
      {},
      {
        r: array({}, [float()]),
        g: array({}, [float()]),
        b: array({}, [float()]),
      },
    ),
    intensity: scalar({ cardinality: [0, 1] }),
    radius: float(),
    falloff: float(),
    duration: float({ cardinality: [0, 1] }),
    position: obj(
      {},
      {
        x: int(),
        y: int(),
        z: int(),
      },
    ),
    animation: obj(
      { cardinality: [0, 1] },
      {
        name: scalar(),
        start: float(),
        duration: float(),
        repeat: bool({ cardinality: [0, 1] }),
        op: enumRef({}, "animation_op"),
        minValue: float({ cardinality: [0, 1] }),
        maxValue: float({ cardinality: [0, 1] }),
        curve: array({ cardinality: [4, Infinity] }, [float()]),
      },
    ),
  },
);

export const intensity = either(
  scalar({ cardinality: [0, Infinity] }),
  int({ cardinality: [0, Infinity] }),
  enumRef({ cardinality: [0, Infinity] }, "light_animations"),
);

export const animation_op = ["MUL", "ADD", "ABS"];

export const light_animations = obj(
  {},
  {
    path: literal("game/gfx/entities"),
    name: obj(
      {},
      {
        animation: obj(
          {},
          {
            name: literal("enum_name"),
          },
        ),
      },
    ),
  },
);

export const lightType = root(
  { path: "/gfx/entities" },
  {
    light: obj(
      {},
      {
        [typeDefKey("light")]: light,
      },
    ),
  },
);
