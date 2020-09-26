import React, { Component } from 'react'
import { Button} from 'reactstrap';
import { Card, CardBody,CardText, CardTitle, Row, Col } from 'reactstrap';



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
            }

        };
        return (
            <>
                <div style={{ padding: "20px" }}>
                <Row>
                    <Col sm="4">
                        <Card body className="shadow p-3 mb-5 bg-white rounded">
                            <CardTitle>Electronic </CardTitle>
                            <CardText>Appliance related to electronics</CardText>
                            <Button style={style.cardBtn}>View Products</Button>
                        </Card>
                    </Col>
                    <Col sm="4">
                        <Card body className="shadow p-3 mb-5 bg-white rounded">
                            <CardTitle>Electronic </CardTitle>
                            <CardText>Appliance related to electronics</CardText>
                            <Button style={style.cardBtn}>View Products</Button>
                        </Card>
                    </Col>

                    <Col sm="4">
                        <Card body className="shadow p-3 mb-5 bg-white rounded">
                            <CardTitle>Electronic </CardTitle>
                            <CardText>Appliance related to electronics</CardText>
                            <Button style={style.cardBtn}>View Products</Button>
                        </Card>
                    </Col>

                    <Col sm="4">
                        <Card body className="shadow p-3 mb-5 bg-white rounded">
                            <CardTitle>Electronic </CardTitle>
                            <CardText>Appliance related to electronics</CardText>
                            <Button style={style.cardBtn}>View Products</Button>
                        </Card>
                    </Col>
                </Row>
                </div>
            </>
        )
    }
}

export default Category;