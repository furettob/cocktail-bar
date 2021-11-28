import * as React from 'react'

function IngredientSummary({ingredient}) {
    return (
        <span>
            <span>{ingredient.ingredient}</span>
            {ingredient.measure && <span className={"cb-copy--muted"}>
                &nbsp;({ingredient.measure})
            </span>}
        </span>
    )
}

export default IngredientSummary


