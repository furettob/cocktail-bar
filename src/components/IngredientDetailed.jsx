import * as React from 'react'

function IngredientSummary({ingredients, ingredient, index}) {
    return (
        <span>
            <span>{ingredient.ingredient}</span>
            {ingredient.measure && <span className={"cb-copy--muted"}>
                &nbsp;({ingredient.measure}
            </span>}
            {index < ingredients.length -1 ? ", " : "."}
        </span>
    )
}

export default IngredientSummary


