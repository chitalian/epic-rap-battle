export function promptBuilder(person1: string, person2: string): string {
  return `${person1} vs ${person2} battle.
Here are the rules
1. Each must make fun of the other
2. Must rhyme
3. Must be creative
4. Add commas for pauses
5. Must have 3 verses each

Format:
where gender is either Female or Male
\`\`\`
${person1} - {gender}
{verse 1}
{verse 2}
{verse 3}
---
${person2} - {gender}
{verse 1}
{verse 2}
{verse 3}
\`\`\`
`;
}
