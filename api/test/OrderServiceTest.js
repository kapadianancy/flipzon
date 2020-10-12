const chai = require('chai');
const chatHttp = require("chai-http");
const app = require("../app")
let should = chai.should();
chai.use(chatHttp);

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