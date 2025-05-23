import React from 'react'
import Login from './pages/Login'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { useContext } from 'react';
import { AdminContext } from './context/AdminContext';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import { Route, Routes } from 'react-router-dom'
import AddDoctor from './pages/Admin/AddDoctor'
import AllApointments from './pages/Admin/AllApointments'
import Dashboard from './pages/Admin/Dashboard'
import DoctorsList from './pages/Admin/DoctorList'
import { DoctorContext } from './context/DoctorContext';
import DoctorDashboard from './pages/Doctor/DoctorDashboard';
import DoctorAppointment from './pages/Doctor/DoctorAppointment';
import DoctorProfile from './pages/Doctor/DoctorProfile';
import VideoCallWrapper from './pages/VideoCallWrapper';



function App() {

  const { aToken } = useContext(AdminContext)
  const { dToken } = useContext(DoctorContext)

  //Here we add the logic so that if we have the admin token in that case we will hide login page and we will display rest of the pages for the admin.
  return aToken || dToken ? (

    <div className='bg-[#F8F9FD]'>

      <ToastContainer />
      <Navbar />

      <div className='flex items-start'>
        <Sidebar />

        <Routes>
          {/* ---ADMIN ROUTES----- */}
          <Route path='/' element={<></>} />
          <Route path='/add-doctor' element={<AddDoctor />} />
          <Route path='/all-appointments' element={<AllApointments />} />
          <Route path='/admin-dashboard' element={<Dashboard />} />
          <Route path='/doctor-list' element={<DoctorsList />} />

          {/*--------DOCTOR ROUTES------------*/}
          <Route path='/doctor-dashboard' element={<DoctorDashboard />} />
          <Route path='/doctor-appointments' element={<DoctorAppointment />} />
          <Route path='/doctor-profile' element={<DoctorProfile />} />
          <Route path="/video-call" element={<VideoCallWrapper />} />

        </Routes>
      </div>

    </div>
  ) : (
    <>
      <Login />
      <ToastContainer />
    </>
  )
}

export default App