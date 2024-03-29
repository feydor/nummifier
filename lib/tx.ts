/* ticxenotation.js - functions for conversion to Tic-Xenotation
 * for specifications see:
 * https://mvupress.net/tic-xenotation/
 * https://hyperstition.abstracydynamics.org/archives/005047.html
 * prime factorization functions based on:
 * https://www.nayuki.io/res/calculate-prime-factorization-javascript
 * TX functions based on:
 * https://mvupress.net/txconverter.html
 */

/* globals */
let gPrimes = [];
gPrimes = sieve(5);
const MAX = 4294967296;

/**
 * Returns the Tic-Xenotation overcoding of n
 * @throws RangeError if n is NaN or out of range (0, MAX)
 * @example:
 * - convert(5) = '((:))'
 * - convert(1) = ':(-P)'
 */
export default function xenotate(n: number): string {
  if (!n || isNaN(n) || n < 0 || n >= MAX)
    throw new RangeError('Argument is invalid');
  if (n < 2) return '(-P):'
  return alphaToTx(n, ':').map(stringify).join('');
}

/**
 * Returns the Reduced Tic-Xenotation overcoding of n
 * @throws RangeError if n is NaN or out of range (0, MAX)
 * @example:
 * - reduce(5) = '((((0))))'
 * - reduce(86) = '((0))(((0))(((0))((0))))'
 */
function reduce(n: number): string {
  if (!n || isNaN(n) || n < 0 || n >= MAX)
    throw new RangeError('Argument is invalid');
  if (n < 2) return '(0)';
  return alphaToTx(n, '((0))').map(stringify).join('');
}

/**
 * Returns the number as a product of its primes factoriziation implexed,
 * implex is the operation of replacing a number with its index on the prime number line
 * @return {Array} 
 * @example:
 * - alphaToTx(18, ':') = [':', [':'], [':']]
 * - alphaToTx(8, ':') = [':', ':', ':']
 * - alphaToTx(21, ':') = [':', [':', ':']]
 */
function alphaToTx(n: number, primitive = ':') {
  if (n < 2) return [""];
  const factors = factor(n);

  return factors.map( (f) => ( f == 2 ? primitive : alphaToTx( indexOfPrime(f), primitive ) ) );
}

/**
 * Returns a tic-cluster array wrapped in a implextion
 * @param {array} arr
 * @example:
 * - stringify(['::']) = ['(::)']
 * - stringify([':', ['::']]) = [':(::)']
 */
const stringify = (arr: []) => {
  if (Array.isArray(arr)) {
    return `(${arr.reduce((prev, curr) => prev + stringify(curr), "")})`;
  }
  return arr;
};

/*
 * Returns the prime factorization of n
 * @param {number} n
 * @return {array} factors
 * @example:
 * - factor(60) = [2, 2, 3, 5]
 */
function factor(n: number): number[] {
  let factors = [];
  if (!n || isNaN(n) || n < 1 || n >= MAX) {
    return factors;
  }

  while (n != 1) {
    let f = smallestFactor(n);
    factors.push(f);
    n /= f;
  }

  return factors;
}

/*
 * Returns the smallest prime factor of n
 * @throws RangeError when n < 2
 * @example:
 * - smallestFactor(15) = 3
 * - smallestFactor(16) = 2
 */
function smallestFactor(n: number): number {
  if (n < 2) throw new RangeError("Argument must be 2 or greater.");
  if (n % 2 === 0) return 2;

  let end = Math.floor(Math.sqrt(n));

  for (let i = 3; i <= end; i += 2) {
    if (n % i === 0) return i;
  }

  return n;
}

/**
 * Returns the prime factorization as factor-power pairs
 * @example:
 * - factorPowers([3, 5]) = [[3, 1], [5, 1]]
 * - factorPowers([2, 2, 3, 3]) = [[2, 2], [3, 2]]
 */
function factorPowers(factors: number[]) {
  let results = [];
  let prevFactor = factors[0];
  let count = 1;

  for (let i = 0; i < factors.length; i++) {
    if (factors[i] === prevFactor) {
      count++;
    } else {
      results.push([prevFactor, count]);
      prevFactor = factors[i];
      count = 1;
    }
  }

  results.push([prevFactor, count]);
  return results;
}

/**
 * Returns all prime numbers from 2 through n
 * @example:
 * - sieve(5) = [2, 3, 5]
 * - sieve(29) = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29]
 */
function sieve(n: number): number[] {
  if (gPrimes[gPrimes.length - 1] >= n) return gPrimes;
  const a = new Array(n + 1).fill(0);

  for (let i = 2; i < a.length; i++) {
    for (let j = i * 2; j < a.length; j += i) {
      a[j] = 1;
    }
  }

  gPrimes = a
    .map((n, i) => (!n ? i : 0))
    .filter((n) => n)
    .slice(1);
  return gPrimes;
}

/**
 * returns the index of n on the prime number line
 * @example:
 * - indexOfPrime(7) = 4
 * - indexOfPrime(53) = 16
 */
function indexOfPrime(n: number): number {
  if (n < 2) throw new RangeError("Argument must be 2 or greater.");
  if (gPrimes.includes(n)) return gPrimes.indexOf(n) + 1;
  return sieve(n).indexOf(n) + 1;
}
