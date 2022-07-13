const {checkConnection, getDrinksById} = require("./api");
const {getRandomCocktail} = require("./dataHub")

const DRINKID = "-N6lK16srpEMccMHQJCQ"

test('API from firebase are responding', async () => {
  const data = await checkConnection();
  expect(data.msg).toBeTruthy();
  expect(data.msg).toMatch("Connection is live");
});

test('API from firebase gives cocktail', async () => {
  const data = await getDrinksById(null, {drinkIdList:DRINKID});
  expect(Array.isArray(data)).toBeTruthy();
  expect(data[0]).toBeTruthy();
  expect(data[0]?.id).toMatch(DRINKID);
});

test('API from Cocktailbar DB gives random cocktail', async () => {
  const data = await getRandomCocktail();
  expect(Array.isArray(data)).toBeTruthy();
  expect(data[0]).toBeTruthy();
  expect(data[0]?.strDrink).toBeTruthy();
});
