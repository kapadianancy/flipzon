import React, { Component } from 'react'
import ViewOrderCartComponent from '../../Components/ViewOrder/ViewOrderCart'

import Header from '../../Components/Header/Header';
import Footer from '../../Components/Footer/Footer';
class ViewOrderCart extends Component {
    render() {
        return (
            <div>
                 <Header />
                <ViewOrderCartComponent />
                <Footer />
            </div>
        )
    }
}

export default ViewOrderCart