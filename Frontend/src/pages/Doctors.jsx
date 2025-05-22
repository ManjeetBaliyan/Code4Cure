// This page contain list of all the doctors.
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../contexts/AppContext'

function Doctors() {
  const navigate = useNavigate()
  const { speciality } = useParams() //useParams lets you extract dynamic values (like IDs) from the URL in a component.
  const [ShowFilters, setShowFilters] = useState(false) // this is use for showing the filter button in the responsiveness in the phone.
  const [filterDoc, setFilterDoc] = useState([]) // Initially array is empty if we select any speciality then that type of doctor come in array and show on dekstop.
  const { doctors } = useContext(AppContext) // When we click directly on All Doctords on home page it will show the all the doctors.

  //Function due to which we can easily show the doctors according to the speciality
  const applyFilter = () => {
    if (speciality) {
      setFilterDoc(doctors.filter(doc => doc.speciality === speciality)) // Doc is the parameter. if speciality present then put those doctor into setFilterDoc array whose speciality same to selected speciality. 
    }
    else {
      setFilterDoc(doctors) // Otherwise put all the doctors inside the array.
    }
  }

  // When doctors or speciality is change then the applyfilter method run.
  useEffect(() => {
    applyFilter()
  }, [doctors, speciality])

  return (
    <div>
      <p className='text-gray-600'>Browse through the doctors specialist.</p>
      <div className='flex flex-col sm:flex-row items-start gap-5 mt-5'>
        <button className={`py-1 px-3 border rounded text-sm transition-all sm:hidden ${ShowFilters ? 'bg-primary text-white' : ''}`} onClick={() => setShowFilters(prev => !prev)}>Filters</button>
        <div className={`flex-col gap-4 text-sm text-gray-600 ${ShowFilters ? 'flex' : 'hidden sm:flex'}`}>
          <p onClick={() => speciality === 'General physician' ? navigate('/doctors') : navigate('/doctors/General physician')} className={`w-[94vw] sm:w-auto p1-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === 'General physician' ? "bg-indigo-100 text-black" : " "}`}>General physician</p> {/*ternary operator logic is littlebit hard but observe practically we understand */}
          <p onClick={() => speciality === 'Gynecologist' ? navigate('/doctors') : navigate('/doctors/Gynecologist')} className={`w-[94vw] sm:w-auto p1-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === 'Gynecologist' ? "bg-indigo-100 text-black" : " "}`}>Gynecologist</p>
          <p onClick={() => speciality === 'Dermatologist' ? navigate('/doctors') : navigate('/doctors/Dermatologist')} className={`w-[94vw] sm:w-auto p1-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === 'Dermatologist' ? "bg-indigo-100 text-black" : " "}`}>Dermatologist</p>
          <p onClick={() => speciality === 'Pediatricians' ? navigate('/doctors') : navigate('/doctors/Pediatricians')} className={`w-[94vw] sm:w-auto p1-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === 'Pediatricians' ? "bg-indigo-100 text-black" : " "}`}>Pediatricians</p>
          <p onClick={() => speciality === 'Neurologist' ? navigate('/doctors') : navigate('/doctors/Neurologist')} className={`w-[94vw] sm:w-auto p1-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === 'Neurologist' ? "bg-indigo-100 text-black" : " "}`}>Neurologist</p>
          <p onClick={() => speciality === 'Gastroenterologist' ? navigate('/doctors') : navigate('/doctors/Gastroenterologist')} className={`w-[94vw] sm:w-auto p1-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === 'Gastroenterologist' ? "bg-indigo-100 text-black" : " "}`}>Gastroenterologist</p>
        </div>
        {/*-------------------------Left side(All Doctors shown)---------------------- */}
        <div className='w-full grid grid-cols-auto gap-4 gap-y-6'>
          {
            filterDoc.map((item, index) => ( // Slice function is use to show only top 10 Dr. at the home page.

              <div onClick={() => navigate(`/appointments/${item._id}`)} // When we click on a doctor then open the dr. info and book the appoiintment page. 
                className='border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500' key={index}> {/* this div is for each dr. and its contain the name, speaciality,availability of the each doctor */}
                <img className='bg-blue-50' src={item.image} alt="" />
                <div className='p-4'>
                  <div className={`flex items-center gap-2 text-sm text-center ${item.available ? 'text-green-500' : 'text-gray-500'} `}>
                    <p className={`w-2 h-2 ${item.available ? 'bg-green-500' : 'bg-gray-500'}  rounded-full`}></p><p>{item.available ? 'Available' : 'Not Available'}</p>
                  </div>
                  <p className='text-gray-900 text-lg font-medium'>{item.name}</p>
                  <p className='text-gray-600 text-sm'>{item.speciality}</p>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </div >
  )
}

export default Doctors