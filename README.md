# 🩺 Code4Cure

**Code4Cure** is a full-stack telemedicine web application that connects patients with doctors through a streamlined platform featuring real-time video consultations, appointment management, secure payments, and separate role-based interfaces.

## 📁 Project Structure

```

Code4Cure/
├── backend/         # Node.js/Express backend for APIs and business logic
├── frontend/        # Patient-facing frontend built with React + Vite
├── admin/           # Doctor/admin portal built separately using React + Vite
├── .vscode/         # VSCode workspace configuration

```

## ✨ Features

### 👨‍⚕️ For Patients
- Browse and filter doctors by specialty
- Book appointments
- Secure payments via Stripe/Razorpay
- Join scheduled video calls (Daily.co integration)
- View and manage upcoming and past appointments

### 🩺 For Doctors/Admins
- Dedicated admin dashboard
- View and manage appointments
- Start and end video consultations
- Add/edit doctors
- Monitor platform metrics

### 📹 Video Calls (Daily.co)
- Doctors can explicitly start/end meetings
- Patients can leave without ending the session
- Meeting tokens include `nbf`, `exp`, and `eject_at_room_exp` for security
- Token and room generation logic is secured on backend

---

## 🛠️ Tech Stack

### Frontend (Patient + Admin)
- React + Vite
- Tailwind CSS
- Context API for state management
- Daily.co for video calls

### Backend
- Node.js + Express
- MongoDB (Mongoose)
- JWT Authentication
- Multer for file uploads
- Cloudinary for image hosting
- REST API architecture

---

## 🔐 Security & Logic

- JWT-based protected routes for users, doctors, and admins
- Role-separated frontends — no type checking logic in components
- Appointment-based access control for video call room token generation
- File uploads via Multer & Cloudinary

---

## 🚀 Getting Started

### Backend

```bash
cd backend
npm install
npm run dev
````

### Frontend (Patient)

```bash
cd frontend
npm install
npm run dev
```

### Admin (Doctor/Admin Portal)

```bash
cd admin
npm install
npm run dev
```

---

## 🧪 Environment Variables

### Backend `.env`

```env
PORT=5000
MONGO_URI=your_mongo_uri
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_key
CLOUDINARY_API_SECRET=your_secret
DAILY_API_KEY=your_daily_api_key
```

### Frontend (Patient) .env
```env
VITE_BACKEND_URL=https://your-backend-url.com
VITE_RAZORPAY_KEY_ID=your_razorpay_key_id
```

### Admin (Doctor Portal) .env
```env
VITE_BACKEND_URL=https://your-backend-url.com
```
---

## 📂 Deployment

* Vercel is used for frontend and admin deployments
* Backend can be deployed on platforms like Render, Railway, or Heroku
* Environment-specific configurations handled through `.env` and `vercel.json`

---

## 📝 Notes

* Separate `VideoCall` components for doctors and patients ensure UX clarity and action control
* Logic ensures that only paid and valid appointments trigger call access
* Handles accidental disconnects without terminating sessions prematurely

---

## 👨‍💻 Author

Developed by Team Code4Cure

---

