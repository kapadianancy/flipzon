import React, { useEffect } from 'react';
import Header from './components/common/Header'
import { Switch, Route, Redirect, withRouter } from 'react-router'
import Products from './containers/Products'
import ProductCategories from './containers/ProductCategories'
import Review from './containers/Review'
import ProductCategoriesAdd from './components/ProductCategories/ProductCategoriesAdd'
import ProductCategoriesEdit from './components/ProductCategories/ProductCategoriesEdit'
import PrintOrder from './containers/PrintOrder'
import Dashboard from './containers/Dashboard'
import ProductFormController from './containers/ProductFormController'
import Order from "./containers/Orders";
import Auth from './containers/Auth';
import { connect } from 'react-redux';
import { tryAutoLogin, logout } from './store/actions/AuthActions'
import { fetchOOSProducts, removeOOSProduct } from './store/actions/ProductActions'
import Profile from './containers/Profile';
import Users from './containers/Users';
import * as classes from './Admin.module.css'
import ResetPassword from './containers/ResetPassword'

const Admin = (props) => {
    const { loggedIn, tryAutoLogin, OOSProducts, oError, fetchOOSProducts, location } = props;

    useEffect(() => {
        if(location.pathname.startsWith("/admin") && !loggedIn) {
            tryAutoLogin();
        }
        if(OOSProducts === null && oError === null) {
            fetchOOSProducts()
        }
    }, [location.pathname, loggedIn, tryAutoLogin, fetchOOSProducts, OOSProducts, oError])

    let content = <Redirect to="/" />

    if(props.location.pathname.startsWith("/admin") && !props.loggedIn) {
        content = <Switch>
            <Route path="/admin/resetPassword" exact component={ResetPassword} />
            <Route path="/admin/auth" exact component={Auth} />
            <Redirect to="/admin/auth" />
        </Switch>
    } else if(props.location.pathname.startsWith("/admin") && props.loggedIn) {
        content = <>
            <Header logout={props.logout} user={props.user} OOSProducts={OOSProducts} removeOOSProduct={props.removeOOSProduct} />
            <div className={classes.Container}>
                <Switch>
                    <Route path="/admin/dashboard" exact component={Dashboard} />
                    <Route path="/admin/products/edit/:id" exact component={ProductFormController} />
                    <Route path="/admin/products/add" exact component={ProductFormController} />
                    <Route path="/admin/products" exact component={Products} />
                    <Route path="/admin/ProductCategoriesAdd" exact component={ProductCategoriesAdd} />
                    <Route path="/admin/ProductCategoriesEdit/:id" exact component={ProductCategoriesEdit} />
                    <Route path="/admin/printorder/:id" exact component={PrintOrder} />
                    <Route path="/admin/productcategories" exact component={ProductCategories} />
                    <Route path="/admin/order" exact component={Order} />
                    <Route path="/admin/profile" exact component={Profile} />
                    <Route path="/admin/users" exact component={Users} />
                    <Route path="/admin/review" exact component={Review} />
                    <Redirect to="/admin/dashboard" />
                </Switch>
            </div>
        </>
    }
    return content
}

const mapStateToProps = state => {
    return {
        loggedIn: state.adminAuth.token ? true : false,
        user: state.adminAuth.user,
        oLoading: state.adminProduct.oLoading,
        oError: state.adminProduct.oError,
        OOSProducts: state.adminProduct.OOSProducts
    }
}
const mapDispatchToProps = dispatch => {
    return {
        tryAutoLogin: () => dispatch(tryAutoLogin()),
        logout: () => dispatch(logout()),
        fetchOOSProducts: () => dispatch(fetchOOSProducts()),
        removeOOSProduct: (id) => dispatch(removeOOSProduct(id))
    }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Admin));