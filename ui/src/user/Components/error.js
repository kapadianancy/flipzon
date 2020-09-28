import React, { Component } from 'react'
import Header from './Header/Header';
import Footer from './Footer/Footer';

export default class error extends Component {
    render() {
        return (
            <>
                <Header />
                <div style={{marginBottom : '100px',marginTop:'50px'}}>
                    <h1 style={{ color: 'red' }}>{this.props.match.params.error}</h1>
                </div>
                <Footer />
            </>
        )
    }
}
