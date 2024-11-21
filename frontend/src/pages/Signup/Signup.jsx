import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

const Signup = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState('');
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors('');
    setMessage('');

    if(!formData.email || !formData.password || !formData.confirmPassword || !formData.fullName){
      setErrors("All field's are required");
      return;
    }

    if(formData.password !== formData.confirmPassword){
      setErrors("Password do not match.")
    }

    try {
      const response = await axios.post('http://localhost:8000/api/signup', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        setMessage('Signup Successful!');
        setFormData({fullName:"", email:"", password:"", confirmPassword:""});
      } else {
        setErrors('Something went wrong. Please try again.');
      }
    } catch (error) {
      setErrors('Internal Server Error. Please try again later.');
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-100'>
      <div className='w-full max-w-md bg-white rounded-lg shadow-lg p-8'>
        <h1 className='text-center text-3xl font-semibold text-gray-700 mb-6'>
          Sign Up
        </h1>
        <form className='space-y-5' onSubmit={handleSubmit}>
          <div>
            <label className='text-sm font-medium text-gray-600' htmlFor='fullName'>
              Full Name
            </label>
            <input
              type='text'
              id='fullName'
              name='fullName'
              value={formData.fullName}
              onChange={handleChange}
              placeholder='Enter your full name'
              className='w-full mt-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
          </div>

          <div>
            <label className='text-sm font-medium text-gray-600' htmlFor='email'>
              Email
            </label>
            <input
              type='email'
              id='email'
              name='email'
              value={formData.email}
              onChange={handleChange}
              placeholder='Enter your email'
              className='w-full mt-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
          </div>

          <div>
            <label className='text-sm font-medium text-gray-600' htmlFor='password'>
              Password
            </label>
            <input
              type='password'
              id='password'
              name='password'
              value={formData.password}
              onChange={handleChange}
              placeholder='Enter your password'
              className='w-full mt-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
          </div>

          <div>
            <label className='text-sm font-medium text-gray-600' htmlFor='confirmPassword'>
              Confirm Password
            </label>
            <input
              type='password'
              id='confirmPassword'
              name='confirmPassword'
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder='Confirm your password'
              className='w-full mt-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
          </div>

          <div>
            <button
              type='submit'
              className='w-full py-3 bg-green-600 text-white rounded-md shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500'
            >
              Sign Up
            </button>
          </div>

          {errors && <p className='text-red-500 text-sm text-center'>{errors}</p>}
          {message && <p className='text-green-500 text-sm text-center'>{message}</p>}
        </form>

        <div className='mt-6 text-center'>
          <NavLink to='/login' className='text-blue-500 underline'>
            Already have an account? Login here
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Signup;