import {cleanup, fireEvent, render} from "@testing-library/react"
import InfoSection from "./InfoSection"

const drink = {
  "idDrink": "11375",
  "strDrink": "Foxy Lady",
  "strDrinkAlternate": null,
  "strTags": null,
  "strVideo": null,
  "strCategory": "Ordinary Drink",
  "strIBA": null,
  "strAlcoholic": "Alcoholic",
  "strGlass": "Cocktail glass",
  "strInstructions": "Shake all ingredients with ice, strain into a chilled cocktail glass, and serve.",
  "strInstructionsES": null,
  "strInstructionsDE": null,
  "strInstructionsFR": null,
  "strInstructionsIT": "Shakerare tutti gli ingredienti con ghiaccio, filtrare in una coppetta da cocktail fredda e servire.",
  "strInstructionsZH-HANS": null,
  "strInstructionsZH-HANT": null,
  "strDrinkThumb": "https://www.thecocktaildb.com/images/media/drink/r9cz3q1504519844.jpg",
  "strIngredient1": "Amaretto",
  "strIngredient2": "Creme de Cacao",
  "strIngredient3": "Light cream",
  "strIngredient4": null,
  "strIngredient5": null,
  "strIngredient6": null,
  "strIngredient7": null,
  "strIngredient8": null,
  "strIngredient9": null,
  "strIngredient10": null,
  "strIngredient11": null,
  "strIngredient12": null,
  "strIngredient13": null,
  "strIngredient14": null,
  "strIngredient15": null,
  "strMeasure1": "1/2 oz ",
  "strMeasure2": "1/2 oz ",
  "strMeasure3": "2 oz ",
  "strMeasure4": null,
  "strMeasure5": null,
  "strMeasure6": null,
  "strMeasure7": null,
  "strMeasure8": null,
  "strMeasure9": null,
  "strMeasure10": null,
  "strMeasure11": null,
  "strMeasure12": null,
  "strMeasure13": null,
  "strMeasure14": null,
  "strMeasure15": null,
  "strImageSource": null,
  "strImageAttribution": null,
  "strCreativeCommonsConfirmed": "No",
  "dateModified": "2017-09-04 11:10:44"
}

it('Info section open', () => {
  const {queryByText, getByText} = render(<InfoSection drink={drink} />)

  expect(queryByText(/More Info/i)).toBeTruthy()
  expect(queryByText(/Less Info/i)).toBeFalsy()

  fireEvent.click(getByText(/More Info/i))

  expect(queryByText(/More Info/i)).toBeFalsy()
  expect(queryByText(/Less Info/i)).toBeTruthy()
})


/*it('Info section open', () => {
  <InfoSection drink={} isDetail/>
})*/
