import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Doctors from './pages/Doctors'
import Login from './pages/Login'
import Contact from './pages/Contact'
import About from './pages/About'
import MyProfile from './pages/MyProfile'
import MyAppointments from './pages/MyAppointments'
import Appointments from './pages/Appointments'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import VideoCallWrapper from './pages/videocallWrapper'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

const App = () => {
  return (
    <div className='mx-4 sm:mx-[10%]'>
      <ToastContainer/>
      <Navbar/>  {/* Navbar attached with all the pages for this we write Outside from all the router  */}
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/doctors' element={<Doctors/>} />
        <Route path='/doctors/:speciality' element={<Doctors/>} />  {/* When we click on the speciality then dr related to that show only*/}
        <Route path='/login' element={<Login/>} />
        <Route path='/contact' element={<Contact/>} />
        <Route path='/my-profile' element={<MyProfile/>} />
        <Route path='/about' element={<About/>} />
        <Route path='/my-appointments' element={<MyAppointments/>} />
        <Route path='/appointments/:docId' element={<Appointments/>} />
        <Route path="/video-call" element={<VideoCallWrapper />} />
      </Routes>
      <Footer/> {/*Footer will be visible on all the pages. */}
    </div>
  )
}

export default App