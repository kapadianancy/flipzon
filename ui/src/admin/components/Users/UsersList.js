import React from 'react';
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'

const renderUsers = (users, showOrders, deleteUser, activeOld, perPage) => {
    let usersArr = [];
    let active = (activeOld-1)*perPage;
    for(let i=active;i<(activeOld*perPage);i++) {
        if(users[i]) {
            usersArr.push(
                <tr key={users[i].id}>
                    <td>{i+1}</td>
                    <td>{users[i].username}</td>
                    <td>{users[i].email}</td>
                    <td>{users[i].contact}</td>
                    <td>{users[i].address}</td>
                    <td><Button onClick={ () => showOrders(users[i].id) } variant="info">View Orders</Button></td>
                    <td><Button onClick={ () => deleteUser(users[i].id) } variant="danger">Delete</Button></td>
                </tr>
            )
        }
    }
    return usersArr;
}

const UsersList = (props) => {
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
            { renderUsers(props.users, props.showOrders, props.deleteUser, props.active, props.perPage) }
        </tbody>
    </Table>
}

export default UsersList