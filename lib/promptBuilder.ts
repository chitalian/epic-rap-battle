import { RapVerse } from "../pages/api/getBattle";

export function promptBuilder(
  person1: string,
  person2: string,
  prevVerses: RapVerse[] = []
): string {
  return `This is a rap battle between ${person1} and ${person2}.

Here are the rules that apply to each rapper with the following multipliers:
- Lines in a verse must rhyme
- Creativity
- Flaunting their success
- Making fun of the opponent
- Aggressiveness towards the opponent

Verse format:
\`\`\`
${person1} - {gender}
{line},
{line}.
{line},
{line}.
---
${person2} - {gender}
{line},
{line}.
{line},
{line}.
\`\`\`

Multipliers:
{
${person1}: {
    "rhyme": 1,
    "creativity": 1,
    "flaunting": 1,
    "make_fun": 5,
    "aggressiveness": 0
},
${person2}: {
    "rhyme": 1,
    "creativity": 1,
    "flaunting": 1,
    "make_fun": 5,
    "aggressiveness": 0
}
}


Previous verses:
\`\`\`
${prevVerses.length > 0 ? "" : "None"}
${prevVerses
  .map((verse) => {
    return `${verse.person1.name} - ${verse.person1.gender}
${verse.person1.rap}
---
${verse.person2.name} - ${verse.person2.gender}
${verse.person2.rap}`;
  })
  .join("\n\n")}
\`\`\`

Next verse:
\`\`\``;
}
