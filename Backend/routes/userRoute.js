// Here we handle the route tpo login and all other functionallity of the user on the frontend.


import express from 'express'
import { registerUser,loginUser, getProfile, updateProfile, bookAppointment, listAppointment, cancelAppointments, paymentRazorpay, verifyRazorpay} from '../controllers/userController.js'
import authUser from '../middlewares/authUser.js'
import upload from '../middlewares/multer.js'

const userRouter = express.Router()

userRouter.post('/register', registerUser) // end point of the url of the registration.
userRouter.post('/login',loginUser) // end point of the url of the registration.
userRouter.get('/get-profile',authUser,getProfile) 
userRouter.post('/update-profile',upload.single('image'),authUser,updateProfile) 
userRouter.post('/book-appointment',authUser,bookAppointment) // We add the authuser bcz we required userId and we are not going to send the userId directly we are going to send the header and from the header we will get the userId so just add the authuser .
userRouter.get('/appointments',authUser,listAppointment) // We add the authuser bcz we required userId and we are not going to send the userId directly we are going to send the header and from the header we will get the userId so just add the authuser .
userRouter.post('/cancel-appointment',authUser,cancelAppointments) // We add the authuser bcz we required userId and we are not going to send the userId directly we are going to send the header and from the header we will get the userId so just add the authuser .
userRouter.post('/payment-razorpay',authUser,paymentRazorpay) // We add the authuser bcz we required userId and we are not going to send the userId directly we are going to send the header and from the header we will get the userId so just add the authuser .
userRouter.post('/verifyRozorpay',authUser,verifyRazorpay)

export default userRouter