const NUMERALS = "MDCLXVI";
const DIGITS = [1000, 500, 100, 50, 10, 5, 1];

export function romanize(s: number, i = 0): string {
  if (s === 0) return "";
  const [msdigit, places] = mostSigPlace(s);
  const diff = DIGITS[i] - msdigit;
  if (diff === Math.pow(10, places)) {
    // do substitution like 90 => XC instead of LXXXX
    return (
      NUMERALS[DIGITS.findIndex((x) => x == diff)] +
      NUMERALS[i] +
      romanize(s - msdigit, i + 1)
    );
  } else if (s / DIGITS[i] < 1) {
    // iterate DIGITS until whole number remainders
    return romanize(s, i + 1);
  }
  const rem = s % DIGITS[i];
  let str = "";
  for (let j = 0; j < (s - rem) / DIGITS[i]; ++j) {
    str += NUMERALS[i];
  }
  return str + romanize(rem, i + 1);
}

// f(1235) -> [1000, 4]
function mostSigPlace(s: number): [number, number] {
  const strn = `${s}`;
  const msdigit = Number(strn[0]);
  const places = strn.length;
  return [msdigit * Math.pow(10, places - 1), places - 1];
}

export function testRomanize() {
  console.assert("V" === romanize(5));
  console.assert("IV" === romanize(4));
  console.assert("XC" === romanize(90));
  console.assert("CC" === romanize(200));
  console.assert("CM" === romanize(900));
  console.assert("XI" === romanize(11));
  console.assert("XL" === romanize(40));
  console.assert("MMXVII" == romanize(2017));
  console.assert("MCMXC" == romanize(1990));
}
