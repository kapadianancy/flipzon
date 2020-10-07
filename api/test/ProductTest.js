const chai = require('chai');
const chatHttp = require("chai-http");
const app = require("../app")
let should = chai.should();
chai.use(chatHttp);
let token = null;

describe("admin authentications", () => {
    it("it should login an admin user", (done) => {
      chai.request(app)
        .post("/admin/login")
        .send({ email: "john.doe@gmail.com", password: "john1234" })
        .end( (err, res) => {
          if(err) console.log(err.message);
          res.should.have.status(200);
          res.body.should.have.property("token");
          token = res.body.token;
          done();
        })
    });
});
describe("product management", () => {
    it("it should add category", (done) => {
        chai.request(app)
        .post("/admin/product_categories")
        .set("Authorization", token)
        .type('form')
        .field("name", "temp")
        .attach("image", "C:/Users/BHAVIK/Downloads/christina-wocintechchat-com-SqmaKDvcIso-unsplash.jpg", "test.jpg")
        .end( (err, res) => {
            if(err) console.error(err.message);
            res.should.have.status(200);
            done();
        });
    })
    it("it should add product", (done) => {
        chai.request(app)
            .post("/admin/products")
            .set("Authorization", token)
            .type("form")
            .field("name", "temp product")
            .field("price", 1500)
            .field("stock", 10)
            .field("categoryId", 1)
            .field("description", "asdfasdfasdsf")
            .attach("image", "C:/Users/BHAVIK/Downloads/christina-wocintechchat-com-SqmaKDvcIso-unsplash.jpg", "test.jpg")
            .end( (err, res) => {
                if(err) console.error(err.message);
                res.should.have.status(200);
                done();
            });
    })
    it("it should return list of products", (done) => {
        chai.request(app)
        .get("/admin/products")
        .set("Authorization", token)
        .end( (err, res) => {
            if(err) console.error(err.message);
            res.should.have.status(200);
            done();
        });
    })
})