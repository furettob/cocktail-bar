import * as React from "react"
import Card from "../Card/Card"
import Grid from "../Grid/Grid"
import ImageContainer from "../ImageContainer/ImageContainer"
import Aligner from "../Aligner/Aligner"
import Row from "../Row"
import { useState } from "react"
import Tag from "../TagStylus/TagStylus"

function Usercard({ userdata }) {
  if (!userdata) {
    return ""
  }

  const [favouriteAll, setFavouriteAll] = useState(false)
  const [createdAll, setCreatedAll] = useState(false)

  return (
    <div className={ `cb-usercard`}>
      <Card>
        <Grid>
          <Grid.Column colSpan={3}>
            <Aligner align={"center-left"}>
              <ImageContainer color={"green"} firstname={userdata?.username}/>
            </Aligner>
          </Grid.Column>
          <Grid.Column colSpan={9}>
            <Aligner align={"center-left"}>
              <div>
                <div><i className={"fa fa-user"} />&nbsp;{userdata?.username}</div>
                <div><i className={"fa fa-envelope"} />&nbsp;{userdata?.email}</div>
              </div>
            </Aligner>
          </Grid.Column>
          <Grid.Column colSpan={12}>
            {userdata.favouriteList && Object.keys(userdata.favouriteList).length > 0 ? (
              <Row intro={"I miei cocktail preferiti"} data-testid={"favourite"}>
                {
                  favouriteAll ? <>
                  {Object.keys(userdata.favouriteList).map( (drinkId, index) => {
                    return (<a href={"/drink/" + drinkId} key={drinkId}><Tag icon={"fa-glass"} name={userdata.favouriteList[drinkId].name} big/></a>)
                  })}
                  <span
                    onClick={() => setFavouriteAll(false)} className={"lessfav"}
                  >
                      <i className={"fa fa-minus"} />&nbsp;Show less</span>
                  </> : <>
                    {Object.keys(userdata.favouriteList).slice(0,2).map( (drinkId, index) => {
                      return (<a href={"/drink/" + drinkId} key={drinkId}><Tag icon={"fa-glass"} name={userdata.favouriteList[drinkId].name} big/></a>)
                    })}
                    {
                      Object.keys(userdata.favouriteList).length > 3 && <span
                        onClick={() => {console.log("more fav clicked"); setFavouriteAll(true)}} className={"morefav"}
                      >
                        <i className={"fa fa-plus"} />&nbsp;Show&nbsp;more
                      </span>
                    }
                  </>
                }
              </Row>
            ) : <Row>Non hai ancora cocktail preferiti</Row>}
          </Grid.Column>
          <Grid.Column colSpan={12}>
            {userdata.createdByMeList && Object.keys(userdata.createdByMeList).length > 0 ? (
              <Row intro={"I cocktail realizzati da me"} data-testid={"createdbyme"}>
                {
                  createdAll ? <>
                    {Object.keys(userdata.createdByMeList).map( (drinkId, index) => {
                      return (<Tag icon={"fa-glass"} name={userdata.createdByMeList[drinkId].name} big key={drinkId}/>)
                    })}
                    <span
                      onClick={() => setCreatedAll(false)} className={"lesscreated"}
                    >
                      <i className={"fa fa-minus"} />&nbsp;Show less</span>
                  </> : <>
                    {Object.keys(userdata.createdByMeList).slice(0,2).map( (drinkId, index) => {
                      return (<Tag icon={"fa-glass"} name={userdata.createdByMeList[drinkId].name} big key={drinkId}/>)
                    })}
                    {
                      Object.keys(userdata.createdByMeList).length > 2 && <span
                        onClick={() => setCreatedAll(true)} className={"morecreated"}
                      >
                        <i className={"fa fa-plus"} />&nbsp;Show&nbsp;more
                      </span>
                    }
                  </>
                }
              </Row>
            ) : <Row>Non hai ancora creato cocktail</Row>}
          </Grid.Column>
          <Grid.Column colSpan={12}>
            Iscritto dal
          </Grid.Column>
          <Grid.Column colSpan={12}>
            <Row intro={"Raw info"}>
            {JSON.stringify(userdata, null, 2)}
            </Row>
          </Grid.Column>
        </Grid>
      </Card>
    </div>
  )
}

export default Usercard
