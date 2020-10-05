import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter } from 'react-router-dom'
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

// import reducers
import UserReducer from './user/redux-store/Reducers/Auth'
import ProductCategoryReducer from './user/redux-store/Reducers/ProductCategory'
import AdminProductReducer from './admin/store/reducers/ProductReducer';
import AdminProductCategoriesReducer from './admin/store/reducers/Product_CategoriesReducer';
import AdminOrdersReducer from './admin/store/reducers/OrdersReducer';
import AdminTotalReducer from './admin/store/reducers/DashboardReducer';
import ProductCategory from './user/redux-store/Reducers/ProductCategory';
import Product from './user/redux-store/Reducers/Product';
import AdminUserReducer from './admin/store/reducers/UserReducer'
import AdminAuthReducer from './admin/store/reducers/AuthReducer';
import OrdersReducer from './user/redux-store/Reducers/Order';

const rootReducer = combineReducers({
  User:UserReducer,
  ProductCategory : ProductCategoryReducer,
  adminProduct: AdminProductReducer,
  adminProductCategories:AdminProductCategoriesReducer,
  adminOrdersReducer:AdminOrdersReducer,
  adminTotalReducer:AdminTotalReducer,
  ProductCategory:ProductCategory,
  Product:Product,
  adminAuth: AdminAuthReducer,
  Product:Product,
  adminAuth: AdminAuthReducer,
  adminUser: AdminUserReducer,
  Order:OrdersReducer
});

let init;
if(localStorage.getItem("token"))
{
  init={
    User:
    {
      token:localStorage.getItem("token"),
      userId:localStorage.getItem("userId")
    }
  }
}
else
{
  init={
    User:{
      token:"",
      userId:""
    }
  };
}

//console.log(init);
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer,init, composeEnhancers(
  applyMiddleware(thunk)
));


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
</React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
 serviceWorker.unregister();
