const horizontalSearch = (str: string) => [...str.matchAll(/(?=XMAS|SAMX)/g)].length;

const verticalSearch = (str: string) => {
    const l = str.trim().split('\n').length;
    return [...str.matchAll(new RegExp(`(?=(X.{${l}}M.{${l}}A.{${l}}S)|(S.{${l}}A.{${l}}M.{${l}}X))`, 'gs'))].length;
}

const diagonalSearch = (str: string) => {
    const l = str.trim().split('\n').length;
    const p1 = l - 1; // search /
    const p2 = l + 1; // search \
    return [
        ...str.matchAll(new RegExp(`(?=X(?![^\\n]{${p1}})[\\s\\S]{${p1}}M(?![^\\n]{${p1}})[\\s\\S]{${p1}}A(?![^\\n]{${p1}})[\\s\\S]{${p1}}S|S(?![^\\n]{${p1}})[\\s\\S]{${p1}}A(?![^\\n]{${p1}})[\\s\\S]{${p1}}M(?![^\\n]{${p1}})[\\s\\S]{${p1}}X)`, 'g')),
        ...str.matchAll(new RegExp(`(?=X(?![^\\n]{${p2}})[\\s\\S]{${p2}}M(?![^\\n]{${p2}})[\\s\\S]{${p2}}A(?![^\\n]{${p2}})[\\s\\S]{${p2}}S|S(?![^\\n]{${p2}})[\\s\\S]{${p2}}A(?![^\\n]{${p2}})[\\s\\S]{${p2}}M(?![^\\n]{${p2}})[\\s\\S]{${p2}}X)`, 'g'))
    ].length;
}

const xSearch = (str: string) => {
    const l = str.trim().split('\n').length;
    return [...str.matchAll(new RegExp(`(?=(S|M).(S|M).{${l-1}}A.{${l-1}}(?!\\2)[SM].(?!\\1)[SM])`, 'gs'))].length;
}

const input = Deno.readTextFileSync('./input.txt').trim().replaceAll(/\r\n|\n|\r/g, '\n');

const horizontal = horizontalSearch(input);
const vertical = verticalSearch(input);
const diagonal = diagonalSearch(input);

// console.log('horizontal', horizontal);
// console.log('vertical', vertical);
// console.log('diagonal', diagonal);
console.log('part1', horizontal + vertical + diagonal);

const x = xSearch(input);
console.log('part2', x);