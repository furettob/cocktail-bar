import {describe, expect, test} from '@jest/globals'

const {getDrinksById, checkConnection} = require("./api")
const { getRandomCocktail, getIngredientByName } = require("./dataHub")

const DRINKID = "-N6lK16srpEMccMHQJCQ"

test("API from Firebase are live", async () => {
  const data = await checkConnection()
  expect(data).toBeTruthy()
  expect(data.msg).toMatch("Connection is live")
})

test("API from Firebase are responding (drink)", async () => {
  const data = await getDrinksById(null, {drinkIdList:DRINKID})
  expect(data).toBeTruthy()
  expect(Array.isArray(data)).toBeTruthy()
  expect(data[0]?.name).toBeTruthy()
  expect(data[0]?.id).toMatch(DRINKID)
})

test("API from CocktailDB are responding (drink)", async () => {
  const data = await getRandomCocktail()
  expect(Array.isArray(data)).toBeTruthy()
  expect(data[0]?.strDrink).toBeTruthy()
})

test("API from CocktailDB are responding (ingredient)", async () => {
  const data = await getIngredientByName("VODka")
  console.log("DDDD::::: ", data)
  expect(data[0]?.strDrink).toBeTruthy()
})
