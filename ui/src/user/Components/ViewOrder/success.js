import React, { Component } from 'react'
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

export default class success extends Component {
    render() {
        return (
            <>
                <Header />
                <div style={{marginBottom : '100px',marginTop:'50px'}}>
                    <h1 style={{ color: 'green' }}>Your Order Is Placed.</h1>
                    <h4 style={{ color: 'green' }}> check Your email for confirmation</h4> 
                </div>
                <Footer />
            </>
        )
    }
}