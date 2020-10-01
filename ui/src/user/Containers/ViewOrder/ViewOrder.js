import React, { Component } from 'react'
import ViewOrderComponent from '../../Components/ViewOrder/ViewOrder'

import Header from '../../Components/Header/Header';
import Footer from '../../Components/Footer/Footer';
class ViewOrder extends Component {
    render() {
        return (
            <div>
                <Header />
                <ViewOrderComponent />
                <Footer />
            </div>
        )
    }
}

export default ViewOrder