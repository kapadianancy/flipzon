import React, { Component } from 'react';

import CategoryComponent from '../../Components/Category/Category'; 
import Header from '../../Components/Header/Header';
import Footer from '../../Components/Footer/Footer';
 
class Category extends Component {
    render() { 
        return (
            <div>
                <Header />
                <CategoryComponent />
                <Footer />
            </div>
        );
    }
}
 
export default Category;