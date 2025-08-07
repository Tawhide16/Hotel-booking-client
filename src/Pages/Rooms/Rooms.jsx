import React from 'react';
import RoomsCard from './RoomsCard';
import { Helmet } from 'react-helmet';
const roomsPromise = fetch('https://b11a11-server-side-tawhide16.vercel.app/rooms').then(res => res.json())
const Rooms = () => {
    
    return (
        <>
            <Helmet>
                 <title>Room's</title>
                <meta name="description" content="Helmet application" />
            </Helmet>
        <div >
            <h1 className=' pt-20 text-center font-bold text-3xl py-8 font-myfont '>All Rooms</h1>
            <RoomsCard roomsPromise={roomsPromise}></RoomsCard>
        </div>
        </>
    );
};

export default Rooms;