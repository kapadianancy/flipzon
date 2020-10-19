import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card'
import { connect } from 'react-redux';
import Image from 'react-bootstrap/Image'

import Logo from '../../images/logo-2.jpg'
import * as classes from './Auth.module.css'
import ResetPasswordForm from '../components/Auth/ResetPassword'
import { checkLink, resetPassword } from '../store/actions/AuthActions'
import Spinner from 'react-bootstrap/esm/Spinner';


const ResetPassword = (props) => {
    const [linkIsValid, setLinkIsValid] = useState(false);
    var query;
    let content = <Spinner />
    
    const goToLogin = async () => {
        props.history.push("/admin/auth");
    }
    const verifyLink = async () => {
        try {
            query = props.location.search.substring(1).split("&")
                .map( item => { 
                        let data = {};
                        let split = item.split("=");
                        data[split[0]] = split[1];
                        return data;
                    });
            if(query[0].iv && query[1].data) {
                await checkLink(query[0].iv, query[1].data);
                setLinkIsValid(true);
            } else {
                setLinkIsValid(false);
            }
        } catch(error) {
            setLinkIsValid(false);
        }
    }
    const resetPassword = password => {
        query = props.location.search.substring(1).split("&")
        .map( item => { 
                let data = {};
                let split = item.split("=");
                data[split[0]] = split[1];
                return data;
            });
        props.resetPassword(query[0].iv,query[1].data, password);
    }

    useEffect( () => {
        verifyLink();
    }, [verifyLink]);

    if(!linkIsValid) {
        content = <p>Link is not valid!</p>
    } else {
        content = <ResetPasswordForm loading={props.loading} error={props.error} message={props.message} resetPassword={resetPassword} goToLogin={goToLogin} />
    }

    return <div className={classes.Container}>
        <Card className={classes.Card}>
        <Card.Header className={classes.CardHeader}><Image  className={classes.Logo} src={Logo} /></Card.Header>
            <Card.Body className={classes.CardBody}>
                { content }
            </Card.Body>
        </Card>
    </div>
}

const mapStateToProps = state => {
    return {
        loading: state.adminAuth.loading,
        error: state.adminAuth.forgotPasswordError,
        message: state.adminAuth.message
    }
}
const mapDispatchToProps = dispatch => {
    return {
        resetPassword: (iv, data, password) => dispatch(resetPassword(iv, data, password))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ResetPassword)