// src/Pages/Register.jsx

import React, { useState, useContext } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Bounce, toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from '../Provider/AuthProvider';
import Lottie from 'lottie-react';
import loginAnimation from '../assets/RegisterAimation.json';

const Register = () => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [nameError, setNameError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { createUser, setUser, updateUser, loginWithGoogle } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const validatePassword = (value) => {
    if (value.length < 6) return 'Password should be at least 6 characters';
    if (!/[A-Z]/.test(value)) return 'Password should include a capital letter';
    if (!/[a-z]/.test(value)) return 'Password should include a small letter';
    return '';
  };

  const handelGoogleLogin = () => {
    loginWithGoogle()
      .then(() => {
        toast.success('Logged in with Google 🎉', { transition: Bounce });
        navigate(location.state?.pathname || '/');
      })
      .catch((error) => toast.error(error.message));
  };

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const handelRegister = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const photoUrl = form.photoUrl.value;
    const password = form.password.value;

    if (name.length < 6) {
      setNameError('Name should be at least 6 characters');
      return;
    } else {
      setNameError('');
    }

    const passwordError = validatePassword(password);
    if (passwordError) {
      setError(passwordError);
      return;
    }

    createUser(email, password)
      .then((result) => {
        const user = result.user;
        updateUser({ displayName: name, photoURL: photoUrl })
          .then(() => {
            setUser({ ...user, displayName: name, photoURL: photoUrl });
            toast.success('Registered successfully ✨', { transition: Bounce });
            navigate(location.state?.pathname || '/');
          })
          .catch((error) => toast.error(error.message));
      })
      .catch((error) => toast.error(error.message));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr bg-gray-50 to-blue-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-500 px-4">
      <div className="flex flex-col lg:flex-row items-center gap-10 p-6 rounded-2xl shadow-lg bg-white dark:bg-gray-800">
        {/* Animation */}
        <div className="w-80">
          <Lottie animationData={loginAnimation} loop={true} />
        </div>

        {/* Form */}
        <div className="w-full max-w-md bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 p-6 rounded-xl">
          <h2 className="text-3xl font-bold text-center text-black mb-6">Create Account</h2>

          <form onSubmit={handelRegister} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Name</label>
              <input
                name="name"
                required
                type="text"
                placeholder="Your full name"
                className="input input-bordered w-full dark:bg-gray-800 dark:text-white"
              />
              {nameError && <p className="text-sm text-red-500 mt-1">{nameError}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Photo URL (optional)</label>
              <input
                name="photoUrl"
                type="text"
                placeholder="Link to your avatar"
                className="input input-bordered w-full dark:bg-gray-800 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
              <input
                name="email"
                type="email"
                required
                placeholder="you@example.com"
                className="input input-bordered w-full dark:bg-gray-800 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
              <div className="relative">
                <input
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError(validatePassword(e.target.value));
                  }}
                  placeholder="••••••••"
                  className="input input-bordered w-full dark:bg-gray-800 dark:text-white"
                />
                <button type="button" onClick={togglePasswordVisibility} className="absolute top-2 right-3 text-gray-400">
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
              {!error && password && <p className="text-sm text-green-600 mt-1">Valid password ✅</p>}
            </div>

            <button
              type="submit"
              disabled={!!error}
              className={`btn w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white ${
                error ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              Register
            </button>

            <p className="text-sm text-center text-gray-600 dark:text-gray-300 mt-3">
              Already have an account?{' '}
              <Link to="/login" className="text-purple-600 dark:text-purple-400 hover:underline">
                Log in
              </Link>
            </p>
          </form>

          <div className="divider text-gray-400 dark:text-gray-500 mt-6">OR</div>

          <button
            onClick={handelGoogleLogin}
            type="button"
            className="btn w-full flex items-center justify-center gap-2 border-gray-300"
          >
            <FcGoogle size={20} /> Sign in with Google
          </button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Register;
