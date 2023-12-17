import Table from "./table";
const daysInYear = 365; // no accursed gregorian intercals...
const daysInMonth = 73;
const daysInWeek = 9;
const incipitAOK = 2000;

function daysBetweenDates(a: Date, b: Date): number {
    return Math.trunc(Math.abs((a.getTime() - b.getTime())/1000/60/60/24));
}

function daysSinceEpoch(d: Date): number {
    const epoch = new Date("1970-01-01");
    return daysBetweenDates(d, epoch);
}

function daysSinceNewYear(d: Date): number {
    const newYear = new Date(`${d.getFullYear()}-01-01`);
    return daysBetweenDates(d, newYear);
}

function numPostfix(day: number): string {
    if (day === 1) return "st";
    else if (day === 2) return "nd";
    else if (day === 3) return "rd";
    else return "th";
}

// start from Zero
function pentazygon(monthNum: number): string {
    switch(monthNum){
    case 0: return "Uttunul";
    case 1: return "Murrumur";
    case 2: return "Oddubb";
    case 3: return "Djynxx";
    case 4: return "Khattak";
    default: console.error("Month number is not in range of [0,4]");
    }
}

/** Pentazygonic Calendar calculation */
export default function pzcalc(): string[] {
    const today = new Date();
    const [month, day, year] = [today.getMonth(), today.getDate(), today.getFullYear()];
    const yearsSinceEpoch = daysSinceEpoch(today) / daysInYear;
    const dayNumber = Math.round((yearsSinceEpoch - Math.trunc(yearsSinceEpoch)) * daysInYear);
    const monthNumber = Math.trunc(dayNumber / daysInMonth);
    const dayInMonth = dayNumber - (monthNumber * daysInMonth);
    const monthNumFmt = monthNumber.toLocaleString('en-US', {
        minimumIntegerDigits: 2,
        useGrouping: false
    });
    const dayNumFmt = dayInMonth.toLocaleString('en-US', {
        minimumIntegerDigits: 2,
        useGrouping: false
    });
    const yearStr = `${year-incipitAOK}`;

    let output = [];
    output.push(`D/M/Y: ${dayNumFmt} / ${monthNumFmt} / ${year%100}`);
    output.push(`The ${dayInMonth}${numPostfix(dayInMonth)} day of ${pentazygon(monthNumber).toUpperCase()} in the year ${yearStr} AOK.`);
    output.push(`${pentazygon(monthNumber).toUpperCase()}`);
    const cal = new Table<string>();
    const weekDays = ["L ", "Du", "Do", "Ix", "Ig", "K ", "Sg", "Sd"];
    cal.addRow(weekDays);
    let week = [];
    let i = 0;
    for (const n of range(0, daysInMonth)) {
        const day = n.toLocaleString('en-US', {
            minimumIntegerDigits: 2,
            useGrouping: false
        });
        week.push(n === dayInMonth ? toBoldUnicode(day) : day);

        i++;
        if (i == daysInWeek) {
            cal.addRow(week);
            week = [];
            i = 0;
        }
    }

    if (week.length !== 0) {
        cal.addRow(week);
    }

    return output.concat(cal.toStrings());
}

function toBoldUnicode(str) {
    const boldStart = 0x1D400;
    const boldStartDigit = 0x1D7CE;
    const asciiStart = 65;
    const asciiStartDigit = 48;
    let result = '';

    for (let i = 0; i < str.length; i++) {
        let charCode = str.charCodeAt(i);

        if ((charCode >= 65 && charCode <= 90) || (charCode >= 97 && charCode <= 122)) {
            let isLowercase = charCode >= 97;
            let boldCharCode = boldStart + charCode - asciiStart + (isLowercase ? 26 : 0);
            result += String.fromCodePoint(boldCharCode);
        } else if (charCode >= 48 && charCode <= 57) {
            let boldCharCode = boldStartDigit + charCode - asciiStartDigit;
            result += String.fromCodePoint(boldCharCode);
        } else {
            result += str[i];
        }
    }

    return result;
}

/**
 * like range() in python
 * @param {number} start - inclusive
 * @param {number} end - exclusive
 * @param {number} step - optional, defaults to 1
 * @return {array} starting from 'start' and ending at 'end', inclusive
 * @example
 * - range(0, 3) = [0, 1, 2]
 * - range(2, 8, 2) = [2, 4, 6]
 */
 function range(start: number, end: number, step = 1): number[] {
    return Array(Math.ceil((end - start) / step))
      .fill(start)
      .map((x, y) => x + y * step);
  }