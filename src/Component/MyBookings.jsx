import React from 'react';
import { Helmet } from 'react-helmet';

const MyBookings = () => {
    return (
        <>
        <Helmet>
                <title>My-Booking</title>
                <meta name="description" content="Helmet application" />
            </Helmet>
        <div>
            <h1 className=' mt-25'>this is my bookings</h1>
        </div>
        </>
    );
};

export default MyBookings;