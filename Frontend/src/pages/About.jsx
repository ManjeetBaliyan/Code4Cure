// About the website 

import React from 'react'
import { assets } from '../assets/assets'

function About() {
  return (
    <div>
      <div className='text-center text-2xl pt-10 text-gray-500' >
        <p>ABOUT <span className='text-gray-700 font-medium'>US</span></p>
      </div>
      <div className='my-10 flex flex-col md:flex-row gap-12'>
        <img className='w-full md:max-w-[360px]' src={assets.about_image} alt="" />
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-sm text-gray-600'>
          <p>Welcome to MyDoctor, your reliable companion in navigating modern healthcare with ease and confidence. At MyDoctor, we recognize the daily challenges people face in accessing timely medical care and managing their health journey.</p>
          <p>We are dedicated to simplifying healthcare through smart technology—allowing you to book appointments, access trusted doctors, and manage medical interactions all in one place. Whether you're seeking a one-time consultation or managing regular check-ups, MyDoctor is designed to support you every step of the way.</p>
          <b className='text-gray-800'>Our Vision</b>
          <p>At MyDoctor, our vision is to revolutionize the way people experience healthcare. We strive to build a connected, accessible, and patient-centered healthcare ecosystem where care is just a click away—anytime, anywhere.</p>
        </div>
      </div>


      <div className='text-xl my-4'>
        <p>WHY <span className='text-gray-700 font-semibold'>CHOOSE US</span></p>
      </div>
      <div className='flex flex-col md:flex-row mb-20'>
        <div className='border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer'>
          <b>Efficiency:</b>
          <p>Streamlined appointment scheduling that fits into your busy lifestyle.</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer'>
          <b>Convenience:</b>
          <p>Access to a network of trusted healthcare professionals in your area.</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer'>
          <b>Personalization:</b>
          <p>Tailored recommendations and reminders to help you stay on top of your health.</p>
        </div>
      </div>
    </div>
  )
}

export default About