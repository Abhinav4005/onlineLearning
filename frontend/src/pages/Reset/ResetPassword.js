import axios from 'axios';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const { token } = useParams();
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    try {
        const resposne = await axios.post(`http://localhost:8000/api/reset-password/${token}`, password,{
            headers:{
                "Content-Type":"application/json"
            }
        })
        console.log("Response ", resposne);
    } catch (error) {
        console.log("Error",error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-semibold text-center text-gray-700 mb-6">Reset Your Password</h1>
        
        {message && <p className="text-green-500 text-center mb-4">{message}</p>}
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-600">New Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter your new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <button 
            type="submit"
            className="w-full py-3 mt-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none"
          >
            Reset Password
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Remembered your password? 
            <a href="/login" className="text-blue-600 hover:text-blue-700">Login</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;