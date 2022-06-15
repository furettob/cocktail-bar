// setter
function setInLocalStorage(name, value) {
  const v = typeof value === "string" ? value : JSON.stringify(value)
  console.log("Setting: ", v)
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
