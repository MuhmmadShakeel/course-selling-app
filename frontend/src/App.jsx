import React from 'react'
import './App.css'
import {Routes,Route} from 'react-router-dom'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import Navbar from './components/common/Navbar'
import Footer from './components/common/Footer'
function App() {

  return (
    <>
     
     <div>
<Navbar/>
   <Routes>
    <Route path='/' element={<HomePage/>} />
    <Route path='/login' element={<LoginPage/>} />
    <Route path='/signup' element={<SignupPage/>} />
   </Routes>
   <Footer/>
     </div>
    
    </>
  )
}

export default App
