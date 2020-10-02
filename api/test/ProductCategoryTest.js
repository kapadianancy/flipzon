//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

let productCategory = require('../models/Product_category')
//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();


chai.use(chaiHttp);

  describe('/POST product', () => {
    it('it should  POST a product', (done) => {
        let prod = {
            id:'49',
            name:'myNew123',
            image:'/public/images/image-1601618643157-655485201.png',
            isDeleted:0,
            created_at: "2020-09-19T06:14:02.786Z",
            updated_at: "2020-09-19T06:14:02.786Z"
        }
      chai.request(server)
          .post('/admin/product_categories')
          .set(auth)
          .send(prod)
          .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                // res.body.should.have.property('errors');
                // res.body.errors.should.have.property('image');
                // res.body.errors.image.should.have.property('kind').eql('required');
            done();
          });
    });
  });
    describe('/PUT product', () => {
      it('it should  PUT a product', (done) => {
          let prod = {
              id:'48',
              name:'myNew123',
              image:'/public/images/image-1601618643157-655485201.png',
              isDeleted:1,
              created_at: "2020-09-19T06:14:02.786Z",
              updated_at: "2020-09-19T06:14:02.786Z"
          }
        chai.request(server)
            .put('/admin/product_categories/48')
            .send(prod)
            .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('object');
                  // res.body.should.have.property('errors');
                  // res.body.errors.should.have.property('image');
                  // res.body.errors.image.should.have.property('kind').eql('required');
              done();
            });
      });
    });
     