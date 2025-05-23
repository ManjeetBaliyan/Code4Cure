// Show the appointments of the user.
import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../contexts/AppContext'
import { assets } from '../assets/assets'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'



function MyAppointments() {
  const { backendUrl, token, getDoctorsData } = useContext(AppContext)
  const [appointments, setAppointments] = useState([]) // this state store all the appointments
  const navigate = useNavigate()

  // Set the Date formate shown at the frontend where user see the my-appointments
  const months = ['', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  const slotDateFormat = (slotDate) => {
    const dateArray = slotDate.split('_')
    return dateArray[0] + " " + months[Number(dateArray[1])] + " " + dateArray[2]
  }

  // Arrow function for call the API of the my-appointments
  const getUserAppointments = async () => {
    try {
      const { data } = await axios.get(backendUrl + '/api/user/appointments', { headers: { token } })
      if (data.success) {
        setAppointments(data.appointments.reverse()) // Reverse is use to reverse the appointment array due to which show the the latest appointment at the top and older at the bottom.
        console.log(data.appointments)
      }

    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }


  // Arrow function for call the API of the cancel Appointment.
  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(backendUrl + '/api/user/cancel-appointment', { appointmentId }, { headers: { token } })
      if (data.success) {
        toast.success(data.message),
          getUserAppointments(),
          getDoctorsData()
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }


  // Arrow function for the Payment of the appointment fees.

  //initPay function is responsible for launching the Razorpay payment popup with all the necessary payment details.
  const initPay = (order) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: 'Appointement Payment',
      description: 'Appointement Payment',
      order_id: order.id,
      receipt: order.receipt,
      handler: async (response) => {
        console.log(response)

        try {
          const { data } = await axios.post(backendUrl + '/api/user/verifyRozorpay', response, { headers: { token } })
          if (data.success) {
            getUserAppointments()
            navigate('/my-appointments')
          }
        } catch (error) {
          console.log(error)
          toast.error(error.message)
        }
      }
    }


    const rzp = new window.Razorpay(options)
    rzp.open()
  }


  const appointmentRazorpay = async (appointmentId) => {
    try {
      const { data } = await axios.post(backendUrl + '/api/user/payment-razorpay', { appointmentId }, { headers: { token } })
      if (data.success) {
        initPay(data.order)
      }


    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }


  const joinCall = async (item) => {
    try {
      const { data } = await axios.post(backendUrl + '/api/user/joinCall', {
        appointmentId: item._id,
      }, { headers: { token } });

      console.log(data);
      

      if (data.success) {
        toast.success("Call Started")
        navigate('/video-call', { state: { roomUrl: data.roomUrl, token: data.token } });
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };


  useEffect(() => {
    if (token) {
      getUserAppointments()
    }
  }, [token])



  return (
    <div>
      <p className='pb-3 mt-12 font-medium text-zinc-700 border-b'>My Appointments</p>
      <div>
        {appointments.map((item, index) => (
          <div className='grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b' key={index}>
            <div>
              <img className='w-32 bg-indigo-50' src={item.docData.image} alt="" />
            </div>
            <div className='flex-1 text-sm text-zinc-600'>
              <p className='text-neutral-800 font-semibold'>{item.docData.name}</p>
              <p>{item.docData.speciality}</p>
              <p className='text-zinc-700 font-medium mt-1'>Address:</p>
              <p className='text-xs'>{item.docData.address.line1}</p>
              <p className='text-xs'>{item.docData.address.line2}</p>
              <p className='text-xs mt-1'><span className='text-xs text-neutral-700 font-medium'>Date & Time:</span> {slotDateFormat(item.slotDate)} | {item.slotTime}</p>
            </div>
            <div></div>
            <div className='flex flex-col gap-2 justify-end'>
              {/* Paid button */}
              {!item.cancelled && item.payment && !item.isCompleted && !item.roomUrl && (
                <button className='sm:min-w-48 py-2 border rounded text-stone-500 bg-indigo-50'>
                  Paid
                </button>
              )}

              {/* Pay Online button */}
              {!item.cancelled && !item.payment && !item.isCompleted && (
                <button
                  onClick={() => appointmentRazorpay(item._id)}
                  className='text-sm text-stone-500 text-center sm:min-w-48 py-2 border hover:bg-primary hover:text-white transition-all duration-300'
                >
                  Pay Online
                </button>
              )}

              {/* Cancel button */}
              {!item.cancelled && !item.isCompleted && (
                <button
                  onClick={() => cancelAppointment(item._id)}
                  className='text-sm text-stone-500 text-center sm:min-w-48 py-2 border hover:bg-red-600 hover:text-white transition-all duration-300'
                >
                  Cancel appointment
                </button>
              )}

              {/* Appointment Cancelled */}
              {item.cancelled && !item.isCompleted && (
                <button className='sm:min-w-48 py-2 border border-red-500 rounded text-red-500'>
                  Appointment cancelled
                </button>
              )}

              {/* Completed */}
              {item.isCompleted && (
                <button className='sm:min-w-48 py-2 border border-green-500 rounded text-green-500'>
                  Completed
                </button>
              )}

              {/* Join Call Button */}
              {!item.cancelled && item.payment && !item.isCompleted && item.roomUrl && (
                <button
                  onClick={() => joinCall(item)}
                  className='sm:min-w-48 py-2 border border-blue-500 rounded text-blue-500 hover:bg-blue-600 hover:text-white transition-all duration-300'
                >
                  Join Call
                </button>
              )}
            </div>

          </div>
        ))}
      </div>
    </div>
  )
}

export default MyAppointments