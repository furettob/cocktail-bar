const authorsArray = require('./StaticData/authors.json');

test('We are 7 authors', () => {
  expect(authorsArray.length).toBe(7);
});
