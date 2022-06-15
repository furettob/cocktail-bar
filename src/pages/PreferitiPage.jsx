import * as React from "react"
import Row from "../components/Row"
import { FavouriteContext } from "../context/FavouriteContext"
import FavouriteList from "../components/FavouriteList"

function PreferitiPage() {

  return (
    <div>
      <h1>Favourites</h1>
      <Row>
        Qui si aggiungerà l'array dei cocktail preferiti
        <FavouriteContext.Consumer>
          {
            ({favouriteList, toggleFavouriteFunction}) => <FavouriteList favouriteList={favouriteList}></FavouriteList>
          }
        </FavouriteContext.Consumer>
      </Row>
    </div>
  )
}

export default PreferitiPage
