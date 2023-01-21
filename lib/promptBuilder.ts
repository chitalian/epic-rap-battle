import { RapVerse } from "../pages/api/getBattle";

export interface RapperConfig {
  rhyme: number;
  creativity: number;
  flaunting: number;
  make_fun: number;
  aggressiveness: number;
}

export interface BattleRequest {
  person1: {
    name: string;
    config: RapperConfig;
  };
  person2: {
    name: string;
    config: RapperConfig;
  };
  prevVerses: RapVerse[];
}

export function promptBuilder({
  person1,
  person2,
  prevVerses = [],
}: BattleRequest): string {
  return `This is a rap battle between ${person1.name} and ${person2.name}.

Here are the rules that apply to each rapper with the following multipliers:
- Lines in a verse must rhyme
- Creativity
- Flaunting their success
- Making fun of the opponent
- Aggressiveness towards the opponent

Verse format:
\`\`\`
${person1.name} - {gender}
{line},
{line}.
{line},
{line}.
---
${person2.name} - {gender}
{line},
{line}.
{line},
{line}.
\`\`\`

Multipliers:
{
${person1.name}: {
    "rhyme": ${person1.config.rhyme},
    "creativity": ${person1.config.creativity},
    "flaunting": ${person1.config.flaunting},
    "make_fun": ${person1.config.make_fun},
    "aggressiveness": ${person1.config.aggressiveness}
},
${person2.name}: {
    "rhyme": ${person2.config.rhyme},
    "creativity": ${person2.config.creativity},
    "flaunting": ${person2.config.flaunting},
    "make_fun": ${person2.config.make_fun},
    "aggressiveness": ${person2.config.aggressiveness}
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
