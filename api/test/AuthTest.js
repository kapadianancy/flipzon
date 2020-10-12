const chai = require('chai');
const chatHttp = require("chai-http");
const app = require("../app");
let should = chai.should();
chai.use(chatHttp);
let token = null;

// describe("admin authentications", () => {
//     it("it should register an admin user", (done) => {
//       chai.request(app)
//         .post("/admin/register")
//         .send({ username: 'Amy Trella', email: 'amy.trella@gmail.com', password: "trella1234"})
//         .end( (err, res) => {
//           if(err) console.log(err.message);
//           res.should.have.status(200);
//           done();
//         })
//     });
//     it("it should not register an admin with same username/email", (done) => {
//       chai.request(app)
//         .post("/admin/register")
//         .send({ username: 'Amy Trella', email: 'amy.trella@gmail.com', password: "trella1234"})
//         .end( (err, res) => {
//           if(err) console.log(err.message);
//           res.should.have.status(422);
//           done();
//         })
//     });
//     it("it should login an admin user", (done) => {
//       chai.request(app)
//         .post("/admin/login")
//         .send({ email: "amy.trella@gmail.com", password: "trella1234" })
//         .end( (err, res) => {
//           if(err) console.log(err.message);
//           res.should.have.status(200);
//           res.body.should.have.property("token");
//           token = res.body.token;
//           done();
//         })
//     });
//     it("it should not login an admin user with invalid credentials", (done) => {
//       chai.request(app)
//         .post("/admin/login")
//         .send({ email: "amy.trella@gmail.com", password: "trella234" })
//         .end( (err, res) => {
//           if(err) console.log(err.message);
//           res.should.have.status(401);
//           done();
//         })
//     });
//     it("it should return user profile", (done) => {
//       chai.request(app)
//         .get("/admin/me")
//         .set("Authorization", token)
//         .then( res => {
//           res.should.have.status(200);
//           res.body.should.have.property("username");
//         })
//         .catch( err => {
//           console.log(err.message)
//         });
//         done();
//         // .end( (err, res) => {
//         //   if(err) console.log(err.message);
//         //   done();
//         // })
//     });
//     it("it should not return user profile without auth token", (done) => {
//       chai.request(app)
//         .get("/admin/me")
//         .then( res => {
//           res.should.have.status(401);
//         })
//         .catch( err => {
//           console.log(err.message)
//         })
//         done();
//     });
//     it("it should update profile of user", (done) => {
//       chai.request(app)
//         .post("/admin/updateProfile")
//         .set("Authorization", token)
//         .send({ username: "Steve Jobs", password: "steve1234" })
//         .end( (err, res) => {
//           if(err) console.log(err.message);
//           res.should.have.status(200);
//           res.body.should.have.property("message");
//           done();
//         })
//     })
// });