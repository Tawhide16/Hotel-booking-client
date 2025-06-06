import React from 'react';
import { Helmet } from 'react-helmet';

const HelmetProvider = () => {
    return (
        <div>
            <div className="application">
            <Helmet>
                <meta charSet="utf-8" />
                <title>My Title</title>
                <link rel="canonical" href="http://mysite.com/example" />
            </Helmet>
            ...
        </div>
        </div>
    );
};

export default HelmetProvider;