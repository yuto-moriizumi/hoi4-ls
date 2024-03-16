import { triggers } from "../triggers";
import { Scope, RootObjectEntryDescriptor } from "../types";

export const achievement: RootObjectEntryDescriptor = {
  replaceScope: {
    root: Scope.COUNTRY,
    this: Scope.COUNTRY,
  },
  children: {
    possible: {
      cardinality: [0, "inf"],
      children: triggers,
    },
    happened: {
      cardinality: [0, "inf"],
      children: triggers,
    },
  },
};
