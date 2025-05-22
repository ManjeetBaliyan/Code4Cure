// Here we will create the appointment model where we will describe the appointmewnt schema.

import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({

    // UserId will be g shared by the middleware using the authentication token.
    userId: { type: String, required: true },
    // when a user book an appointment it provide the doctorId, SlotDate, SlotTime, 
    docId: { type: String, required: true },
    slotDate: { type: String, required: true },
    slotTime: { type: String, required: true },
    //Below Data is generated in the backend
    userData: { type: Object, required: true },
    docData: { type: Object, required: true },
    amount: { type: Number, required: true },
    date: { type: Number, required: true }, //Appointment Date
    cancelled: { type: Boolean, default: false },
    payment: { type: Boolean, default: false },
    isCompleted: { type: Boolean, default: false },
})

const appointmentModel = mongoose.models.appointment || mongoose.model('appointment', appointmentSchema)

export default appointmentModel