module.exports = (app) => {
    require('./Product_CategoriesAdminController')(app);
    require('./ProductAdminController')(app);
}