import * as React from 'react'

function Ingredients({drink}) {

    const ingredients = Array.from(Array(25).keys()).map( (elem, index) => {
        if (drink["strIngredient" + index]) {
            return {
                "ingredient": drink["strIngredient" + index],
                "measure": drink["strMeasure" + index] ? drink["strMeasure" + index].trim() : null
            }
        }
    }
    ).filter(elem => !!elem)

    console.log(ingredients)
    return (
      ingredients.map((elem, index) => {
        return (<span>
            <span>{elem.ingredient}</span>
            {elem.measure && " "}
            {elem.measure && <span className={"cb-copy--muted"}>({elem.measure})</span>}
            {index < ingredients.length -1 ? ", " : ""}
        </span>)
      }
    ))
}

export default Ingredients