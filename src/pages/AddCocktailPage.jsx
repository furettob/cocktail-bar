import * as React from "react"
import Row from "../components/Row"
import { Field, FieldArray, Form, Formik, ErrorMessage} from "formik"

function AddCocktailPage() {

  const initialValues = {
    dateModified: null,
    idDrink: "",
    strAlcoholic: "Alcoholic", // checbox
    strCategory: "Beer", // select ?
    strCreativeCommonsConfirmed: "No", // checkbox
    strDrink: "Campari Beer", // input mandatory
    strDrinkAlternate: null, // input non mandatory
    strDrinkThumb: null, // "https://www.thecocktaildb.com/images/media/drink/xsqrup1441249130.jpg"
    strGlass: "Beer mug", // select + autocomplete + field ?? "Beer mug"
    strIBA: null, //
    strImageAttribution: null,
    strImageSource: null,
    arrayIngredients: null,  // [{name:"", measureDesc:"", measure:10, unit:"cl"}, {name:"", measureDesc:"", measure:10, unit:"cl"}]
    strInstructions: "Use a 15 oz glass. Add Campari first. Fill with beer.",
    strInstructionsDE: "Verwenden Sie ein 15 oz Glas. Zuerst Campari hinzufügen. Mit Bier auffüllen.",
    strInstructionsES: null,
    strInstructionsFR: null,
    strInstructionsIT: "Usa un bicchiere da 450ml.\r\nAggiungi prima Campari.\r\nRiempi di birra."
  }

  return (
    <Row>
      <h1>Add cocktail</h1>
      <Formik
        initialValues={initialValues}
        onSubmit={async values => {
          console.log("Submitting values::: ", values)
        }}
      >
        { props => {
          const changeAndSubmit = e => {
            props.handleChange(e);
            props.handleSubmit()
          }
          console.log("PPP: ", props)
          const {values, handleChange, setFieldValue} = props
          return (
            <Form>
              <Field id="strDrink" name="strDrink" placeholder="name" />
              <Field id="strDrinkAlternate" name="strDrinkAlternate" placeholder="Alternate name" />
              <Field className="test" id="strInstructions" name="strInstructions" component="textarea" rows="4" placeholder="Instructions (English)" />
              <Field as="select" name="strGlass">
                <option value="Old-fashioned glass">Old-fashioned glass</option>
                <option value="Collins glass">Collins glass</option>
                <option value="Beer mug">Beer mug</option>
                <option value="Cocktail glass">Cocktail glass</option>
                <option value="Margarita/Coupette glass">Margarita/Coupette glass</option>
                <option value="Pitcher">Pitcher</option>
              </Field>
              <label htmlFor="strAlcoholic">Alcoholic</label>
              <Field id="isAlcoholic" name="isAlcoholic" type={"checkbox"} onChange={
                e => {
                  handleChange(e)
                  const s = e.target.value ? "Non Alcoholic" : "Alcoholic"
                  setFieldValue("strAlcoholic", s)
                }}/>



              <FieldArray name="arrayIngredients">
                {({ remove, push }) => (
                  <div>
                    {values.arrayIngredients && values.arrayIngredients.length > 0 &&
                    values.arrayIngredients.map((ingredientObj, index) => (
                      <div className="row" key={index}>
                        <div className="col">
                          <label htmlFor={`arrayIngredients.${index}.name`}>Name</label>
                          <Field
                            name={`arrayIngredients.${index}.name`}
                            placeholder="Name"
                            type="text"
                          />
                          <ErrorMessage
                            name={`arrayIngredients.${index}.name`}
                            component="div"
                            className="field-error"
                          />
                        </div>
                        <div className="col">
                          <label htmlFor={`arrayIngredients.${index}.measure`}>Measure</label>
                          <Field
                            name={`arrayIngredients.${index}.email`}
                            placeholder="Measure"
                            type="email"
                          />
                          <ErrorMessage
                            name={`friends.${index}.name`}
                            component="div"
                            className="field-error"
                          />
                        </div>
                        <div className="col">
                          <input
                            type="button"
                            onClick={() => remove(index)}
                            value={"X"}
                          />
                        </div>
                      </div>
                    ))}
                    <input
                      type="button"
                      onClick={() => push({ name: '', measure: '' })}
                      value={"New Ingredient"}
                    />
                  </div>
                )}
              </FieldArray>


              {/*<label htmlFor={"query"} className={"cb-ml-16"}>It works with id (numerical)</label>*/}
              <input type={"submit"} value={"Add"}/>
            </Form>
          )
        }
        }
      </Formik>
    </Row>
  )
}

export default AddCocktailPage
