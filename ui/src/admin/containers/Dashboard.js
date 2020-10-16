import React, { useEffect } from 'react';

import { connect } from 'react-redux'
import { fetchTotal,fetchProductTotal,fetchMonthlyProduct } from '../store/actions/DashboardAction'
import Dashboards from '../components/Dashboard/Dashboard';
// import { PieChart } from 'react-minimal-pie-chart';

const Dashboard = (props) => {
    useEffect(() => {
        if(props.total.length === 0)
        {
           props.fetchTotal();
           props.fetchProductTotal();
           props.fetchMonthlyProduct()
        }
    }, [props])
    return(
        <div>
            <Dashboards total={props.total} totals={props.totals} tot={props.tot}/>
        </div>
    )
}
const mapStateToProps = (state) => ({
    total: state.adminTotalReducer.total,
    totals: state.adminTotalReducer.totals,
    tot:state.adminTotalReducer.tot
});

const mapDispatchToProps = dispatch => {
    return{
        fetchTotal: () => dispatch(fetchTotal()),
        fetchProductTotal:()=>dispatch(fetchProductTotal()),
        fetchMonthlyProduct:()=>dispatch(fetchMonthlyProduct())  
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
