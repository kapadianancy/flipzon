const User = require("../../models/User")
const Product = require("../../models/Product")
const Review = require("../../models/Review")

const getReview = async (page,limit) => {
    try {
        let data = { 
            include:[{
                model:Product,as:"product",
            },{
                model:User,as:"user",
            }],
            where: {
                isDeleted: false,
            }
        }
        if(limit && page) {
            data.offset = 0 + (page-1) * limit;
            data.limit = +limit;
        }
        try {
            let total = await Review.count({ where: { isDeleted: false }});
            if(limit) {
                total = Math.ceil(total / +limit);
            }
            let review= await Review.findAll(data);
            return { total,review }
        }catch (error) {
            throw error;
        }  
    } catch (error) {
        console.log(error);
        throw error;
    }
}

const deleteReview = async (id) => {
    try {
        let errorObj = { statusCode:400 }
        var review = await Review.findOne({
            where: {
                id,
                isDeleted: false
            },
        });
        if(!review) {
            errorObj.statusCode = 404
            errorObj.message = "Review not found";
        }
        if(errorObj.message) throw errorObj
        await Review.update({
            "isDeleted": true
        }, {
            where: { id }
        });
        return review;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    getReview,
    deleteReview
}