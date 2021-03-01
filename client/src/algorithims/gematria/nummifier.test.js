/* nummifier.test.js */
import * as nmu from "./nummifier";

test("nummificate does AQ reduction", () => {
  let aq = nmu.nummificate("aok")["AQ"];
  expect(aq.reduce()).toEqual(expect.arrayContaining([54, 9]));

  aq = nmu.nummificate("Do what thou wilt shall be the whole of the law")["AQ"];
  expect(aq.reduce()).toEqual(expect.arrayContaining([777, 21, 3]));

  // ignores non-alphanumerical input
  aq = nmu.nummificate('D$$$o      wha_tthouwiltshall b    e the ^^^^*7^6666wholeofthe*(*(law')["AQ"];
  expect(aq.reduce()).toEqual(expect.arrayContaining([777, 21, 3]));
});

test("gematria does AQ", () => {
  let aq = nmu.CIPHERS['AQ'];
  expect(nmu.gematria('AOK', aq)).toEqual(54);
  expect(nmu.gematria('aOk', aq)).toEqual(54); 
  expect(nmu.gematria('NickLand', aq)).toEqual(140); 
  expect(nmu.gematria('Dowhatthouwiltshallbethewholeofthelaw', aq)).toEqual(777);
});

test("gematria does GoN1", () => {
  let gon1 = nmu.CIPHERS['GoN1'];
  expect(nmu.gematria('aok', gon1)).toEqual(15);
});

test("does GoN2", () => {
  let gon2 = nmu.CIPHERS['GoN2'];
  expect(nmu.gematria('aok', gon2)).toEqual(14);
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

test("range works", () => {
  expect(nmu.range(2, 8, 2)).toEqual([2, 4, 6]);
  expect(nmu.range(0, 3)).toEqual([0, 1, 2]);
  expect(nmu.range(-4, 1)).toEqual([-4, -3, -2, -1, 0]);
  expect(nmu.range(-4, 1, 2)).toEqual([-4, -2, 0]);
});
