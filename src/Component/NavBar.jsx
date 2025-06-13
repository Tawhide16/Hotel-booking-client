import React, { useContext, useEffect, useState } from 'react';
// import 'react-tooltip/dist/react-tooltip.css';
import { NavLink } from 'react-router';

import { AuthContext } from '../Provider/AuthProvider';
import { Tooltip } from 'react-tooltip';
import { FaHome, FaUserAlt } from 'react-icons/fa';
import { MdBookmarkAdded, MdOutlineKingBed, MdPermContactCalendar } from 'react-icons/md';
import { IoBed } from 'react-icons/io5';
// import { Tooltip } from 'react-tooltip';


const NavBar = () => {
  const [theme, setTheme] = useState("light-theme")
  const { user, logOut } = useContext(AuthContext);


  const handleLogOut = () => {
    console.log("User trying to log out");
    logOut()
      .then(() => '')
      .catch((error) => console.error(error));
  };

  const handelTogolTheme = () => {
    if (theme === "dark-theme") {
      setTheme("light-theme")
    }
    else {
      setTheme("dark-theme")
    }
  }

  useEffect(() => {
    document.body.className = theme;
  }, [theme])

  const Links = (
    <>

      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "text-[#000] font-bold underline " : "main"
          }
        >
          <FaHome size={17} />
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/rooms"
          className={({ isActive }) =>
            isActive ? "text-[#000] font-bold underline" : "main"
          }
        >
          <IoBed   size={18}/>
          Room's
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/my-bookings"
          className={({ isActive }) =>
            isActive ? "text-[#000] font-bold underline" : "main"
          }
        >
          <MdBookmarkAdded size={17} />
          My Bookings
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/aboutUs"
          className={({ isActive }) =>
            isActive ? "text-[#000] font-bold underline" : "main"
          }
        >
          <FaUserAlt size={17} />
          About Us
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/contactUs"
          className={({ isActive }) =>
            isActive ? "text-[#000] font-bold underline" : "main"
          }
        >
         <MdPermContactCalendar size={18} />
          Contact Us
        </NavLink>
      </li>
    </>
  );

  return (
    <div>
      <div className="navbar bg-base-100 shadow-sm lg:px-15 -mt-1  fixed top-0 z-50 nav ">
        <div className="navbar-start main">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
              </svg>
            </div>
            <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow nav">
              {Links}
            </ul>
          </div>

          <div className='flex text-center justify-items-center'>
            {/* <img className='h-12 hidden md:flex ' src={logo} alt="" /> */}
            <a className="btn-ghost text-xl hidden lg:flex text-[#0B2545] font-bold pt-2  ">Luxe <span className='text-[#D4AF37]'>Lodge</span> </a>
          </div>
        </div>
        <div className="navbar-center hidden lg:flex ">
          <ul className="menu menu-horizontal px-1 gap-5 ">
            {Links}
          </ul>
        </div>

        <div className="navbar-end gap-3">
         
          <label className="toggle text-base-content">
            <input type="checkbox" onClick={handelTogolTheme} value="synthwave" className="theme-controller" />

            <svg aria-label="sun" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2"></path><path d="M12 20v2"></path><path d="m4.93 4.93 1.41 1.41"></path><path d="m17.66 17.66 1.41 1.41"></path><path d="M2 12h2"></path><path d="M20 12h2"></path><path d="m6.34 17.66-1.41 1.41"></path><path d="m19.07 4.93-1.41 1.41"></path></g></svg>

            <svg aria-label="moon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path></g></svg>

          </label>
          <div>
            {user && (
              <>
                <button
                  className="rounded-full avatar avatar-online w-10"
                  data-tooltip-id="user-tooltip"
                  data-tooltip-content={user.displayName}
                >
                  <img
                    className="w-10 h-10 object-cover rounded-full"
                    src={user.photoURL || "/default-avatar.png"}
                    alt="user"
                  />
                </button>
                <Tooltip
                  id="user-tooltip"
                  place="left"
                  className="!bg-gray-800 !text-white !px-2 !py-1 !text-sm !rounded-lg"
                />
              </>
            )}
          </div>
          {user ? (
            <button onClick={handleLogOut} className="bg-gradient-to-br from-[#0B2545] to-[#D4AF37] text-white font-medium py-2 px-4 rounded-lg shadow-lg hover:opacity-90 transition-opacity">Log Out</button>
          ) : (
            <NavLink className="bg-gradient-to-br from-[#0B2545] to-[#D4AF37] text-white font-medium py-2 px-4 rounded-lg shadow-lg hover:opacity-90 transition-opacity" to="/login">Log In</NavLink>
          )}
        </div>
      </div>
    </div>
  );
};


export default NavBar;