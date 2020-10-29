import React from 'react';
import { connect } from 'react-redux';
import ProfileForm from '../components/Auth/ProfileForm';
import { updateProfile } from '../store/actions/AuthActions'


const Profile = (props) => {
    return <>
        <ProfileForm user={props.user} loading={props.loading} error={props.error} submit={props.updateProfile} />
    </>
}

const mapStateToProps = state => {
    return {
        loading: state.adminAuth.loading,
        error: state.adminAuth.updateError,
        user: state.adminAuth.user
    }
}
const mapDispatchToProps = dispatch => {
    return {
        updateProfile: (data) => dispatch(updateProfile(data)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);