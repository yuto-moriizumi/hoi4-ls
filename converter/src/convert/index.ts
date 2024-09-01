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
Given code represents the set of syntaxes and its rules to satisfy.
# Basic structure
Overall structure will look like this
"pdxparticle = {
		name = scalar
		type = <particle>

		## cardinality = 0..1
		scale = float
}"
This defines the syntax rule of the pdxparticle.
It has following entries;
- "name" key, and which value should satisfy "scalar" rule.
- "type" key, and which value should satisfy "<particle>" rule.
- "scale" key, and which value should satisfy "float" rule.
You have to convert this to typescript as follows;
"const pdxparticle = obj({
    name: scalar()
    type: typeRef("particle")
    scale = float({cardinality:[0,1]})
  })"

# Attributes
"##" is the attribute symbol. It describes the restriction of the following entry.
For example,
"## cardinality = 0..1
scale = float"
This means "scale" entry has the "cardinality" attribute with the value of 0..1.

# Simple rules
Theres simple rules like primitive values.
- bool

# Rule 1 - 
# Rule 1 - Items without \`=\` and values in the brackets represents the Array
Please note that some brackets might represent the Array. For example...
color = {{
  ## cardinality = 3..3
  int
}}
color = { type: Value.ARRAY, values: [int]}
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
