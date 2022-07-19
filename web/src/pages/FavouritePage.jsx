import * as React from "react"
import Row from "../components/Row"
import { FavouriteContext } from "../context/FavouriteContext"
import FavouriteList from "../components/FavouriteList"
import withFilter from "../hocs/withFilter"
import { Field, Form, Formik } from "formik"

const initialValues={query:"1"}

function FavouriteListBase({set, handleQueryParamsChange}) {

  let debounce = null
  const debounceTime = 500

  return (
    <div>
      <Formik
        initialValues={initialValues}
        onSubmit={async values => {
          clearTimeout(debounce)
          debounce = setTimeout( () => {
            console.log(JSON.stringify(values, null, 2))
            handleQueryParamsChange(values)
          }, debounceTime)
        }}
      >
        { props => {
          const changeAndSubmit = e => {
            props.handleChange(e);
            props.handleSubmit()
          }
          return (
            <Form>
              <Field id="query" name="query" placeholder="Start typing..." onChange={changeAndSubmit} />
              <label htmlFor={"query"} className={"cb-ml-16"}>It works with id (numerical)</label>
            </Form>
          )
        }
        }
      </Formik>
      <FavouriteList favouriteList={set}/>
    </div>
  )
}

const FavouriteListWithFilter = withFilter(FavouriteListBase)

function FavouritePage() {

  return (
    <div>
      <Row>
        <FavouriteContext.Consumer>
          {
            ({favouriteList}) => <>
              <h1>Favourites ({favouriteList.length})</h1>
              <FavouriteListWithFilter
                initialSet={Object.keys(favouriteList)}
                initialValues={initialValues}
                filterItems={
                  (itemId, formValues) => {
                    return true //itemId.toString().indexOf(formValues.query)>-1
                  }
                }
              />
            </>
          }
        </FavouriteContext.Consumer>
      </Row>
    </div>
  )
}

export default FavouritePage
