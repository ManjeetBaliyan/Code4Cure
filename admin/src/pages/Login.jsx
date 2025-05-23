import React from 'react'
import { assets } from '../assets/assets'
import { useState } from 'react'
import { useContext } from 'react'
import { AdminContext } from '../context/AdminContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { DoctorContext } from '../context/DoctorContext'



function Login() {

  const [state, setState] = useState('Admin') // This state we manage the admin login andd the doctors login.
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { setAToken, backendUrl } = useContext(AdminContext)
  const { setDToken } = useContext(DoctorContext)


  // This function is working after the form submission.

  const onSubmitHandler = async (event) => {
    event.preventDefault() // when we submitted the form it will not reload the wweb page.

    try {

      if (state === 'Admin') {
        const { data } = await axios.post(backendUrl + '/api/admin/login', { email, password })
        if (data.success) {
          localStorage.setItem('aToken', data.token) //we store the token in the local storag due to which when the page is reloade admin should be login.
          setAToken(data.token)

        } else {
          toast.error(data.message)
        }

      } else {
        const { data } = await axios.post(backendUrl + '/api/doctor/login', { email, password })
        if (data.success) {
          localStorage.setItem('dToken', data.token) //we store the token in the local storag due to which when the page is reloade admin should be login.
          setDToken(data.token)
          console.log(data.token)
        } else {
          toast.error(data.message)
        }
      }

    } catch (error) {

    }
  }

  return (
    <form onSubmit={onSubmitHandler} className='min-h-[80vh] flex items-center'>
      <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-[#5E5E5E] text-sm shadow-lg'>
        <p className='text-2xl font-semibold m-auto'><span className='text-primary'>{state}</span> Login</p>
        <div className='w-full'>
          <p>Email</p>
          <input onChange={(e) => setEmail(e.target.value)} value={email} className='border border-[#DADADA] rounded w-full p-2 mt-1' type="email" required />
        </div>
        <div className='w-full'>
          <p>Paassword</p>
          <input onChange={(e) => setPassword(e.target.value)} value={password} className='border border-[#DADADA] rounded w-full p-2 mt-1' type="password" required />
        </div>
        <button className='bg-primary text-white w-full py-2 rounded-md text-base'>Login</button>
        {
          state == 'Admin'
            ? <p> Doctor Login ?<span className='text-primary underline cursor-pointer' onClick={() => setState('Doctor')}>Click here</span></p>
            : <p>Admin Login ?<span className='text-primary underline cursor-pointer' onClick={() => setState('Admin')}>Click here</span></p>
        }
      </div>
    </form>
  )
}

export default Login