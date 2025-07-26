import {BrowserRouter, Route, Routes} from "react-router-dom"
import { Dashboard } from "./pages/dashboard"
import { Quiz } from "./pages/Quiz"
import { Settings } from "./pages/settings"

function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='/quiz' element={<Quiz/>}/>
        <Route path='/settings' element={<Settings/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
