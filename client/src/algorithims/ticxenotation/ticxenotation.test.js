/* ticxenotation.test.js - tests Tic-Xenotation functions */
import * as TX from './ticxenotation.js';

test("indexOfPrime works", () => {
  expect(TX.indexOfPrime(53)).toEqual(16);
  expect(TX.indexOfPrime(7)).toEqual(4);
});

test("factor works", () => {
  expect(TX.factor(60)).toEqual([2, 2, 3, 5]);
  expect(TX.factor(3)).toEqual([3]);
});

test("stringify works", () => {
  expect(TX.stringify([':'])).toEqual('(:)');
  expect(TX.stringify([''])).toEqual('()');
});

test("does 1-10 in TX correctly", () => {
  expect(TX.convert(2)).toEqual(":");
  expect(TX.convert(3)).toEqual("(:)");
  expect(TX.convert(4)).toEqual("::");
  expect(TX.convert(5)).toEqual("((:))");
  expect(TX.convert(6)).toEqual(":(:)");
  expect(TX.convert(7)).toEqual("(::)");
  expect(TX.convert(8)).toEqual(":::");
  expect(TX.convert(9)).toEqual("(:)(:)");
  expect(TX.convert(10)).toEqual(":((:))");

  expect(TX.convert(91)).toEqual("(::)(:(:))");
});
