// import { expect } from 'chai'
// import request from 'supertest'
// import app from '../../index'
// import db from '../models/index'
// import { contactSeeds } from '../seeders'
// import { sequelize } from '../models'

// describe('Message API', () => {
//   before(done => {
//     sequelize.sync({ force: true }).then(() => {
//       db.Contact.bulkCreate(contactSeeds)
//       done()
//     })
//   })

//   after(() => {
//     process.exit(0)
//   })

//   describe('/POST', () => {
//     it('thows error with empty body', done => {
//       const req = {}
//       request(app)
//         .post('/api/message')
//         .send(req)
//         .expect(422)
//         .end((err, res) => {
//           if (err) {
//             return done(err)
//           }
//           expect(res.body.message).to.equal('The Body should not be empty')
//           done()
//         })
//     })

//     it('should send a message successfully', done => {
//       api
//         .post('/api/message')
//         .send({
//           message: 'test message',
//           to: '0700000000',
//           from: '0700000001',
//         })
//         .end((error, res) => {
//           expect(res.status).to.equal(201)
//           expect(res.body.message).to.equal('successfully created')
//           done()
//         })
//     })
//   })
// })
