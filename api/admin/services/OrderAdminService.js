const Orders = require("../../models/Order");
const OrdersDetails = require("../../models/Order_details");
const user = require("../../models/User");
const product = require("../../models/Product");
const productcategory = require("../../models/Product_category");
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
const getOrders = async () => {
    try{
        return await Orders.findAll({
            include: [
                {
                    model: user ,as:"user"
                },
            ],
            where: {
                IsDeleted:0
            }
        })
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
        orders = await Orders.update({status:status}, {
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
            html1 +="==============================";
            html1 +="<h3></b></h3><b>Details:-</b><br />";
            for (let i = 0; i < d1.length; i++) {
                html1 += "<b>["+(i+1)+"]Product Name:-</b>"+d1[i].product.name+"<br/>" + "<b>qty:-</b>"+d1[i].quantity+",<br/>" + "<b>price(1 piece):-</b>"+d1[i].price+" ₹ /-"+",<br/>";
            }
            html1+="</br>"
            var html="<html><body><table><tr><td class=\"Bu bAn\"><div class=\"\"><div id=\":2l\" class=\"ii gt\"><div id=\":2k\" class=\"a3s aXjCH msg5592298769751509350\">"+
            "<div><img src=\"https://mail.google.com/mail/u/0?ui=2&amp;ik=b974c79857&amp;attid=0.1.1&amp;permmsgid=msg-f:1635663097844123044&amp;th=16b30aebdf36c5a4&amp;view=fimg&amp;sz=s0-l75-ft&amp;attbid=ANGjdJ-4mlEvjpjqbuuXPsTEWERcyBGn9jbJbcW4saWDQbKooSB7BKn1QLonoaBqOxomuUBQekwqRrqKSjxAgygHjPFMsjYiDDeSzHP0oKUwMY3_3564zIShbLPgQj8&amp;disp=emb\" alt=\"dp- flipzone\" data-image-whitelisted=\"\" class=\"CToWUd\" width=\"100px\" height=\"30px\">\n" +
            "			<p>Dear "+ d.user.username +" ,</p>\n" +
            "			<table border=\"2\" align=\"center\">\n" +
            "				<thead>\n" +
            "					<tr style=\"background-color:#db2d2e;color:white\" align=\"center\">\n" +
            "						<th colspan=\"2\" style=\"padding:13px;font-size:18px;margin-left:500px;padding-left:199px;padding-right:199px\">Total Bill  </th>\n" +
            "						\n" +
            "					</tr>\n" +
            "				</thead>\n" +
            "				<tbody>\n" +
            "						\n" +
            "					<tr  style=\"line-height:41px;color:black;font-size:15px\">\n" +
            "						<td colspan=\"2\" style=\"padding-left:9px\">"+
            "                                               <span>"+html1+"</span>\n"+                          
            "					</td>\n" +
            "					</tr>\n" +
            "					<tr style=\"line-height:41px;color:black;font-size:15px\">\n" +
            "						<td style=\"padding-left:9px\">Order Date:-</td>\n" +
            "						<td style=\"padding-left:9px\"><span>"+d.orderDate+"</span></td>\n" +
            "\n" +
            "					<tr style=\"line-height:41px\">\n" +
            "						<td style=\"padding-left:9px\"></td>\n" +
            "						<td style=\"padding-left:9px\">\n" +
            "					</td>\n" +
            "					</tr>	\n" +
            "					\n" +
            "					<tr style=\"line-height:60px\">\n" +
            "                   <td style=\"background-color:white;color:black;padding-left:9px\">Total Cost:-</td>\n" +
            "                   <td style=\"background-color:white;color:black;padding-left:9px;\">"+d.totalPrice+"<span> ₹ /-</span></td>\n" +
            "					</tr>\n" +
            "				</tbody>\n" +
            "			</table>\n" +
            "					\n" +
            "					<p>Please contact us via email <a href=\"mailto:dp297609@website.com\" target=\"_blank\">flipzon@website.com</a> or phone  (007) 123 456 7890.</p>\n" +
            "					<p>Connect with us on social media: \n" +
            "				<a href=\"https://www.facebook.com\" target=\"_blank\" data-saferedirecturl=\"https://www.google.com/url?q=https://www.facebook.com&amp;source=gmail&amp;ust=1597124127911000&amp;usg=AFQjCNGI49Hpn5uDYTvqIof-bOwo6sz_Bg\"><img src=\"https://mail.google.com/mail/u/0?ui=2&amp;ik=b974c79857&amp;attid=0.1.2&amp;permmsgid=msg-f:1635663097844123044&amp;th=16b30aebdf36c5a4&amp;view=fimg&amp;sz=s0-l75-ft&amp;attbid=ANGjdJ-xJ0RQ_O5HKXKagaohsDTVz_XGa3Yvq5IVGVejyFm0cq6xaEhJoH5Msml2Ecb0aab4u7VmgkVCDf5RDbony_UKUA1yBDaPn0uie_JtpSVyseFEjGvzx5Xzvl0&amp;disp=emb\" class=\"m_5592298769751509350imgclass CToWUd\" style=\"vertical-align:bottom;height:20px;width:20px\" data-image-whitelisted=\"\" width=\"20px\" height=\"20px\"></a>&nbsp;&nbsp;\n" +
            "				<a href=\"https://www.instagram.com\" target=\"_blank\" data-saferedirecturl=\"https://www.google.com/url?q=https://www.instagram.com&amp;source=gmail&amp;ust=1597124127911000&amp;usg=AFQjCNEs6YOqHxeSA1j6gFtWk9HVFCHDeg\"><img src=\"https://mail.google.com/mail/u/0?ui=2&amp;ik=b974c79857&amp;attid=0.1.3&amp;permmsgid=msg-f:1635663097844123044&amp;th=16b30aebdf36c5a4&amp;view=fimg&amp;sz=s0-l75-ft&amp;attbid=ANGjdJ8ieOtP5p4TcZn1vVnyq-Km5Qn75hqwR5kUzXqEjKScvBCCSR7FGLmbRHYpkX5d0lzBBpJRa8PvKsJHG8MS2jrZSzsl4gWNKs-WHsbPqWOqn_dvulAuQcPjGNg&amp;disp=emb\" class=\"m_5592298769751509350imgclass CToWUd\" style=\"vertical-align:bottom;height:20px;width:20px\" data-image-whitelisted=\"\" width=\"20px\" height=\"20px\"></a>&nbsp;&nbsp; \n" +
            "				<a href=\"https://www.youtube.com\" target=\"_blank\" data-saferedirecturl=\"https://www.google.com/url?q=https://www.youtube.com&amp;source=gmail&amp;ust=1597124127911000&amp;usg=AFQjCNGPhRLjAf1VMtb7iSJ12An1YHU0pw\"><img src=\"https://mail.google.com/mail/u/0?ui=2&amp;ik=b974c79857&amp;attid=0.1.4&amp;permmsgid=msg-f:1635663097844123044&amp;th=16b30aebdf36c5a4&amp;view=fimg&amp;sz=s0-l75-ft&amp;attbid=ANGjdJ9GFLgljJILEzv3FJ0rLeuX7JKlIf9CTqKNiVnPRMIyTePmOOBOic9eyxzixT06bLRUPEZUtweSZ3yNV0o7tCfMWbVyDmhEDpLIQ33IecHG_f1Nuvl_NIspgT8&amp;disp=emb\" class=\"m_5592298769751509350imgclass CToWUd\" style=\"vertical-align:bottom;height:20px;width:20px\" data-image-whitelisted=\"\" width=\"20px\" height=\"20px\"></a>\n" +
            "				</p>\n" +
            "					<p>With regards,</p>\n" +
            "					<p style=\"margin:0px\">Founder&amp; CEO</p>\n" +
            "					<p style=\"margin:0px\">Flipzon</p>\n" +
            "					<p style=\"margin:0px\">LaNet Pvt Ltd</p>\n" +
            "					<p style=\"margin:0px\">Email: <a href=\"mailto:dp297609@gmail.com\" target=\"_blank\">dp297609@gmail.com</a></p>\n" +
            "					<p style=\"margin:0px\">Web: <a href=\"mailto:flipzon@website.com\" target=\"_blank\">flipzon@website.com</a></p>\n" +
            "					<p style=\"margin:0px\">Add:    405/406 Luxuria Business Hub,</p>\n" +
            "					<p style=\"margin:0px\"> Near VR mall, Surat - Dumas Rd, </p>\n" +
            "					<p style=\"margin:0px\">Surat, Gujarat 395007</p><div class=\"yj6qo\"></div><div class=\"adL\">\n" +
            "				</div></div>"
            + "</div>"
            + "</div></div></div></div><div class=\"gA gt acV\"><div class=\"gB xu\"><table id=\":2u\" role=\"presentation\" class=\"cf gz ac0\" cellpadding=\"0\"><tbody><tr></tr></table></body></html>";
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
    getAllOrders
}