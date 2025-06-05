import React from 'react';

const Loading = () => {
    return (
        <div>
            <div className='min-h-screen flex justify-center items-center bg-white'>
            <span className="loading loading-spinner loading-xl bg-gradient-to-br from-[#0B2545] to-[#D4AF37]"></span>
        </div>
        </div>
    );
};

export default Loading;