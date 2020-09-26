<<<<<<< HEAD
import React, { Component, useEffect } from 'react';
import { connect } from 'react-redux'

import CategoryComponent from '../../Components/Category/Category';
import Header from '../../Components/Header/Header';
import Footer from '../../Components/Footer/Footer';
import { fetchProductCategories } from '../../redux-store/Actions/ProductCategoryAction';

=======
import React, { Component } from 'react';
import Footer from '../../Components/Footer/Footer';
import Header from '../../Components/Header/Header';
 
>>>>>>> nancyKapadia
class Category extends Component {

    constructor(props) {
        super(props);
        this.categories = [];
    }


    componentDidMount() {
        this.props.fetchProductCategories();
    }

    render() {

        let displayposts = this.props.categories;


        return (
            <div>
<<<<<<< HEAD
                <Header />
                <CategoryComponent product_categories={displayposts} />
                <Footer />
=======
                <Header/>

                Category
                <Footer/>
>>>>>>> nancyKapadia
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        categories: state.ProductCategory.product_categories
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchProductCategories: () => dispatch(fetchProductCategories())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Category);