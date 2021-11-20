import Axios from 'axios'
import cocktailsData from './StaticData/cocktails.json'

export async function getAllCocktails() {
    const resp = cocktailsData // await Axios.get('https://www.thecocktaildb.com/api/json/v1/1/search.php?f=a')
    console.log("DATA:::: ", resp)
    if (!resp?.data || resp.data === "") {
        console.log("ERROR::::: ")
        return {error: resp}
    }

    return resp.data.drinks
}