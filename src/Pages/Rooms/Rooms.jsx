import React from 'react';
import RoomsCard from './RoomsCard';
import { Helmet } from 'react-helmet';
const roomsPromise = fetch('http://localhost:3000/rooms').then(res => res.json())
const Rooms = () => {
    
    return (
        <>
            <Helmet>
                 <title>Room's</title>
                <meta name="description" content="Helmet application" />
            </Helmet>
        <div>
            <h1 className=' mt-25 text-center font-bold text-3xl my-5 font-myfont'>All Rooms</h1>
            <RoomsCard roomsPromise={roomsPromise}></RoomsCard>
        </div>
        </>
    );
};

export default Rooms;