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

function App() {
  return (
    <div className="App">
      <Router>
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
      </Router>
    </div>
  )
}

export default App
