var nodemailer = require('nodemailer');

const { sequelize } = require('../../db/db');
var nodemailer = require('nodemailer');
const main = require('../../models/main');

exports.checkOrder = async (req, res) => {
    let oid;
    try {
        //console.log(req.body.userId);
        const order = await main.Order.findOne({
            where:
            {
                userId: req.body.userId,
                status: "Pending",
                isDeleted: 0
            }
        })

        if (order) {
            oid = order.id;
            req.orderId = oid;
            await this.addOrderItems(req, res);
        }
        else {
            await this.placeOrder(req, res);

        }
        //return res.status(200).send("added to cart");

    } catch (err) {
        return res.status(400).send("bad request");
    }
}

exports.placeOrder = async (req, res) => {
    try {
        //const data=req.body;
        const order = await main.Order.create({
            userId: req.body.userId,
            orderDate: Date.now(),
            totalPrice: 0,
            status: 'Pending',
            mode: '',
            payment_status: 'Pending'
        });
        oid = order.id;
        req.orderId = oid;
        await this.addOrderItems(req, res);
        // res.status(201).send(order);
    }
    catch (error) {
        return res.status(400).send(error);
    }
}

exports.addOrderItems = async (req, res) => {
    try {
        const data = req.body;

        //find Product Price
        const p = await main.product.findByPk(data.productId);
        if (!p) {
            return res.status(401).send("Product Not Found")
        }
        const price = (p.price) - (p.price * p.discount / 100);

        const temp = await main.Order_details.findAll({
            where: {
                orderId: req.orderId,
                productId: data.productId,
                isDeleted: 0
            }
        })
        let orderItem;
        if (temp.length > 0) {

            orderItem = await main.Order_details.update(
                {
                    quantity: temp[0].quantity + data.quantity
                },
                {
                    where: {
                        id: temp[0].id
                    }
                })
        }

        else {
            //Add Details of OrderItem
            orderItem = await main.Order_details.create({
                orderId: req.orderId,
                productId: data.productId,
                quantity: data.quantity,
                price: price * data.quantity
            });
        }
        //Decrement Product Quantity
        if (orderItem) {
            const pro = await main.product.update({ stock: p.stock - data.quantity }, {
                where: {
                    id: data.productId
                }
            });
        }
        //console.log(orderItem);
        res.status(201).send({ "orderItem": orderItem });
    }
    catch (error) {
        return res.status(400).send(error);
    }
}

exports.updateOrder = async (req, res) => {
    try {
        const data = req.body;
        //find Product Price
        const p = await main.product.findByPk(data.productId);
        if (!p) {
            return res.status(401).send("Product Not Found")
        }

        const temp = await main.Order_details.findOne({
            where: {
                id: data.id,
                productId: data.productId
            }
        })
        //Increment Product Quantity
        const pro = await main.product.update({ stock: p.stock + temp.quantity }, {
            where: {
                id: data.productId
            }
        });
        if (pro) {
            orderItem = await main.Order_details.update(
                {
                    quantity: data.quantity
                },
                {
                    where: {
                        id: data.id
                    }
                })

            //Decrement Product Quantity
            const p1 = await main.product.findByPk(data.productId);
            if (orderItem) {
                const pro = await main.product.update({ stock: p1.stock - data.quantity }, {
                    where: {
                        id: data.productId
                    }
                });
            }

            res.status(201).send("Order Updated")
        }
        else {
            res.status(401).send("Not Updated")
        }

    }
    catch (error) {
        res.status(400).send(error);
    }
}


const sendMail = async function (email) {
    let status = "";
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'nidhinancy0921@gmail.com',
            pass: 'nidhi0921nancy'
        }
    });

    var randomstring = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < 5; i++) {
        randomstring += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    const password = await gethash(randomstring);
    const User = await main.User.update({
        "password": password
    }, {
        where: {
            email: email
        }
    });

    var mailOptions = {
        from: 'nidhinancy0921@gmail.com',
        to: email,
        subject: 'Forget Password From Flipzon',
        text: 'New Password : ' + randomstring
    };

    let sendmail = await transporter.sendMail(mailOptions);

    return sendmail;


}

exports.confirmOrder = async (req, res) => {
    try {
        const orderid = await main.Order.findByPk(req.params.id);
        if (!orderid) {
            return res.status(400).send("Order is Not Found")
        }
        const total_price = await getTotalCost(orderid.id);
        const data = req.body;
        const Order = await main.Order.update({
            "orderDate": Date.now(),
            "totalPrice": total_price,
            "status": "Confirm",
            "mode": data.mode,
            "payment_status": data.payment_status
        }, {
            where: {
                id: orderid.id,
                isDeleted: 0
            }
        });

        const count = await main.Order_details.findAll({
            where: {
                orderId: orderid.id,
                isDeleted: 0
            }
        })
        let c = 0;
        await count.forEach(e => {
            c = c + 1;
        })
        //send email to user for confirmation
        if (Order) {
            var transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'nidhinancy0921@gmail.com',
                    pass: 'nidhi0921nancy'
                }
            });
            const order_detail_link = 'http://localhost:3000/vieworderdetails/' + orderid.id;
            const msg = '<html><body><b>Your Order id ' + orderid.id + ' is Confirmed ...</b><br/>Total Order Item :' + c + '<br /> <h2>Total Cost : ' + total_price + '</h2><a href="' + order_detail_link + '">View Order Details</a></body></html>';

            var mailOptions = {
                from: 'nidhinancy0921@gmail.com',
                to: req.validUser.email,
                subject: 'Confirm order from Flipzon',
                text: 'Order Confirm',
                html: msg
            };

            await transporter.sendMail(mailOptions);

        }
        res.status(200).send("Order Placed");
    }
    catch (error) {
        res.status(400).send(error);
    }
}



