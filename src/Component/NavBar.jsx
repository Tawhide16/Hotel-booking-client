import React, { useContext, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';  // fix import
import { AuthContext } from '../Provider/AuthProvider';
import { Tooltip } from 'react-tooltip';
import { FaHome, FaUserAlt } from 'react-icons/fa';
import { MdBedroomParent, MdBookmarkAdded, MdPermContactCalendar } from 'react-icons/md';
import { IoBed } from 'react-icons/io5';
import { RiGalleryFill } from "react-icons/ri";

const NavBar = () => {
  const { user, logOut } = useContext(AuthContext);

  // theme state: 'dark' or '' (empty string means light mode)
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || '');

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? '' : 'dark');
  };

  const handleLogOut = () => {
    logOut().catch(console.error);
  };

  const Links = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "text-blue-600 font-medium"
              : "text-gray-800 dark:text-white hover:text-blue-500"
          }
        >
          <FaHome size={17} /> Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/rooms"
          className={({ isActive }) =>
            isActive
              ? "text-blue-600 font-medium"
              : "text-gray-800 dark:text-white hover:text-blue-500"
          }
        >
          <IoBed size={18} /> Room's
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/my-bookings"
          className={({ isActive }) =>
            isActive
              ? "text-blue-600 font-medium"
              : "text-gray-800 dark:text-white hover:text-blue-500"
          }
        >
          <MdBookmarkAdded size={17} /> My Bookings
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/gallery"
          className={({ isActive }) =>
            isActive
              ? "text-blue-600 font-medium"
              : "text-gray-800 dark:text-white hover:text-blue-500"
          }
        >
          <RiGalleryFill size={18} /> Gallery
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/aboutUs"
          className={({ isActive }) =>
            isActive
              ? "text-blue-600 font-medium"
              : "text-gray-800 dark:text-white hover:text-blue-500"
          }
        >
          <FaUserAlt size={17} /> About Us
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/contactUs"
          className={({ isActive }) =>
            isActive
              ? "text-blue-600 font-medium"
              : "text-gray-800 dark:text-white hover:text-blue-500"
          }
        >
          <MdPermContactCalendar size={18} /> Contact Us
        </NavLink>
      </li>
    </>
  );

  return (
    <nav className="navbar bg-white dark:bg-gray-900 shadow fixed top-0 z-50 w-full">
      <div className="navbar-start px-4">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-800 dark:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </label>
          <ul tabIndex={0} className="menu menu-sm dropdown-content bg-white dark:bg-gray-800 rounded-box mt-3 p-2 shadow w-52">
            {Links}
          </ul>
        </div>

        <a className="btn-ghost text-xl hidden lg:flex font-bold text-gray-900 dark:text-white">
          Luxe <span className="text-blue-500">Lodge</span>
        </a>

        <div className="text-blue-500 flex lg:hidden">
          <MdBedroomParent size={22} />
        </div>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal gap-6 px-1">
          {Links}
        </ul>
      </div>

      <div className="navbar-end flex items-center gap-3 px-4">
        
        {/* User avatar */}
        {user && (
          <>
            <button
              className="rounded-full avatar avatar-online w-10"
              data-tooltip-id="user-tooltip"
              data-tooltip-content={user.displayName}
            >
              <img
                src={user.photoURL || "/default-avatar.png"}
                alt="user"
                className="w-10 h-10 object-cover rounded-full"
              />
            </button>
            <Tooltip
              id="user-tooltip"
              place="left"
              className="!bg-gray-800 !text-white !px-2 !py-1 !text-sm !rounded-lg"
            />
          </>
        )}

        {/* Login/Logout */}
        {user ? (
          <button
            onClick={handleLogOut}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium py-2 px-4 rounded-lg shadow-lg transition-opacity hover:opacity-90"
          >
            Log Out
          </button>
        ) : (
          <NavLink
            to="/login"
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium py-2 px-4 rounded-lg shadow-lg transition-opacity hover:opacity-90"
          >
            Log In
          </NavLink>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
