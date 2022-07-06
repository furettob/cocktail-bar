import * as React from "react"
import Row from "../components/Row"
import { Field, FieldArray, Form, Formik, ErrorMessage} from "formik"
import * as Yup from "yup";
import { TextField } from "@mui/material"
function AddCocktailPage() {


  const CustomTestField = (props) => (<TextField {...props} sx={{"& .MuiOutlinedInput-root": {backgroundColor:"#fefefe"}}}/>)

  const SignupSchema = Yup.object().shape({
    strDrink: Yup.string()
      .min(2)
      .required('Questo campo è obbligatorio'),
    strInstructions: Yup.string()
      .min(20)
      .required('Questo campo è obbligatorio'),
    strGlass: Yup.string('Non è una stringa').required('Questo campo è obbligatorio'),
    arrayIngredients: Yup.array().test({
      message: 'Devono esserci almeno due ingredienti',
      test: arr => {
        return arr.length >= 1},
    }).test({
      message: 'Tutti gli ingredienti devono avere un nome',
      test: arr => {
        let isCorrect = true
        for (var i in arr) {
          if (!arr[i]?.name) {
            //isCorrect = false
          }
        }
        return isCorrect},
    }),
  }).test('global-ok',
    "Non puoi servire un analcolico in un Margarita/Coupette glass",
    function (values) {
      console.log(`values.strAlcoholic === ${values.strAlcoholic} && values.strGlass === ${values.strGlass} --> ${values.strAlcoholic === "Non Alcoholic" && values.strGlass === "Margarita/Coupette glass"}"`)
      if (values.strAlcoholic === "Non Alcoholic" && values.strGlass === "Margarita/Coupette glass") {
        return this.createError({
          path: "global",
          message: "Non puoi servire un analcolico in un Margarita/Coupette glass",
        })
      }
      return true;
    }
  )

  const initialValues = {
    dateModified: null,
    idDrink: "",
    strAlcoholic: "Alcoholic", // checbox
    isAlcoholic: "true", // checbox
    strCategory: "Beer", // select ?
    strCreativeCommonsConfirmed: "No", // checkbox
    strDrink: "Campari Beer", // input mandatory
    strDrinkAlternate: null, // input non mandatory
    strDrinkThumb: null, // "https://www.thecocktaildb.com/images/media/drink/xsqrup1441249130.jpg"
    strGlass: null, // select + autocomplete + field ?? "Beer mug"
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
    <>
      <Row>
        <h1>Add cocktail</h1>
        <Formik
          initialValues={initialValues}
          onSubmit={async values => {
            console.log("Submitting values::: ", values)
          }}
          validationSchema={SignupSchema}
        >
          { props => {
            const changeAndSubmit = e => {
              props.handleChange(e);
              props.handleSubmit()
            }
            const {values, handleChange, setFieldValue, errors, touched} = props
            //console.log("VALUES: ", values)
            //console.log("ERRORS: ", errors)

            const isAlcoholicHandleChange = e => {
              console.log("Setting ", e.target.value, typeof e.target.value)
              if (e.target.value === "true") {
                console.log("E is true")
                setFieldValue("isAlcoholic", "false")
                setFieldValue("strAlcoholic", "Non Alcoholic")
              }
              if (e.target.value === "false") {
                console.log("E is false")
                setFieldValue("isAlcoholic", "true")
                setFieldValue("strAlcoholic", "Alcoholic")
              }
              handleChange(e)
            }
            return (
              <Form>
                <Field id="strDrink" name="strDrink" placeholder="name" />
                {errors.strDrink && touched.strDrink ? (
                  <div>{errors.strDrink}</div>
                ) : null}

                <Field id="strDrinkAlternate" name="strDrinkAlternate" placeholder="Alternate name" as={TextField}/>
                <Field id="strDrinkAlternate" name="strDrinkAlternate" placeholder="Alternate name" as={CustomTestField}/>
                {errors.strDrinkAlternate && touched.strDrinkAlternate ? (
                  <div>{errors.strDrinkAlternate}</div>
                ) : null}

                <Field className="test" id="strInstructions" name="strInstructions" component="textarea" rows="4" placeholder="Instructions (English)" />
                {errors.strInstructions && touched.strInstructions ? (
                  <div>{errors.strInstructions}</div>
                ) : null}

                <Field as="select" name="strGlass">
                  <option value="Old-fashioned glass">Old-fashioned glass</option>
                  <option value="Collins glass">Collins glass</option>
                  <option value="Beer mug">Beer mug</option>
                  <option value="Cocktail glass">Cocktail glass</option>
                  <option value="Margarita/Coupette glass">Margarita/Coupette glass</option>
                  <option value="Pitcher">Pitcher</option>
                </Field>
                {errors.strGlass && touched.strGlass ? (
                  <div>{errors.strGlass}</div>
                ) : null}

                <label htmlFor="strAlcoholic">{`${values.strAlcoholic}`} </label>

                <label htmlFor={"isAlcoholic"}>
                  {`${values.isAlcoholic}`}
                  <Field id="isAlcoholic" name="isAlcoholic" type={"checkbox"} onChange={isAlcoholicHandleChange}/>
                </label>



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
                            {errors.name && touched.name ? (
                              <div>{errors.name}</div>
                            ) : null}
                          </div>
                          <div className="col">
                            <label htmlFor={`arrayIngredients.${index}.measure`}>Measure</label>
                            <Field
                              name={`arrayIngredients.${index}.measure`}
                              placeholder="Measure"
                              type="measure"
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
                {errors.arrayIngredients && touched.arrayIngredients ?
                  <div>{errors.arrayIngredients}</div>
                  : null
                }

                {errors.global ?
                  <div>{errors.global}</div>
                  : null
                }

                <input type={"submit"} value={"Add"}/>
              </Form>
            )
          }
          }
        </Formik>
      </Row>
      <Row>
        <h1>Add cocktail</h1>
        <Formik
          initialValues={initialValues}
          onSubmit={async values => {
            console.log("Submitting values::: ", values)
          }}
          validationSchema={SignupSchema}
        >
          { props => {
            const changeAndSubmit = e => {
              props.handleChange(e);
              props.handleSubmit()
            }
            const {values, handleChange, setFieldValue, errors, touched} = props
            //console.log("VALUES: ", values)
            //console.log("ERRORS: ", errors)

            const isAlcoholicHandleChange = e => {
              console.log("Setting ", e.target.value, typeof e.target.value)
              if (e.target.value === "true") {
                console.log("E is true")
                setFieldValue("isAlcoholic", "false")
                setFieldValue("strAlcoholic", "Non Alcoholic")
              }
              if (e.target.value === "false") {
                console.log("E is false")
                setFieldValue("isAlcoholic", "true")
                setFieldValue("strAlcoholic", "Alcoholic")
              }
              handleChange(e)
            }
            return (
              <Form>
                <Field id="strDrink" name="strDrink" placeholder="name" />
                {errors.strDrink && touched.strDrink ? (
                  <div>{errors.strDrink}</div>
                ) : null}

                <Field id="strDrinkAlternate" name="strDrinkAlternate" placeholder="Alternate name" as={TextField}/>
                <Field id="strDrinkAlternate" name="strDrinkAlternate" placeholder="Alternate name" as={CustomTestField}/>
                {errors.strDrinkAlternate && touched.strDrinkAlternate ? (
                  <div>{errors.strDrinkAlternate}</div>
                ) : null}

                <Field className="test" id="strInstructions" name="strInstructions" component="textarea" rows="4" placeholder="Instructions (English)" />
                {errors.strInstructions && touched.strInstructions ? (
                  <div>{errors.strInstructions}</div>
                ) : null}

                <Field as="select" name="strGlass">
                  <option value="Old-fashioned glass">Old-fashioned glass</option>
                  <option value="Collins glass">Collins glass</option>
                  <option value="Beer mug">Beer mug</option>
                  <option value="Cocktail glass">Cocktail glass</option>
                  <option value="Margarita/Coupette glass">Margarita/Coupette glass</option>
                  <option value="Pitcher">Pitcher</option>
                </Field>
                {errors.strGlass && touched.strGlass ? (
                  <div>{errors.strGlass}</div>
                ) : null}

                <label htmlFor="strAlcoholic">{`${values.strAlcoholic}`} </label>

                <label htmlFor={"isAlcoholic"}>
                  {`${values.isAlcoholic}`}
                  <Field id="isAlcoholic" name="isAlcoholic" type={"checkbox"} onChange={isAlcoholicHandleChange}/>
                </label>



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
                            {errors.name && touched.name ? (
                              <div>{errors.name}</div>
                            ) : null}
                          </div>
                          <div className="col">
                            <label htmlFor={`arrayIngredients.${index}.measure`}>Measure</label>
                            <Field
                              name={`arrayIngredients.${index}.measure`}
                              placeholder="Measure"
                              type="measure"
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
                {errors.arrayIngredients && touched.arrayIngredients ?
                  <div>{errors.arrayIngredients}</div>
                  : null
                }

                {errors.global ?
                  <div>{errors.global}</div>
                  : null
                }

                <input type={"submit"} value={"Add"}/>
              </Form>
            )
          }
          }
        </Formik>
      </Row>
    </>
  )
}

export default AddCocktailPage
