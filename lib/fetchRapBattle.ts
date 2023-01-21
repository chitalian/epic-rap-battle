import { RapVerse } from "../pages/api/getBattle";

export interface BattleRequest {
  person1: string;
  person2: string;
}

export function fetchRapBattle(
  req: BattleRequest,
  onSuccess: (data: RapVerse) => void,
  onError: (error: string) => void
) {
  fetch("/api/getBattle", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(req),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.error) {
        onError(data.error);
      } else {
        onSuccess(data.data);
      }
    })
    .catch((err) => {
      onError(err);
    });
}
