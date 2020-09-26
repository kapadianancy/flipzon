import React, { Component } from 'react'
import { Button } from 'reactstrap';
import { CardText, CardTitle, Row, Col } from 'reactstrap';
import {Card } from 'react-bootstrap';


class Category extends Component {

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
            cardTitle: {
                fontWeight: 'bold',
                fontSize: '20px'

            },
          

        };

        let data = [];
        this.props.product_categories.map(c => {
            data.push(<Col sm="4" key={c.id}>
              
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
                    </Row>
                </div>
            </>
        )
    }
}

export default Category;