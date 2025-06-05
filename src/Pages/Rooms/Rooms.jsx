import React from 'react';
import RoomsCard from './RoomsCard';
const roomsPromise = fetch('http://localhost:3000/rooms').then(res => res.json())
const Rooms = () => {
    
    return (
        <div>
            <h1 className=' mt-25'>this is rooms</h1>
            <RoomsCard roomsPromise={roomsPromise}></RoomsCard>
        </div>
    );
};

export default Rooms;