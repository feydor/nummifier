/* nummifier.js - digital reduction algorithm */
import * as ciph from "./ciphers.js";

/**
 * full digital reduction of any query string using ciphers.gematria() function
 * @param {string} query
 * @return {Object} { 'AQ': { method:string, reduce: [numbers] } }
 * @example:
 * - nummificate("aok")["AQ"].reduce() = [54, 9]
 */
export function nummificate(query) {
  let ciphers = ciph.gematria(query);

  let container = {};
  for (let key in ciphers) {
    container[key] = {
      method: key,
      reduce: function () {
        let acc = ciphers[key].sum(); // initialize acc with first reduction
        let res = [acc]; // results

        // reduce until single digit, keep track of reductions
        while (acc >= 10) {
          acc = reduce(acc);
          res.push(acc);
        }
        return res;
      },
    };
  }
  return container;
}

/**
 * reduces an n digit number by summation
 * @param {number} num
 * @return {number}
 * @example:
 * - reduce(78) = 15
 * - reduce(9999) = 36
 */
export function reduce(num) {
  if (isNaN(num)) throw new Error('Argument is NaN.');
  let digits = String(num).match(/-?\d/g).map(Number); // match positive or negative nums
  return digits.reduce((prev, curr) => prev + curr);
}
