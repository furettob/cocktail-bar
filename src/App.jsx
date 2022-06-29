import AllCocktails from "./pages/AllCocktails"
import DrinkDetail from "./pages/DrinkDetail"
import Author from "./pages/Author"
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom"
import "./App.css"
import Header from "./components/Header"
import PreferitiPage from "./pages/PreferitiPage"
import { LanguageProvider} from "./context/LanguageContext"
import { FavouriteProvider } from "./context/FavouriteContext"
import {useState} from "react"
import {getFavourites, getPantryList} from "./utils/utils"
import IngredientsPage from "./pages/IngredientsPage"
import { PantryProvider } from "./context/PantryContext"
import IngredientsPageWithFilter from "./pages/IngredientsPageWithFilter"

function App() {
  const [lang, setLang] = useState("en")

  return (
    <div className="App">
      <FavouriteProvider value={ {favouriteList:getFavourites()} }>
        <LanguageProvider value={lang}>
          <PantryProvider value={ {pantryList:getPantryList()} }>
            <Router>
              <Header onLanguageSwitch={ newLang => {console.log("Switching to " + newLang); setLang(newLang) }} currentLang={lang} />
              <div className="cb-content">
                <Switch>
                  <Route
                    path="/drinks"
                    render={() => <AllCocktails />}/>
                  <Route
                    path="/search/:query"
                    render={() => <AllCocktails />}/>
                  <Route path="/drink/:id" render={() => <DrinkDetail />} />
                  <Route path="/favourites" render={() => <PreferitiPage />} />
                  <Route path="/ingredients" render={() => <IngredientsPageWithFilter />} />
                  <Route path="/author" render={() => <Author />} />
                  <Route render={() => <Redirect to="/drinks" />} />
                  
                </Switch>
              
              </div>
            </Router>
          </PantryProvider>
        </LanguageProvider>
      </FavouriteProvider>
    </div>
  )
}

export default App
