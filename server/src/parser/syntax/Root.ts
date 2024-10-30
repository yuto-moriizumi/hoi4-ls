import { RootObjectEntryDescriptor } from "../../validator/rule/types";
import { Pairs } from "./Pairs";

export class Root extends Pairs {
  public format() {
    return super.format(0);
  }

  public validate(rootRule: RootObjectEntryDescriptor) {
    return super.validate(rootRule, undefined);
  }
}
