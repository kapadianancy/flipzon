const main=require('../../models/main');

exports.placeOrder = async (req,res) => {
    try {
        //const data=req.body;
        const order=await main.Order.create({
            userId:req.validUser.id,
            orderDate:Date.now(),
            totalPrice:0,
            status : 'Pending'
        });
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
           orderId : data.orderId,
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

exports.orderUpdate = async(req,res) => {
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
          id: orderid.id
        }
      });

      res.status(201).send("Successful Updated");
    }
    catch(error)
    {
        res.status(400).send(error);
    }
}

const getTotalCost = async (orderId) =>
{
    const orderDetail=await main.Order_details.findAll({
        where:
        {
            orderId:orderId
        }
    });

    let price = 0;
    orderDetail.forEach(od => {
        price += od.price
    });

    return price;
}