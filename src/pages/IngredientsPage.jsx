import * as React from "react"
import Row from "../components/Row"
import { useEffect, useState } from "react"
import withFiltering from "../hocs/withFiltering"
import withDummyClick from "../hocs/withBasicHOC"
import { getAllIngredients } from "../utils/dataHub"
import Hoc from "../hocs/withExample1HOC"

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
            withDummyClick(
              () => (<span className={"cb-p-16 cp-d-ib"}>
                <span className={"cb-p-16 cb-bg-blue"}>{ing?.strIngredient1}</span></span>),
              () => { console.log(`Found ${ing?.strIngredient1} ingredients`)}
            )
          ))}
        </Row> )
      }
      )}
    </div>
  )
}

export default IngredientsPage
