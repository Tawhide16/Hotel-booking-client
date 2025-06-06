import React from 'react';
import Banner from './Banner';
import OurService from './OurService';
import Faq from './Faq';
import { Map, Marker } from 'pigeon-maps';
import { Helmet } from 'react-helmet';

const Home = () => {
    return (
        <>
            <Helmet>
                <title>Home</title>
                <meta name="description" content="Helmet application" />
            </Helmet>
            <div>
                <Banner></Banner>
                <OurService></OurService>
                <Faq></Faq>
                <div className='px-5 md:px-7 lg:px-28 rounded-[12px] pb-5 lg:py-5'>
                    <Map height={400} defaultCenter={[23.7808875, 90.4169257]} defaultZoom={15} >
                        <Marker width={50} anchor={[23.7808875, 90.4169257]} />
                    </Map>
                </div>
            </div>
        </>
    );
};

export default Home;