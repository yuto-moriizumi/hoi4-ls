import { mkdir, readFile, writeFile } from "fs/promises";
import { ChatOpenAI } from "@langchain/openai";
import { PromptTemplate, FewShotPromptTemplate } from "@langchain/core/prompts";
import { EXAMPLES } from "./examples";
import path from "path";

import dotenv from "dotenv";
dotenv.config();

const model = new ChatOpenAI({
  modelName: "chatgpt-4o-latest",
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
    prefix: `Your task is to convert the given code to typescript.
Please note that some brackets might represent the Array. For example...
color = {{
  ## cardinality = 3..3
  int
}}
This is the array, because the items inside (int) doesn't have \`=\`
Also, if you see "subtype", that means the set of values are mutually execlusive relationship. For example,
country_tag_alias = {{
  subtype[variable] = {{
    variable = variable_field
  }}
  subtype[global_event_target] = {{
    global_event_target = value[global_event_target]
  }}
  fallback = enum[explicit_country_tags]
}}
This case, country_tag_alias is allowed to have "fallback = enum[explicit_country_tags]"
but "variable = variable_field" and "global_event_target = value[global_event_target]" can be coexited.
for this case it can be converted like this. Converted code will use typescript array to express the mutually exclusive relationship.
country_tag_alias = {{
  children: [
    {{
      // variable
      children: {{
        fallback: enum("explicit_country_tags"),
        variable: variable_field,
      }},
    }},
    {{
      // global_event_target
      children: {{
        fallback: enum("explicit_country_tags"),
        global_event_target: value("global_event_target"),
      }},
    }}
  ]
}}
There's a constant named "variable_field" and "int_variable_field" available so when you find it feel free to use.
Refer to the following examples;
`,
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
