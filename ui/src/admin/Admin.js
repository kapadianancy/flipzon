import React from 'react';
import Header from './components/common/Header'
import { Switch, Route, Redirect } from 'react-router'
import Products from './containers/Products'
import ProductCategories from './containers/ProductCategories'
import ProductCategoriesAdd from './components/ProductCategories/ProductCategoriesAdd'
import ProductCategoriesEdit from './components/ProductCategories/ProductCategoriesEdit'
import Dashboard from './containers/Dashboard'
import * as classes from './Admin.module.css'
import ProductFormController from './containers/ProductFormController'
import Order from "./containers/Orders";

const Admin = (props) => {
    return <>
        <Header />
        <div className={classes.Container}>
            <Switch>
                <Route path="/admin/dashboard" exact component={Dashboard} />
                <Route path="/admin/products/edit/:id" exact component={ProductFormController} />
                <Route path="/admin/products/add" exact component={ProductFormController} />
                <Route path="/admin/products" exact component={Products} />
                <Route path="/admin/ProductCategoriesAdd" exact component={ProductCategoriesAdd} />
                <Route path="/admin/ProductCategoriesEdit" exact component={ProductCategoriesEdit} />
                <Route path="/admin/product_categories" exact component={ProductCategories} />
                <Route path="/admin/order" exact component={Order} />
                {/* <Redirect to="/admin" component={Dashboard} /> */}
            </Switch>
        </div>
    </>
}

export default Admin