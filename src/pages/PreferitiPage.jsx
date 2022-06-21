import * as React from "react"
import Row from "../components/Row"
import { FavouriteContext } from "../context/FavouriteContext"
import FavouriteList from "../components/FavouriteList"

function PreferitiPage() {

  return (
    <div>
      <Row>
        <FavouriteContext.Consumer>
          {
            ({favouriteList}) => <>
              <h1>Favourites ({favouriteList.length})</h1>
              <FavouriteList favouriteList={favouriteList}></FavouriteList>
            </>
          }
        </FavouriteContext.Consumer>
      </Row>
    </div>
  )
}

export default PreferitiPage
