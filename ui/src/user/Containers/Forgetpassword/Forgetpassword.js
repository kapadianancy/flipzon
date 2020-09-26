import React, { Component } from 'react'
import ForgetpasswordComponent from '../../Components/Forgetpassword/Forgetpassword'

import Header from '../../Components/Header/Header';
import Footer from '../../Components/Footer/Footer';

class Forgetpassword extends Component {
    render() {
        return (
            <div>
                <Header />
                <ForgetpasswordComponent />
                <Footer />
            </div>
        )
    }
}

export default Forgetpassword