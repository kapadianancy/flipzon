import React, { Component } from 'react';

import Header from '../../Components/Header/Header';
import Footer from '../../Components/Footer/Footer';
import ProductSlider from '../../Components/Slider/ProductSlider';
import CategorySlider from '../../Components/Slider/CategorySlider';
import Slider from '../../Components/Slider/Slider';

 
class Home extends Component {
    render() { 
        return (
            <div>
                <Header/>
               <Slider/>
               <ProductSlider/>
               <CategorySlider/>
               <Footer/>
            </div>
        );
    }
}


export default Home;