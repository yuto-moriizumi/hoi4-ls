import { mkdir, readFile, writeFile } from "fs/promises";
import { ChatOpenAI } from "@langchain/openai";
import { PromptTemplate, FewShotPromptTemplate } from "@langchain/core/prompts";

import path, { join } from "path";

import dotenv from "dotenv";
dotenv.config();

const model = new ChatOpenAI({
  modelName: "chatgpt-4o-latest",
  openAIApiKey: process.env.OPENAI_API_KEY,
});

async function loadText(filePath: string) {
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
    examples: [],
    prefix: await loadText(join(__dirname, "prompt.md")),
    suffix: "Convert this code to TS format:\n```{input}```",
    partialVariables: { input: "string" },
  });
}

// await Promise.all(
//   EXAMPLES.map(async ([inputPath, outputPath]) => ({
//     before: await loadText(inputPath),
//     after: await loadText(outputPath),
//   })),
// )

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
