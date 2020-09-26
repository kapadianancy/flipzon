import React, { Component } from 'react'
import SignComponent from '../../Components/Signup/Signup'

import Header from '../../Components/Header/Header';
import Footer from '../../Components/Footer/Footer';
class Signup extends Component {
    render() {
        return (
            <div>
                <Header />
                <SignComponent />
                <Footer />
            </div>
        )
    }
}
export default Signup