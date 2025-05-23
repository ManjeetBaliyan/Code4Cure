//Login Page

import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../contexts/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

function Login() {

  const { backendUrl, token, setToken } = useContext(AppContext)
  const navigate = useNavigate()

  const [state, setState] = useState('Sign Up') // For the state of the user i.e login/logout.
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [gender, setGender] = useState('');
  const [dob, setDob] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');

  //We use the onSubmitHandler function to control what happens when a form is submitted, such as validating input, preventing page reload, and sending data to a server.
  //Inshort it's the function to handle action when a user create the account or login.
  const onSubmitHandler = async (event) => {
    event.preventDefault()

    try {
      if (state === 'Sign Up') {
        const { data } = await axios.post(backendUrl + '/api/user/register', { name, email, password,gender, phone, address, dob })
        if (data.success) {
          localStorage.setItem('token', data.token)
          setToken(data.token)
        }
        else {
          toast.error(data.message)
        }

      } else {
        const { data } = await axios.post(backendUrl + '/api/user/login', { email, password })
        if (data.success) {
          localStorage.setItem('token', data.token)
          setToken(data.token)
        }
        else {
          toast.error(data.message)
        }
      }

    } catch (error) {
      toast.error(error.message)
    }
  }


  // When we have token then it means we are login so we goto at home page 
  useEffect(()=>{
    if (token) {
      navigate('/')
    }
  },[token])

  return (
    <form onSubmit={onSubmitHandler} className='min-h-[80vh] flex items-center'>

      <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-zinc-600 text-sm shadow-lg'>

        <p className='text-2xl font-semibold'>{state === 'Sign Up' ? "Create Account" : "Login"}</p>
        <p>Please {state === 'Sign Up' ? "sign up" : "log in"} to book appointment</p>
        {
          state === 'Sign Up' && <div className='w-full'>
            <p><b>Full Name </b></p>
            <input className='border border-zinc-300 rounded w-full p-2 mt-1' type='text' onChange={(e) => setName(e.target.value)} value={name} required />
          </div>
        }

        <div className='w-full'>
        <p> <b>Gender </b></p>
        <select
          className='border border-zinc-300 rounded w-full p-2 mt-1'
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          required
        >
          <option value=''>Select Gender</option>
          <option value='Male'>Male</option>
          <option value='Female'>Female</option>
          <option value='Other'>Other</option>
        </select>
      </div>

        <div className='w-full'>
          <p> <b>Email </b></p>
          <input
            className='border border-zinc-300 rounded w-full p-2 mt-1' type='email' onChange={(e) => setEmail(e.target.value)} value={email} required />
        </div>

        <div className='w-full'>
          <p> <b>Password </b></p>
          <input className='border border-zinc-300 rounded w-full p-2 mt-1' type='password' onChange={(e) => setPassword(e.target.value)} value={password} required />
        </div>

        <div className = 'w-full'>
        <p><b> Date of Birth </b></p>
        <input
          className='border border-zinc-300 rounded w-full p-2 mt-1'
          type='date'
          onChange={(e) => setDob(e.target.value)}
          value={dob}
          required
        />
      </div>

        <div className='w-full'>
        <p><b>Phone Number</b></p>
        <input
          className='border border-zinc-300 rounded w-full p-2 mt-1'
          type='tel'
          onChange={(e) => setPhone(e.target.value)}
          value={phone}
          required
        />
      </div>

        <div className='w-full'>
        <p><b>Address </b></p>
        <textarea
          className='border border-zinc-300 rounded w-full p-2 mt-1'
          rows={2}
          onChange={(e) => setAddress(e.target.value)}
          value={address}
          required
        />
      </div>

        <button type='submit' className='bg-primary text-white w-full py-2 rounded-md text-base'>{state === 'Sign Up' ? "Create Account" : "Login"}</button>
        {
          state === "Sign Up" ? <p>Already have an account? <span onClick={() => setState('Login')} className='text-primary underline cursor-pointer' > Login here</span ></p> : <p>Create an new account? <span onClick={() => setState('Sign Up')} className='text-primary underline cursor-pointer'>click here</span> </p>
        }
      </div>

    </form>
  )
}

export default Login