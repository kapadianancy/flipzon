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
          if(err) { console.log(err.message); }
          res.should.have.status(200);
          done();
      })
  });
});
describe("admin authentications", () => {
  it("it should register an admin user", (done) => {
    chai.request(app)
      .post("/admin/register")
      .send({ username: 'Amy Trella', email: 'amy.trella@gmail.com', password: "trella1234"})
      .end( (err, res) => {
        if(err) console.log(err.message);
        res.should.have.status(200);
        done();
      })
  });
  it("it should not register an admin with same username/email", (done) => {
    chai.request(app)
      .post("/admin/register")
      .send({ username: 'Amy Trella', email: 'amy.trella@gmail.com', password: "trella1234"})
      .end( (err, res) => {
        if(err) console.log(err.message);
        res.should.have.status(422);
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
  it("it should not login an admin user with invalid credentials", (done) => {
    chai.request(app)
      .post("/admin/login")
      .send({ email: "amy.trella@gmail.com", password: "trella234" })
      .end( (err, res) => {
        if(err) console.log(err.message);
        res.should.have.status(401);
        done();
      })
  });
  it("it should return user profile", (done) => {
    chai.request(app)
      .get("/admin/me")
      .set("Authorization", token)
      .then( res => {
        res.should.have.status(200);
        res.body.should.have.property("username");
      })
      .catch( err => {
        console.log(err.message)
      });
      done();
      // .end( (err, res) => {
      //   if(err) console.log(err.message);
      //   done();
      // })
  });
  it("it should not return user profile without auth token", (done) => {
    chai.request(app)
      .get("/admin/me")
      .then( res => {
        res.should.have.status(401);
      })
      .catch( err => {
        console.log(err.message)
      })
      done();
  });
  it("it should update profile of user", (done) => {
    chai.request(app)
      .post("/admin/updateProfile")
      .set("Authorization", token)
      .send({ username: "Steve Jobs", password: "steve1234" })
      .end( (err, res) => {
        if(err) console.log(err.message);
        res.should.have.status(200);
        res.body.should.have.property("message");
        done();
      })
  })
});
describe("product management", () => {
  it("it should add category", (done) => {
    chai.request(app)
      .post("/admin/product_categories")
      .set("Authorization", token)
      .type('form')
      .field("name", "temp")
      .attach("image", "C:/Users/BHAVIK/Downloads/christina-wocintechchat-com-SqmaKDvcIso-unsplash.jpg", "test.jpg")
      // .send({ "name":"temp" })
      .then( res => {
        res.should.have.status(200);
      })
      .catch( err => {
        console.log(err.message);
      });
      done();
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
      .then( res => {
        res.should.have.status(200);
      })
      .catch( err => {
        console.log(err.message)
      });
      done();
  })
  it("it should return list of products", (done) => {
    chai.request(app)
      .get("/admin/products")
      .set("Authorization", token)
      .end( (err, res) => {
        if(err) console.error(err.message);
        console.log(res);
        //res.should.have.status(200);
        done();
      });
  })
})