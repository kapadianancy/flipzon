const Orders = require("../../models/Order");
const OrdersDetails = require("../../models/Order_details");
const user = require("../../models/User");
const product = require("../../models/Product");
const productcategory = require("../../models/Product_category");
const { sequelize } = require('../../db/db');
var nodemailer = require('nodemailer');
const getAllOrders = async (id) => {
    try{
        return await OrdersDetails.findAll({
            include: [{
                model:product,as:"product",
                include:[{
                    model:productcategory,as:"Product_category"
                }]
            }],
            where:{
                IsDeleted:0,
                orderId:id
            }
        })
    }catch(error) {
        throw error;
    }  
}

const getOrderBill = async (id) => {
    try{
        return await OrdersDetails.findAll({
            include: [{
                model:product,as:"product",
                include:[{
                    model:productcategory,as:"Product_category"
                }]
            },{
                model:Orders,as:"order",
                include: [
                            {
                                model: user ,as:"user"
                            },
                        ]
            }],
            where:{
                IsDeleted:0,
                orderId:id
            }
        })
    }catch(error) {
        throw error;
    }  
}
const getOrders = async (page,limit) => {
    try{
        let data = { 
            include: [
                {
                    model: user ,as:"user"
                },
            ],
            where: {
                IsDeleted:0
            }
        }

        if(limit && page) {
            data.offset = 0 + (page-1) * limit;
            data.limit = +limit;
        }
        try {
            let total = await Orders.count({ where: { isDeleted: false }});
            if(limit) {
                total = Math.ceil(total / +limit);
            }
            let orders= await Orders.findAll(data);
            return { total,orders }
        } catch(error) {
            console.log(error.message);
        }
    }catch(error) {
        throw error;
    }  
}
  
