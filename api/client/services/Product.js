const main=require('../../models/main');

exports.getAllCategory=async(req,res)=>
{
    try{
        const c=await main.Product_category.findAll({
            where : {
                isDeleted :0
            }
        });
        res.status(200).send(c);

    }catch(err)
    {
        return res.status(400).send(err);
    }
}

exports.getAllProduct=async(req,res)=>
{
    try{
        const p=await main.product.findAll({
            where : {
                isDeleted :0
            }
            
        });
        const img=await main.Product_image.findAll();
        res.status(200).send({"products":p,"images":img});

    }catch(err)
    {
        res.status(400).send(err);
    }
}