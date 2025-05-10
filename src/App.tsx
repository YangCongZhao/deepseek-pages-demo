import './App.css'
import {HashRouter,Routes,Route} from "react-router-dom";
import Guide from "./containers/Guide";
import Login from "./containers/Login";

function App() {

  return (
      <HashRouter>
          <Routes>
              <Route path={'/'} element={<Guide />}></Route>
              <Route path={'/Login'} element={<Login />}></Route>
          </Routes>
      </HashRouter>
  )
}

export default App
