import React from 'react';
import Header from './components/common/Header'
import { Switch, Route, Redirect } from 'react-router'
import Products from './containers/Products'
import ProductCategories from './containers/ProductCategories'
import Dashboard from './containers/Dashboard'

const Admin = (props) => {
    return <>
        <Header />
        <Switch>
            <Route path="/admin/dashboard" exact component={Dashboard} />
            <Route path="/admin/products" exact component={Products} />
            <Route path="/admin/product_categories" component={ProductCategories} />
            <Redirect to="/admin" component={Dashboard} />
        </Switch>
    </>
}

export default Admin