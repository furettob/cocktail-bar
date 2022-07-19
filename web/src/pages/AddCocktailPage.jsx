import * as React from "react"
import {useContext} from "react"
import {AuthContext} from "../context/AuthContext"
import Row from "../components/Row"
import {Field, FieldArray, Form, Formik} from "formik"
import * as Yup from "yup";
import Grid from "../components/Grid/Grid"
import Input from "../components/Form/Input/Input"
import Textarea from "../components/Form/Textarea/Textarea"
import Select from "../components/Form/Select/Select"
import {addDrink, getDrinksById} from "../utils/api"
import Checkbox from "../components/Form/Checkbox/Checkbox"
import Aligner from "../components/Aligner/Aligner"
import Button from "../components/Form/Button/Button"

function AddCocktailPage() {

  const {user} = useContext(AuthContext)

  const SignupSchema = Yup.object().shape({
    name: Yup.string()
  })

  const SignupSchemaComplete = Yup.object().shape({
    name: Yup.string()
      .min(2)
      .required('Questo campo è obbligatorio'),
    strInstructions: Yup.string()
      .min(20)
      .required('Questo campo è obbligatorio'),
    strGlass: Yup.string('Non è una stringa').required('Questo campo è obbligatorio'),
    arrayIngredients: Yup.array().test({
      message: 'Devono esserci almeno due ingredienti',
      test: arr => {
        return arr.length >= 1
      },
    }).test({
      message: 'Tutti gli ingredienti devono avere un nome',
      test: arr => {
        let isCorrect = true
        for (var i in arr) {
          if (!arr[i]?.name) {
            //isCorrect = false
          }
        }
        return isCorrect
      },
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
    name: "Campari Beer", // input mandatory
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

  const cambioCheck = (event) => {
    console.log('Checkbox', event.target.checked)
  }

  return (
    <>
      <Row>
        <h1>Add cocktail</h1>
        <Formik
          initialValues={initialValues}
          onSubmit={async values => {
            console.log("Submitting values::: ", {...values})
            addDrink(user, {uid: user.uid, username: user.customData.username, drink: {...values}})
            console.log("CBM::: ", Object.keys(user.customData.createdByMeList).join(","))
            //getDrinksById(user, {drinkIdList:Object.keys(user.customData.createdByMeList).join(",")})
          }}
          validationSchema={SignupSchema}
        >
          {props => {
            const changeAndSubmit = e => {
              props.handleChange(e);
              props.handleSubmit()
            }
            const {values, handleChange, setFieldValue, errors, touched} = props
            //console.log("VALUES: ", values)
            //console.log("ERRORS: ", errors)

            const isAlcoholicHandleChange = e => {
              if (e.target.value === "true") {
                setFieldValue("isAlcoholic", "false")
                setFieldValue("strAlcoholic", "Non Alcoholic")
              }
              if (e.target.value === "false") {
                setFieldValue("isAlcoholic", "true")
                setFieldValue("strAlcoholic", "Alcoholic")
              }
              handleChange(e)
            }

            const handleUpload = async (e) => {
              let image = e.currentTarget.files[0];
              const buffer = await image.arrayBuffer();

              function getBase64(file) {
                return new Promise((resolve, reject) => {
                  const reader = new FileReader();
                  reader.readAsDataURL(file);
                  reader.onload = () => resolve(reader.result);
                  reader.onerror = error => reject(error);
                });
              }

              console.log("BUFFER::: ", buffer)
              let byteArray = new Uint8Array(buffer)
              console.log("BITARRAY: ", byteArray)
              const x = await getBase64(image)
              console.log(x)
              setFieldValue("thumbByteArray", x);
            }

            return (
              <Form>
                <Grid>
                  <Grid.Column colSpan={6}>
                    <Field id="name" name="name" placeholder="name" as={Input}/>
                    {errors.name && touched.name ? (
                      <div>{errors.name}</div>
                    ) : null}
                  </Grid.Column>
                  <Grid.Column colSpan={6}>
                    <Field id="strDrinkAlternate" name="strDrinkAlternate" placeholder="Alternate name" as={Input}/>
                    {errors.strDrinkAlternate && touched.strDrinkAlternate ? (
                      <div>{errors.strDrinkAlternate}</div>
                    ) : null}
                  </Grid.Column>
                  <Grid.Column colSpan={12}>
                    <Field id="strInstructions" name="strInstructions" as={Textarea} rows="4"
                           placeholder="Instructions (English)"/>
                    {errors.strInstructions && touched.strInstructions ? (
                      <div>{errors.strInstructions}</div>
                    ) : null}
                  </Grid.Column>
                  <Grid.Column colSpan={6}>
                    <Field as={Select} name="strGlass">
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
                  </Grid.Column>
                  <Grid.Column colSpan={6}>
                    <Aligner align={"center-right"}>
                      <Checkbox
                        isChecked={values.isAlcoholic === 'true'}
                        labelOn={'Alcoholic'}
                        labelOff={'Non Alcoholic'}
                        handleChange={cambioCheck}
                        id={"checkAlcolico"}
                      />
                    </Aligner>
                  </Grid.Column>

                  <Grid.Column colSpan={12}>
                    <label htmlFor="file">File upload</label>
                    <input id="file" name="file" type="file" onChange={handleUpload} className="form-control" />
                  </Grid.Column>
                  <Grid.Column colSpan={12}>
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
                                <Button
                                  type="button"
                                  onClick={() => remove(index)}
                                  label={"X"}
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
                  </Grid.Column>

                  <Grid.Column>
                    {errors.global ?
                      <div>{errors.global}</div>
                      : null
                    }
                  </Grid.Column>

                  <Grid.Column colSpan={12}>

                    <input type={"submit"} value={"Add"}/>
                    <Button
                      onClick={() => {console.log("fjfjfjf")}}
                      label={"Add"}
                    />
                    <Button
                      onClick={() => {console.log("fjfjfjf")}}
                      label={"Add"}
                      inverted
                      fluid
                    />
                  </Grid.Column>
                </Grid>
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
