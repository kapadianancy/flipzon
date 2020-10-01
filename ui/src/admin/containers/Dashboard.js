import React, { useEffect } from 'react';

import { connect } from 'react-redux'
import { fetchTotal,fetchProductTotal } from '../store/actions/DashboardAction'
import Dashboards from '../components/Dashboard/Dashboard';
// import { PieChart } from 'react-minimal-pie-chart';

const Dashboard = (props) => {
    useEffect( () => {
        if(props.total.length === 0)
        {
           props.fetchTotal();
        }
    }, [props])
    return(
        <div>
            <Dashboards total={props.total}/>
        </div>
    )
}
const mapStateToProps = (state) => ({
    total: state.adminTotalReducer.total,
    totals: state.adminTotalReducer.totals
});

const mapDispatchToProps = dispatch => {
    return{
        fetchTotal: () => dispatch(fetchTotal()),
        fetchProductTotal:()=>dispatch(fetchProductTotal())  
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
