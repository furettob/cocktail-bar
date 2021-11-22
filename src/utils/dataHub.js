import Axios from 'axios'
import cocktailsData from './StaticData/cocktails.json'

export async function getCocktails(searchStr) {
    const resp = await Axios.get('https://www.thecocktaildb.com/api/json/v1/1/search.php?s='+searchStr)
    if (!resp?.data || resp.data === "") {
        console.log("ERROR::::: ")
        return {error: resp}
    }

    console.log("COCKTAIL SEARCH DATA FOR " + searchStr + " :::: ", resp)
    return resp.data.drinks || []
}

export async function getRandomCocktail() {
    console.log("asking")
    const resp = await Axios.get('https://www.thecocktaildb.com/api/json/v1/1/random.php')
    console.log("received")
    if (!resp?.data || resp.data === "") {
        console.log("ERROR::::: ")
        return {error: resp}
    }

    console.log("RANDOM COCKTAIL DATA:::: ", resp)
    return resp.data.drinks
}