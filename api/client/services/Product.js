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

exports.getCategoryProduct=async(req,res)=>
{
    try{
        let cid=req.params.cid;
        const p=await main.product.findAll({
            where:{
                categoryId:cid
            }
        });

        res.status(200).send(p);
    }catch(err)
    {
        res.status(400).send(err);
    }
    

}


exports.getProductById=async(req,res)=>
{
    try{
        let pid=req.params.pid;
        const p=await main.product.findOne({
            where:{
                id:pid
            }
        });

        const i=await main.Product_image.findAll({
            where:{
                productId:p.id,
                isDeleted : 0
            }
        });

        res.status(200).send({"product":p,"images":i});
    }catch(err)
    {
        res.status(400).send(err);
    }
    

}