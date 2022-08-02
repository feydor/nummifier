const daysInYear = 365; // no accursed gregorian intercals...
const monthsInYear = 5;
const daysInMonth = 73;
const incipitAOK = 2000;

const secondsInYear = 60*60*24*73*5;
const secondsInMonth = secondsInYear/5;
const secondsInDay = 60*60*24;

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

export default function pzcalc(): string[] {
    const today = new Date();
    const [month, day, year] = [today.getMonth(), today.getDate(), today.getFullYear()];
    const yearsSinceEpoch = daysSinceEpoch(today) / 365;
    const dayNumber = Math.round((yearsSinceEpoch - Math.trunc(yearsSinceEpoch)) * 365);
    const monthNumber = Math.trunc(dayNumber / 73);
    const dayInMonth = dayNumber - (monthNumber * 73);
    const monthNumFmt = monthNumber.toLocaleString('en-US', {
        minimumIntegerDigits: 2,
        useGrouping: false
    });
    const dayNumFmt = dayInMonth.toLocaleString('en-US', {
        minimumIntegerDigits: 2,
        useGrouping: false
    });
    const yearStr = `${Math.trunc(year/1000)}K${year%100}`;

    let output = [];
    output.push(`D/M/Y: ${dayNumFmt} / ${monthNumFmt} / ${year%100}`);
    output.push(`The ${dayInMonth}${numPostfix(dayInMonth)} of ${pentazygon(monthNumber).toUpperCase()} in the year ${yearStr} AOK.`);
    const width = 35;
    return output;
}