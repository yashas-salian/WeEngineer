import {BrowserRouter, Route, Routes} from "react-router-dom"
import { Dashboard } from "./pages/dashboard"
import { Quiz } from "./pages/Quiz"

function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='/quiz' element={<Quiz/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
