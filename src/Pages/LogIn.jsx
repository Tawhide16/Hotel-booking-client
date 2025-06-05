import React, { use, useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { Link, useLocation, useNavigate } from 'react-router';
import { Bounce, toast, ToastContainer } from 'react-toastify';
import { AuthContext } from '../Provider/AuthProvider';

const Login = () => {

    const [email, setEmail] = useState("")


    const { signIn, loginWithGoogle } = use(AuthContext)
    const location = useLocation()
    const navigate = useNavigate();
    console.log(location);

    const handelGoogleLogin = () => {
        loginWithGoogle().then((result) => {
            toast.success("Login Successfully", {
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
            console.log(result);
            navigate(`${location.state ? location.state : "/"}`)
        })
            .catch((error) => {
                const errorCode = error.code;
                toast.error(`${errorCode}`, {
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
            })

    }
    const handleLogIn = (e) => {
        e.preventDefault()
        const form = e.target
        const email = form.email.value;
        const password = form.password.value;
        console.log(email, password);
        signIn(email, password)
            .then((result) => {
                const user = result.user;
                toast.success("Login Successfully", {
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
                console.log(user);
                navigate(`${location.state ? location.state : "/"}`)
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                alert(errorCode, errorMessage)
                toast.error(`${errorCode}`, {
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
            })

    }

    const handleforget = () => {

        navigate("/forgetPassword", { state: { email } })
    }
    return (
        <>
            <div className="  dark:bg-gray-900 transition-colors duration-300 mt-20 my-10">
                <div className="hero ">
                    <div className="hero-content flex-col lg:flex-row-reverse">
                        <div className="card w-full max-w-sm shrink-0 shadow-2xl  transition-colors duration-300 nav">
                            <div className="card-body">
                                <h1 className='text-center font-bold text-2xl main'>
                                    Log In
                                </h1>
                                <form className="fieldset" onSubmit={handleLogIn}>
                                    <label className="label text-gray-700 dark:text-gray-300 main">Email</label>
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="input input-bordered w-full main nav border-gray-700"
                                        name='email'
                                        placeholder="Email"
                                        required
                                    />

                                    <div>
                                        <label className="label text-gray-700 dark:text-gray-300 main ">Password</label>
                                        <input
                                            type="password"
                                            className=" input input-bordered w-full main nav border-gray-700"
                                            name='password'
                                            placeholder="Password"
                                            required
                                        />
                                        <div>
                                            <p
                                                onClick={handleforget}
                                                className="main  text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 cursor-pointer"
                                            >
                                                Forgot password?
                                            </p>
                                        </div>
                                    </div>

                                    <button
                                        className="btn btn-neutral mt-4 bg-[#896deb]"
                                        type='submit'
                                    >
                                        Login
                                    </button>

                                    

                                    <button onClick={handelGoogleLogin} type="button" className="btn btn-neutral mt-1">
                                        <FcGoogle /> Google LogIn
                                    </button>

                                    <h1 className="text-gray-700 dark:text-gray-300 mt-3">
                                        Don't Have An Account
                                        <Link
                                            to="/register"
                                            className='text-violet-600 dark:text-purple-400 font-bold ml-2 hover:underline'
                                        >
                                            Register
                                        </Link>
                                    </h1>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};



export default Login;