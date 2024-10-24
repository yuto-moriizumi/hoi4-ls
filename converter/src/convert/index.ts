import { mkdir, readFile, writeFile } from "fs/promises";
import { ChatOpenAI } from "@langchain/openai";
import { PromptTemplate, FewShotPromptTemplate } from "@langchain/core/prompts";
import path, { join } from "path";
import dotenv from "dotenv";

const CHUNK_LINES = 200;

dotenv.config();

const model = new ChatOpenAI({
  modelName: "chatgpt-4o-latest",
  openAIApiKey: process.env.OPENAI_API_KEY,
  temperature: 0,
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
  const chunks = split2chunks(await readFile(filePath, "utf-8")).map(annotate);
  console.log("Split into", chunks.length, "chunks");
  const result = await Promise.all(
    chunks.map(async (input) => {
      const prompt = await (await getTemplate()).format({ input });
      const result = (await model.invoke(prompt)).content.toString();
      return result.slice(
        "```typescript\n".length,
        result.length - "```".length,
      );
    }),
  );
  const outputPath = filePath
    .replace(
      path.join("cwtools-hoi4-config", "Config"),
      "../server/src/validator/rule",
    )
    .replace(".cwt", ".ts");
  await mkdir(path.dirname(outputPath), { recursive: true });
  await writeFile(outputPath, result.join("\n\n"));
  console.log("Saved to", outputPath);
}

/** Add a comment to every head of blocks, whther it is object or array */
function annotate(text: string) {
  const BLOCK_HEAD_REGEX = /[^\s]+\s=\s\{/;
  const ARRAY_ITEM_REGEX = /^[^\s]+$/;
  const ENTRY_REGEX = /[^\s]+\s=\s[^\s]+/;
  const lines = text.split("\n");
  const result = [];
  for (let tail = 0; tail < lines.length; tail++) {
    const line = lines[tail].trimStart();
    if (/^#[^#]/.test(line)) continue; // Skip comment outed lines
    if (line.startsWith("##") || !BLOCK_HEAD_REGEX.test(line)) {
      result.push(lines[tail]);
      continue;
    }
    const trimedLength = lines[tail].length - line.length;
    for (let head = tail + 1; head < lines.length; head++) {
      const line = lines[head].trimStart();
      // Skip comments
      if (line.startsWith("##") || line.startsWith("# ")) continue;
      if (ARRAY_ITEM_REGEX.test(line)) {
        result.push(
          "\t".repeat(trimedLength) + "### Following block is an array block",
        );
        result.push(lines[tail]);
        break;
      }
      if (ENTRY_REGEX.test(line)) {
        // Skip annnotations for objects, as theres so many objects
        // result.push(
        //   "\t".repeat(trimedLength) + "### Following block is an object block",
        // );
        result.push(lines[tail]);
        break;
      }
      throw new Error(
        `Unexpected line: ${line},\nCheck the breaking line code is LF.`,
      );
    }
  }
  return result.join("\n");
}

function split2chunks(text: string, chunkLines = CHUNK_LINES): string[] {
  const blocks = text.split("\n\n");
  const chunks = [];
  let currentChunk = [];
  let currentChunkLines = 0;

  for (const block of blocks) {
    const blockLines = block.split("\n").length;

    if (currentChunkLines + blockLines > chunkLines) {
      chunks.push(currentChunk.join("\n\n"));
      currentChunk = [];
      currentChunkLines = 0;
    }

    currentChunk.push(block);
    currentChunkLines += blockLines;
  }

  if (currentChunk.length > 0) {
    chunks.push(currentChunk.join("\n\n"));
  }

  return chunks;
}
