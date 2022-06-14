import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom"
import AllCocktails from "./pages/AllCocktails"
import DrinkDetail from "./pages/DrinkDetail"
import PreferitiPage from "./pages/PreferitiPage"
import Colophon from "./components/ColophonComponents"
import Header from "./components/Header"
import "./App.css"
import {PantryProvider} from "./context/PantryContext"
import { LanguageProvider } from "./context/LanguageContext"
import { useState } from "react"

function App() {

  const [lang, setLang] = useState("en")

  return (
    <div className="App">
      <PantryProvider>
        <LanguageProvider value={lang}>
          <Router>
            <Header onLanguageSwitch={ newLang => {console.log("Switching to " + newLang); setLang(newLang) }} currentLang={lang}/>
            <div className="cb-content">
              <Switch>
                <Route
                  path="/drinks"
                  render={() => <AllCocktails favourite={false} />}
                />
                <Route path="/drink/:id" render={() => <DrinkDetail />} />
                <Route path="/favourites" render={() => <PreferitiPage />} />
                <Route render={() => <Redirect to="/drinks" />} />
              </Switch>
              <Colophon />
            </div>
          </Router>
        </LanguageProvider>
      </PantryProvider>
    </div>
  )
}

export default App
