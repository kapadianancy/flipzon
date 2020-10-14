import React, { Component } from 'react'
import UpdatePasswordComponent from '../../Components/Forgetpassword/Updatepassword'

import Header from '../../Components/Header/Header';
import Footer from '../../Components/Footer/Footer';
class UpdatePassword extends Component {
    render() {
        return (
            <div>
                <Header />
                <UpdatePasswordComponent />
                <Footer />
            </div>
        )
    }
}
export default UpdatePassword