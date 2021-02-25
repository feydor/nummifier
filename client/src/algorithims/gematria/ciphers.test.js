/* ciphers.test.js - tests gematria functions */
import * as cipher from "./ciphers.js";

test("does AQ", () => {
  let aq = cipher.gematria("aok")["AQ"];

  expect(aq.cipher).toEqual("AQ");
  expect(aq.sum()).toEqual(54);

  aq = cipher.gematria("Nick Land")["AQ"];
  expect(aq.sum()).toEqual(140);
});

test("does GoN1", () => {
  let gon1 = cipher.gematria("aok")["GoN1"];

  expect(gon1.cipher).toEqual("GoN1");
  expect(gon1.sum()).toEqual(15);
});

test("does GoN2", () => {
  let gon2 = cipher.gematria("aok")["GoN2"];

  expect(gon2.cipher).toEqual("GoN2");
  expect(gon2.sum()).toEqual(14);
});

test("range works", () => {
  expect(cipher.range(2, 8, 2)).toEqual([2, 4, 6]);
  expect(cipher.range(0, 3)).toEqual([0, 1, 2]);
  expect(cipher.range(-4, 1)).toEqual([-4, -3, -2, -1, 0]);
  expect(cipher.range(-4, 1, 2)).toEqual([-4, -2, 0]);
});
