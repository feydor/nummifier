/* nummifier.js - digital reduction algorithm */
import { gematria } from './ciphers.js';

/**
 * full digital reduction of any query string using ciphers.gematria() function
 * @param {string} query
 * @return {Object} { 'AQ': { method:string, reduce: [numbers] } }
 */
function nummificate(query) {
  let ciphers = gematria(query);
  
  let container = {};
  for (let key in ciphers) {
    container[key] = {
      method: key,
      reduce: function() {
        let acc = ciphers[key].sum(); // initialize acc with first reduction
        let res = [ acc ];         // results
        
        // reduce until single digit, keep track of reductions
        while (acc >= 10) {
          acc = reduce(acc);
          res.push(acc);
        }

        return res;
      }
    }
  }

  return container;
}

/**
 * reduces an n digit number by summation
 * @param {number} num
 * @return {number}
 * @example 78 => 15, 9999 => 36
 */
function reduce(num) {
  let arr = [];
  // stringify num and spread into an array,
  // split each char into a separate nested array,
  // parse ints and push into arr
  let parsedArr = [...num.toString()];
  let nestedparsedArr = parsedArr.map((elem) => {
    return [elem];
  });
  // takes the first two elements (the leading digit and the number's sign)
  // and concatenates them at the front of the array
  // example input: -123
  if (num < 0) {
    let flippedSignNum = nestedparsedArr[0].concat(nestedparsedArr[1]).join(""); // output: "-1"
    nestedparsedArr = nestedparsedArr.slice(2); // slice off the first two characters
    nestedparsedArr = [flippedSignNum, ...nestedparsedArr]; // attach flippedSign to nestedArr
  }
  nestedparsedArr.forEach((char) => {
    arr.push(parseInt(char));
  });
  // sum up the digits in arr
  return arr.reduce((acc, curr) => {
    return acc + curr;
  });
}

export default nummificate;

// reduces an n digit number by summation
// ex: 78 => 15
// ex: 9999 => 36
// input: positive n digit number
// output: positive n-1 digit number
//~ function reduceNonNegative(num) {
//~ let arr = [];
//~ // add each seperate digit into arr
//~ // ex: 999 => [9, 9, 9]
//~ while (num !== 0) {
//~ let currDigit = num % 10;
//~ arr.push(currDigit);
//~ num = Math.trunc(num / 10);
//~ }
//~ // sum up the digits in arr
//~ return arr.reduce((acc, curr) => {
//~ return acc + curr;
//~ });
//~ }
