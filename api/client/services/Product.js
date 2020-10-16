const main = require("../../models/main");
const Sequelize = require("sequelize");
const { sequelize } = require("../../db/db");
const Op = Sequelize.Op;
const $or = Op.or;

exports.getAllCategory = async (req, res) => {
  try {
    const c = await main.Product_category.findAll({
      where: {
        isDeleted: 0,
      },
    });
    res.status(200).send(c);
  } catch (err) {
    return res.status(400).send(err);
  }
};

exports.getAllSubCategory = async (req, res) => {
  try {
    const c = await sequelize.query(
      "select * from product_categories where parent!=id"
    );
    res.status(200).send(c[0]);
  } catch (err) {
    return res.status(400).send(err);
  }
};

exports.getAllProduct = async (req, res) => {
  try {
    const p = await main.product.findAll({
      where: {
        isDeleted: 0,
      },
    });
    const img = await main.Product_image.findAll();
    res.status(200).send({ products: p, images: img });
  } catch (err) {
    res.status(400).send(err);
  }
};

exports.getCategoryProduct = async (req, res) => {
  try {
    let cid = req.params.cid;
    const p = await main.product.findAll({
      where: {
        categoryId: cid,
      },
    });

    res.status(200).send(p);
  } catch (err) {
    res.status(400).send(err);
  }
};

exports.getOfferProduct = async (req, res) => {
  try {
    const p = await main.product.findAll({
      where: {
        isInOffer: 1,
      },
      order: [["discount", "DESC"]],
    });

    res.status(200).send(p);
  } catch (err) {
    res.status(400).send(err);
  }
};

exports.getProductById = async (req, res) => {
  try {
    let pid = req.params.pid;
    const p = await main.product.findOne({
      where: {
        id: pid,
      },
    });

    const i = await main.Product_image.findAll({
      where: {
        productId: p.id,
        isDeleted: 0,
      },
    });

    res.status(200).send({ product: p, images: i });
  } catch (err) {
    res.status(400).send(err);
  }
};

exports.searchProducts = async (req, res) => {
  try {
    let strong = req.query.strong ? true : false;
    let wordsArr = req.params.pro.toLowerCase().split(" ");
    let qry = wordsArr.map((word) => ({ [Op.like]: `%${word}%` }));
    let products = await main.product.findAll({
      where: {
        name: {
          [strong ? Op.and : Op.or]: qry,
        },
        isDeleted: false,
      },
      include: [
        {
          model: main.Product_category,
          as: "Product_category",
          attributes: ["name"],
        },
      ],
    });
    res.status(200).send(products);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};

exports.addReviews = async (req, res) => {
  try {
    const data = req.body;
    const review = await main.Review.create({
      review: data.review,
      rating: data.rating,
      userId: req.validUser.id,
      productId: data.productId,
    });
    res.status(201).send(review);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.reviews = async (req, res) => {
  try {
    let pid = req.params.pid;
    const p = await main.Review.findAll({
      where: {
        productId: pid,
      },
    });
    res.status(200).send(p);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.categoryMenu = async (req, res) => {
  try {
    const cid = req.params.cid;
    const cat = await sequelize.query("select * from product_categories where id!="+cid+" and parent="+cid);
    res.status(200).send(cat[0]);
  } catch (error) {
    res.status(400).send(error);
  }
};
