import { Person, RapBattle } from "../pages/api/getBattle";
import { Result } from "./result";

function parseRap(rap: string): Person {
  // remove all empty lines
  const rapClean = rap
    .split("\n")
    .filter((line) => line.trim() !== "")
    .join("\n");
  const gender = rapClean.split("\n")[0].split("-")[1].trim();
  const verse = rapClean.split("\n").splice(1).join("\n");
  return {
    gender: gender as "Male" | "Female",
    rap: verse,
  };
}

export function promptParser(prompt: string): Result<RapBattle, string> {
  console.log("promptParser", prompt);
  const person1Rap = parseRap(prompt.split("---")[0]);
  const person2Rap = parseRap(prompt.split("---")[1]);
  return {
    data: {
      person1: person1Rap,
      person2: person2Rap,
    },
    error: null,
  };
}
