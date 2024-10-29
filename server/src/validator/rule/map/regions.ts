import {
  root,
  obj,
  typeDefKey,
  int,
  localisation,
  array,
  typeRef,
  enumRef,
  typeRefKey,
  bool,
  float,
  enumRefKey,
} from "../utils";

const supply_area = obj(
  {},
  {
    id: int(),
    name: localisation(),
    value: int(),
    states: array({ cardinality: [1, Infinity] }, [typeRef({}, "state")]),
  },
);

const strategic_region = obj(
  {},
  {
    id: int(),
    name: localisation(),
    provinces: array({ cardinality: [1, Infinity] }, [
      enumRef({ cardinality: [1, Infinity] }, "provinces"),
    ]),
    naval_terrain: typeRef({ cardinality: [0, 1] }, "terrain.naval_terrain"),
    static_modifiers: obj(
      { cardinality: [0, 1] },
      {
        [typeRefKey("static_modifier")]: bool(
          { cardinality: [1, Infinity] },
          true,
        ),
      },
    ),
    weather: obj(
      { cardinality: [0, Infinity] },
      {
        period: obj(
          {},
          {
            between: array({ cardinality: [2, 2] }, [
              float({ cardinality: [2, 2] }, 0.0, 30.9),
            ]),
            temperature: array({ cardinality: [2, 2] }, [float()]),
            temperature_day_night: array({ cardinality: [0, 1] }, [
              float({ cardinality: [2, 2] }),
            ]),
            [enumRefKey("region_weather")]: float(
              { cardinality: [7, 8] },
              0,
              Infinity,
            ),
            min_snow_level: float(),
          },
        ),
      },
    ),
  },
);

export const region_weather = [
  "no_phenomenon",
  "rain_light",
  "rain_heavy",
  "snow",
  "blizzard",
  "arctic_water",
  "mud",
  "sandstorm",
];

export const supplyAreaType = root(
  { path: "/map/supplyareas" },
  {
    id: obj(
      {},
      {
        [typeDefKey("supply_area")]: supply_area,
      },
    ),
  },
);

export const strategicRegionType = root(
  { path: "/map/strategicregions" },
  {
    id: obj(
      {},
      {
        [typeDefKey("strategic_region")]: strategic_region,
      },
    ),
  },
);
