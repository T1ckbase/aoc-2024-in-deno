function isSafe(report: number[]): boolean {
    const sorted = report.toSorted((a, b) => a - b);
    return (report.toString() === sorted.toString() || report.toReversed().toString() === sorted.toString()) &&
        report.length === new Set(report).size &&
        Math.max(...report.map((n, i) => Math.abs(n - (report[i-1] ?? n)))) <= 3;
}

const input = Deno.readTextFileSync('./input.txt');

const lines = input.trim().split(/\r\n|\n|\r/);
const reports = lines.map(line => line.split(/\s+/).map(Number));

const safeReports = reports.filter(isSafe);
console.log('part1', safeReports.length);

const safeReports2 = reports.filter(report => Array.from({length: report.length}, (_, i) => report.toSpliced(i, 1)).some(isSafe));
console.log('part2', safeReports2.length);