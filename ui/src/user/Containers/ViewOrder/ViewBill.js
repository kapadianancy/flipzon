import React, { Component } from 'react'
import ViewBillComponent from '../../Components/ViewOrder/ViewBill'

import Header from '../../Components/Header/Header';
import Footer from '../../Components/Footer/Footer';

class ViewBill extends Component {
    render() {
        return (
            <div>
                <Header />
                <ViewBillComponent />
                <Footer />
            </div>
        )
    }
}
export default ViewBill
