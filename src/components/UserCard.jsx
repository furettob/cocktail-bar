import * as React from 'react'

function UserCard({ingredient}) {
    return (
        <div className={"cb-user-card"}>
            <div className={"cb-user-card__image-container"}><img className={"cb-user-card__image"} src={`https://www.thecocktaildb.com/images/ingredients/${encodeURIComponent(ingredient.ingredient)}.png`}/></div>
            <div>
                <div className={"cb-mb-16"}><div className={"cb-copy cb-copy--bold"}>{ingredient.ingredient}</div></div>
                <div className={"cb-copy"}>{ingredient.measure || "---"}</div>
            </div>
        </div>
    )
}
{/* ESE-7 Create a media object to abstract the behaviour of this component and IngredientDetailed */}
export default UserCard


