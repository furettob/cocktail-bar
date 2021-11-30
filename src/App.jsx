import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
import AllCocktails from './pages/AllCocktails'
import DrinkDetail from './pages/DrinkDetail'
import Colophon from './components/ColophonComponents'
import './App.css'

function App() {
  return (
    <div className="App">
        <Router>
          <div className="cb-content">
            <Switch>
              <Route path="/drinks" render={ () => <AllCocktails favourite={false} key={0}/> } />
              <Route path="/drink/:id" render={ () => <DrinkDetail key={1}/> } />
              <Route render={() => (<Redirect to="/drinks" />)}/>
            </Switch>
            <Colophon/>
          </div>
        </Router>
    </div>
  )
}

export default App
