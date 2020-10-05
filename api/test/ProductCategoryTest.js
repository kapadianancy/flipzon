const chai = require('chai');
const chatHttp = require("chai-http");
const app = require("../app")
let should = chai.should();
chai.use(chatHttp);

let token = null;

it("it should login an admin user", (done) => {
    chai.request(app)
      .post("/admin/login")
      .set("Authorization", token)
      .send({ email: "admin@gmail.com", password: "admin123" })
      .end( (err, res) => {
        if(err) console.log(err.message);
        res.should.have.status(200);
        res.body.should.have.property("token");
        token = res.body.token;
        done();
      })
  });
  it("it should not login an admin user with invalid credentials", (done) => {
    chai.request(app)
      .post("/admin/login")
      .set("Authorization", token)
      .send({ email: "admin@gmail.com", password: "admin123" })
      .end( (err, res) => {
        if(err) console.log(err.message);
        res.should.have.status(401);
        done();
      })
  });


describe('/GET product Category', () => {
  it('it should GET all the Category', (done) => {
    chai.request(app)
        .get('/admin/product_categories')
        .set("Authorization", token)
        .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('array');
              res.body.length.should.be.eql(0);
          done();
        });
  });
});
describe('/POST product Category', () => {
    it('it should  POST a product Category', (done) => {
        let prod = {
            id:'1',
            name:'myNew',
            image:'/public/images/image-1601618643157-655485201.png',
            isDeleted:0,
            created_at: "2020-09-19T06:14:02.786Z",
            updated_at: "2020-09-19T06:14:02.786Z"
        }
      chai.request(app)
          .post('/admin/product_categories')
          .set("Authorization", token)
          .send(prod)
          .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
            done();
          });
    });
  });
describe('/PUT product Category',() => {
  it('it should  PUT a product Category', (done) => {
      let prod = {
          id:'1',
          name:'myNew123',
          image:'/public/images/image-1601618643157-655485201.png',
          isDeleted:1,
          created_at: "2020-09-19T06:14:02.786Z",
          updated_at: "2020-09-19T06:14:02.786Z"
      }
    chai.request(app)
        .put('/admin/product_categories/1')
        .set("Authorization", token)
        .send(prod)
        .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('object');
          done();
        });
  });
});
describe('/Delete product Category',() => {
  it('it should  Delete a product Category', (done) => {
      let prod = {
          id:'1',
          name:'myNew123',
          image:'/public/images/image-1601618643157-655485201.png',
          isDeleted:1,
          created_at: "2020-09-19T06:14:02.786Z",
          updated_at: "2020-09-19T06:14:02.786Z"
      }
    chai.request(app)
        .put('/admin/categories/1')
        .set("Authorization", token)
        .send(prod)
        .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('object');
          done();
        });
    });
});
     