import Axios from "axios"

export async function getCocktails(searchStr) {
  const resp = await Axios.get(
    "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=" + searchStr
  )
  if (!resp?.data || resp.data === "") {
    console.log("ERROR::::: ", resp)
    return { error: resp }
  }

  console.log("COCKTAIL SEARCH DATA FOR " + searchStr + " :::: ", resp)

  return resp.data.drinks || []
}

export async function getRandomCocktail() {
  const resp = await Axios.get(
    "https://www.thecocktaildb.com/api/json/v1/1/random.php"
  )
  if (!resp?.data || resp.data === "") {
    console.log("ERROR::::: ")
    return { error: resp }
  }
  return resp.data.drinks
}

export async function getDrinkById(id) {
  const resp = await Axios.get(
    `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`
  )
  if (!resp?.data || resp.data === "") {
    console.log("ERROR::::: ")
    return { error: resp }
  }

  return resp.data.drinks[0]
}

export async function getIngredientByName(name) {
  const resp = await Axios.get(
    `https:/www.thecocktaildb.com/api/json/v1/1/search.php?i=${name.toLowerCase()}`
  )
  if (!resp?.data || resp.data === "") {
    console.log("ERROR::::: ")
    return { error: resp }
  }

  return resp.data.ingredients[0]
}

export async function getAllIngredients() {
  console.log("getAllIngredients")
  const resp = await Axios.get(
    "https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list"
  )
  if (!resp?.data || resp.data === "") {
    console.log("ERROR::::: ")
    return { error: resp }
  }

  console.log("INGREDIENTS DATA:::: ", resp)

  return resp?.data?.drinks
}

export function getIngredients(drink) {
  const ingredients = Array.from(Array(25).keys())
    .map((elem, index) => {
      if (drink["strIngredient" + index]) {
        return {
          id: encodeURIComponent(drink["strIngredient" + index].toLowerCase()),
          ingredient: drink["strIngredient" + index],
          measure: drink["strMeasure" + index]
            ? drink["strMeasure" + index].trim()
            : null
        }
      }
    })
    .filter(elem => !!elem)

  return ingredients
}
