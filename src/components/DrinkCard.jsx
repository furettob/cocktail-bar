import * as React from "react";
import { Fragment, useState } from "react";
import Ingredients from "./Ingredients";
import Tag from "./Tag";
import TagClass from "./TagClass";
import DrinkHeader from "./DrinkHeader";
import "font-awesome/css/font-awesome.min.css";
import { getIngredients } from "../utils/dataHub";

function DrinkCard({ drink, isDetail }) {
  const isAlcoholic = drink.strAlcoholic.toLowerCase() === "alcoholic";
  const [favourite, setFavourite] = useState(false);
  const [infoShown, setInfoShown] = useState(isDetail);
  
  const cb_favourite_clicked = () => {
    setFavourite(!favourite);
  };
  const cb_info_clicked = () => {
    setInfoShown(!infoShown);
  };

  const ingredients = getIngredients(drink);

  return (
    <div className={"cb-drink-card"}>
      {/* Header */}
      <DrinkHeader drink={drink} />

      {/* Text info */}
      <div className="cb-drink-card__text-container">
        {/* Basic info ... ESE-1: add strImageAttribution */}
        <h2 className={"cb-drink-card__title"}>{drink.strDrink}</h2>
        {/* ESE-1 "Challenging" "Simple" a seconda del numero di ingredienti */}
        <p className="cb-copy--muted cb-copy--bold">
          {ingredients.length} ingredients:
        </p>
        <Ingredients ingredients={ingredients} summary={!isDetail} withIntro />

        {/* Info button */}
        {!isDetail && (
          <p>
            <span
              className={"cb-drink-card__show-more"}
              onClick={cb_info_clicked}
            >
              <i className={infoShown ? "fa fa-minus" : "fa fa-plus"} />
              &nbsp;
              {infoShown ? "Less info" : "More info"}
              {/* ESE-3 ternary operator <i className={"fa fa-chevron-up"}/> */}
            </span>
          </p>
        )}

        {/* Details info */}
        {infoShown && (
          <Fragment>
            <p>
              <Tag
                name={isAlcoholic ? "Alcoholic" : "Not alcoholic"}
                type={isAlcoholic ? "warning" : "success"}
              />
              {drink.strTags &&
                drink.strTags
                  .split(",")
                  .map((elem) => <Tag key={elem} name={elem.trim()} />)}
              {drink.strIBA && <Tag name={drink.strIBA} />}
              {drink.strCategory && <Tag name={drink.strCategory} />}
              {drink.strGlass && (
                <TagClass icon={"fa-glass"} name={drink.strGlass} />
              )}
            </p>
            {drink.strInstructions && <p>{drink.strInstructions}</p>}
          </Fragment>
        )}

        {/* Other info ESE-2 strImageAttribution strCreativeCommonsConfirmed (ES: Long Island Tea) */}
      </div>
    </div>
  );
}

export default DrinkCard;
