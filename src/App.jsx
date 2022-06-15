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
import {useState} from "react"


function App() {
  const [lang, setLang] = useState("en")

  return (
    <div className="App">
      <FavouriteProvider value={
        {
          favouriteList: ["11728"]
        }
      }>
        <LanguageProvider value={lang}>
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
                <Route render={() => <Redirect to="/drinks" />} />
              </Switch>
              <Colophon />
            </div>
          </Router>
        </LanguageProvider>
      </FavouriteProvider>
    </div>
  )
}

export default App
