const chai = require('chai');
const chatHttp = require("chai-http");
const app = require("../app")
let should = chai.should();
chai.use(chatHttp);
let token = null;

describe("register necessary roles", () => {
  it("it should add an admin role", (done) => {
    chai.request(app)
      .post("/admin/role")
      .send({ name: "admin" })
      .end( (err, res) => {
          res.should.have.status(200);
          done();
      })
  });
  it("it should add an user role", (done) => {
    chai.request(app)
      .post("/admin/role")
      .send({ name: "user" })
      .end( (err, res) => {
          res.should.have.status(200);
          done();
      })
  });
  it("it should login an admin user", (done) => {
    chai.request(app)
      .post("/admin/login")
      .send({ email: "amy.trella@gmail.com", password: "trella1234" })
      .end( (err, res) => {
        if(err) console.log(err.message);
        res.should.have.status(200);
        res.body.should.have.property("token");
        token = res.body.token;
        done();
      })
  });
});
describe("register an user", () => {
  it("it should register an user", (done) => {
    chai.request(app)
      .post("/admin/register")
      .send({ username: 'Amy Trella', email: 'amy.trella@gmail.com', password: "trella1234"})
      .end( (err, res) => {
        res.should.have.status(200);
        done();
      })
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
    it('it should Not POST a product Category Name is Required', (done) => {
        let prod = {
            id:'1',
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
                res.should.have.status(500);
                res.body.should.have.property("name");
                res.body.should.be.a('object');
            done();
          });
    });
    it('it should Not POST a product Category image is Required', (done) => {
        let prod = {
            id:'1',
            name:'myNew',
            isDeleted:0,
            created_at: "2020-09-19T06:14:02.786Z",
            updated_at: "2020-09-19T06:14:02.786Z"
        }
      chai.request(app)
          .post('/admin/product_categories')
          .set("Authorization", token)
          .send(prod)
          .end((err, res) => {
                res.should.have.status(500);
                res.body.should.have.property("image");
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

describe('/GET product wise Category count', () => {
    it('it should GET product wise Category count', (done) => {
      chai.request(app)
          .get('/admin/dashboardProduct')
          .set("Authorization", token)
          .end((err, res) => {
                res.should.have.status(200);
            done();
          });
    });
  });

describe('/GET All Orders Details', () => {
  it('it should GET all the Orders Details', (done) => {
    chai.request(app)
        .get('/admin/allorders/1')
        .set("Authorization", token)
        .end((err, res) => {
              res.should.have.status(200);
          done();
        });
  });
});
describe('/PUT Order Status Update',() => {
  it('it should PUT a Order Status', (done) => {
      let orders = {
            "id": 1,
            "userId": 1,
            "orderDate": "2020-09-25T00:00:00.000Z",
            "totalPrice": 19999,
            "status": "Completed Delivery",
            "isDeleted": false,
            "createdAt": null,
            "updatedAt": "2020-09-28T09:13:17.000Z",
      }
    chai.request(app)
        .put('/admin/orders/1')
        .set("Authorization", token)
        .send(orders)
        .end((err, res) => {
              res.should.have.status(200);
          done();
        });
  });
});
