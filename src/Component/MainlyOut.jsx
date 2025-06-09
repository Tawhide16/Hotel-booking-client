import React from 'react';
import NavBar from './NavBar';
import { Outlet } from 'react-router';
import { ToastContainer } from 'react-toastify';
import Banner from './Home/Banner';
import Footer from './Footer';

const MainlyOut = () => {
    return (
        <div>
            <NavBar></NavBar>
            <div className="min-h-[70vh] px-4 py-6">
                <Outlet></Outlet>
            </div>
            <ToastContainer></ToastContainer>
            <Footer></Footer>
        </div>
    );
};

export default MainlyOut;