import React from 'react';
import Banner from './Banner';
import Coverage from '../Coverage';
import WhyChooseBookCourier from '../WhyChooseBookCourier';
import LatestBooks from './LatestBooks';

import Newsletter from './Newsletter';
import Stats from '../Stats';


const Home = () => {
    return (
        <div>
            <Banner></Banner>
            
            <LatestBooks></LatestBooks>
            <Coverage></Coverage>
            <WhyChooseBookCourier></WhyChooseBookCourier>
            <Stats></Stats>
          
            <Newsletter></Newsletter>
        </div>
    );
};

export default Home;