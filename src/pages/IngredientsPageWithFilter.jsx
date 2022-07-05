import * as React from "react"
import Row from "../components/Row"
import IngredientsWithFilter from "../components/IngredientsWithFilter"
import { useEffect, useState } from "react"
import { getAllIngredients } from "../utils/dataHub"

function IngredientsPageWithFilter() {
  const [ingredients, setIngredients] = useState([])

  useEffect(async () => {
    const ing = await getAllIngredients()
    console.log("Using effect::: ", ing.length)
    setIngredients(ing)
  }, [])

  return (
    <div>
      <h1>All Ingredients:</h1>
      {ingredients && (
        <IngredientsWithFilter
          initialSet={ingredients}
          length={ingredients.length}
          initialValues={{
            query: '',
            startsWith: false,
            caseSensitive: false,
          }}
          filterItems={(ingredient, formValues) => {
            let q = formValues.query
            let i = ingredient.strIngredient1
            if (!formValues.caseSensitive) {
              i = i.toUpperCase()
              q = q.toUpperCase()
            }
            if (formValues.startsWith) {
              return i.indexOf(q) === 0
            }
            return i.indexOf(q) > -1
          }}
        />
      )}
    </div>
  )
}

export default IngredientsPageWithFilter
