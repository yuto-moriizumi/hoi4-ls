import { obj, int, float, root, typeDefKey } from "../utils";

const resource = obj(
  {},
  {
    icon_frame: int(),
    cic: float(),
    convoys: float(),
  },
);

export const resourceType = root(
  { path: "game/common/resources" },
  {
    resources: obj(
      {},
      {
        [typeDefKey("resource")]: resource,
      },
    ),
  },
);
