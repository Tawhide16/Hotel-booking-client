import React from 'react';
import NavBar from './NavBar';
import { Outlet } from 'react-router';
import { ToastContainer } from 'react-toastify';
import Banner from './Home/Banner';

const MainlyOut = () => {
    return (
        <div>
            <NavBar></NavBar>
            <div >
                <Outlet></Outlet>
            </div>
            <ToastContainer></ToastContainer>
        </div>
    );
};

export default MainlyOut;