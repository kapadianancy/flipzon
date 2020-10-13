const chai = require('chai');
const chatHttp = require("chai-http");
const app = require("../app")
let should = chai.should();
chai.use(chatHttp);
<<<<<<< HEAD
=======
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
  // it("it should not login an admin user with invalid credentials", (done) => {
  //   chai.request(app)
  //     .post("/admin/login")
  //     .send({ email: "admin@gmail.com", password: "admin123" })
  //     .end( (err, res) => {
  //       if(err) console.log(err.message);
  //       res.should.have.status(401);
  //       done();
  //     })
  // });
>>>>>>> 68bf4c97a4e13e89215312a08b3c7aa27ab41676

describe('/GET orders', () => {
  it('it should GET Order', (done) => {
    chai.request(app)
        .get('/admin/orders')
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
          .end((err, res) => {
                res.should.have.status(200);
            done();
          });
    });
  });