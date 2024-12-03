const mulSum = (text: string): number => [...text.matchAll(/mul\((\d+),(\d+)\)/g)].reduce((acc, [, a, b]) => acc + +a * +b, 0);

const input = Deno.readTextFileSync('./input.txt');

const text = input.trim().replaceAll(/\r\n|\n|\r/g, '');
const result = mulSum(text);
console.log('part1', result);

const text2 = text.replaceAll(/don't\(\).*?(do\(\)|$)/g, '');
const result2 = mulSum(text2);
console.log('part2', result2);