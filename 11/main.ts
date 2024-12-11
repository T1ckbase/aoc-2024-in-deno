const isEven = (num: number) => !(num % 2);

const blinkCache = new Map<string, number>();

function blinkRecursive(stones: number[], times: number): number {
    if (times === 0) {
        return stones.length;
    }

    const cacheKey = `${stones.join(',')}_${times}`;

    if (blinkCache.has(cacheKey)) {
        return blinkCache.get(cacheKey)!;
    }

    let sum = 0;
    for (let i = 0; i < stones.length; i++) {
        const s = stones[i].toString();
        const newStones = stones[i] === 0 ? [1] : (isEven(stones[i].toString().length) ? [+s.slice(0, s.length / 2), +s.slice(s.length / 2)] : [stones[i] * 2024]);
        sum += blinkRecursive(newStones, times - 1);
    }

    blinkCache.set(cacheKey, sum);

    return sum;
}

const input = Deno.readTextFileSync('./input.txt').trim();

const stones = input.split(/\s/).map(Number);

console.time('part1');
const part1 = blinkRecursive(stones, 25);
console.timeEnd('part1');
console.log('part1', part1);

console.time('part2');
const part2 = blinkRecursive(stones, 75);
console.timeEnd('part2');
console.log('part2', part2);