import * as React from 'react'
import Row from '../components/Row';
import DrinkCard from '../components/DrinkCard';
import Filter3 from '../components/Filter3';
import {useEffect, useState} from "react";

import {getAllCocktails} from '../utils/dataHub'

function AllCocktails({myEvents, key}) {
    const [filters, setFilters] = useState({})

    const [drinks, setDrinks] = useState(null)

    useEffect( async () => {
        const drinks = await getAllCocktails()
        console.log("DDDDDD: ", drinks)
        setDrinks(drinks)
    }, []
    )

    const optionsForTextInput = []
    const handleFilterFreeChange = undefined
    const handleTimeRangeChange = undefined
    const handleTxtWithSuggestionSearchChange = undefined

    return (
      <div>
        <h1>{myEvents ? "my" : "all"}  drinks {key}</h1>
          <Row>
              <Filter3 handleFilterFreeChange={handleFilterFreeChange} onlyFreeEvents={filters.onlyFreeEvents}/>
              <Filter3 handleTimeRangeChange={handleTimeRangeChange} timeRangeStart={filters.timeRangeStart}/>
              <Filter3 handleTxtWithSuggestionSearchChange={handleTxtWithSuggestionSearchChange} optionsForTextInput={optionsForTextInput} />
          </Row>
          <Row>
              {drinks ? drinks.map( (drink) =>
                  <DrinkCard key={drink.idDrink} drink={drink}/>
              ) : "Loading..."}
          </Row>
      </div>
    )
  }

  export default AllCocktails