exports.cancelOrder = async (req, res) => {
    try {
        const orderid = await main.Order.findByPk(req.params.id);
        if (!orderid) {
            return res.status(400).send("Order is Not Found")
        }

        //delete orderitem 

        const orderitems = await main.Order_details.findAll({
            where: {
                orderId: orderid.id,
                isDeleted: 0
            }
        });

        if (orderitems) {
            orderitems.forEach(async (o) => {
                //find Product Price
                const p = await main.product.findByPk(o.productId);

                //Add Details of OrderItem
                const orderItem = await main.Order_details.update({
                    "isDeleted": 1
                }, {
                    where: {
                        id: o.id,
                        isDeleted: 0
                    }
                });

                //Increment Product Quantity
                if (orderItem) {
                    const pro = await main.product.update({ stock: p.stock + o.quantity }, {
                        where: {
                            id: o.productId
                        }
                    });
                }
            })
        }

        // Delete Order 
        const Order = await main.Order.update({
            "status": "Cancel",
            "isDeleted": 1
        }, {
            where: {
                id: orderid.id,
                isDeleted: 0
            }
        });

        res.status(201).send("Successfully Order Deleted");
    }
    catch (e) {
        return res.status(400).send(e);
    }
}
exports.cancelOrderItem = async (req, res) => {
    try {
        const item = await main.Order_details.findOne({
            where:
            {
                id: req.params.id
            }
        });

        //find Product Price
        const p = await main.product.findByPk(item.productId);
        if (!p) {
            return res.status(401).send("Product Not Found")
        }

        //Add Details of OrderItem
        const orderItem = await main.Order_details.update({
            "isDeleted": 1
        }, {
            where: {
                id: req.params.id,
                isDeleted: 0
            }
        });

        //Increment Product Quantity
        if (orderItem) {
            const pro = await main.product.update({ stock: p.stock + item.quantity }, {
                where: {
                    id: item.productId
                }
            });
        }
        res.status(201).send("Successfully Deleted");
    }
    catch (e) {
        return res.status(400).send(e);
    }
}

const getTotalCost = async (orderId) => {
    const orderDetail = await main.Order_details.findAll({
        where:
        {
            orderId: orderId,
            isDeleted: 0
        }
    });

    let price = 0;
    orderDetail.forEach(od => {
        price += od.price*od.quantity
    });

    return price;
}

exports.orderedProducts = async (req, res) => {
    try {

        const o = await sequelize.query("select p.*,count(o.id) as count from products p , order_details o where p.id=o.productId and isDeleted=0 GROUP BY o.productId having count >= 1");
        // res.status(200).send({"count":o[0]});

        res.status(200).send(o[0]);


    } catch (err) {
        return res.status(400).send(err);
    }
}

exports.viewOrder = async (req, res) => {
    try {
        const o = await main.Order.findAll({
            where: {
                userId: req.validUser.id
            }

        });

        if (o.length != 0) {
            const oi = await main.Order_details.findAll({
                where: {
                    orderId: o[0].id
                }

            });
            res.status(200).send({ "orders": o });
        }
        else {
            res.status(401).send("No Orders Yet");
        }

    } catch (err) {
        res.status(400).send(err);
    }
}

exports.viewOrderCart = async (req, res) => {
    try {
        let uid = req.params.uid;
        //console.log("----uid-----"+req.params.uid);
        const o = await sequelize.query("SELECT od.*,p.name,p.main_image,p.stock,od.price FROM orders o,products p,order_details od where o.id=od.orderId and od.productId=p.id and o.status='Pending' and od.isDeleted=0 and o.userId='" + uid + "'");

        res.status(200).send(o[0]);
    } catch (err) {
        res.status(400).send(err);
    }
}

exports.viewOrderDetails = async (req, res) => {
    try {
        const o = await sequelize.query("SELECT od.*,p.name,p.main_image,od.price FROM orders o,products p,order_details od where o.id=od.orderId and od.productId=p.id and o.id=" + req.params.oid + " and od.isDeleted=0");

        res.status(200).send(o[0]);
    } catch (err) {
        res.status(400).send(err);
    }
}

exports.updateUserId = async (req, res) => {
    try {
        const result = await main.Order.update({ userId: req.validUser.id }, {
            where: {
                userId: req.params.uid
            }
        });
        res.status(200).send(result);
    }
    catch (err) {
        res.status(400).send(err);
    }
}

exports.sendOTP = async (req, res) => {
    try {
        const email = req.validUser.email;
        const user = await main.User.findOne(
            {
                where:
                {
                    "email": email,
                    isDeleted: 0
                }
            });
            

        if (!user) {
            return res.status(401).send("User Not Found");
        }
       
        const result = await sendOTPMail(email);
        if (result) {
            return res.status(200).send(result);
        }
        else {
            return res.status(400).send("Error");
        }
    }
    catch (err) {
        res.status(400).send(err);
    }
}

const sendOTPMail = async function (email) {
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'nidhinancy0921@gmail.com',
            pass: 'nidhi0921nancy'
        }
    });

    var randomstring = '';
    var characters = '0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i <= 5; i++) {
        randomstring += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    const User = await main.User.findOne({
        where: {
            email: email
        }
    })

    let msg = '<html><body>Your One Time Password Is : <b>' + randomstring + '</b></body></htm>';
    var mailOptions = {
        from: 'nidhinancy0921@gmail.com',
        to: email,
        subject: 'OTP From Flipzon',
        text: 'OTP From Flipzon',
        html: msg
    };

    let sendmail = await transporter.sendMail(mailOptions);

    return randomstring;


}

