// It is the changement in the availability of the doctor. We need this function in both the pannel admin pannel and the doctor pannel.
import doctorModel from "../models/doctorModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import appointmentModel from "../models/appointmentModel.js";
import axios from "axios";

const changeAvailability = async (req, res) => {
  try {
    const { docId } = req.body;
    const docData = await doctorModel.findById(docId); // Here we set the value of docdata.
    await doctorModel.findByIdAndUpdate(docId, {
      available: !docData.available,
    });
    res.json({
      success: true,
      message: "Availablity Changed",
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

// Function due to which we can see the list of all the docotors on the frontend

const doctorList = async (req, res) => {
  try {
    const doctors = await doctorModel.find({}).select(["-password", "-email"]);
    res.json({
      success: true,
      doctors,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

//API for doctor login
const loginDoctor = async (req, res) => {
  try {
    const { email, password } = req.body;
    const doctor = await doctorModel.findOne({ email });

    if (!doctor) {
      return res.json({
        success: false,
        message: "Invalid Credentials",
      });
    }

    const isMatch = await bcrypt.compare(password, doctor.password);

    if (isMatch) {
      const token = jwt.sign({ id: doctor._id }, process.env.JWT_SECRET);
      res.json({
        success: true,
        token,
      });
    } else {
      console.log(error);
      res.json({
        success: false,
        message: "Invalid Credentials",
      });
    }
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

//API to get doctor appointment for doctor pannel
const appointmentsDoctor = async (req, res) => {
  try {
    const { docId } = req.body;
    const appointments = await appointmentModel.find({ docId });

    res.json({
      success: true,
      appointments,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

// API to mark appointment completed for doctor panel

const appointmentComplete = async (req, res) => {
  try {
    const { docId, appointmentId } = req.body;

    const appointmentData = await appointmentModel.findById(appointmentId);

    if (appointmentData && appointmentData.docId === docId) {
      await appointmentModel.findByIdAndUpdate(appointmentId, {
        isCompleted: true,
      });
      return res.json({
        success: true,
        message: "Appointment Completed",
      });
    } else {
      res.json({
        success: false,
        message: "Mark Failed",
      });
    }
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

// API to cancel appointment for doctor panel
const appointmentCancel = async (req, res) => {
  try {
    const { docId, appointmentId } = req.body;

    const appointmentData = await appointmentModel.findById(appointmentId);

    if (appointmentData && appointmentData.docId === docId) {
      await appointmentModel.findByIdAndUpdate(appointmentId, {
        cancelled: true,
      });
      return res.json({
        success: true,
        message: "Appointment Cancelled",
      });
    } else {
      res.json({
        success: false,
        message: "Cancellation Failed",
      });
    }
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

// API to get dashboard data for doctor panel
const doctorDashboard = async (req, res) => {
  try {
    const { docId } = req.body;
    const appointments = await appointmentModel.find({ docId });
    let earnings = 0;

    appointments.map((item) => {
      if (item.isCompleted || item.payment) {
        earnings += item.amount;
      }
    });

    let patients = [];

    appointments.map((item) => {
      if (!patients.includes(item.userId)) {
        patients.push(item.userId);
      }
    });

    const dashData = {
      earnings,
      appointments: appointments.length,
      patients: patients.length,
      latestAppointments: appointments.reverse().slice(0, 5),
    };

    res.json({
      success: true,
      dashData,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

// API to get doctor profile for Doctor Panel
const doctorProfile = async (req, res) => {
  try {
    const { docId } = req.body;
    const profileData = await doctorModel.findById(docId).select("-password");

    res.json({
      success: true,
      profileData,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

// API to update doctor profile data from Doctor Panel
const updateDoctorProfile = async (req, res) => {
  try {
    const { fees, docId, address, available } = req.body;
    await doctorModel.findByIdAndUpdate(docId, { fees, address, available });

    res.json({
      success: true,
      message: "Profile Updated",
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

// API to start call for doctor panel
const startOrGetCall = async (req, res) => {
  try {
    const appointment = await appointmentModel.findById(req.body.appointmentId);

    if (!appointment || appointment.docId.toString() !== req.body.docId) {
      return res
        .status(403)
        .json({
          success: false,
          message: "Unauthorized or appointment not found",
        });
    }

    // If no room exists, create it
    if (!appointment.roomUrl) {
      const roomResp = await axios.post(
        "https://api.daily.co/v1/rooms",
        {
          name: `appt-${appointment._id}`,
          properties: {
            exp: Math.floor(Date.now() / 1000) + 3600, // 1 hour
            eject_at_room_exp: true,
          },
        },
        {
          headers: { Authorization: `Bearer ${process.env.DAILY_API_KEY}` },
        }
      );

      appointment.roomUrl = roomResp.data.url;
      appointment.status = "in-progress";
      await appointment.save();
    }

    const roomName = new URL(appointment.roomUrl).pathname.split("/").pop();

    const tokenResp = await axios.post(
      "https://api.daily.co/v1/meeting-tokens",
      {
        properties: {
          room_name: roomName,
          is_owner: true,
          user_name: "doctor",
          exp: Math.floor(Date.now() / 1000) + 1800, // 30 min
          enable_chat : true,
          enable_transcription : true
        },
      },
      {
        headers: { Authorization: `Bearer ${process.env.DAILY_API_KEY}` },
      }
    );

    return res.json({
      success: true,
      roomUrl: appointment.roomUrl,
      token: tokenResp.data.token,
    });
  } catch (error) {
    console.error(
      "Error starting or getting doctor call:",
      error.response?.data || error.message
    );
    return res.status(500).json({ success: false, message: error.message });
  }
};

export {
  changeAvailability,
  doctorList,
  loginDoctor,
  appointmentsDoctor,
  appointmentComplete,
  appointmentCancel,
  doctorDashboard,
  updateDoctorProfile,
  doctorProfile,
  startOrGetCall,
};
