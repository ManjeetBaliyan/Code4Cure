// Here we will create the mongoose model for the doctore using that we can store the doctors data in our databbase.

import mongoose from 'mongoose'

const doctorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    speciality: {
        type: String,
        required: true
    },
    degree: {
        type: String,
        required: true
    },
    experience: {
        type: String,
        required: true
    },
    about: {
        type: String,
        required: true
    },
    available: {
        type: Boolean,
        default:true
    },
    fees: {
        type: Number,
        required: true
    },
    address: {
        type: Object,
        required: true
    },
    //It is the account creation date.
    date: {
        type: Number,
        required: true
    },
    slots_booked: {
        type: Object,
        default: {}
    }
}, { minimize: false })
/*
 The { minimize: false } option in Mongoose is used to control how empty objects are stored in MongoDB.
 --> By default If an object field is empty, Mongoose will remove it when saving the document.
 --> But here we want to store the book_slots even if it's empty so, {minimize:false} forces Mongoose to keep empty objects in the database.
     So slots_booked: {} will be saved as it is, not removed.
 */



// Create the Models
const doctorModel = mongoose.models.doctor || mongoose.model('doctor', doctorSchema)  //  If the model already exists in mongoose.models, it reuses it.
export default doctorModel     
