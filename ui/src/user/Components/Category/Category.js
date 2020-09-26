import React, { Component } from 'react'
import { Button } from 'reactstrap';
import { Card, CardBody, CardText, CardTitle, Row, Col } from 'reactstrap';



class Category extends Component {

    ProductCategories = (categories) => {
        //   debugger;
       // console.log(categories);
        return categories.map((product_categories, index) =>
        
            <Col sm="4" key={index + 1}>
                <Card body className="shadow p-3 mb-5 bg-white rounded">
                    <CardTitle>{product_categories.name} </CardTitle>
                    <CardText>{product_categories.description}</CardText>
                    <Button>View Products</Button>
                </Card>
            </Col>

        )
    }

    render() {
        const style = {
            cardBtn: {
                alignSelf: 'center',
                backgroundColor: "#fb641b",
                borderColor: "#fb641b",
                margin: '10px',
                color: "white",
                width: '170px'
            },
            cardTitle : {
                fontWeight : 'bold',
                fontSize : '20px'
                
            }
 
        };

        let data=[];
        this.props.product_categories.map(c=>
            {
               data.push( <Col sm="4" key={c.id}>
                <Card body className="shadow p-3 mb-5 bg-white rounded">
                    <CardTitle style={style.cardTitle}>{c.name} </CardTitle>
                    <CardText>{c.description}</CardText>
                    <Button style={style.cardBtn}>View Products</Button>
                </Card>
            </Col>);
            return data;
            })
        return (
            <>
                <div style={{ padding: "20px" }}>
                    <Row>
                       {data} 
                        

                        {/* {this.ProductCategories(this.props.product_categories)} */}
                    </Row>
                </div>
            </>
        )
    }
}

export default Category;