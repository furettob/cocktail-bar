import * as React from 'react'
import {Fragment} from "react";

function Ingredients({ingredients}) {

    return (
        <Fragment>
            <span>{ingredients.length} ingredients: </span>
            {ingredients.map((elem, index) => <span>
            <span>{elem.ingredient}</span>
            {elem.measure && <span className={"cb-copy--muted"}>
                &nbsp;({elem.measure})
            </span>}
            {index < ingredients.length -1 ? ", " : "."}
        </span>)}
        </Fragment>
    )
}

export default Ingredients


