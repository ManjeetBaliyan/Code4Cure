// Contain the contact information.
import React from 'react';
import { assets } from '../assets/assets';

function Contact() {
  return (
    <div className="bg-white py-16 px-4 sm:px-8 md:px-16 lg:px-24 text-gray-700">
      <h2 className="text-3xl font-bold text-center mb-4">
        CONTACT <span className="text-primary">US</span>
      </h2>
      <p className="text-center text-gray-500 mb-12 max-w-xl mx-auto">
        We'd love to hear from you. Whether you have a question about features, pricing, or anything else — our team is ready to help.
      </p>

      <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-10">
        {/* Left Side: Contact Details */}
        <div className="flex-1 space-y-6">
          <div>
            <h4 className="font-semibold text-lg text-gray-800">Our Office</h4>
            <p className="text-gray-500 mt-1">
              C4E Fire Station Road, Janakpuri <br />
              New Delhi, Delhi, India
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-lg text-gray-800">Contact Info</h4>
            <p className="text-gray-500 mt-1">
              Tel: 826-603-7477 <br />
              Email: manjeetbaliyan21@gmail.com
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-lg text-gray-800">Team</h4>
            <p className="text-gray-500 mt-1">Team Name: <span className="font-medium text-primary">Code4Cure</span></p>
          </div>
        </div>

        {/* Right Side: Image */}
        <div className="flex-1 flex justify-center">
          <img
            src={assets.contact_image}
            alt="Contact"
            className="w-full max-w-sm md:max-w-md lg:max-w-lg rounded-2xl shadow-md object-contain"
          />
        </div>
      </div>
    </div>
  );
}

export default Contact;
