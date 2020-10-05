const chai = require('chai');
const chatHttp = require("chai-http");
const app = require("../app")
let should = chai.should();
chai.use(chatHttp);
let token = null;

it("it should login an admin user", (done) => {
    chai.request(app)
      .post("/admin/login")
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
      .send({ email: "admin@gmail.com", password: "admin123" })
      .end( (err, res) => {
        if(err) console.log(err.message);
        res.should.have.status(401);
        done();
      })
  });

describe('/GET orders', () => {
  it('it should GET Order', (done) => {
    chai.request(app)
        .get('/admin/orders')
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
     