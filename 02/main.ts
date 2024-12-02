const input = Deno.readTextFileSync('./input.txt');

const lines = input.trim().split(/\r\n|\n|\r/);

const reports = lines.map(line => line.split(/\s+/).map(Number));

const sorted = reports.map(report => report.toSorted((a, b) => a - b));

const safeReports = reports.filter((report, index) => {
    return (
        report.toString() === sorted[index].toString() ||
        report.toReversed().toString() === sorted[index].toString()
    ) &&
    report.length === new Set(report).size &&
    Math.max(...report.map((n, i) => Math.abs(n - (report[i-1] ?? n)))) <= 3;
});

console.log('part1', safeReports.length);

const safeReports2 = reports.filter(report => {
    return Array.from({length: report.length}, (_, i) => report.toSpliced(i, 1)).some(r => {
        const sorted = r.toSorted((a, b) => a - b);
        return (
            r.toString() === sorted.toString() ||
            r.toReversed().toString() === sorted.toString()
        ) &&
        r.length === new Set(r).size &&
        Math.max(...r.map((n, i) => Math.abs(n - (r[i-1] ?? n)))) <= 3;
    });
});

console.log('part2', safeReports2.length);