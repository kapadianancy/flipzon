import React, { Component, useEffect } from 'react';
import { connect } from 'react-redux'

import CategoryComponent from '../../Components/Category/Category';

import * as actions from '../../redux-store/Actions/ProductCategoryAction'

import Footer from '../../Components/Footer/Footer';
import Header from '../../Components/Header/Header';
 
class Category extends Component {

    constructor(props) {
        super(props);
        this.categories = [];
    }


    componentDidMount() {
        this.props.fetchSubCategories();
    }

    render() {

        let displayposts = this.props.categories;


        return (
            <div>
                <Header />
                <CategoryComponent product_categories={displayposts} />
                <Footer />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        categories: state.ProductCategory.subCategories
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchSubCategories: () => dispatch(actions.fetchSubCategories())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Category);