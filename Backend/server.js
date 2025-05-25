import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import adminRouter from './routes/adminRoute.js';
import doctorRouter from './routes/doctorRoute.js';
import userRouter from './routes/userRoute.js';

// app config 
const app = express();
const port = process.env.PORT || 4000;

// Connect mongodb and cloudinary into our backend
connectDB();
connectCloudinary();

//middleware
app.use(express.json());

const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:5174',
  'https://my-doctor-woad.vercel.app',
  'https://my-doctor-wcep.vercel.app',
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));

// api Endpoint
app.use('/api/admin', adminRouter) // localhost:4000/api/admin/add-doctor
app.use('/api/doctor', doctorRouter) // For the list of the Doctor on the fromtend.
app.use('/api/user', userRouter)

app.get('/', (req, res) => {
  res.send('API is working great')
})

app.listen(port, () => console.log("Server is Started", port))
