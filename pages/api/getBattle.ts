// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { OpenAI } from "../../lib/gpt3Wrapper";
import { BattleRequest, promptBuilder } from "../../lib/promptBuilder";
import { promptParser } from "../../lib/promptParser";
import { Result } from "../../lib/result";

const OPEN_API_KEY = process.env.OPENAI_API_KEY!;

export interface Person {
  gender: "Male" | "Female";
  rap: string;
  name: string;
}
export interface RapVerse {
  person1: Person;
  person2: Person;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Result<RapVerse, string>>
) {
  const battleRequest: BattleRequest = req.body;
  console.log("OPEN_API_KEY", OPEN_API_KEY);

  const oai = new OpenAI(OPEN_API_KEY);
  const { data: completion, error: completionError } =
    await oai.getOpenAICompletion(promptBuilder(battleRequest));

  if (completionError !== null) {
    res.status(500).json({
      error: `Completion Error ${JSON.stringify(completionError)}`,
      data: null,
    });
    return;
  }
  const { data: battle, error: battleError } = promptParser(completion);

  if (battleError !== null) {
    res.status(500).json({ error: `Battle Error ${battleError}`, data: null });
    return;
  }

  res.status(200).json({ error: null, data: battle });
}
