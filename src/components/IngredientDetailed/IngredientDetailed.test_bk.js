import {cleanup, fireEvent, render} from '@testing-library/react'
import renderer from 'react-test-renderer'
import IngredientDetailed from './IngredientDetailed'
import {useState} from "react"

// Note: running cleanup afterEach is done automatically for you in @testing-library/react@9.0.0 or higher
// unmount and cleanup DOM after the test is finished.
afterEach(cleanup);

function IngredientWrapper() {

  const [isInPantryState, setIsInPantryState] = useState(false)

  const toggle = () => {
    setIsInPantryState(!isInPantryState)
  }

  return (
    <div>
      <IngredientDetailed isInPantry={isInPantryState} toggleIngredientInPantry={toggle} ingredient={{ingredient: "Pineapple juice", measure: "1 oz"}}/>
    </div>
  )
}


it('IngredientDetailed not in pantry', () => {
  const {queryByText, getByText} = render(
    <IngredientWrapper/>
    ,
  );

  expect(queryByText(/Buy/i)).toBeTruthy();
  expect(queryByText(/Segna come comprato/i)).toBeTruthy();

  fireEvent.click(getByText(/Segna come comprato/i));
  expect(queryByText(/Segna come terminato/i)).toBeTruthy();

  // QUESTO NON FUNZIONA; PERCHÈ? fireEvent.click(getByText(/Segna come comprato/i));
  // idea: aggiungere un manager dello stato subito fuori.. funzionerà?
  // expect(queryByText(/Segna come terminato/i)).toBeTruthy();
});


it('IngredientDetailed in pantry', () => {
  const {queryByText} = render(
    <IngredientDetailed isInPantry={true} ingredient={{ingredient: "Pineapple juice", measure: "1 oz"}}/>,
  );
  expect(queryByText(/Buy/i)).toBeFalsy();
  expect(queryByText(/Segna come terminato/i)).toBeTruthy();
});
