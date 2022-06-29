/* nummifier.js - gematria and digital reduction algorithms
 * AZ source: https://web.archive.org/web/20070701190937/http://www.songofazrael.org/azrael-1.html
 * GoN source: https://eianorange.zenseiderz.org/gon/
 */

export interface NummifierResult {
  [cipher: string]: {
    reduce: (query: string) => number[];
  }
};

const ALPHANUM = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
export const NummifierCiphers = {
    AQ: range(0, 36),
    AZ: [...range(9, 1, -1), ...[9], ...range(1, 9)],
    GoN1: [...range(0, 10), ...range(13, -13, -1)],
    GoN2: [...range(0, 10), ...range(13, 0, -1), ...range(-1, -14, -1)],
    GoN3: [...range(0, 10), ...[1, -10, 7, -3, -13, -9, 6, -2, 12, -8, 5,
        -1, 11, 4, -7, -13, 10, -6, 3, -12, 9, -5, 2, -11, 8, -4]],
};


/**
 * full digital reduction of any query string
 * @example
 * - const nummifier = initNummifier()
 * - nummifier["AQ"].reduce("aok") = [54, 9]
 */
 export default function initNummifier(): NummifierResult {
    let nummifier = {};
    for (const [key, cipher] of Object.entries(NummifierCiphers)) {
      nummifier[key] = {
        reduce: function(query: string): number[] {
          if (query.length === 0 || query === null) return [];
          let sanitized_query = query.match(/[A-Z]/ig);
          if (!sanitized_query) return [];
          let n = gematria(sanitized_query.join(""), cipher); // get the first reduction
          let results = [n];
          
          while (Math.abs(n) > 9) {
            n = decimate(n);
            results.push(n);
          }
          return results;
        }
      }
    }
    return nummifier;
}


/**
 * reduces an n digit number by summation
 * @example
 * - reduce(78) = 15
 * - reduce(9999) = 36
 */
 function decimate(n: number): number {
  if (isNaN(n)) throw new Error('Argument is NaN.');
  return Math.abs(n) < 10 ? n : Math.abs(n) % 10 + decimate(Math.trunc(n/10));
}


/**
 * nine twin-summing
 * @param {string} str, alphanumerals only and without spaces
 * @param {Array} cipher, an array with a 1-to-1 relationship with the Alphanumericals
 * @example
 * - gematria("aok") = 140;
 */
 function gematria(str: string, cipher = NummifierCiphers['AQ']): number {
  let _str = str.toUpperCase(); // sanitize input
  if (_str.length == 0) {
    return 0;
  } else {
    let strArr = Array.from(_str);
    return cipher[ALPHANUM.indexOf(strArr.pop())] + gematria(strArr.join(''), cipher);
  }
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
  