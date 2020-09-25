import React from 'react';
import Header from './components/common/Header'
import { Switch, Route, Redirect } from 'react-router'
import Products from './containers/Products'
import ProductCategories from './containers/ProductCategories'
import Dashboard from './containers/Dashboard'
import * as classes from './Admin.module.css'
import ProductForm from './containers/ProductForm'
import ProductFormController from './containers/ProductFormController'

const Admin = (props) => {
    return <>
        <Header />
        <div className={classes.Container}>
            <Switch>
                <Route path="/admin/dashboard" exact component={Dashboard} />
                <Route path="/admin/products/edit/:id" exact component={ProductFormController} />
                <Route path="/admin/products/add" exact component={ProductFormController} />
                <Route path="/admin/products" exact component={Products} />
                <Route path="/admin/product_categories" component={ProductCategories} />
                {/* <Redirect to="/admin" component={Dashboard} /> */}
            </Switch>
        </div>
    </>
}

export default Admin