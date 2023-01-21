import { useState } from "react";
import { fetchRapBattle } from "../lib/fetchRapBattle";
import { RapVerse } from "./api/getBattle";

export default function Demo() {
  const [name1, setName1] = useState("");
  const [name2, setName2] = useState("");
  const [rapVerses, setRapVerses] = useState<RapVerse[]>([]);

  return (
    <div className="max-w-md flex flex-col gap-2 m-10">
      <input
        className="rounded bg-transparent w-full border border-fuchsia-500"
        value={name1}
        onChange={(e) => setName1(e.target.value)}
      />
      <input
        className="rounded bg-transparent w-full border border-fuchsia-500"
        value={name2}
        onChange={(e) => setName2(e.target.value)}
      />
      <p>
        {name1} vs {name2}
      </p>
      <button
        className="rounded bg-fuchsia-500 text-white"
        onClick={() => {
          fetchRapBattle(
            {
              person1: {
                name: name1,
                config: {
                  rhyme: 1,
                  creativity: 4,
                  flaunting: 5,
                  make_fun: 5,
                  aggressiveness: 10,
                },
              },
              person2: {
                name: name2,
                config: {
                  rhyme: 1,
                  creativity: 4,
                  flaunting: 5,
                  make_fun: 5,
                  aggressiveness: 10,
                },
              },
              prevVerses: [],
            },
            (verse) => {
              setRapVerses((prev) => [...prev, verse]);
            },
            (error) => {
              console.error(error);
            }
          );
        }}
      >
        Generate
      </button>
      <div className="flex flex-col gap-2">
        {rapVerses.map((verse, i) => (
          <div className="flex flex-col gap-2 whitespace-pre-wrap" key={i}>
            <p className="text-lg font-bold">{verse.person1.name}</p>
            <p>{verse.person1.rap}</p>
            <p className="text-lg font-bold">{verse.person2.name}</p>
            <p>{verse.person2.rap}</p>
          </div>
        ))}
      </div>
    </div>
  );
}