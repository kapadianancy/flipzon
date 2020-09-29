import React, { Component } from 'react'
import EditProfileComponent from '../../Components/EditProfile/EditProfile'

import Header from '../../Components/Header/Header';
import Footer from '../../Components/Footer/Footer';
class EditProfile extends Component {
    render() {
        return (
            <div>
                <Header />
                <EditProfileComponent />
                <Footer />
            </div>
        )
    }
}
export default EditProfile