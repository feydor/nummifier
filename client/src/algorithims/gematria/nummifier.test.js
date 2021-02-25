/* nummifier.test.js */
import * as nmu from "./nummifier";

test("does AQ reduction", () => {
  let aq = nmu.nummificate("aok")["AQ"];

  expect(aq.method).toEqual("AQ");
  expect(aq.reduce()).toEqual(expect.arrayContaining([54, 9]));

  aq = nmu.nummificate("Do what thou wilt shall be the whole of the law")["AQ"];

  expect(aq.reduce()).toEqual(expect.arrayContaining([777, 21, 3]));
});

test("reduce works", () => {
  expect(nmu.reduce(17)).toEqual(8);
  expect(nmu.reduce(9999)).toEqual(36);
  expect(nmu.reduce(7)).toEqual(7);
  expect(nmu.reduce(1000)).toEqual(1);

  // must handle negative numbers
  expect(nmu.reduce(-88)).toEqual(0);
  expect(nmu.reduce(-12)).toEqual(1);
});
