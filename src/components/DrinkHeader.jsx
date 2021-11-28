import * as React from 'react'
import {Fragment, useState} from 'react'
import Ingredients from './Ingredients'
import Tag from './Tag'
import TagClass from './TagClass'
import 'font-awesome/css/font-awesome.min.css';
import {Link} from "react-router-dom";

function DrinkHeader({drink}) {

    const [favourite, setFavourite] = useState(false)
    const cb_favourite_clicked = () => {
        setFavourite(!favourite)
    }

    return (
        <Fragment>
            <div className={"cb-drink-card__header"}>
                <div className={"cb-drink-card__favourite-button"} onClick={cb_favourite_clicked}>
                    <i className={"fa fa-glass"}/>
                </div>
                <div>
                    <Link to={`/drink/${drink.idDrink}`} params={{drink: drink}}>
                        <i className={"fa fa-info-circle"}/>&nbsp;
                        <span className={"cb-copy cb-copy--white"}>Details</span>
                    </Link>
                </div>
            </div>

            {/* Thumb image */}
            <div className="cb-drink-card__thumb-container">
                <div className="cb-drink-card__thumb" style={{backgroundImage: `url(${drink.strDrinkThumb})`}}/>
            </div>
        </Fragment>
    )
}

export default DrinkHeader