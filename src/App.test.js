import { render, screen } from '@testing-library/react';
const { gematria, reduce, toAQ, QueryBar, App } = require('./App');

//test('renders learn react link', () => {
  //render(<App />);
  //const linkElement = screen.getByText(/learn react/i);
  //expect(linkElement).toBeInTheDocument();
//});

// Testing gematria (AQ only)
// input: neoroman encoded string (no spaces, invalid characters etc)
// output: number, or 0 if error
test('gematria', () => {
	// basic neoroman words
	expect(gematria('nickland')).toEqual(140);
	expect(gematria('aynrand')).toEqual(140);
	expect(gematria('dowhatthouwiltshallbethewholeofthelaw')).toEqual(777);
	
	// mixed capitalization should NOT impact the result
	expect(gematria('NICKLAND')).toEqual(140);
	expect(gematria('NickLand')).toEqual(140);
	expect(gematria('nIckLanD')).toEqual(140);
	
	// Testing errors, all errors return 0
	// whitespace
	expect(gematria('nick land')).toEqual(0);
	expect(gematria(' ')).toEqual(0);
	// empty string
	expect(gematria('')).toEqual(0);
	// number, array, Object
	expect(gematria(666)).toEqual(0);
	expect(gematria([1, 2, 3])).toEqual(0);
	expect(gematria(['one', 'two', 'three'])).toEqual(0);
	expect(gematria({ category1: 'variable1', category2: 666 })).toEqual(0);

});

// Testing reduce
// reduces an n digit number by summation,
// ie: 1 iteration of the total digital reduction
// ex: 78 => 15
// ex: 9999 => 36
// input: n digit number
// output: n-1 digit number
test('reduce', () => {
	// basic numbers
	expect(reduce(78)).toEqual(15);
	expect(reduce(9999)).toEqual(36);
	expect(reduce(7)).toEqual(7);
	expect(reduce(0)).toEqual(0);
	
	// negative numbers
	expect(reduce(-78)).toEqual(1);
	expect(reduce(-99)).toEqual(0);
});

// Testing toAQ, the higher oder caller of gematria() and reduce()
// input: neoroman encoded string
// output: array containing a complete digital reduction [n, n-1, n-2, ...]
// NOTE: input validation errors are handled in gematria()
test('toAQ', () => {
	// basic neoroman words
	expect(toAQ('dowhatthouwiltshallbethewholeofthelaw')).toEqual(expect.arrayContaining([777, 21, 3]));
	expect(toAQ('aynrand')).toEqual(expect.arrayContaining([140, 5]));
});

//~ test('toAQ', async() => {
	//~ try {
        //~ const count = await Service.count();
        //~ await request(app).post('/api/services').send(service)
        //~ const newCount = await Service.count()
        //~ expect(newCount).toBe(count + 1);
    //~ } catch (err) {
        //~ // write test for failure here
        //~ console.log(`Error ${err}`)
    //~ }
//~ });
