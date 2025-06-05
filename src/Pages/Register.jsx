import React, { useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';

import { Bounce, toast, ToastContainer } from 'react-toastify';
import { AuthContext } from '../Provider/AuthProvider';

const Register = () => {
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [nameError, setNameError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const { createUser, setUser, updateUser, loginWithGoogle } = useContext(AuthContext);
    const navigate = useNavigate();

    const validatePassword = (value) => {
        if (value.length < 6) {
            return "Password should be at least 6 characters";
        }
        if (!/[A-Z]/.test(value)) {
            return "Password should include a capital letter";
        }
        if (!/[a-z]/.test(value)) {
            return "Password should include a small letter";
        }
        return '';
    };

    const handelGoogleLogin = () => {
        loginWithGoogle()
            .then((result) => {

                navigate(location.state?.pathname || "/");

            })
            .catch((error) => {
                console.log(error);
                toast.error(error.message);
            });
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handelRegister = (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const photoUrl = form.photoUrl.value;
        const password = form.password.value;

        if (name.length < 6) {
            setNameError("Name should be at least 6 characters");
            return;
        } else {
            setNameError("");
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
                        toast.success('Register success fully!', {
                            position: "top-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: false,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "light",
                            transition: Bounce,
                        });
                        navigate(location.state?.pathname || "/");
                    })
                    .catch((error) => {
                        console.log(error);
                        toast.error(error.message);
                    });
            })
            .catch((error) => {
                toast.error(error.message);
            });
    };

    return (
        <div className="min-h-screen flex items-center justify-center  py-12 px-4 sm:px-6 lg:px-8 ">
            <div className="max-w-md w-full space-y-8">
                <div className="text-center">
                    <h2 className="mt-6 text-3xl font-extrabold text-gray-900 main">Register</h2>
                </div>
                <div className="bg-white py-8 px-4 shadow rounded-lg sm:px-10 nav">
                    <form className="mt-8 space-y-6" onSubmit={handelRegister}>
                        <div className="rounded-md shadow-sm space-y-4">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                    Name
                                </label>
                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    required
                                    className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm main"
                                    placeholder="Name"
                                />
                                {nameError && <p className="mt-1 text-sm text-red-600">{nameError}</p>}
                            </div>

                            <div>
                                <label htmlFor="photoUrl" className="block text-sm font-medium text-gray-700">
                                    Photo URL (Optional)
                                </label>
                                <input
                                    id="photoUrl"
                                    name="photoUrl"
                                    type="text"
                                    className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm main"
                                    placeholder="Photo URL"
                                />
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                    Email address
                                </label>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm main"
                                    placeholder="Email address"
                                />
                            </div>

                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                    Password
                                </label>
                                <div className="mt-1 relative">
                                    <input
                                        id="password"
                                        name="password"
                                        type={showPassword ? "text" : "password"}
                                        autoComplete="current-password"
                                        required
                                        value={password}
                                        onChange={(e) => {
                                            const val = e.target.value;
                                            setPassword(val);
                                            setError(validatePassword(val));
                                        }}
                                        className="appearance-none block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm main"
                                        placeholder="Password"
                                    />
                                    <button
                                        type="button"
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                        onClick={togglePasswordVisibility}
                                    >
                                        {showPassword ? (
                                            <FaEyeSlash className="h-5 w-5 text-gray-400" />
                                        ) : (
                                            <FaEye className="h-5 w-5 text-gray-400" />
                                        )}
                                    </button>
                                </div>
                                {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
                                {!error && password && <p className="mt-1 text-sm text-green-600">Valid password ✅</p>}
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="text-sm">
                                <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
                                    Already have an account? Log in
                                </Link>
                            </div>
                        </div>
                        <div>
                            <button
                                type="submit"
                                disabled={!!error}
                                className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#896deb]  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${error ? 'opacity-50 cursor-not-allowed' : ''} `}
                            >
                                Register
                            </button>
                            
                        </div>
                    </form>

                    <div className="mt-6">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-300" />
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-white text-gray-500">Or continue with</span>
                            </div>
                        </div>

                        <div className="mt-6">
                            <button
                                onClick={handelGoogleLogin}
                                type="button"
                                className="w-full flex justify-center items-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                <FcGoogle className="h-5 w-5 mr-2" /> Sign in with Google
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;