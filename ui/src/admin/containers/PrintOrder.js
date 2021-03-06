import React, { useEffect,useRef } from 'react';

import PrintOrderList from '../components/Order/PrintOrderList';
import { useReactToPrint } from 'react-to-print'
const PrintOrder = (props) => {
    useEffect(()=>{
        if(props.ordersBill.length>0)
        {
            handlePrint();
        } 
    },[props.ordersBill])
    const printBlockRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => printBlockRef.current,
    });
    return(
        <>
            { props.ordersBill.length>0 && <PrintOrderList printBlockRef={printBlockRef} orderBill={props.ordersBill}/>  }
        </>
    )
}

export default PrintOrder;
