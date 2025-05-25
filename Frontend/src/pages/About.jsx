import React from 'react';
import { assets } from '../assets/assets';

function About() {
  return (
    <div className="bg-white py-16 px-4 sm:px-8 md:px-16 lg:px-24 text-gray-700">
      {/* Title */}
      <h2 className="text-3xl font-bold text-center mb-4">
        ABOUT <span className="text-primary">US</span>
      </h2>
      <p className="text-center text-gray-500 mb-12 max-w-xl mx-auto">
        Discover how Code4Cure is transforming healthcare through smart technology and patient-first care.
      </p>

      {/* About Section */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-10 mb-16">
        {/* Image */}
        <div className="flex-1 flex justify-center">
          <img
            src={assets.about_image}
            alt="About Code4Cure"
            className="w-full max-w-sm md:max-w-md lg:max-w-lg rounded-2xl shadow-md object-contain"
          />
        </div>

        {/* Text */}
        <div className="flex-1 space-y-6 text-sm text-gray-600">
          <p>
            <span className="font-medium text-primary">Code4Cure</span> is your trusted healthcare companion, simplifying how you access doctors and manage your health. We understand the challenges of getting timely care and maintaining your health records.
          </p>
          <p>
            Our platform enables you to book consultations, manage appointments, and connect with top healthcare professionals from the comfort of your home.
          </p>
          <div>
            <h4 className="text-lg font-semibold text-gray-800">Our Vision</h4>
            <p className="mt-2">
              We aim to revolutionize the healthcare experience—making it seamless, accessible, and patient-centric. Code4Cure is here to support your well-being, anytime, anywhere.
            </p>
          </div>
        </div>
      </div>

      {/* WHY CHOOSE US Section */}
      <div className="mb-12">
        <h3 className="text-2xl font-bold text-center mb-8">
          WHY <span className="text-primary">CHOOSE US</span>
        </h3>
        <div className="grid gap-6 md:grid-cols-3">
          <div className="border p-6 rounded-xl hover:bg-primary hover:text-white transition-all duration-300 shadow-sm text-center">
            <h4 className="font-semibold text-lg mb-2">Efficiency</h4>
            <p className="text-sm">
              Streamlined appointment scheduling that fits into your busy lifestyle.
            </p>
          </div>
          <div className="border p-6 rounded-xl hover:bg-primary hover:text-white transition-all duration-300 shadow-sm text-center">
            <h4 className="font-semibold text-lg mb-2">Convenience</h4>
            <p className="text-sm">
              Access a network of trusted healthcare professionals anytime, anywhere.
            </p>
          </div>
          <div className="border p-6 rounded-xl hover:bg-primary hover:text-white transition-all duration-300 shadow-sm text-center">
            <h4 className="font-semibold text-lg mb-2">Personalization</h4>
            <p className="text-sm">
              Receive tailored health reminders and care recommendations just for you.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
