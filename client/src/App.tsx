import {BrowserRouter, Route, Routes} from "react-router-dom"
import { Dashboard } from "./pages/dashboard"
import { Quiz } from "./pages/Quiz"
import { Signin } from "./pages/signin"
import { SSOCallback } from "./pages/SSOCallback"
import { Signup } from "./pages/signup"
import { SignedIn  } from "@clerk/clerk-react"
import { Landing } from "./pages/landing"

function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Landing/>}/>
        <Route path='/dashboard' element={<SignedIn><Dashboard/></SignedIn>}/>
        <Route path='/quiz' element={<SignedIn><Quiz/></SignedIn>}/>
        {/* <Route path='/settings' element={<Settings/>}/> */}
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/signin' element={<Signin/>}/>
        <Route path="/sso" element={<SSOCallback/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
