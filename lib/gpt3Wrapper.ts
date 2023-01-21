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

const oaiBase = "https://oai.valyrai.com/v1";
const oaiURL = (endpoint: string, model: string) =>
  `${oaiBase}/engines/${model}/${endpoint}`;

async function getOpenAICompletion(
  prompt: string,
  apikey: string
): Promise<Result<string, string>> {
  let response = await fetch(oaiURL("completions", "text-davinci-003"), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apikey}`,
      "User-ID": "1",
    },
    body: JSON.stringify({
      prompt,
      max_tokens: 2048,
      temperature: 0.0,
      frequency_penalty: 1,
      presence_penalty: 2,
      stop: ["```"],
      top_p: 1,
      logprobs: 1,
    }),
  });

  if (response.status === 200) {
    let json = (await response.json()) as OAIResponse;
    if (json.error) {
      return { error: json.error, data: null };
    }
    if (!json.choices || json.choices.length === 0) {
      return { error: "No choices", data: null };
    }
    return {
      error: null,
      data: json.choices[0].text as string,
    };
  }

  return { error: "Error", data: null };
}
