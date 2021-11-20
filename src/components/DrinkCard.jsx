import * as React from 'react'
import {useState} from 'react'
import Ingredients from './Ingredients'
import Tag from './Tag'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function DrinkCard({drink}) {

    const alcoholic = drink.strAlcoholic
    const [favourite, setFavourite] = useState(false)

    return (
      <div className={"cb-drink-card"}>
          <div className={drink.alcoholic ? "cb-drink-card__header cb-drink-card__header--alcoholic" : "cb-drink-card__header"}>
              <FontAwesomeIcon icon={["far", "coffee"]} />
          </div>
          <div className="cb-drink-card__thumb-container">
              <div className="cb-drink-card__thumb" style={{backgroundImage: `url(${drink.strDrinkThumb})`}}/>
          </div>
          <div className="cb-drink-card__text-container">
              <h2 className={"cb-drink-card__title"}>{drink.strDrink}</h2>
              <p>
                  <Tag name={alcoholic ? "Alcoholic" : "Not alcoholic"} type={alcoholic ? "warning" : "success"}/>
                  {drink.strTags && drink.strTags.split(",").map( elem => <Tag key={elem} name={elem.trim()}/> )}
                  {drink.strIBA && <Tag name={drink.strIBA} />}
                  {drink.strCategory && <Tag name={drink.strCategory} />}
                  {drink.strGlass && <Tag name={drink.strGlass} />}
              </p>
              <p><Ingredients drink={drink}/></p>
              {drink.strInstructions && <p>{drink.strInstructions}</p>}
          </div>
      </div>
    )
}

export default DrinkCard