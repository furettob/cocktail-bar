import * as React from "react"
import Row from "../components/Row"
import { useEffect, useState } from "react"

import { getAllIngredients } from "../utils/dataHub"

function IngredientsPage() {
  const [ingredients, setIngredients] = useState([])

  useEffect(async () => {
    const ing = await getAllIngredients()
    console.log("ING::::: ", ing)
    setIngredients(ing)
  }, [])

  return (
    <div>
      <h1>All Ingredients:</h1>
      {ingredients && (
        <Row>
          {/* ESE-4 */}
          {ingredients.map(ing => (
            <span className={"cb-p-16"}><span className={"cb-p-16 cb-bg-blue"}>{ing?.strIngredient1}</span></span>
          ))}
        </Row>
      )}
    </div>
  )
}

export default IngredientsPage
