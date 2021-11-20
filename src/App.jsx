import { useState } from 'react'
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
import AllCocktails from './pages/AllCocktails'
import './App.css'
import './cocktail-bar.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
        <Router>
          <div className="cb-content">
            <Switch>
              <Route path="/allevents" render={ () => <AllCocktails myEvents={false} key={0}/> } />
              <Route path="/myevents" render={ () => <AllCocktails myEvents={true} key={1}/> } />
              <Route render={() => (<Redirect to="/allevents" />)}/>
            </Switch>
          </div>
        </Router>
    </div>
  )
}

export default App
