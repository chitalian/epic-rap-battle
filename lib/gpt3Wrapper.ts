import { Result } from "./result";

export class OpenAI {
  apiKey: string;
  constructor(apikey: string) {
    this.apiKey = apikey;
  }
  getOpenAICompletion(prompt: string): Promise<Result<string, string>> {
    console.log("prompt", prompt);
    return getOpenAICompletion(prompt, this.apiKey);
  }
}

interface OAIResponse {
  choices: {
    text: string;
    index: number;
    logprobs: {
      token_logprobs: {
        [key: string]: number;
      };
      top_logprobs: {
        [key: string]: number;
      };
      text_offset: number[];
    };
    finish_reason: string;
  }[];
  id: string;
  model: string;
  error: string;
}

const oaiBase = "https://oai.hconeai.com/v1";
const oaiURL = (endpoint: string, model: string) =>
  `${oaiBase}/engines/${model}/${endpoint}`;

async function getOpenAICompletion(
  prompt: string,
  apikey: string
): Promise<Result<string, string>> {
  let response = await fetch("http://localhost:8787/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apikey}`,
      "User-ID": "1",
      "Helicone-Auth": "Bearer " + process.env.HELICONE_API_KEY ?? "",
      "Helicone-Prompt-Id": "Rap Battle",
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: prompt,
        },
      ],
    }),
  });

  if (response.status === 200) {
    let json = (await response.json()) as any;
    if (json.error) {
      return { error: json.error, data: null };
    }
    if (!json.choices || json.choices.length === 0) {
      return { error: "No choices", data: null };
    }
    console.log("JSON", json.choices[0].message.content);
    return {
      error: null,
      data: json.choices[0].message.content,
    };
  }
  console.error("Error", response.status, response.statusText);

  return { error: "Error", data: null };
}
