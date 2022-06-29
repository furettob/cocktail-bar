import AllCocktails from "./pages/AllCocktails"
import DrinkDetail from "./pages/DrinkDetail"
import Colophon from "./components/ColophonComponents"
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
import { AuthContext, AuthProvider } from "./context/AuthContext"
import {useState, useContext} from "react"
import {getFavourites, getPantryList} from "./utils/utils"
import { PantryProvider } from "./context/PantryContext"
import IngredientsPageWithFilter from "./pages/IngredientsPageWithFilter"
import LoginPage from "./pages/LoginPage"

function InnerApp() {
  const [lang, setLang] = useState("en")
  const { user } = useContext(AuthContext);

  return (
    <div className="App">
      <FavouriteProvider value={ {favouriteList:getFavourites()} }>
        <LanguageProvider value={lang}>
          <PantryProvider value={ {pantryList:getPantryList()} }>
            <Router>
              <Header user={user} onLanguageSwitch={ newLang => {console.log("Switching to " + newLang); setLang(newLang) }} currentLang={lang} />
              <div className="cb-content">
                <Switch>
                  <Route
                    path="/drinks"
                    render={() => <AllCocktails />}/>
                  <Route
                    path="/search/:query"
                    render={() => <AllCocktails />}/>
                  <Route path="/drink/:id" render={() => <DrinkDetail />} />
                  {user && <Route path="/favourites" render={() => <PreferitiPage />} />}
                  <Route path="/ingredients" render={() => <IngredientsPageWithFilter />} />
                  <Route path="/login" render={() => <LoginPage />} />
                  <Route render={() => <Redirect to="/drinks" />} />
                </Switch>
                <Colophon />
              </div>
            </Router>
          </PantryProvider>
        </LanguageProvider>
      </FavouriteProvider>
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
