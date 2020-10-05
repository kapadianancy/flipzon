import React, { Component } from 'react'
import ViewOrderDetailsComponent from '../../Components/ViewOrder/ViewOrderDetails'

import Header from '../../Components/Header/Header';
import Footer from '../../Components/Footer/Footer';

class ViewOrderDetails extends Component {
    render() {
        return (
            <div>
                <Header />
                <ViewOrderDetailsComponent />
                <Footer />
            </div>
        )
    }
}
export default ViewOrderDetails
