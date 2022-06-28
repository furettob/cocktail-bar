import * as React from "react"
import Row from "../components/Row"
import { FavouriteContext } from "../context/FavouriteContext"
import FavouriteList from "../components/FavouriteList"
import withFilter from "../hocs/withFilter"

function FavouriteListWithFilterBase({ set, handleQueryChange, query}) {
  return (
    <div>
      <div className={"cb-mb-16"}>
        <input value={query} onChange={e => handleQueryChange(e)}/>
        <label className={"cb-ml-16"}>It works with id (numerical)</label>
      </div>
      <FavouriteList favouriteList={set}/>
    </div>
  )
}

const FavouriteListWithFilter = withFilter(FavouriteListWithFilterBase, "", (itemId, query) => {
  return itemId.toString().indexOf(query)>-1
})

function PreferitiPage() {

  return (
    <div>
      <Row>
        <FavouriteContext.Consumer>
          {
            ({favouriteList}) => <>
              <h1>Favourites ({favouriteList.length})</h1>
              <FavouriteListWithFilter initialSet={favouriteList} />
            </>
          }
        </FavouriteContext.Consumer>
      </Row>
    </div>
  )
}

export default PreferitiPage
