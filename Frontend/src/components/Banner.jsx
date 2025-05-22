import React from 'react';
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

function Banner() {
    const navigation = useNavigate();

    return (
        <div className="flex flex-col md:flex-row bg-primary rounded-3xl px-6 sm:px-10 md:px-14 lg:px-20 py-12 md:py-20 my-20 md:mx-10 items-center justify-between shadow-2xl overflow-hidden relative">
            
            {/* Left Content */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.6 }}
                className="flex-1 text-center md:text-left z-10"
            >
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-snug">
                    Healthcare Made Simple
                </h2>
                <p className="text-base sm:text-lg text-white mt-4 max-w-lg mx-auto md:mx-0">
                    Experience smooth, hassle-free appointments from the comfort of your home — anytime, anywhere, with the best doctors just a click away.
                </p>
                <button
                    onClick={() => {
                        navigation('/login');
                        scrollTo(0, 0);
                    }}
                    className="bg-white text-gray-700 px-8 py-3 rounded-full mt-6 text-sm sm:text-base hover:scale-105 transition-transform duration-300 shadow-md"
                >
                    Create Account
                </button>
            </motion.div>

            {/* Right Side - Enlarged image, shifted closer to left */}
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1.1, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="hidden md:flex items-end z-10 md:w-1/2 lg:w-[320px] relative overflow-visible"
                style={{ marginLeft: '-4rem' }}  // stronger negative margin on container
            >
                <img
                    src={assets.appointment_img}
                    alt="Appointment"
                    className="w-full h-auto object-contain scale-125 -translate-y-3"
                    style={{ marginLeft: '-5rem' }}  // shift image left inside container
                />
            </motion.div>

            {/* Decorative Blobs */}
            <div className="absolute -top-20 -left-20 w-72 h-72 bg-white opacity-10 rounded-full blur-3xl z-0" />
            <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-white opacity-10 rounded-full blur-3xl z-0" />
        </div>
    );
}

export default Banner;
