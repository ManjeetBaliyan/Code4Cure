import mongoose from 'mongoose'
const connectDB = async () => {
    mongoose.connection.on('connected', () => console.log('Database is connected'))
    await mongoose.connect(`${process.env.MONGODB_URI}/MyDoctor`)
}
export default connectDB