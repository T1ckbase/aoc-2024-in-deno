class Guard {
    length: number;
    map: string[];
    guardIndex: number;

    constructor(input: string) {
        const lines = input.split('\n');
        this.length = lines.length; // width === height
        this.map = lines.flatMap(line => line.split(''));
        this.guardIndex = this.map.findIndex(e => e === '^');
    }

    isBorder(index: number) {
        const row = Math.floor(index / this.length);
        const col = index % this.length;
        return row === 0 || row === this.length-1 || col === 0 || col === this.length-1;
    }

    isObstructions(map: string[], index: number) {
        return map[index] === '#';
    }

    *direction() {
        while (true) {
            yield* [-this.length, 1, this.length, -1];
        }
    }

    run(map: string[]) {
        let index = this.guardIndex;
        const passed = new Set<number>();
        passed.add(this.guardIndex);
        const turns: string[] = [];
        const dirGen = this.direction();
        let next = dirGen.next().value!;
        do {
            while (this.isObstructions(map, index + next)) {
                if (turns.includes(`${index},${next}`)) {
                    return -1;
                }
                turns.push(`${index},${next}`);
                next = dirGen.next().value!;
            }
            index += next;
            passed.add(index);
        } while (!this.isBorder(index));
        // console.log(...passedIndex);
        return passed.size;
    }

    bruteForce(map: string[]) {
        return map.map((value: string, index: number) => {
            Deno.stdout.writeSync((new TextEncoder()).encode(`\r${index+1}/${this.map.length}`));
            const map = [...this.map];
            (value === '.') && (map[index] = '#');
            return (value === '.') ? this.run(map) : 0;
        }).filter(n => n === -1).length;
    }
}


const input = Deno.readTextFileSync('./input.txt').trim().replaceAll(/\r\n|\n|\r/g, '\n');

const guard = new Guard(input);

// console.log(guard.guardIndex);
// console.log(guard.isObstructions(4));

console.log('part1', guard.run(guard.map));

console.log('\npart2', guard.bruteForce(guard.map));