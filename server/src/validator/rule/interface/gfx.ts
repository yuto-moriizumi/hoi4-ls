import {
  root,
  obj,
  typeDefKey,
  scalar,
  int,
  float,
  bool,
  array,
  either,
  filepath,
} from "../utils";

const spriteType = obj(
  {},
  {
    name: scalar(),
    effectFile: scalar({ cardinality: [0, 1] }),
    noOfFrames: int({ cardinality: [0, 1] }),
    animation_rate_fps: float({ cardinality: [0, 1] }),
    looping: bool({ cardinality: [0, 1] }),
    play_on_show: bool({ cardinality: [0, 1] }),
    animation: obj(
      { cardinality: [0, Infinity] },
      {
        animationmaskfile: scalar({ cardinality: [0, 1] }),
        animationtexturefile: scalar({ cardinality: [0, 1] }),
        animationrotation: float({ cardinality: [0, 1] }),
        animationlooping: bool({ cardinality: [0, 1] }),
        animationtime: float({ cardinality: [0, 1] }),
        animationdelay: float({ cardinality: [0, 1] }),
        animationtype: scalar({ cardinality: [0, 1] }),
        animationblendmode: scalar({ cardinality: [0, 1] }),
        animationrotationoffset: obj(
          { cardinality: [0, 1] },
          {
            x: float(),
            y: float(),
          },
        ),
        animationtexturescale: obj(
          { cardinality: [0, 1] },
          {
            x: float(),
            y: float(),
          },
        ),
        animationframes: array({ cardinality: [0, 1] }, [
          int({ cardinality: [1, Infinity] }),
        ]),
      },
    ),
    loadType: scalar({ cardinality: [0, 1] }),
    transparencecheck: bool({ cardinality: [0, 1] }),
    legacy_lazy_load: bool({ cardinality: [0, 1] }),
    pause_on_loop: float({ cardinality: [0, 1] }),
    alwaystransparent: bool({ cardinality: [0, 1] }),
    generate_mip_maps: bool({ cardinality: [0, 1] }),
    subtype: either(
      obj(
        {},
        {
          textureFile: filepath(),
        },
      ),
      obj(
        {},
        {
          textureFile: filepath(),
        },
      ),
      obj(
        {},
        {
          textureFile: filepath(),
          borderSize: obj(
            {},
            {
              x: int(),
              y: int(),
            },
          ),
          tilingCenter: bool({ cardinality: [0, 1] }),
          size: obj(
            {},
            {
              x: int(),
              y: int(),
            },
          ),
          animation_rate_spf: int({ cardinality: [0, 1] }),
        },
      ),
      obj(
        {},
        {
          textureFile1: scalar(),
          textureFile2: scalar(),
        },
      ),
      obj(
        {},
        {
          textureFile: filepath(),
          clicksound: scalar({ cardinality: [0, 1] }),
        },
      ),
      obj(
        {},
        {
          textureFile1: scalar(),
          textureFile2: scalar(),
          size: obj(
            {},
            {
              x: int(),
              y: int(),
            },
          ),
          horizontal: bool(),
          color: array({ cardinality: [3, 3] }, [float()]),
          colortwo: array({ cardinality: [3, 3] }, [float()]),
          steps: int(),
        },
      ),
      obj(
        {},
        {
          size: int(),
        },
      ),
      obj(
        {},
        {
          textureFile1: scalar(),
          textureFile2: scalar(),
          size: int(),
          rotation: int(),
          amount: int(),
        },
      ),
    ),
  },
);

export const spriteTypeType = root(
  { path: "interface" },
  {
    spriteTypes: obj(
      {},
      {
        [typeDefKey("spriteType")]: spriteType,
      },
    ),
  },
);
