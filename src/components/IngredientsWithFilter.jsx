import * as React from "react"
import {PantryContext} from "../context/PantryContext"
import Tag from "./Tag"
import withFilter from "../hocs/withFilter"
import {Formik, Form, Field} from 'formik'
import Row from "./Row"

function IngredientsBase({set, handleQueryParamsChange, initialValues}) {

  let debounce = null
  const debounceTime = 500

  return (
      <div>
        <Row>
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
                  <label htmlFor="query">Ingredient name</label>
                  <Field id="query" name="query" placeholder="Start typing..." onChange={changeAndSubmit} />

                  <label htmlFor="startsWith">Starts with</label>
                  <Field id="startsWith" name="startsWith" type={"checkbox"} onChange={changeAndSubmit}/>

                  <label htmlFor="caseSensitive">Case sensitive</label>
                  <Field id="caseSensitive" name="caseSensitive" type={"checkbox"} onChange={changeAndSubmit}/>
                </Form>
              )
            }
            }
          </Formik>
        </Row>
        <Row>
        <PantryContext.Consumer>
          {
            ({pantryList, toggleIngredientInPantry, isInPantry}) =>

            {return set.map(ing => (
              <Tag name={ing?.strIngredient1} big
                   clickCallback={() => {
                     toggleIngredientInPantry(ing.strIngredient1)
                   }}
                   selected={isInPantry(ing.strIngredient1, pantryList)}
                   type={{ className: isInPantry(ing.strIngredient1, pantryList) ? "success" : "" }}
              />
            ))}
          }
        </PantryContext.Consumer>
        </Row>
      </div>
  )
}

const IngredientsWithFilter = withFilter(IngredientsBase)

export default IngredientsWithFilter
