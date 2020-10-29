import React, { useState } from 'react';
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Card from 'react-bootstrap/Card'
import { FaTrashAlt } from "react-icons/fa";
import { GrOverview } from 'react-icons/gr'

const renderUsers = (users, showOrders, deleteUser, active) => {
    return users.map( (user, i) => (
        <tr key={user.id}>
            <td>{i+active+1}</td>
            <td>{user.username}</td>
            <td>{user.email}</td>
            <td>{user.contact}</td>
            <td>{user.address}</td>
            <td>{ user.roleId === 2 && <Button onClick={ () => showOrders(user.id) } variant="info"><GrOverview /></Button> }</td>
            <td><Button onClick={ () => deleteUser(user.id) } variant="danger"><FaTrashAlt /></Button></td>
        </tr>
    ))
}

const UsersList = (props) => {
    const [deleteUser, setDeleteUser] = useState({ show: false, id: null });

    const deleteModal = (id) => {
        setDeleteUser({ show: true, id: id });
    }
    const confirm = (doDelete) => {
        if(doDelete) props.deleteUser(deleteUser.id);
        setDeleteUser({ show: false, id: null });
    }

    return <>
        <Modal show={deleteUser.show} onHide={() => confirm(false) } centered size="sm">
            <Card bg="Light" text='dark' >
                <Card.Body>
                    <Card.Title><b>Are you sure!</b></Card.Title>
                    <Card.Text>
                        Do you want to delete this user?
                    </Card.Text>
                    <Button variant="danger" className="mr-1" onClick={() => confirm(true) }>Delete</Button>
                    <Button variant="secondary" onClick={() => confirm(false) }>Cancel</Button>
                </Card.Body>
            </Card>
        </Modal>
        <Table responsive striped bordered hover size="sm" className="text-center">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Contact</th>
                    <th>Address</th>
                    <th>View Orders</th>
                    <th>Delete User</th>
                </tr>
            </thead>
            <tbody>
                { renderUsers(props.users, props.showOrders, deleteModal, props.active) }
            </tbody>
        </Table>
    </>
}

export default UsersList