// src/Pages/Login.jsx
import React, { use, useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { Link, useLocation, useNavigate } from 'react-router';
import { Bounce, toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from '../Provider/AuthProvider';
import Lottie from 'lottie-react';
import loginAnimation from '../assets/LoginAnimation.json';

const Login = () => {
  const [email, setEmail] = useState('');
  const { signIn, loginWithGoogle } = use(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  const handleGoogleLogin = () => {
    loginWithGoogle()
      .then((result) => {
        toast.success('Login Successfully', { transition: Bounce });
        navigate(location.state ? location.state : '/');
      })
      .catch((error) => {
        toast.error(`${error.code}`, { transition: Bounce });
      });
  };

  const handleLogIn = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    signIn(email, password)
      .then((result) => {
        toast.success('Login Successfully', { transition: Bounce });
        navigate(location.state ? location.state : '/');
      })
      .catch((error) => {
        toast.error(`${error.code}`, { transition: Bounce });
      });
  };

  const handleForget = () => {
    navigate('/forgetPassword', { state: { email } });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr bg-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-500 px-4">
      <div className="flex flex-col lg:flex-row-reverse items-center gap-10 p-6 rounded-2xl shadow-lg bg-white dark:bg-gray-800">
        {/* Lottie Animation */}
        <div className="w-80">
          <Lottie animationData={loginAnimation} loop={true} />
        </div>

        {/* Login Form */}
        <div className="card w-full max-w-sm shadow-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 p-6 rounded-xl">
          <h1 className="text-3xl font-bold text-center mb-4">LogIn</h1>

          <form onSubmit={handleLogIn} className="space-y-4">
            <div>
              <label className="label text-gray-600 dark:text-gray-300">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                name="email"
                required
                placeholder="you@example.com"
                className="input input-bordered w-full dark:bg-gray-800 dark:text-white"
              />
            </div>

            <div>
              <label className="label text-gray-600 dark:text-gray-300">Password</label>
              <input
                type="password"
                name="password"
                required
                placeholder="••••••••"
                className="input input-bordered w-full dark:bg-gray-800 dark:text-white"
              />
              <p
                onClick={handleForget}
                className="text-sm text-right text-blue-500 hover:underline cursor-pointer mt-1"
              >
                Forgot password?
              </p>
            </div>

            <button type="submit" className="btn w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white">
              Login
            </button>

            <button
              type="button"
              onClick={handleGoogleLogin}
              className="btn w-full flex items-center justify-center gap-2 border-gray-300"
            >
              <FcGoogle size={20} /> Sign in with Google
            </button>

            <p className="text-center text-sm text-gray-600 dark:text-gray-300 mt-2">
              Don’t have an account?
              <Link to="/register" className="ml-1 text-purple-600 dark:text-purple-400 hover:underline">
                Register
              </Link>
            </p>
          </form>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
};

export default Login;
