import { readFile } from "fs/promises";

export async function parse(filePath: string) {
  const input = await readFile(filePath, "utf-8");
  const { Jomini } = await import("jomini");
  const parser = await Jomini.initialize();
  try {
    const out = parser.parseText(input);
    console.log(out);
  } catch (error) {
    console.error(error);
  }
}
