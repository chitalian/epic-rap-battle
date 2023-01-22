import { RapVerse } from "../pages/api/getBattle";
import { BattleRequest } from "./promptBuilder";

export async function fetchRapBattle(
  req: BattleRequest,
) {
  const data:Result<RapVerse, string> = await fetch("/api/getBattle", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(req),
  })
  .then((res) => res.json())

  return data.data
}
