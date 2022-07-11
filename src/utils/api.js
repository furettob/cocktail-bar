import axios from "axios"
//import getEnvVars from '../environment';
//const { x_api_key, apiUrl } = {x_api_key:"ajeje", apiUrl: "https://europe-west1-fb-cocktailbar-v2.cloudfunctions.net"}
const { x_api_key, apiUrl } = {x_api_key:"ajeje", apiUrl: "http://localhost:3000/fb-cocktailbar-v2/europe-west1"}

const checkIdToken = async (user, verbose) => {
  let idToken = user["Aa"]

  if (verbose) {
    console.log("\n\nI'm using token: ", idToken)
    console.log(`Now is  ${new Date(Date.now())} - token expiration is::: ${new Date(user?.h?.b?.a * 1000)}`)
  }

  // If token will expire in the next 10 minutes, refresh it
  if (Math.floor(Date.now()/1000) + 600 > user?.h?.b?.a) {
    idToken = await user.getIdToken(/* forceRefresh */ true)
  }

  if (verbose) {
    if (Math.floor(Date.now() / 1000) + 600 > user?.h?.b?.a) {
      console.log("Token will expire in less than 10 min: " + (user?.h?.b?.a - Math.floor(Date.now() / 1000)) + " seconds")
    } else {
      console.log("No need to refresh token")
    }

    if (Math.floor(Date.now()/1000) < user?.h?.b?.a) {
      console.log("Token will expire in " + (user?.h?.b?.a - Math.floor(Date.now()/1000)) + " seconds")
    } else {
      console.log("Token EXPIRED " + (Math.floor(Date.now()/1000) - user?.h?.b?.a) + " seconds ago")
    }
  }

  return idToken
}

const performAxiosAPICall = async (functionName, user, params) => {
  const idToken = await checkIdToken(user)
  const axios_params = {
    url: `${apiUrl}/${functionName}`,
      headers: {
      "x-api-key": x_api_key,
      "access-token": idToken
  },
    data: {...params},
    method: "post"
  }
  const res = await axios(axios_params)
  console.log(`${functionName} RES: `, res)
  return res?.data?.data
}

// USER RELATED API
const addUserCustomDataWithId = async (user, params) => {
  return await performAxiosAPICall("addUserCustomDataWithId", user, params)
}
const getUserCustomData = async (user, params) => {
  return await performAxiosAPICall("getUserCustomData", user, params)
}
const toggleFavouriteDrink = async (user, params) => {
  return await performAxiosAPICall("toggleFavouriteDrink", user, params)
}

// DRINK RELATED API
const addDrink = async (user, params) => {
  return await performAxiosAPICall("addDrink", user, params)
}

export {getUserCustomData, addUserCustomDataWithId, toggleFavouriteDrink, addDrink}
