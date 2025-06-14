import React from 'react';

const Loading = () => {
    return (
        <div>
            <div className="flex justify-center items-center py-12">
                      <FaSpinner className="animate-spin text-4xl text-blue-500" />
                    </div>
        </div>
    );
};

export default Loading;