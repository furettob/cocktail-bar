import Axios from "axios"

export async function getCocktails(searchStr) {
  const resp = await Axios.get(
    "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=" + searchStr
  )
  if (!resp?.data || resp.data === "") {
    console.log("ERROR::::: ")
    return { error: resp }
  }

  console.log("COCKTAIL SEARCH DATA FOR " + searchStr + " :::: ", resp)

  return resp.data.drinks || []
}

export async function getRandomCocktail() {
  console.log("getRandomCocktail")
  const resp = await Axios.get(
    "https://www.thecocktaildb.com/api/json/v1/1/random.php"
  )
  if (!resp?.data || resp.data === "") {
    console.log("ERROR::::: ")
    return { error: resp }
  }

  console.log("RANDOM COCKTAIL DATA:::: ", resp)

  return resp.data.drinks
}

export async function getDrinkById(id) {
  console.log("getDrinkById ", id)
  const resp = await Axios.get(
    `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`
  )
  if (!resp?.data || resp.data === "") {
    console.log("ERROR::::: ")
    return { error: resp }
  }

  console.log("DRINK DATA:::: ", resp.data.drinks[0])

  return resp.data.drinks[0]
}

export function getIngredients(drink) {
  const ingredients = Array.from(Array(25).keys())
    .map((elem, index) => {
      if (drink["strIngredient" + index]) {
        return {
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
