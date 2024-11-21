import axios from 'axios';
import React, { useState } from 'react';

const Forgot = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async(e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    try {
      const resposne = await axios.post("http://localhost:8000/api/forgot-password", {email},{
        headers:{
          "Content-Type":"application/json",
        }
      })
      console.log("Response", resposne);
    } catch (error) {
      console.log("Error", error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">Forgot Password</h1>
        <p className="text-sm text-gray-600 text-center mb-6">
          Enter your email address below to receive a password reset link.
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-4 py-2 border outline-none border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-gray-700"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md shadow focus:outline-none focus:ring-2 focus:ring-blue-300"
          >
            Send Reset Link
          </button>
        </form>
        {error && <p className="text-red-500 text-center mt-4">{error}</p>}
        {message && <p className="text-green-500 text-center mt-4">{message}</p>}
      </div>
    </div>
  );
};

export default Forgot;