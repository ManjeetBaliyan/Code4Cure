// In this controller we will create the API logic for the user like login,register, get profile,update profile, book appointment, displaying the book appointment and cancelling thhe book appointment.
// We will add the payment gateway also here.

import validator from 'validator'
import bcrypt from 'bcrypt'
import userModel from '../models/userModel.js'
import jwt from 'jsonwebtoken'
import { v2 as cloudinary } from 'cloudinary'
import doctorModel from '../models/doctorModel.js'
import appointmentModel from '../models/appointmentModel.js'
import rozorpay from 'razorpay'
import Razorpay from 'razorpay'





// API to register user
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body

        if (!name || !email || !password) {
            return res.json({
                success: false,
                message: "Missing Details"
            })
        }
        // checking the email
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

        //Hashing the user password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        // Create the user data in database where all these values are store
        const userData = {
            name,
            email,
            password: hashedPassword,
        }

        const newuser = new userModel(userData)
        const user = await newuser.save()

        // By using the _id property of the user we are going to create one token so that user can login on the website.
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)

        res.json({
            success: true,
            token
        })

    } catch (error) {
        res.json({
            success: false,
            message: error.message
        })
    }
}




//API's for the user login
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await userModel.findOne({ email })
        if (!user) {
            return res.json({
                success: false,
                message: "User does not exist"
            })
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if (isMatch) {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
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
    }
    catch (error) {
        res.json({
            success: false,
            message: error.message
        })
    }
}




// API's to get user profile data 
const getProfile = async (req, res) => {
    try {
        const { userId } = req.body // to change in the header (of the project html file)  into userId we will create a middleware name is authUser.
        const userData = await userModel.findById(userId).select('-password')

        res.json({
            success: true,
            userData
        })


    } catch (error) {
        res.json({
            success: false,
            message: error.message
        })
    }

}



// API's to update the user profile
const updateProfile = async (req, res) => {
    try {
        const { userId, name, phone, address, dob, gender } = req.body
        const imageFile = req.file

        if (!name || !phone || !address || !dob || gender === undefined || gender === null) {
            return res.json({
                success: true,
                message: "Data Missing"
            })
        }

        await userModel.findByIdAndUpdate(userId, { name, phone, address: JSON.parse(address), dob, gender })
        if (imageFile) {
            //Upload image to cloudinary
            const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: 'image' })
            const imageURL = imageUpload.secure_url

            await userModel.findByIdAndUpdate(userId, { image: imageURL })
        }

        res.json({
            success: true,
            message: 'Profile Updated'
        })


    } catch (error) {
        res.json({
            success: false,
            message: error.message
        })
    }
}




// API to book an appointment
const bookAppointment = async (req, res) => {
    try {
        const { userId, docId, slotDate, slotTime } = req.body
        const docData = await doctorModel.findById(docId).select('-password')

        if (!docData.available) {
            return res.json({
                success: false,
                message: "Doctor is not available"
            })
        }

        let slots_booked = docData.slots_booked  // we store All slots booked in this variable

        //Checking for the Slot availaility
        if (slots_booked[slotDate]) {
            if (slots_booked[slotDate].includes(slotTime)) {
                return res.json({
                    success: false,
                    message: "Doctor is not available"
                })
            } else {
                slots_booked[slotDate].push(slotTime)
            }
        } else {
            slots_booked[slotDate] = []
            slots_booked[slotDate].push(slotTime)
        }

        const userData = await userModel.findById(userId).select('-password')
        delete docData.slots_booked

        const appointmentData = {
            userId,
            docId,
            userData,
            docData,
            amount: docData.fees,
            slotTime,
            slotDate,
            date: Date.now()
        }

        const newappointment = new appointmentModel(appointmentData)
        await newappointment.save()

        // save the new slota data in database.
        await doctorModel.findByIdAndUpdate(docId, { slots_booked })

        res.json({
            success: true,
            message: "Appointment Booked"
        })
    } catch (error) {
        res.json({
            success: false,
            message: error.message
        })
    }
}




// API to get user appointments for frontend my-appointments page.
const listAppointment = async (req, res) => {
    try {
        const { userId } = req.body
        const appointments = await appointmentModel.find({ userId })  // It search in the database by the userId and all the appointments regarding that userid store in this variable.
        res.json({
            success: true,
            appointments
        })
    } catch (error) {
        res.json({
            success: false,
            message: error.message
        })
    }
}




// API to cancel the Apppointments
const cancelAppointments = async (req, res) => {
    try {
        const { userId, appointmentId } = req.body
        const appointmentData = await appointmentModel.findById(appointmentId)

        // Verify appointment user
        if (appointmentData.userId.toString() !== userId) {
            return res.json({
                success: false,
                message: 'Unauthorized Action'
            })
        }

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



// API logic to make the payment for appointement using razorpay.
const rozorpayInstance = new Razorpay({ //It connects your backend to Razorpay’s server using your credentials.
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
})


const paymentRazorpay = async (req, res) => {

    try {
        const { appointmentId } = req.body
        const appointmentData = await appointmentModel.findById(appointmentId)

        if (!appointmentData || appointmentData.cancelled) {
            return res.json({
                success: false,
                message: "Appointment Cancelled or nit found"
            })
        }

        // Creating options for razorpay payment
        const options = {
            amount: appointmentData.amount * 100,
            currency: process.env.CURRENCY,
            receipt: appointmentId
        }

        //create of an order 
        const order = await rozorpayInstance.orders.create(options)

        res.json({
            success: true,
            order
        })

    } catch (error) {
        res.json({
            success: false,
            message: error.message
        })
    }
}



// API to verify the payment of rozorpay
const verifyRazorpay = async (req, res) => {
    try {
        const { razorpay_order_id } = req.body
        const orderInfo = await rozorpayInstance.orders.fetch(razorpay_order_id)

        //orderinfo have the many properties on of them is status
        if (orderInfo.status === 'paid') {
            await appointmentModel.findByIdAndUpdate(orderInfo.receipt, { payment: true })
            res.json({
                success: true,
                message: "Payment Successful"
            })
        } else {
            res.json({
                success: false,
                message: "Payment Failed"
            })
        }

    } catch (error) {
        res.json({
            success: false,
            message: error.message
        })
    }
}


export { registerUser, loginUser, getProfile, updateProfile, bookAppointment, listAppointment, cancelAppointments, paymentRazorpay, verifyRazorpay }