import { mkdir, readFile, writeFile } from "fs/promises";
import { ChatOpenAI } from "@langchain/openai";
import { PromptTemplate, FewShotPromptTemplate } from "@langchain/core/prompts";
import { EXAMPLES } from "./examples";
import path from "path";

import dotenv from "dotenv";
dotenv.config();

const model = new ChatOpenAI({
  modelName: "gpt-4o",
  openAIApiKey: process.env.OPENAI_API_KEY,
});

async function loadExample(filePath: string) {
  return (await readFile(filePath))
    .toString()
    .replaceAll("{", "{{")
    .replaceAll("}", "}}");
}

async function getTemplate() {
  return new FewShotPromptTemplate({
    inputVariables: ["before", "after"],
    examplePrompt: PromptTemplate.fromTemplate(
      "Before:\n```{before}```\nAfter:\n```{after}```",
    ),
    examples: await Promise.all(
      EXAMPLES.map(async ([inputPath, outputPath]) => ({
        before: await loadExample(inputPath),
        after: await loadExample(outputPath),
      })),
    ),
    prefix: `Your task is to convert the given code to typescript with using following examples.
The responce should include the converted code only without backticks.`,
    suffix: "Convert this code to typescript:\n```{input}```",
    partialVariables: { input: "string" },
  });
}

export async function convert(filePath: string) {
  const input = await readFile(filePath, "utf-8");
  const prompt = await (await getTemplate()).format({ input });
  const result = (await model.invoke(prompt)).content.toString();
  const outputPath = filePath
    .replace(
      path.join("cwtools-hoi4-config", "Config"),
      "../server/src/validator/rule",
    )
    .replace(".cwt", ".ts");
  await mkdir(path.dirname(outputPath), { recursive: true });
  await writeFile(outputPath, result);
  console.log("Saved to", outputPath);
}
