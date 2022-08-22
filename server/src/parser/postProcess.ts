import { Token } from "moo";

type Value = boolean | number | string | Token | any[];
export function extractArray(
  d: [string, any, Value, [any, string, any, Value], any, string]
) {
  const firstValue = d[2];
  const output: any[] = [firstValue];

  for (const i in d[3]) {
    output.push(d[3][i][3]);
  }

  return output;
}
