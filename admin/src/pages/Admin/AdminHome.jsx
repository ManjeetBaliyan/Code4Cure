import React from 'react';

function AdminHome() {
  return (
    <div className="p-10 flex flex-col items-center text-center">
      <h1 className="text-5xl font-extrabold text-primary mb-6 animate-fade-in">Welcome, Visionary Admin</h1>
      <p className="text-lg text-gray-700 max-w-2xl mb-10">
        You're not just managing a system—you're shaping a healthcare experience. Use your insight, clarity, and leadership to drive positive change every day.
      </p>
      <div className="bg-white border border-primary/30 shadow-lg rounded-xl p-6 max-w-xl w-full transition hover:shadow-xl">
        <blockquote className="italic text-gray-600">
          “Leadership is not about being in charge. It's about taking care of those in your charge.”
        </blockquote>
        <p className="text-right mt-4 text-sm text-primary">— Simon Sinek</p>
      </div>
    </div>
  );
}

export default AdminHome;