import React from 'react'
import './App.css'
import {Routes,Route} from 'react-router-dom'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import Navbar from './components/common/Navbar'
import Footer from './components/common/Footer'
import CoursesPage from './pages/CoursesPage'
import SingalCourse from './components/courses/SingalCourse'
import { Toaster } from 'react-hot-toast'
import Payment from './components/courses/Payment'
function App() {

  return (
    <>
     
     <div>
<Navbar/>

   <Routes>
    <Route path='/' element={<HomePage/>} />
    <Route path='/login' element={<LoginPage/>} />
    <Route path='/signup' element={<SignupPage/>} />
<Route path="/courses" element={<CoursesPage />} />
<Route path="/courses/:id" element={<SingalCourse />} />
<Route path='/paynow' element={<Payment/>}/>
   </Routes>
    <Toaster/>

   <Footer/>
     </div>
    
    </>
  )
}

export default App
