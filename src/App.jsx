import AllCocktails from "./pages/AllCocktails"
import Colophon from "./components/ColophonComponents"
import "./App.css"

function App() {
  return (
    <div className="App">
        <div className="cb-content">
          <AllCocktails favourite={false} />
          <Colophon />
        </div>
    </div>
  )
}

export default App
