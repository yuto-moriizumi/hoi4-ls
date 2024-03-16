import { ChatOpenAI } from "@langchain/openai";
import { PromptTemplate } from "@langchain/core/prompts";
import { readFileSync } from "fs";
import dotenv from "dotenv";

dotenv.config();

const model = new ChatOpenAI({
  modelName: "gpt-4-turbo-preview",
  openAIApiKey: process.env.OPENAI_API_KEY,
});

const template = readFileSync("template.txt", "utf-8");
const promptTemplate = PromptTemplate.fromTemplate(template);

(async () => {
  const prompt = await promptTemplate.format({
    code: `event = {
	  id = scalar
	  ## cardinality = 0..inf
	  title = localisation
	  }`,
  });
  const result = (await model.invoke(prompt)).content.toString();
  console.log(result);
})();
