// setter
function setInLocalStorage(name, value) {
  const v = typeof value === "string" ? value : JSON.stringify(value)
  //console.log("Setting: ", v)
  localStorage.setItem(name, v);
  return v
}
// getter
function getFromLocalStorage(name) {
  let v = localStorage.getItem(name)
  try {
    v = JSON.parse(v)
  } catch (e) {
    console.log(`getFromLocalStorage: ${v} is not an object`)
  }
  return v
}

// getter for "favourites"
export function getFavourites() {
  return getFromLocalStorage("favourites") || []
}
// setter for "favourites"
export function setFavourites(favourtesArray) {
  return setInLocalStorage("favourites", favourtesArray)
}

// getter for "favourites"
export function getDailyCocktail() {
  return getFromLocalStorage("dailyDrink")
}
// setter for "favourites"
export function setDailyCocktail(d) {
  return setInLocalStorage("dailyDrink", d)
}

export function toggleFavourite(id) {
  const fav = getFavourites()
  const index = fav.indexOf(id)
  if (index > -1) {
    console.log(`Removing ${id} from ${JSON.stringify(fav)}`)
    fav.splice(index, 1)
  } else {
    console.log(`Adding ${id} to ${JSON.stringify(fav)}`)
    fav.push(id)
  }
  setFavourites(fav)
}

// getter for "pantryList"
export function getPantryList() {
  return getFromLocalStorage("pantryList") || []
}
// setter for "pantryList"
export function setPantryList(pantryListArray) {
  return setInLocalStorage("pantryList", pantryListArray)
}

export function toggleIngredientInPantry(name) {
  const pl = getPantryList()
  const index = pl.indexOf(name)
  if (index > -1) {
    console.log(`Removing ${name} from ${JSON.stringify(pl)}`)
    pl.splice(index, 1)
  } else {
    console.log(`Adding ${name} to ${JSON.stringify(pl)}`)
    pl.push(name)
  }
  setPantryList(pl)
  return getPantryList()
}
