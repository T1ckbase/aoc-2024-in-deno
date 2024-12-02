const input = Deno.readTextFileSync('./input.txt');

const lines = input.trim().split('\n');

const left = lines.map(line => +line.split(/\s+/)[0]).toSorted((a, b) => a - b);
const right = lines.map(line => +line.split(/\s+/)[1]).toSorted((a, b) => a - b);

const sum = left.reduce((acc, l, i) => acc + Math.abs(l - right[i]), 0);

console.log('part1', sum);

const similarityScore = left.reduce((acc, l) => acc + l * right.filter(x => x === l).length, 0);

console.log('part2', similarityScore);