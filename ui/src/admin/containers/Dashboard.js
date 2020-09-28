import React, { useEffect } from 'react';

import Card from 'react-bootstrap/Card'
import CardDeck from 'react-bootstrap/CardDeck'
import Button from 'react-bootstrap/Button'
import { connect } from 'react-redux'
import * as classes from './Products.module.css'
import { Link } from 'react-router-dom';

// import ProductCategoriesList from '../components/ProductCategories/ProductCategoriesList';

const Dashboard = (props) => {
    // useEffect( () => {
    //     if(props.product_categories.length === 0)
    //     {
    //         props.fetchProductCategories()
    //     }
    // }, [props])
    return(
        
        <Card>
            <Card.Header className={classes.Header}>
                <div className={classes.Title}>
                    Dashboard
                </div>
            </Card.Header>
            <Card.Body>
            <CardDeck>
                    <Card bg={'Primary'.toLowerCase()} key={"index"} text={'Primary'.toLowerCase() === 'light' ? 'dark' : 'white'} className="mb-2" style={{ width: '18rem' }}>
                        <Card.Body>
                        <Card.Title> Total Product </Card.Title>
                            <Card.Text>
                                50
                            </Card.Text>
                        </Card.Body>
                        
                    </Card>
                    <Card bg={'Success'.toLowerCase()} key={"index"} text={'Success'.toLowerCase() === 'light' ? 'dark' : 'white'} className="mb-2" style={{ width: '18rem' }}>
                        <Card.Body>
                        <Card.Title>Total User </Card.Title>
                            <Card.Text>
                                200
                            </Card.Text>
                        </Card.Body>
                        
                    </Card>
                    <Card bg={'Dark'.toLowerCase()} key={"index"} text={'Dark'.toLowerCase() === 'light' ? 'dark' : 'white'} className="mb-2" style={{ width: '18rem' }}>
                        <Card.Body>
                        <Card.Title>Pending Order </Card.Title>
                            <Card.Text>
                                25
                            </Card.Text>
                            <Card.Text>
                            
                            </Card.Text>
                        </Card.Body>
                    </Card>
                    <Card bg={'Warning'.toLowerCase()} key={"index"} text={'Warning'.toLowerCase() === 'light' ? 'dark' : 'white'} className="mb-2" style={{ width: '18rem' }}>
                        <Card.Body>
                        <Card.Title>Complete Order </Card.Title>
                            <Card.Text>
                                175
                            </Card.Text>
                        </Card.Body>
                        
                    </Card>
                </CardDeck>
            </Card.Body>
        </Card>
       
    )
}

export default connect(null, null)(Dashboard);
