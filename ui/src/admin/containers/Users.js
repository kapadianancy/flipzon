import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card'
import Pagination from 'react-bootstrap/Pagination'
import { connect } from 'react-redux'
import Spinner from 'react-bootstrap/Spinner'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup'
import ToggleButton from 'react-bootstrap/ToggleButton'

import * as classes from './Users.module.css'
import { fetchUserOrders, fetchUsers, deleteUser } from '../store/actions/UserActions'
import UserList from '../components/Users/UsersList'
import OrdersList from '../components/Users/OrdersList';

const Users = (props) => {
    const [perPage, setPerPage] = useState(5);
    const [active, setActive] = useState(1);
    const [modalOpen, setModalOpen] = useState(false);
    const [showMode, setShowMode] = useState(1);

    useEffect( () => {
        props.fetchUsers(active, perPage, showMode);
    }, [showMode, perPage, active]);

    const showUserOrders = async (userId) => {
        setModalOpen(true);
        props.fetchUserOrders(userId);
    }
    const closeModal = () => {
        setModalOpen(false);
    }
    const deleteUser = async (userId) => {
        await props.deleteUser(userId);
    }
    const changeActive = (index) => {
        setActive(index);
    }
    const renderPaginationItems = (total, active, limit, changeActive) => {
        let items = [];
        for(let i=1;i<=total;i++) {
            i===active 
            ? items.push(<Pagination.Item key={i} active>{i}</Pagination.Item>)
            : items.push(<Pagination.Item key={i} onClick={ () => changeActive(i)}>{i}</Pagination.Item>)
        }
        return items
    }

    let data = <Spinner animation="border" />;
    if(!props.loading && props.users) {
        data = <UserList users={props.users} showOrders={showUserOrders} deleteUser={deleteUser} active={(active-1) * perPage} />
    }
    return <>
        <Modal show={modalOpen} onHide={closeModal} size="lg">
            <Modal.Header closeButton>
                Orders
            </Modal.Header>
            <Modal.Body>
                {
                    props.ordersLoading ?
                    <Spinner animation="border" /> :
                    <OrdersList orders={props.orders} />
                }
            </Modal.Body>
        </Modal>
        <Card>
            <Card.Header className={classes.Header}>
                <div className={classes.Title}>
                    Users List
                </div>
                <ToggleButtonGroup type="radio" onChange={ (val) => setShowMode(val)} name="showMode" defaultValue={showMode}>
                    <ToggleButton variant="outline-dark" value={1}>Admin</ToggleButton>
                    <ToggleButton variant="outline-dark" value={2}>Users</ToggleButton>
                </ToggleButtonGroup>
            </Card.Header>
            <Card.Body> {data} </Card.Body>
            <Card.Footer className={classes.Footer}>
                {
                    props.users ?
                    <Pagination key={2} className={classes.Pagination} >
                        { renderPaginationItems(props.totalUsers, active, perPage, changeActive) }
                    </Pagination> :
                    null
                }
                <Form.Control as="select" value={perPage} custom className={classes.Select} onChange={ (e) => { setPerPage(e.target.value) } }>
                    <option>2</option>
                    <option>5</option>
                    <option>10</option>
                    <option>20</option>
                    <option>30</option>
                </Form.Control>
            </Card.Footer>
        </Card>
    </>
}

const mapStateToProps = state => {
    return {
        loading: state.adminUser.loading,
        error: state.adminUser.error,
        users: state.adminUser.users,
        totalUsers: state.adminUser.totalUsers,
        orders: state.adminUser.userOrders,
        ordersLoading: state.adminUser.ordersLoading,
        ordersError: state.adminUser.ordersError
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchUsers: (page, limit, type) => dispatch(fetchUsers(page, limit, type)),
        fetchUserOrders: (userId) => dispatch(fetchUserOrders(userId)),
        deleteUser: (userId) => dispatch(deleteUser(userId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Users)