const editOrders = async (id,status) => {
    try {
        let errorObj = { 
            statusCode:200 
        }
        let orders = await Orders.findByPk(id);
        if(!orders) {
            errorObj.statusCode = 404
            errorObj.message = "Orders not found";
        }
        if(errorObj.message) throw errorObj
        orders = await Orders.update({status:status,payment_status:"Paid"}, {
            where: { id : id }
        });
        // console.log("orders = "+orders);
        if(orders)
        {
            let d = await Orders.findByPk(id,{
                include: [
                    {
                        model: user ,as:"user"
                    },
                ],
                where: {
                    IsDeleted:0
                }
            });
        
            let d1 = await OrdersDetails.findAll({
                include: [{
                    model:product,as:"product",
                    include:[{
                        model:productcategory,as:"Product_category"
                    }]
                }],
                where:{
                    IsDeleted:0,
                    orderId:id
                }
            })
            if(d.status === 'Delivered')
            {
            var transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                user: 'dp297609@gmail.com',
                pass: 'dhaval1216'
                }
            });
            
            
var html1 = "<br/>";
var html = "<br/>";
            for (let i = 0; i < d1.length; i++) { 
                html1+=`<div style="background-color:transparent;overflow:hidden;">
                        <div class="m_-2609377885415545659block-grid" style="min-width:320px;max-width:640px;word-wrap:break-word;word-break:break-word;Margin:0 auto;width:100%;background-color:#f8f8f9;">
                            <div style="border-collapse:collapse;display:table;width:100%;background-color:#f8f8f9;">
                                <div class="m_-2609377885415545659col" style="min-width:320px;max-width:640px;display:table-cell;vertical-align:top;width:640px;">
                                    <div style="width:100%!important;">
                                        <div style="border-top:0px solid transparent;border-left:0px solid transparent;border-bottom:0px solid transparent;border-right:0px solid transparent;padding-top:5px;padding-bottom:5px;padding-right:0px;padding-left:0px;">
                                            <p>${i+1}). <b>${d1[i].product.name}</b></p>
                                            <p>Rs. ${d1[i].product.price} /-</p>
                                            <p>${d1[i].product.description}</p>
                                            <p>Qty:- ${d1[i].quantity}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>`
            }
                html += `<html><body>
<div style="margin:0;padding:0;background-color:#f8f8f9;">
    <table bgcolor="#f8f8f9" cellpadding="0" cellspacing="0" style="table-layout:fixed;vertical-align:top;min-width:320px;border-spacing:0;border-collapse:collapse;background-color:#f8f8f9;width:100%;" valign="top" width="100%">
        <tbody>
            <tr style="vertical-align:top;" valign="top">
                <td style="word-break:break-word;vertical-align:top;" valign="top">
                    <div style="background-color:#1aa19c;overflow:hidden;">
                        <div class="m_-2609377885415545659block-grid" style="min-width:320px;max-width:640px;word-wrap:break-word;word-break:break-word;Margin:0 auto;width:100%;background-color:#1aa19c;">
                            <div style="border-collapse:collapse;display:table;width:100%;background-color:#1aa19c;">
                                <div class="m_-2609377885415545659col" style="min-width:320px;max-width:640px;display:table-cell;vertical-align:top;width:640px;">
                                    <div style="width:100%!important;">
                                        <div style="border-top:0px solid transparent;border-left:0px solid transparent;border-bottom:0px solid transparent;border-right:0px solid transparent;padding-top:0px;padding-bottom:0px;padding-right:0px;padding-left:0px;"><br></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div style="background-color:#fff;overflow:hidden;">
                        <div class="m_-2609377885415545659block-grid" style="min-width:320px;max-width:640px;word-wrap:break-word;word-break:break-word;Margin:0 auto;width:100%;background-color:#fff;">
                            <div style="border-collapse:collapse;display:table;width:100%;background-color:#fff;">
                                <div class="m_-2609377885415545659col" style="min-width:320px;max-width:640px;display:table-cell;vertical-align:top;width:640px;">
                                    <div style="width:100%!important;">
                                        <div style="border-top:0px solid transparent;border-left:0px solid transparent;border-bottom:0px solid transparent;border-right:0px solid transparent;padding-top:0px;padding-bottom:0px;padding-right:0px;padding-left:0px;">
                                            <div align="center" style="padding-right:0px;padding-left:0px;">
                                                <div style="font-size:1px;line-height:22px;"><br></div><span style="text-decoration:none;height:auto;border:0;width:100%;max-width:149px;display:block;font-size:29px;font-weight:600;color:#2b2b2b;border-bottom:4px solid orangered;">Flipzon</span>
                                                <div style="font-size:1px;line-height:25px;"><br></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div><span style="font-size: 18px;"><strong>Item Delivered</strong></span></div>
                            <span style="font-size: 18px;"><span style="color: #000000; font-family: 'Times New Roman'; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: #ffffff; text-decoration-style: initial; text-decoration-color: initial; float: none; display: inline !important;">
                            <strong>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            on ${(new Date(d.orderDate)).toLocaleString()}</strong></span><strong>&nbsp;</strong></span>
                        </div>
                    </div>
                    ${html1}
                    <div style="background-color:transparent;overflow:hidden;">
                        <div class="m_-2609377885415545659block-grid" style="min-width: 320px; max-width: 640px; overflow-wrap: break-word; word-break: break-word; margin: 0px auto; width: 100%; background-color: rgb(255, 255, 255); text-align: left;">
                            <div style="border-collapse:collapse;display:table;width:100%;background-color:#fff;"><span style="font-size: 18px; text-shadow: rgba(136, 136, 136, 0.8) 3px 3px 2px;">Delivery Address</span></div>
                            <p>${d.user.username}</p>
                            <p>${d.user.address}</p>
                            <p>${d.user.contact}</p>
                            <p>${d.user.email}</p>
                            <p><br></p>
                            <p><span style="font-size: 18px; text-shadow: rgba(136, 136, 136, 0.8) 3px 3px 2px;">Payment Summary</span></p>
                            <p>Sub Total <span style="float:right;">Rs. ${d.totalPrice} /- </span>&nbsp;</p>
                            <hr><span style="font-size: 18px; text-shadow: rgba(136, 136, 136, 0.8) 3px 3px 2px;">Bag Total&nbsp;</span> <span style='color: rgb(0, 0, 0); font-family: "Times New Roman"; font-size: 18px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: left; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: rgb(255, 255, 255); text-decoration-style: initial; text-decoration-color: initial; display: inline !important; float: Right;'>Rs. ${d.totalPrice} /- &nbsp;</span>
                        </div>
                    </div>
                </td>
            </tr>
            <tr>
                <td style="word-break:break-word;vertical-align:top;"><br></td>
            </tr>
        </tbody>
    </table>
</div>
<div style="background-color:transparent;overflow:hidden;">
    <div class="m_-2609377885415545659block-grid" style="min-width:320px;max-width:640px;word-wrap:break-word;word-break:break-word;Margin:0 auto;width:100%;background-color:#2b303a;">
        <div style="border-collapse:collapse;display:table;width:100%;background-color:#2b303a;">
            <div class="m_-2609377885415545659col" style="min-width:320px;max-width:640px;display:table-cell;vertical-align:top;width:640px;">
                <div style="width:100%!important;">
                    <div style="border-top:0px solid transparent;border-left:0px solid transparent;border-bottom:0px solid transparent;border-right:0px solid transparent;padding-top:0px;padding-bottom:0px;padding-right:0px;padding-left:0px;">
                        <table border="0" cellpadding="0" cellspacing="0" style="table-layout:fixed;vertical-align:top;border-spacing:0;border-collapse:collapse;min-width:100%;" valign="top" width="100%">
                            <tbody>
                                <tr style="vertical-align:top;" valign="top">
                                    <td style="word-break:break-word;vertical-align:top;min-width:100%;padding-top:0px;padding-right:0px;padding-bottom:0px;padding-left:0px;" valign="top">
                                        <table align="center" border="0" cellpadding="0" cellspacing="0" style="table-layout:fixed;vertical-align:top;border-spacing:0;border-collapse:collapse;border-top:4px solid #1aa19c;width:100%;" valign="top" width="100%">
                                            <tbody>
                                                <tr style="vertical-align:top;" valign="top">
                                                    <td style="word-break:break-word;vertical-align:top;" valign="top"><br></td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <div align="center" style="padding-right:0px;padding-left:0px;"><br></div>
                        <div align="center" style="padding-right:0px;padding-left:0px;">
                            <div style="font-size:1px;line-height:22px;"><br></div><span style="text-decoration:none;height:auto;border:0;width:100%;max-width:149px;display:block;font-size:29px;font-weight:600;color:#f94600;border-bottom:4px solid #fffbf9;">Flipzon</span>
                        </div>
                    </div>
                    <div style="color:#555555;font-family:Montserrat,Trebuchet MS,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Tahoma,sans-serif;line-height:1.5;padding-top:15px;padding-right:40px;padding-bottom:10px;padding-left:40px;">
                        <div style="line-height:1.5;font-size:12px;font-family:Montserrat,Trebuchet MS,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Tahoma,sans-serif;color:#555555;">
                            <p style="font-size:12px;line-height:1.5;word-break:break-word;text-align:left;font-family:Montserrat,Trebuchet MS,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Tahoma,sans-serif;margin:0;"><span style="color:#95979c;font-size:12px;">Flipzon is the product developed by great team resides somewhere on earth. Flipzon is combination of all the great functionalities of Flipkart and Amazon, so it&apos;s named this way. Buy as much you want without paying anything, also we wont deliver anything to you. That&apos;s our policy, you don&apos;t pay anything, we won&apos;t deliver anything.</span></p>
                        </div>
                    </div>
                    <div style="color:#555555;font-family:Montserrat,Trebuchet MS,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Tahoma,sans-serif;line-height:1.2;padding-top:20px;padding-right:40px;padding-bottom:30px;padding-left:40px;">
                        <div style="line-height:1.2;font-size:12px;font-family:Montserrat,Trebuchet MS,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Tahoma,sans-serif;color:#555555;">
                            <p style="font-size:12px;line-height:1.2;word-break:break-word;text-align:left;font-family:Montserrat,Trebuchet MS,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Tahoma,sans-serif;margin:0;"><span style="color:#95979c;font-size:12px;">Flipzon Copyright &copy; 2020</span></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div></body>
</html>`;
            var mailOptions = {
                from: 'dp297609@gmail.com',
                to: d.user.email,
                subject: 'Flipzon OrderSummary',
                html:html
            };       
            
            transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                console.log(error);
                } else {
                console.log('Email sent: ' + info.response);
                }
            });
            }
        }

        return await Orders.findByPk(id);
    } catch (error) {
        throw error;
    }
}


module.exports = {
    getOrders,
    editOrders,
    getAllOrders,
    getOrderBill
}