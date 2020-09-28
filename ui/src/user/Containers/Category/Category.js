<<<<<<< HEAD

=======
>>>>>>> 9e6f0cfd97487486a1c4560e983b2cce1c050a12
import React, { Component, useEffect } from 'react';
import { connect } from 'react-redux'

import CategoryComponent from '../../Components/Category/Category';

<<<<<<< HEAD
import { fetchProductCategories } from '../../redux-store/actions/ProductCategoryAction';

import Footer from '../../Components/Footer/Footer';
import Header from '../../Components/Header/Header';
 
=======
>>>>>>> 9e6f0cfd97487486a1c4560e983b2cce1c050a12
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
                <Header />
                <CategoryComponent product_categories={displayposts} />
                <Footer />
<<<<<<< HEAD

=======
>>>>>>> 9e6f0cfd97487486a1c4560e983b2cce1c050a12
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