import validator from "validator"
import bcrypt from 'bcrypt'
import { v2 as cloudinary } from 'cloudinary'
import doctorModel from '../models/doctorModel.js'
import jwt from 'jsonwebtoken'
import appointmentModel from "../models/appointmentModel.js"
import userModel from "../models/userModel.js"


// API for adding doctors
const addDoctor = async (req, res) => {
    try {
        const { name, email, password, speciality, degree, experience, about, fees, address } = req.body
        const imageFile = req.file

        // Checking for all the data to add doctor.
        if (!name || !email || !password || !speciality || !degree || !experience || !about || !fees || !address) {
            return res.json({
                success: false,
                message: "Missing Details"
            })
        }

        // validating the email format
        if (!validator.isEmail(email)) {
            return res.json({
                success: false,
                message: "Please enter a valid email"
            })
        }

        // Validating a strong Password
        if (password.length < 8) {
            return res.json({
                success: false,
                message: "Please enter a strong password"
            })
        }

        //Hashing the doctor password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        // Upload Image to Cloudinary
        const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" })
        const imageUrl = imageUpload.secure_url

        // Create the doctor data in database where all these values are store
        const doctorData = {
            name,
            email,
            password: hashedPassword,
            image: imageUrl,
            speciality,
            degree,
            experience,
            about,
            fees,
            address: JSON.parse(address), // store the data in the database as an object.
            date: Date.now()
        }

        const newDoctor = new doctorModel(doctorData)
        await newDoctor.save()

        res.json({
            success: true,
            message: "Docter Added Sucessfully"
        })

    } catch (error) {
        console.log(error)
        res.json({
            success: false,
            message: error.message
        })
    }

}

// API for the Admin login
const loginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body
        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const token = jwt.sign({ email }, process.env.JWT_SECRET)

            res.json({
                success: true,
                token
            })
        } else {
            res.json({
                success: false,
                message: "Invalid Credentials"
            })
        }
    } catch (error) {
        console.log(error)
        res.json({
            success: false,
            message: error.message
        })
    }
}

//API to get all the doctors list for admin pannel

const allDoctors = async (req, res) => {
    try {
        const doctors = await doctorModel.find({}).select('-password')
        res.json({
            success: true,
            doctors
        })
    } catch (error) {
        console.log(error)
        res.json({
            success: false,
            message: error.message
        })
    }
}

// API to get all appointment list
const appointementsAdmin = async (req, res) => {
    try {
        const appointments = await appointmentModel.find({})
        res.json({
            success: true,
            appointments
        })

    } catch (error) {
        console.log(error)
        res.json({
            success: false,
            message: error.message
        })
    }
}


// API for appointment cancellation

const appointementCancel = async (req, res) => {
    try {
        const { appointmentId } = req.body
        const appointmentData = await appointmentModel.findById(appointmentId)

        await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true })

        // Free that slot after cancel the appointment
        const { docId, slotDate, slotTime } = appointmentData

        const doctorData = await doctorModel.findById(docId)

        let slots_booked = doctorData.slots_booked


        slots_booked[slotDate] = slots_booked[slotDate].filter(e => e !== slotTime) // In the slot_booked data all these value are store whose value is not equal to the slotTime (whose we cancel).

        await doctorModel.findByIdAndUpdate(docId, { slots_booked }) // We update the data

        res.json({
            success: true,
            message: "Appointment Cancel Sucessfully"
        })


    } catch (error) {
        res.json({
            success: false,
            message: error.message
        })
    }
}


// API to get dashboard data for admin pannel
const adminDashboard = async (req, res) => {
    try {
        const doctors = await doctorModel.find({})
        const users = await userModel.find({})
        const appointments = await appointmentModel.find({})

        const dashData = {
            doctors: doctors.length,
            patients: users.length,
            appointments: appointments.length,
            latestAppointments: appointments.reverse().slice(0, 5)

        }
        res.json({
            success: true,
            dashData
        })

    } catch (error) {
        res.json({
            success: false,
            message: error.message
        })
    }
}


export { addDoctor, loginAdmin, allDoctors, appointementsAdmin, appointementCancel, adminDashboard}