const { check } = require("express-validator");

exports.createUser =[
    check('name').not().isEmpty().withMessage("Product Name is required!").trim().escape(),
    check('stock').not().isEmpty().withMessage("Product Stock is required!").isInt().withMessage("Product Stock is invalid!").trim().escape(),
    check('categoryId').not().isEmpty().withMessage("Product Category is required!").isInt().withMessage("Product Category is invalid!").trim().escape(),
    check('price').not().isEmpty().withMessage("Product Price is required!").isInt().withMessage("Product Price is invalid!").trim().escape(),
    check('isInOffer').custom( (value, { req }) => {
        return (value == "false") || (value == "true" && (+req.body.discount) > 0)
    }).withMessage("Discount must be greater than 0 if product is in offer!")
]

exports.editUser =[
    check('name').not().isEmpty().withMessage("Product Name is required!").trim().escape(),
    check('stock').optional().isInt().withMessage("Product Stock is invalid!").trim().escape(),
    check('categoryId').optional().isInt().withMessage("Product Category is invalid!").trim().escape(),
    check('price').optional().isInt().withMessage("Product Price is invalid!").trim().escape(),
    check('isInOffer').optional().custom( (value, { req }) => {
        return (value == "false") || (value == "true" && (+req.body.discount) > 0)
    }).withMessage("Discount must be greater than 0 if product is in offer!")
]