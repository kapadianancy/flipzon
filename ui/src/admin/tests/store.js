import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';

// import reducers
import UserReducer from '../../user/redux-store/Reducers/Auth'
import ProductCategoryReducer from '../../user/redux-store/Reducers/ProductCategory'
import AdminProductReducer from '../../admin/store/reducers/ProductReducer';
import AdminProductCategoriesReducer from '../../admin/store/reducers/Product_CategoriesReducer';
import AdminOrdersReducer from '../../admin/store/reducers/OrdersReducer';
import AdminTotalReducer from '../../admin/store/reducers/DashboardReducer';
import ProductCategory from '../../user/redux-store/Reducers/ProductCategory';
import Product from '../../user/redux-store/Reducers/Product';
import AdminUserReducer from '../../admin/store/reducers/UserReducer'
import AdminAuthReducer from '../../admin/store/reducers/AuthReducer';
import OrdersReducer from '../../user/redux-store/Reducers/Order';

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

const composeEnhancers = compose;
const store = createStore(rootReducer, composeEnhancers(
    applyMiddleware(thunk)
));

export default store