import { ChatOpenAI } from "@langchain/openai";
import { PromptTemplate } from "@langchain/core/prompts";
import { mkdir, readFile, writeFile } from "fs/promises";
import { readFileSync } from "fs";
import { dirname, join } from "path";
import { GlobSync } from "glob";

import dotenv from "dotenv";
dotenv.config();

const model = new ChatOpenAI({
  modelName: "gpt-4-turbo-preview",
  openAIApiKey: process.env.OPENAI_API_KEY,
});

async function convert(filepath: string, template: PromptTemplate) {
  const code = await readFile(filepath, "utf-8");
  const prompt = await template.format({ code });
  const result = (await model.invoke(prompt)).content.toString();
  const firstNewlineIndex = result.indexOf("\n");
  const lastNewlineIndex = result.lastIndexOf("\n");
  const outfile = filepath
    .replace("cwtools-hoi4-config", "out")
    .replace(".cwt", ".ts");
  await mkdir(dirname(outfile), { recursive: true });
  await writeFile(
    outfile,
    result.substring(firstNewlineIndex + 1, lastNewlineIndex),
  );
}

async function processFiles(template: PromptTemplate) {
  const glob = new GlobSync(
    join(__dirname, "cwtools-hoi4-config", "**", "*.cwt"),
  );
  await Promise.all(
    glob.found.map(async (file) => {
      await convert(file, template);
      console.log("Converted " + file);
    }),
  );
}

export function convertAll() {
  const template = readFileSync("template.txt", "utf-8");
  const promptTemplate = PromptTemplate.fromTemplate(template);
  processFiles(promptTemplate);
}
