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
import FavouritePage from "./pages/FavouritePage"
import { LanguageProvider} from "./context/LanguageContext"
import { FavouriteProvider } from "./context/FavouriteContext"
import {useState, useContext} from "react"
import {getFavourites, getPantryList} from "./utils/utils"
import IngredientsPage from "./pages/IngredientsPage"
import { PantryProvider } from "./context/PantryContext"
import IngredientsPageWithFilter from "./pages/IngredientsPageWithFilter"
import { AuthProvider, AuthContext } from "./context/AuthContext"
import LoginPage from "./pages/LoginPage"


function InnerApp() {
  const [lang, setLang] = useState("en")

  const { initializing, user } = useContext(AuthContext)

  if (initializing) {
    return null
  }

  return (
    <div className="App">
        <LanguageProvider value={lang}>
          <PantryProvider value={ {pantryList:getPantryList()} }>
            <Router>
              <FavouriteProvider value={ {favouriteList:getFavourites()} }>
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
                  <Route path="/favourites" render={(user) => {return user ? <FavouritePage /> : <Redirect to="/drinks" />}} />
                  <Route path="/ingredients" render={() => <IngredientsPageWithFilter />} />
                  <Route path="/author" render={() => <Author />} />
                  <Route path="/login" render={() => <LoginPage />} />
                  <Route render={() => <Redirect to="/drinks" />} />
                </Switch>
              </div>
              </FavouriteProvider>
            </Router>
          </PantryProvider>
        </LanguageProvider>
    </div>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <InnerApp/>
    </AuthProvider>
  )
}
