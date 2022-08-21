import { Jomini } from "jomini";
import { Pairs } from "./Pairs";

export class Root extends Pairs {
  public async format() {
    const jomini = await Jomini.initialize();
    const out = jomini.write((writer) => super.format(writer));
    return out.toString();
  }
}
