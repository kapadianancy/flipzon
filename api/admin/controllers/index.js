module.exports = (app) => {
    require('./Product_CategoriesAdminController')(app);
    require('./OrderAdminController')(app);
    require('./ProductAdminController')(app);
}