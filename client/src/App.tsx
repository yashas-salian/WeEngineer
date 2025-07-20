import {BrowserRouter, Route, Routes} from "react-router-dom"
import { Dashboard } from "./pages/dashboard"
import { Quiz } from "./pages/Quiz"
import { Loading } from "./pages/loading"

function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='/quiz' element={<Quiz/>}/>
        <Route path='/loading' element={<Loading/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
