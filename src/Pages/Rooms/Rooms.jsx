import React from 'react';
import RoomsCard from './RoomsCard';
const roomsPromise = fetch('http://localhost:3000/rooms').then(res => res.json())
const Rooms = () => {
    
    return (
        <div>
            <h1 className=' mt-25 text-center font-bold text-3xl my-5 font-myfont'>All Rooms</h1>
            <RoomsCard roomsPromise={roomsPromise}></RoomsCard>
        </div>
    );
};

export default Rooms;