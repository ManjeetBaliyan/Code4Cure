// Due to this we can access the common logic from this file. So we create the context.
//This file creates a global context (AppContext) to make doctors data available to any component that needs it.
// Why? ans===> To avoid passing doctors via props manually through many components. Any child can now use.
import { createContext, useEffect, useState } from "react";
import axios from 'axios'
import { toast } from "react-toastify";


export const AppContext = createContext()

const AppContextProvider = (props) => {
    const currencySymbol = "$"
    const backendUrl = import.meta.env.VITE_BACKEND_URL  // attached the backend url
    const [doctors, setDoctors] = useState([])
    const [token, setToken] = useState(localStorage.getItem('token') ? localStorage.getItem('token') : false) // This store the user authentication  token which is genrated when a user register or login. When we reload the page it check if localstorage have the token then the initial value of that token bcz user refresh the page after the login inside the website 
    const [userData, setUserdata] = useState(false)

    // Arrow funtion to call the API

    const getDoctorsData = async () => {
        try {
            const { data } = await axios.get(backendUrl + '/api/doctor/list')
            if (data.success) {
                setDoctors(data.doctors)
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }


    //This function will get the user data and will save the userdata in the setUserdata state variable.
    const loadUserProfileData = async () => {
        try {
            const { data } = await axios.get(backendUrl + '/api/user/get-profile', { headers: { token } })
            if (data.success) {
                setUserdata(data.userData)
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }


    useEffect(() => {
        getDoctorsData()
    }, [])


    useEffect(() => {
        if(token){
        loadUserProfileData()
        }else{
            setUserdata(false)
        }
    }, [token])



    const value = {
        doctors,getDoctorsData,
        currencySymbol,
        token, setToken,
        backendUrl,
        setUserdata,userData,
        loadUserProfileData
    }


    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider