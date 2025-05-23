import React from 'react';

function DoctorHome() {
  return (
    <div className="p-10 flex flex-col items-center text-center">
      <h1 className="text-5xl font-extrabold text-primary mb-6 animate-fade-in">Welcome, Trusted Healer</h1>
      <p className="text-lg text-gray-700 max-w-2xl mb-10">
        Beyond treatments and charts lies your real power—the ability to listen, understand, and heal with purpose. This is your space to center and connect.
      </p>
      <div className="bg-white border border-green-400/30 shadow-lg rounded-xl p-6 max-w-xl w-full transition hover:shadow-xl">
        <blockquote className="italic text-gray-600">
          “Wherever the art of medicine is loved, there is also a love of humanity.”
        </blockquote>
        <p className="text-right mt-4 text-sm text-green-600">— Hippocrates</p>
      </div>
    </div>
  );
}

export default DoctorHome;