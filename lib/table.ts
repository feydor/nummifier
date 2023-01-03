// TODO: Output an HTML table
export default class Table<T> {
    rows: [T[]];

    constructor() {
        this.rows = [[]];
    }

    addRow(row: T[]) {
        this.rows.push(row);
    }

    toStrings(): string[] {
        const spacesBetween = 2;
        let out = [];
        for (let i = 0; i < this.rows.length; i++) {
            let rowStr = ' ';
            rowStr += this.rows[i].join('  ');
            rowStr += ' ';
            out.push(rowStr);
        }
        return out;
    }
};