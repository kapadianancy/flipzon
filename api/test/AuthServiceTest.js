const chai = require('chai');
const chatHttp = require("chai-http");
const app = require("../app")
let should = chai.should();
chai.use(chatHttp);

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