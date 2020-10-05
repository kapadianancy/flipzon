// const chai = require('chai');
// const chatHttp = require("chai-http");
// const app = require("../app")
// let should = chai.should();
// chai.use(chatHttp);

// describe('/GET product Category', () => {
//   it('it should GET all the Category', (done) => {
//     chai.request(app)
//         .get('/admin/product_categories')
//         .end((err, res) => {
//               res.should.have.status(200);
//               res.body.should.be.a('array');
//               res.body.length.should.be.eql(0);
//           done();
//         });
//   });
// });
// describe('/POST product Category', () => {
//     it('it should  POST a product Category', (done) => {
//         let prod = {
//             id:'1',
//             name:'myNew',
//             image:'/public/images/image-1601618643157-655485201.png',
//             isDeleted:0,
//             created_at: "2020-09-19T06:14:02.786Z",
//             updated_at: "2020-09-19T06:14:02.786Z"
//         }
//       chai.request(app)
//           .post('/admin/product_categories')
//           .send(prod)
//           .end((err, res) => {
//                 res.should.have.status(200);
//                 res.body.should.be.a('object');
//             done();
//           });
//     });
//     it('it should Not POST a product Category Name is Required', (done) => {
//         let prod = {
//             id:'1',
//             image:'/public/images/image-1601618643157-655485201.png',
//             isDeleted:0,
//             created_at: "2020-09-19T06:14:02.786Z",
//             updated_at: "2020-09-19T06:14:02.786Z"
//         }
//       chai.request(app)
//           .post('/admin/product_categories')
//           .send(prod)
//           .end((err, res) => {
//                 res.should.have.status(500);
//                 res.body.should.have.property("name");
//                 res.body.should.be.a('object');
//             done();
//           });
//     });
//     it('it should Not POST a product Category image is Required', (done) => {
//         let prod = {
//             id:'1',
//             name:'myNew',
//             isDeleted:0,
//             created_at: "2020-09-19T06:14:02.786Z",
//             updated_at: "2020-09-19T06:14:02.786Z"
//         }
//       chai.request(app)
//           .post('/admin/product_categories')
//           .send(prod)
//           .end((err, res) => {
//                 res.should.have.status(500);
//                 res.body.should.have.property("image");
//                 res.body.should.be.a('object');
//             done();
//           });
//     });
//   });
// describe('/PUT product Category',() => {
//   it('it should  PUT a product Category', (done) => {
//       let prod = {
//           id:'1',
//           name:'myNew123',
//           image:'/public/images/image-1601618643157-655485201.png',
//           isDeleted:1,
//           created_at: "2020-09-19T06:14:02.786Z",
//           updated_at: "2020-09-19T06:14:02.786Z"
//       }
//     chai.request(app)
//         .put('/admin/product_categories/1')
//         .send(prod)
//         .end((err, res) => {
//               res.should.have.status(200);
//               res.body.should.be.a('object');
//           done();
//         });
//   });
// });
// describe('/Delete product Category',() => {
//   it('it should  Delete a product Category', (done) => {
//       let prod = {
//           id:'1',
//           name:'myNew123',
//           image:'/public/images/image-1601618643157-655485201.png',
//           isDeleted:1,
//           created_at: "2020-09-19T06:14:02.786Z",
//           updated_at: "2020-09-19T06:14:02.786Z"
//       }
//     chai.request(app)
//         .put('/admin/categories/1')
//         .send(prod)
//         .end((err, res) => {
//               res.should.have.status(200);
//               res.body.should.be.a('object');
//           done();
//         });
//     });
// });
     