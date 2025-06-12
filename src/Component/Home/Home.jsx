import React from 'react';
import Banner from './Banner';
import OurService from './OurService';
import Faq from './Faq';
import { Map, Marker } from 'pigeon-maps';
import { Helmet } from 'react-helmet';
import SixCard from '../SixCard';
import SpecialOffersModal from '../SpecialOffersModal';
import UserReview from '../UserReview';

const Home = () => {
  const roomsPromise = fetch("http://localhost:3000/rooms").then(res => res.json());

  return (
    <>
      <Helmet>
        <title>Home</title>
        <meta name="description" content="Helmet application" />
      </Helmet>
      <SpecialOffersModal></SpecialOffersModal>
      <div>
        <Banner />
        <SixCard roomsPromise={roomsPromise} />
        <UserReview></UserReview>
          <OurService />
        <Faq  />
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
