import React , {Component} from 'react';
import { connect } from 'react-redux'
import Card from 'react-bootstrap/Card'
import CardDeck from 'react-bootstrap/CardDeck'
// import ProgressBar from 'react-bootstrap/ProgressBar'
import { fetchTotal,fetchProductTotal,fetchRevenueTotal,fetchMonthlyProduct } from '../../store/actions/DashboardAction'
import { Pie , Line,Bar } from "react-chartjs-2";
import Spinner from 'react-bootstrap/Spinner'
import './Dashboard.css';

class Dashboard extends Component{
    barState = {
        labels: ['Jan', 'Feb', 'March', 'April', 'May', 'June', 'July', 'Aug', 'Sep','Oct','Nov','Dec'],
        datasets: [
          {
            label: 'Monthly Product',
            backgroundColor: 'rgba(75,192,192,1)',
            borderColor: 'rgba(0,0,0,1)',
            borderWidth: 2,
            data: []
          }
        ]
      }
    data = {
        labels: ['Jan', 'Feb', 'March', 'April', 'May', 'June', 'July', 'Aug', 'Sep','Oct','Nov','Dec'],
        datasets: [
          {
            label: 'Monthly Revenue',
            fill: false,
            lineTension: 0.1,
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,192,1)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(75,192,192,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: []
          }
        ]
      };
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

        let rev = this.data.datasets[0].data;
        await this.props.fetchRevenueTotal();
        let tot_rev = await this.props.revtotal;

        rev.push(tot_rev.jan[0][0].jan);
        rev.push(tot_rev.feb[0][0].feb);
        rev.push(tot_rev.march[0][0].march);
        rev.push(tot_rev.april[0][0].april);
        rev.push(tot_rev.may[0][0].may);
        rev.push(tot_rev.june[0][0].june);
        rev.push(tot_rev.july[0][0].july);
        rev.push(tot_rev.aug[0][0].aug);
        rev.push(tot_rev.sep[0][0].sep);
        rev.push(tot_rev.oct[0][0].oct);
        rev.push(tot_rev.nov[0][0].nov);
        rev.push(tot_rev.dec[0][0].dece);

    
        let d2 = this.barState.datasets[0].data;
        await this.props.fetchMonthlyProduct();
        let tot_prod = await this.props.tot;
        console.log(this.props.tot);        
        d2.push(tot_prod.jan[0][0].jan);
        d2.push(tot_prod.feb[0][0].feb);
        d2.push(tot_prod.march[0][0].march);
        d2.push(tot_prod.april[0][0].april);
        d2.push(tot_prod.may[0][0].may);
        d2.push(tot_prod.june[0][0].june);
        d2.push(tot_prod.july[0][0].july);
        d2.push(tot_prod.aug[0][0].aug);
        d2.push(tot_prod.sep[0][0].sep);
        d2.push(tot_prod.oct[0][0].oct);
        d2.push(tot_prod.nov[0][0].nov);
        d2.push(tot_prod.dec[0][0].dece);
        
        // console.log(tot_rev);
        // console.log(tot_rev.jan[0]);
        // console.log(tot_rev.jan[0][0].jan);
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
        <Card key={"index2"} style={{ width: '42rem',float:'left',height:'370px' }}>
            <Card.Body>
                <Card.Title>Monthly Revenue Analysis</Card.Title>
                <Line ref="chart" data={this.data} />
             </Card.Body>
        
            {/*<Card style={{ width: '42rem', borderWidth:0}} key={"index3"}> */}
                {/* <Card.Body style={{marginTop:'-30px'}}>
                <Card.Title>Categories wise Products</Card.Title>
                <ul key={"u1"} className="list-group" style={{maxHeight: '135px',overflow:'scroll'}}>
                    {this.renderCategoryProduct()}    
                </ul>
                </Card.Body> */}
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
        <Card key={"index7"} style={{ width: '42rem',float:'left',height:'388px' }}>
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
                <Card.Body style={{paddingBottom:'90px'}}>
                <Card.Title>Categories wise Products</Card.Title>
                <ul key={"u1"} className="list-group" style={{maxHeight: '170px',overflow:'scroll'}}>
                    {this.renderCategoryProduct()}    
                </ul>
                </Card.Body>
            {/* </Card> */}
        </Card>
        <Card key={"index6"} style={{height:"388px"}}>
            <Card.Body>
                <Card.Title>Monthly Product Analysis</Card.Title>
                <CardDeck>
                    <Card style={{borderWidth:0}}>
                        <Card.Body>
                            <Bar data={this.barState} options={{ responsive: true }} />
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
    tot: state.adminTotalReducer.tot,
    revtotal: state.adminTotalReducer.revtotal,
    loading :state.adminTotalReducer.loading
});

const mapDispatchToProps = dispatch => {
    return{
        fetchTotal: () => dispatch(fetchTotal()),
        fetchProductTotal: () => dispatch(fetchProductTotal()),
        fetchRevenueTotal: () => dispatch(fetchRevenueTotal()),
        fetchMonthlyProduct:() =>dispatch(fetchMonthlyProduct())
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);