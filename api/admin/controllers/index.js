module.exports = (app) => {
    require('./Product_CategoriesAdminController')(app);
    require('./OrderAdminController')(app);
    require('./ProductAdminController')(app);
    require('./DashboardController')(app);
    require('./AuthController')(app);
    require('./UserController')(app);
    require('./ReviewController')(app);
}