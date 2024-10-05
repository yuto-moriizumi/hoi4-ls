import { trigger } from "../triggers";
import { obj, typeRef, array, localisation, root, typeDefKey } from "../utils";

const intelligence_agency = obj(
  {},
  {
    picture: typeRef({}, "spriteType"),
    names: array({}, [
      localisation({ cardinality: [0, Infinity] }),
      localisation({ cardinality: [0, Infinity] }),
    ]),
    default: obj(
      { cardinality: [1, Infinity] },
      {
        ...trigger,
      },
    ),
    available: obj(
      { cardinality: [1, Infinity] },
      {
        ...trigger,
      },
    ),
  },
);

export const intelligenceAgencyType = root(
  { path: "game/common/intelligence_agencies" },
  {
    intelligence_agency: obj(
      {},
      {
        [typeDefKey("intelligence_agency")]: intelligence_agency,
      },
    ),
  },
);
