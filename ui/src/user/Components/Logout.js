import React, { Component } from 'react';
import {connect} from 'react-redux';

import * as actions from '../redux-store/Actions/UserAction';
import {withRouter} from 'react-router-dom';
 
class Logout extends Component {

    async componentDidMount(){
        if(this.props.token!=null){
            await this.props.logout();
            this.props.history.push('/');

        }
        
    }
    render() { 
        return (
            <div>
                
            </div>
        );
    }
}

const mapStateToProp=(state)=>
{
    return {
        userId:state.User.userId,
        token:state.User.token
    }
}

const mapStateToAction=(dispatch)=>
{
    return{
        logout:()=>dispatch(actions.logout())
    }
}
 
export default connect(mapStateToProp,mapStateToAction)(withRouter((Logout)));