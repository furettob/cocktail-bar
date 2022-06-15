import AllCocktails from "./pages/AllCocktails"
import DrinkDetail from "./pages/DrinkDetail"
import Colophon from "./components/ColophonComponents"
import {
  Router,
  HashRouter,
  Route,
  Switch,
  Redirect
} from "react-router-dom"
import "./App.css"
import Header from "./components/Header"
import PreferitiPage from "./pages/PreferitiPage"

function App() {
  return (
    <div className="App">
      {/*
      Utilizzo HashRouter perché con Router ottengo l'errore:

      TypeError: Cannot read properties of undefined (reading 'location')

      */}
      <HashRouter>
        <Header />
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
      </HashRouter>
    </div>
  )
}

export default App
