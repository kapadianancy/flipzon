import React from 'react';
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import { confirmAlert } from 'react-confirm-alert';

const renderUsers = (users, showOrders, deleteUser, active) => {
    return users.map( (user, i) => (
        <tr key={user.id}>
            <td>{i+active+1}</td>
            <td>{user.username}</td>
            <td>{user.email}</td>
            <td>{user.contact}</td>
            <td>{user.address}</td>
            <td><Button onClick={ () => showOrders(user.id) } variant="info">View Orders</Button></td>
            <td><Button onClick={ () => deleteUser(user.id) } variant="danger">Delete</Button></td>
        </tr>
    ))
}

const UsersList = (props) => {
    const deleteAlert = (id) => { 
        confirmAlert({
            customUI: ({ onClose }) => {
                return (
                    <table>
                        <thead>
                        <tr>    
                            <td>
                                <h1>Are you sure?</h1>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <p>You want to delete?</p>
                            </td>
                        </tr>
                        <tr> 
                            <td>
                            <Button onClick={() => { props.deleteUser(id)
                                onClose(); }}> Yes, Delete it! </Button>
                            </td>
                            <td>
                                <Button onClick={onClose}>Cancel</Button>
                            </td>
                        </tr>
                        </thead>
                    </table>
                );
            }
        });
    }
    return <Table responsive striped bordered hover size="sm">
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
            { renderUsers(props.users, props.showOrders, deleteAlert, props.active) }
        </tbody>
    </Table>
}

export default UsersList