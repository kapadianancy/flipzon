const chai = require('chai');
const chatHttp = require("chai-http");
const app = require("../app")
let should = chai.should();
chai.use(chatHttp);

<<<<<<< HEAD
=======
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
describe('/GET product wise Category count', () => {
    it('it should GET product wise Category count', (done) => {
      chai.request(app)
          .get('/admin/dashboardProduct')
          .end((err, res) => {
                res.should.have.status(200);
            done();
          });
    });
  });