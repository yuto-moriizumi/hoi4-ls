import { Jomini } from "jomini";
import { TextDecoder } from 'util';
import { Pairs } from "./Pairs";

export class Root extends Pairs {
  public async format() {
    const jomini = await Jomini.initialize();
    const out = jomini.write((writer) => super.format(writer));
    return new TextDecoder().decode(out);
  }
}
