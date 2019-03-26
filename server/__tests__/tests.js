import { expect } from 'chai'
import request from 'supertest'
import app from '../../index'
import { sequelize } from '../models'
import db from '../models/index'
import { contactSeeds, messageSeeds } from '../seeders'

describe('SMS API', () => {
  before(done => {
    sequelize.sync({ force: true }).then(() => {
      db.Contact.bulkCreate(contactSeeds)
      db.Message.bulkCreate(messageSeeds)
      done()
    })
  })

  after(() => {
    process.exit(0)
  })

  describe('Contact API', () => {
    describe('/POST', () => {
      it('does not allow empty name fields', done => {
        const req = {
          phoneNumber: '0700000000',
        }
        request(app)
          .post('/api/contact')
          .send(req)
          .expect(422)
          .end((err, res) => {
            if (err) {
              return done(err)
            }
            expect(res.body.message).to.equal('Invalid Contact data')
            done()
          })
      })
    })

    it('thows error with empty body', done => {
      const req = {}
      request(app)
        .post('/api/contact')
        .send(req)
        .expect(422)
        .end((err, res) => {
          if (err) {
            return done(err)
          }
          expect(res.body.message).to.equal('The Body should not be empty')
          done()
        })
    })

    it('throws error with invalid phone number', done => {
      const req = {
        firstName: 'John',
        lastName: '',
        phoneNumber: '07Invalid',
      }
      request(app)
        .post('/api/contact')
        .send(req)
        .expect(422)
        .end((err, res) => {
          if (err) {
            return done(err)
          }
          expect(res.body.message).to.equal('Invalid Contact data')
          done()
        })
    })

    it('creates a contact with valid data', done => {
      const req = {
        firstName: 'John',
        lastName: 'Doe',
        phoneNumber: '0700000000',
      }

      request(app)
        .post('/api/contact')
        .send(req)
        .expect(201)
        .end((err, res) => {
          if (err) {
            return done(err)
          }
          expect(res.body.message).to.equal('successfully created')
          done()
        })
    })

    it('does not allow adding an existing contact', done => {
      const req = {
        firstName: 'Johnny',
        lastName: 'Dep',
        phoneNumber: '0700000012',
      }
      request(app)
        .post('/api/contact')
        .send(req)
        .expect(409)
        .end((err, res) => {
          if (err) {
            return done(err)
          }
          expect(res.body.message).to.equal('contact already exists')
          done()
        })
    })

    describe('/PUT', () => {
      it('allows editing a contact', done => {
        const req = {
          firstName: 'Jane',
          lastName: 'Doe',
          phoneNumber: '0700000009',
        }
        request(app)
          .put('/api/contact/0700000000')
          .send(req)
          .expect(200)
          .end((err, res) => {
            if (err) {
              return done(err)
            }
            expect(res.body.message).to.equal('successfully updated')
            done()
          })
      })
    })

    it('does not allow editing a non existent contact', done => {
      const req = {
        firstName: 'Jane',
        lastName: 'Doe',
        phoneNumber: '0700000009',
      }
      request(app)
        .put('/api/contact/0700000005')
        .send(req)
        .expect(404)
        .end((err, res) => {
          if (err) {
            return done(err)
          }
          expect(res.body.message).to.equal("Contact doesn't exist")
          done()
        })
    })
  })

  describe('/DELETE', () => {
    it('throws an error if contact does not exist', done => {
      request(app)
        .delete('/api/contact/0700000001')
        .expect(404)
        .end((err, res) => {
          if (err) {
            return done(err)
          }
          expect(res.body.message).to.equal("Contact doesn't exist")
          done()
        })
    })

    it('Deletes a contact', done => {
      request(app)
        .delete('/api/contact/0700000000')
        .expect(200)
        .end((err, res) => {
          if (err) {
            return done(err)
          }
          expect(res.body.message).to.equal('0700000000 has been deleted')
          done()
        })
    })
  })

  describe('Message API', () => {
    describe('/POST', () => {
      it('thows error with empty body', done => {
        const req = {}
        request(app)
          .post('/api/message')
          .send(req)
          .expect(422)
          .end((err, res) => {
            if (err) {
              return done(err)
            }
            expect(res.body.message).to.equal('The Body should not be empty')
            done()
          })
      })

      it('should send a message successfully', done => {
        const req = {
          message: 'test message',
          to: '0700000012',
          from: '0700000013',
        }
        request(app)
          .post('/api/message')
          .send(req)
          .expect(201)
          .end((err, res) => {
            if (err) {
              return done(err)
            }
            expect(res.body.message).to.equal('successfully created')
            done()
          })
      })

      it('should not send to non existent number', done => {
        const req = {
          message: 'test message',
          to: '0700000014',
          from: '0700000013',
        }
        request(app)
          .post('/api/message')
          .send(req)
          .expect(404)
          .end((err, res) => {
            if (err) {
              return done(err)
            }
            expect(res.body.message).to.equal(
              'The receiver number does not exist'
            )
            done()
          })
      })
    })

    describe('/GET', () => {
      it('should get all sent messages for a user', done => {
        request(app)
          .get('/api/message/sent/0700000012')
          .send()
          .expect(200)
          .end((err, res) => {
            if (err) {
              return done(err)
            }
            expect(res.body.message).to.equal('succesfully fetched data')
            done()
          })
      })

      it('should get all recieved messages for a user', done => {
        request(app)
          .get('/api/message/received/0700000013')
          .send()
          .expect(200)
          .end((err, res) => {
            if (err) {
              return done(err)
            }
            expect(res.body.message).to.equal('succesfully fetched data')
            done()
          })
      })
    })

    describe('/DELETE', () => {
      it('deletes messages successfully', done => {
        request(app)
          .delete('/api/message/1')
          .end((error, res) => {
            expect(res.status).to.equal(200)
            done()
          })
      })

      it('deletes messages related to a user when a contact is deleted', done => {
        request(app)
          .delete('/api/contact/0700000013')
          .then(res => {
            request(app)
              .get(`/api/message/sent/0700000013`)
              .then(res => {
                expect(res.body.data).to.have.length(0)
                done()
              })
          })
      })
    })
  })
})
