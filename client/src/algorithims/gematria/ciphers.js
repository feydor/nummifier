/* ciphers.js */

const ALPHANUM = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";

/**
 * nine twin-summing
 * @param {string} str
 * @return {Object} { "AQ": { method:string, sum:function }, ... }
 * NOTE: sum is returned as a function for individual, on-demand computation
 * @example:
 * - gematria("aok")["AQ"].sum() = 140;
 */
export function gematria(str) {
  let map = [];

  // maps str to indices of ALPHANUM
  for (let i of str.toUpperCase()) {
    if ([...ALPHANUM].includes(i)) map.push([...ALPHANUM].indexOf(i));
  }

  // sums map-cipher mapped values for each cipher
  let container = {};
  for (let key in ciphers) {
    container[key] = {
      cipher: key,
      sum: function () {
        let sum = 0;
        for (let j of map) sum += ciphers[this.cipher][j];
        return sum;
      },
    };
  }

  return container;
}

/**
 * like range() in python
 * @param {number} start - inclusive
 * @param {number} end - exclusive
 * @param {number} step - optional, defaults to 1
 * @return {array} starting from 'start' and ending at 'end', inclusive
 * @example:
 * - range(0, 3) = [0, 1, 2]
 * - range(2, 8, 2) = [2, 4, 6]
 */
export function range(start, end, step = 1) {
  return Array(Math.ceil((end - start) / step))
    .fill(start)
    .map((x, y) => x + y * step);
}

const ciphers = {
  AQ: range(0, 36),
  // AZ source: https://web.archive.org/web/20070701190937/http://www.songofazrael.org/azrael-1.html
  // AZ: [...range(9, 1, -1), ...[9], ...range(1, 9)]
  // GoN source: https://eianorange.zenseiderz.org/gon/
  GoN1: [...range(0, 10), ...range(13, -13, -1)],
  GoN2: [...range(0, 10), ...range(13, 0, -1), ...range(-1, -14, -1)],
  GoN3: [
    ...range(0, 10),
    ...[
      1,
      -10,
      7,
      -3,
      -13,
      -9,
      6,
      -2,
      12,
      -8,
      5,
      -1,
      11,
      4,
      -7,
      -13,
      10,
      -6,
      3,
      -12,
      9,
      -5,
      2,
      -11,
      8,
      -4,
    ],
  ],
};
