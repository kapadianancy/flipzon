import React, { Component } from 'react';
import { Card, Button, Carousel, CardDeck, CardGroup } from 'react-bootstrap';

import Product from '../../../images/product.png';
import Product1 from '../../../images/product-2.jpg';

class CategorySlider extends Component {

    render() {
        const style = {
            backgroundColor: "#fb641b"
        }
        return (
            <div style={{ padding: "20px" }}>
                <h2 style={{ padding: "10px" }}>Categories</h2>
                <Carousel>
                    <Carousel.Item>
                        <CardGroup>
                            <Card style={{ width: '18rem', padding: "10px" }}>
                                <Card.Img variant="top" src={Product} />
                                <Card.Body>
                                    <Card.Title>Card Title</Card.Title>
                                    <Card.Text>
                                        Some quick example text to build on the card title and make up the bulk of
                                        the card's content.
                                    </Card.Text>
                                    <Button style={style} variant="primary">Go somewhere</Button>
                                </Card.Body>
                            </Card>

                            <Card style={{ width: '18rem', padding: "10px" }}>
                                <Card.Img variant="top" src={Product1} />
                                <Card.Body>
                                    <Card.Title>Card Title</Card.Title>
                                    <Card.Text>
                                        Some quick example text to build on the card title and make up the bulk of
                                        the card's content.
                            </Card.Text>
                                    <Button style={style} variant="primary">Go somewhere</Button>
                                </Card.Body>
                            </Card>

                            <Card style={{ width: '18rem', padding: "10px" }}>
                                <Card.Img variant="top" src={Product} />
                                <Card.Body>
                                    <Card.Title>Card Title</Card.Title>
                                    <Card.Text>
                                        Some quick example text to build on the card title and make up the bulk of
                                        the card's content.
                            </Card.Text>
                                    <Button style={style} variant="primary">Go somewhere</Button>
                                </Card.Body>
                            </Card>

                            <Card style={{ width: '18rem', padding: "10px" }}>
                                <Card.Img variant="top" src={Product1} />
                                <Card.Body>
                                    <Card.Title>Card Title</Card.Title>
                                    <Card.Text>
                                        Some quick example text to build on the card title and make up the bulk of
                                        the card's content.
                            </Card.Text>
                                    <Button style={style} variant="primary">Go somewhere</Button>
                                </Card.Body>
                            </Card>

                        </CardGroup>
                    </Carousel.Item>

                    <Carousel.Item>
                        <CardGroup>
                            <Card style={{ width: '18rem', padding: "10px" }}>
                                <Card.Img variant="top" src={Product} />
                                <Card.Body>
                                    <Card.Title>Card Title</Card.Title>
                                    <Card.Text>
                                        Some quick example text to build on the card title and make up the bulk of
                                        the card's content.
                        </Card.Text>
                                    <Button style={style} variant="primary">Go somewhere</Button>
                                </Card.Body>
                            </Card>

                            <Card style={{ width: '18rem', padding: "10px" }}>
                                <Card.Img variant="top" src={Product1} />
                                <Card.Body>
                                    <Card.Title>Card Title</Card.Title>
                                    <Card.Text>
                                        Some quick example text to build on the card title and make up the bulk of
                                        the card's content.
                            </Card.Text>
                                    <Button style={style} variant="primary">Go somewhere</Button>
                                </Card.Body>
                            </Card>

                            <Card style={{ width: '18rem', padding: "10px" }}>
                                <Card.Img variant="top" src={Product} />
                                <Card.Body>
                                    <Card.Title>Card Title</Card.Title>
                                    <Card.Text>
                                        Some quick example text to build on the card title and make up the bulk of
                                        the card's content.
                            </Card.Text>
                                    <Button style={style} variant="primary">Go somewhere</Button>
                                </Card.Body>
                            </Card>

                            <Card style={{ width: '18rem', padding: "10px" }}>
                                <Card.Img variant="top" src={Product1} />
                                <Card.Body>
                                    <Card.Title>Card Title</Card.Title>
                                    <Card.Text>
                                        Some quick example text to build on the card title and make up the bulk of
                                        the card's content.
                            </Card.Text>
                                    <Button style={style} variant="primary">Go somewhere</Button>
                                </Card.Body>
                            </Card>


                        </CardGroup>
                    </Carousel.Item>
                </Carousel>

            </div>
        );
    }
}

export default CategorySlider;