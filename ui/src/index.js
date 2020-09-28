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
import UserReducer from './user/redux-store/Reducers/User'
import ProductCategoryReducer from './user/redux-store/Reducers/ProductCategory'
import AdminProductReducer from './admin/store/reducers/ProductReducer';
import AdminProductCategoriesReducer from './admin/store/reducers/Product_CategoriesReducer';
import AdminOrdersReducer from './admin/store/reducers/OrdersReducer';
import ProductCategory from './user/redux-store/Reducers/ProductCategory';
import Product from './user/redux-store/Reducers/Product';


const rootReducer = combineReducers({
  User:UserReducer,
  ProductCategory : ProductCategoryReducer,
  adminProduct: AdminProductReducer,
  adminProductCategories:AdminProductCategoriesReducer,
  adminOrdersReducer:AdminOrdersReducer,
  ProductCategory:ProductCategory,
  Product:Product
});
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(
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
