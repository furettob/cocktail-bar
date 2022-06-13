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

function App() {
  return (
    <div className="App">
      <Router>
        <Header/>
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
    </div>
  )
}

export default App
