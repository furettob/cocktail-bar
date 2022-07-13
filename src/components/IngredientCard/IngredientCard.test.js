import {describe, expect, test} from '@jest/globals'
import {cleanup, fireEvent, render} from '@testing-library/react'
import IngredientCard from './IngredientCard'

import INGREDIENTLIST from "./static.json"
const INGREDIENT = INGREDIENTLIST[0]

describe('IngredientCard', () => {
  const {queryByText, getByText, container, getByTestId} = render(
    <IngredientCard isInPantry={false} ingredient={INGREDIENT}/>,
  );

  test('A Buy link is present', () => {
    expect(queryByText(/Buy/i)).toBeTruthy();
  })

  test('A Buy link is present', () => {
    expect(container).toBeTruthy();
  })
});


