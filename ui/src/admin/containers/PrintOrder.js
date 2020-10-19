import React, { useEffect,useRef } from 'react';

import Card from 'react-bootstrap/Card'
import PrintOrderList from '../components/Order/PrintOrderList';
// import { connect } from 'react-redux'
import { useReactToPrint } from 'react-to-print'
// import PrintOrderList from '../components/Order/PrintOrderList';
// import { fetchOrdersDetails,fetchOrderBill } from '../store/actions/OrderAction';
const PrintOrder = (props) => {
    useEffect(()=>{

    })
    const printBlockRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => printBlockRef.current,
    });
    if(props.ordersBill && props.print === true)
    {
        handlePrint();
    } 
    return(
        <>
            { props.ordersBill && <PrintOrderList printBlockRef={printBlockRef} orderBill={props.ordersBill}/>  }
        </>
    )
}

export default PrintOrder;
