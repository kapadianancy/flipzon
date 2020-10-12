import React , {Component} from 'react';
import { connect } from 'react-redux'
import Card from 'react-bootstrap/Card'
import CardDeck from 'react-bootstrap/CardDeck'
// import ProgressBar from 'react-bootstrap/ProgressBar'
import { fetchTotal,fetchProductTotal } from '../../store/actions/DashboardAction'
import { Pie } from "react-chartjs-2";
import Spinner from 'react-bootstrap/Spinner'
import './Dashboard.css';

class Dashboard extends Component{

    state = {
        totalOrder:"",
        totalConfirmdOrder:"",
        totalCompletedOrder:"",
        totalRevenue:"",
        totalCanceledOrder:"",
        tots:"",
        dataPie: {
          labels: ["Total Orders", "Completed Orders", "Confirm Orders","Canceled Orders"],
          datasets: 
          [
            {
              data: [],
              backgroundColor: [
                "#F7464A",
                "#46BFBD",
                "#FDB45C",
                "#949FB1",
              ],
              hoverBackgroundColor: [
                "#FF5A5E",
                "#5AD3D1",
                "#FFC870",
                "#A8B3C5"
              ]
            }
          ]
        }
      }
    componentDidMount = async () =>{
        let d = this.state.dataPie.datasets[0].data;
        await this.props.fetchTotal();
        let tot = await this.props.total;
        d.push(tot.totalOrder)
        d.push(tot.totalCompletedOrder)
        d.push(tot.totalConfirmdOrder)
        d.push(tot.totalCanceledOrder)
        await this.props.fetchProductTotal();
        let tots = await this.props.totals;

        this.setState({
            totalOrder:tot.totalOrder,
            totalConfirmdOrder:tot.totalConfirmdOrder,
            totalCompletedOrder:tot.totalCompletedOrder,
            totalCanceledOrder:tot.totalCanceledOrder,
            totalRevenue:tot.totalRevenue[0].totalPrice,
            tots:tots.cp.rows
        })
    } 
    renderCategoryProduct = () =>{
        let dataArr = [];
        if(this.state.tots)
        {
            let tots = this.state.tots;
            for (let i = 0; i < (tots.length); i++) {
                dataArr.push(
                <li key={"li"+i} className="list-group-item d-flex justify-content-between align-items-center">
                    {tots[i].Product_category.name}
                 <span className="badge badge-primary badge-pill">{tots[i].count}</span>
                </li>)
            }
        }
        return(dataArr);        
    }
    renderTotal = (orders) => { 
        let orderData = <div key="div1">
        <Card key={"index"} style={{borderWidth:0}}>
            <Card.Body>
            <CardDeck>
                    <Card text={"white"} className={"cards mb-2"}>
                        <Card.Body className={"text"}>
                        <Card.Title> Total Product </Card.Title>
                            <Card.Text>
                                {orders.totalProduct}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                    <Card text={"white"} className={"cards1 mb-2"}>
                        <Card.Body className={"text"}> 
                        <Card.Title>Total Categories</Card.Title>
                            <Card.Text>
                            {orders.totalCategoies}
                            </Card.Text>
                        </Card.Body>
                        
                    </Card>
                    <Card text={"white"} className={"cards2 mb-2"}>
                        <Card.Body className={"text"}>
                        <Card.Title>Total User </Card.Title>
                            <Card.Text>
                                {orders.totalUser}
                            </Card.Text>
                            <Card.Text>
                            
                            </Card.Text>
                        </Card.Body>
                    </Card>
                    <Card text={"white"} className={"cards3 mb-2"}>
                        <Card.Body className={"text"}>
                        <Card.Title>Total Order</Card.Title>
                            <Card.Text>
                                {orders.totalOrder}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                    <Card text={"white"} className={"cards4 mb-2"}>
                        <Card.Body className={"text"}>
                        <Card.Title>Total Revenue</Card.Title>
                            <Card.Text>
                                {this.state.totalRevenue}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </CardDeck>
            </Card.Body>
        </Card>
        <Card key={"index2"} style={{ width: '42rem',float:'left',height:'360px' }}>
            <Card.Body>
                <Card.Title>Order Statistics</Card.Title>
                <CardDeck>
                    <Card bg={'Light'.toLowerCase()} key={"5"} text={'Light'.toLowerCase() === 'light' ? 'dark' : 'white'} className="mb-2" style={{ width: '18rem' }}>
                        <Card.Body>
                        <Card.Title>Completed Orders</Card.Title>
                            <Card.Text>
                                {this.state.totalCompletedOrder}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                    <Card bg={'Light'.toLowerCase()} key={"6"} text={'Light'.toLowerCase() === 'light' ? 'dark' : 'white'} className="mb-2" style={{ width: '18rem' }}>
                        <Card.Body>
                        <Card.Title>Confirm Orders</Card.Title>
                            <Card.Text>
                                {this.state.totalConfirmdOrder}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </CardDeck>
             </Card.Body>
        
            {/*<Card style={{ width: '42rem', borderWidth:0}} key={"index3"}> */}
                <Card.Body style={{marginTop:'-30px'}}>
                <Card.Title>Categories wise Products</Card.Title>
                <ul key={"u1"} className="list-group" style={{maxHeight: '135px',overflow:'scroll'}}>
                    {this.renderCategoryProduct()}    
                </ul>
                </Card.Body>
            {/* </Card> */}
        </Card>
        <Card key={"index5"} style={{height:"370px"}}>
            <Card.Body>
                <Card.Title>Order Analysis</Card.Title>
                <CardDeck>
                    <Card style={{borderWidth:0 }}>
                        <Card.Body>
                            <Pie data={this.state.dataPie} options={{ responsive: true }} />
                        </Card.Body>    
                    </Card>
                </CardDeck>
            </Card.Body>
        </Card>

        </div>
        // )
        return orderData
    }
    render(){
        let load = this.props.loading ? <Spinner animation="border" className={"spinner"} /> : this.renderTotal(this.props.total);
        return ( load )
    }
}

const mapStateToProps = (state) => ({
    total: state.adminTotalReducer.total,
    totals: state.adminTotalReducer.totals,
    loading :state.adminTotalReducer.loading
});

const mapDispatchToProps = dispatch => {
    return{
        fetchTotal: () => dispatch(fetchTotal()),
        fetchProductTotal: () => dispatch(fetchProductTotal())
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);