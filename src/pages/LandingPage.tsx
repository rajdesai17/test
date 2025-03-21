import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function LandingPage() {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/dashboard?addTask=true');
  };

  return (
    <div className="min-h-screen bg-white">
      <nav className="container mx-auto px-6 py-4 flex items-center justify-between">
        <div className="text-blue-600 text-2xl font-bold">Task Tracker</div>
        <div className="space-x-4">
          <Link to="/" className="text-blue-600 hover:text-blue-800">Home</Link>
          <Link to="/dashboard" className="text-blue-600 hover:text-blue-800">Dashboard</Link>
          <Link to="/get-started" className="text-blue-600 hover:text-blue-800">Get Started</Link>
        </div>
      </nav>

      <main className="container mx-auto px-6 py-16 flex flex-col lg:flex-row items-center">
        <div className="lg:w-1/2">
          <span className="inline-block bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm font-semibold mb-4">Beautiful Task Management</span>
          <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-8">
            Simplify your workflow with <span className="text-blue-600">Task Tracker</span>
          </h1>
          <p className="text-xl text-gray-700 mb-8">
            Focus on what matters most. Task Tracker helps you organize your tasks with elegance and simplicity, so you can concentrate on doing your best work.
          </p>
          <div className="flex space-x-4">
            <button
              onClick={handleGetStarted}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition"
            >
              Get Started
            </button>
            <Link to="/learn-more" className="bg-gray-200 text-gray-900 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-gray-300 transition">
              Learn More
            </Link>
          </div>
          <p className="text-gray-500 mt-4">No credit card required</p>
        </div>
        <div className="lg:w-1/2 mt-12 lg:mt-0">
          <img
            src="https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&w=800&q=80"
            alt="Task Management"
            className="rounded-lg shadow-2xl"
          />
        </div>
      </main>
    </div>
  );
}