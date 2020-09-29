
const { sequelize } = require('../../db/db');
const main=require('../../models/main');

exports.checkOrder=async(req,res)=>
{
    let oid;
    try{

        const order=await main.Order.findOne({
            where:
            {
                userId:req.validUser.id,
                status:"Pending",
                isDeleted : 0
            }
        })
        if(order)
        {
            oid=order.id;
            req.orderId=oid;
            this.addOrderItems(req,res);
        }
        else{
            this.placeOrder(req,res);

        }
    }catch(err)
    {
        return res.status(400).send("bad request");
    }
}

exports.placeOrder = async (req,res) => {
    try {
        //const data=req.body;
        const order=await main.Order.create({
            userId:req.validUser.id,
            orderDate:Date.now(),
            totalPrice:0,
            status : 'Pending'
        });
        oid=order.id;
        req.orderId=oid;
        this.addOrderItems(req,res);
        res.status(201).send(order);
    }
    catch(error)
    {
        return res.status(400).send(error);
    }
}

exports.addOrderItems = async (req,res) => {
    try {
        const data=req.body;

        //find Product Price
        const p = await main.product.findByPk(data.productId);
        if(!p)
        {
            return res.status(401).send("Product Not Found")
        }
        const price = p.price;

        //Add Details of OrderItem
        const orderItem=await main.Order_details.create({
           orderId : req.orderId,
           productId : data.productId,
           quantity : data.quantity,
           price : price*data.quantity
        });

        //Decrement Product Quantity
        if(orderItem)
        {
          const pro = await main.product.update({ stock: p.stock-data.quantity}, {
                where: {
                  id: data.productId
                }
              });
        }
        res.status(201).send({"orderItem" : orderItem});
    }
    catch(error)
    {
        return res.status(400).send(error);
    }
}

exports.confirmOrder = async(req,res) => {
    try{
    const orderid = await main.Order.findByPk(req.params.id);
    if(!orderid)
    {
        return res.status(400).send("Order is Not Found")
    }
    const total_price = await getTotalCost(orderid.id);

    const Order = await main.Order.update( {
        "orderDate" : Date.now(),
        "totalPrice" : total_price,
        "status" : "confirm"
    } , {
        where: {
          id: orderid.id,
          isDeleted : 0
        }
      });

      res.status(201).send("Successful Updated");
    }
    catch(error)
    {
        res.status(400).send(error);
    }
}

exports.cancelOrder=async(req,res)=>
{
    try{
        const orderid = await main.Order.findByPk(req.params.id);
            if(!orderid)
            {
                return res.status(400).send("Order is Not Found")
            }

            //delete orderitem 

            const orderitems = await main.Order_details.findAll({
                where : {
                    orderId : orderid.id,
                    isDeleted : 0
                }
            });

            if(orderitems)
            {
            orderitems.forEach (async (o) => {
                //find Product Price
                const p = await main.product.findByPk(o.productId);
            
                //Add Details of OrderItem
                const orderItem=await main.Order_details.update( {
                    "isDeleted" : 1
                } , {
                where: {
                    id: o.id,
                    isDeleted : 0
                }
                }); 

                //Increment Product Quantity
                if(orderItem)
                {
                const pro = await main.product.update({ stock: p.stock+o.quantity}, {
                        where: {
                        id: o.productId
                        }
                    });
                }
            })
        }
            
           // Delete Order 
            const Order = await main.Order.update( {
                "status" : "cancel",
                "isDeleted" : 1
            } , {
            where: {
                id: orderid.id,
                isDeleted : 0
            }
            }); 

            res.status(201).send("Successfully Order Deleted");
        }
    catch(e)
    {
        return res.status(400).send(e);
    }
}
exports.cancelOrderItem=async(req,res)=>
{
    try{
        const item = await main.Order_details.findOne({
            where:
            {
                id : req.params.id
            }
        });

        //find Product Price
        const p = await main.product.findByPk(item.productId);
        if(!p)
        {
            return res.status(401).send("Product Not Found")
        }
       
        //Add Details of OrderItem
        const orderItem=await main.Order_details.update( {
            "isDeleted" : 1
        } , {
        where: {
            id: req.params.id,
            isDeleted : 0
        }
        }); 

        //Increment Product Quantity
        if(orderItem)
        {
          const pro = await main.product.update({ stock: p.stock+item.quantity}, {
                where: {
                  id: item.productId
                }
              });
        }
        res.status(201).send("Successfully Deleted");
    }
    catch(e)
    {
        return res.status(400).send(e);
    }
}

const getTotalCost = async (orderId) =>
{
    const orderDetail=await main.Order_details.findAll({
        where:
        {
            orderId:orderId,
            isDeleted : 0
        }
    });

    let price = 0;
    orderDetail.forEach(od => {
        price += od.price
    });

    return price;
}

exports.orderedProducts=async(req,res)=>
{
    try{
        
        const o=await sequelize.query("select p.*,count(o.id) as count from products p , order_details o where p.id=o.productId GROUP BY o.productId having count >= 1");
       // res.status(200).send({"count":o[0]});
       
        res.status(200).send(o[0]);
        
        
    }catch(err)
    {
        return res.status(400).send(err);
    }
}