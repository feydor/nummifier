/* nummifier.test.js */
import nummificate from "./nummifier";

test("does AQ reduction", () => {
  let aq = nummificate("aok")["AQ"];

  expect(aq.method).toEqual("AQ");
  expect(aq.reduce()).toEqual(expect.arrayContaining([54, 9]));

  aq = nummificate("Do what thou wilt shall be the whole of the law")["AQ"];

  expect(aq.reduce()).toEqual(expect.arrayContaining([777, 21, 3]));
});
