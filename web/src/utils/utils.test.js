const authorsArray = require('./StaticData/authors.json');

test('We are 7 authors', () => {
  expect(authorsArray.length).toBe(7);
});

test('No authors without name', () => {
  expect(authorsArray.filter( item => item.name === null || item.name === undefined).length).toBe(0);
});
