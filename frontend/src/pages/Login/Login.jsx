import axios from 'axios';
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if(!formData.email || !formData.password){
      setError("All field is required");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8000/api/login", formData, {
        headers: {
          "Content-Type": "application/json"
        }
      });
      const data = response;
      console.log("Response ", data);
      if (response.status === 200) {
        localStorage.setItem("authToken", response.data.data)
        setMessage("Login successful");
        setFormData({email:"", password:""})
      } else {
        setError("Failed to login");
        console.log("Error failed to login")
      }
    } catch (error) {
      setError(error.message);
      console.log("Error ", error.message)
    }
  };

  const handleLogout = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    try {
      const response = await axios.post("http://localhost:8000/api/logout");
      console.log("Response ", response);
      if (response.status === 200) {
        setMessage(response.data.message);
      }
    } catch (error) {
      setError("Failed to logout");
    }
  };

  return (
    <div className="w-full max-w-sm mx-auto bg-white p-8 rounded-xl shadow-lg mt-20">
      <h1 className="text-2xl font-semibold text-center text-gray-800 mb-6">Login</h1>

      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4">
          {/* Email Input */}
          <div className="flex flex-col">
            <label htmlFor="email" className="text-sm font-medium text-gray-600">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Password Input */}
          <div className="flex flex-col">
            <label htmlFor="password" className="text-sm font-medium text-gray-600">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Forgot Password Link */}
          <NavLink to="/forgot-password" className="text-sm text-blue-600 hover:text-blue-800 text-right">Forgot password?</NavLink>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full mt-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none transition duration-300"
        >
          Login
        </button>
      </form>

      {/* Error and Success Messages */}
      {error && <p className="text-red-500 text-sm text-center mt-3">{error}</p>}
      {message && <p className="text-green-500 text-sm text-center mt-3">{message}</p>}

      {/* Logout Button */}
      <button
        className="w-full mt-4 py-3 bg-black text-white rounded-lg hover:bg-gray-800 focus:outline-none transition duration-300"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
};

export default Login;