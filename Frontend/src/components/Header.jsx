import React from 'react';
import { assets } from '../assets/assets';

const Header = () => {
    return (
        <div className="relative overflow-hidden rounded-2xl shadow-xl bg-gradient-to-r from-[#e0f7fa] via-[#f3fdfc] to-[#ffffff] px-6 md:px-12 py-16 md:py-24 flex flex-col-reverse md:flex-row items-center justify-between">

            {/* Decorative Gradient Blobs */}
            <div className="absolute -top-10 -left-10 w-64 h-64 bg-gradient-to-br from-primary to-cyan-400 opacity-10 rounded-full blur-3xl z-0" />
            <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-gradient-to-tr from-pink-300 to-purple-400 opacity-10 rounded-full blur-3xl z-0" />

            {/* Left Content */}
            <div className="z-10 md:w-1/2 flex flex-col gap-6 text-center md:text-left">
                <h1 className="text-4xl lg:text-5xl font-bold text-gray-800 leading-tight">
                    Instantly Book <br className="hidden md:block" />
                    Trusted Doctors
                </h1>

                <div className="flex items-center gap-4 bg-white bg-opacity-80 backdrop-blur-md p-4 rounded-xl shadow-md max-w-md mx-auto md:mx-0">
                    <img src={assets.group_profiles} alt="Group Profiles" className="w-20" />
                    <p className="text-sm text-gray-600">
                        Easily browse top-rated professionals <br className="hidden sm:block" />
                        and book appointments seamlessly.
                    </p>
                </div>

                {/* Statistics Badges */}
                <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-4">
                    <div className="bg-white bg-opacity-80 backdrop-blur-md px-4 py-2 rounded-xl shadow text-sm text-gray-700 font-medium">
                        5000+ Happy Patients
                    </div>
                    <div className="bg-white bg-opacity-80 backdrop-blur-md px-4 py-2 rounded-xl shadow text-sm text-gray-700 font-medium">
                        Effortless Booking
                    </div>
                    <div className="bg-white bg-opacity-80 backdrop-blur-md px-4 py-2 rounded-xl shadow text-sm text-gray-700 font-medium">
                        24/7 Support Available
                    </div>
                </div>

                <a
                    href="#speciality"
                    className="inline-flex items-center gap-2 bg-primary text-white px-8 py-3 rounded-full text-sm font-medium shadow hover:scale-105 transition-transform duration-300 w-fit mx-auto md:mx-0"
                >
                    Book Appointment
                    <img src={assets.arrow_icon} alt="Arrow" className="w-3" />
                </a>
            </div>

            {/* Right Image */}
            <div className="z-10 md:w-1/2 mb-10 md:mb-0 flex justify-center">
                <img
                    src={assets.header_img}
                    alt="Header"
                    className="w-full max-w-md rounded-2xl shadow-lg"
                />
            </div>
        </div>
    );
};

export default Header;
