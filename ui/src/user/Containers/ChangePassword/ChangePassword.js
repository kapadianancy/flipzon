import React, { Component } from 'react'
import ChangePasswordComponent from '../../Components/ChangePassword/ChangePassword'

import Header from '../../Components/Header/Header';
import Footer from '../../Components/Footer/Footer';
class ChangePassword extends Component {
    render() {
        return (
            <div>
                <Header />
                <ChangePasswordComponent />
                <Footer />
            </div>
        )
    }
}
export default ChangePassword