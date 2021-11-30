import * as React from 'react'
import 'font-awesome/css/font-awesome.min.css'
import UserCard from './UserCard'
import Row from './Row'
import authors from '../utils/StaticData/authors.json'

function ColophonComponents() {

    return (
      <div className={"cb-colophon"}>
          <Row>
              <p className={"cb-copy cb-copy--muted"}>
                  Little web app made and updated with <i className={"fa fa-heart"}/> from:
              </p>
              {authors.map((author, index) =>
                  <UserCard user={author} key={author?.name || index}/>
              )}
          </Row>
      </div>
    )
}

export default ColophonComponents