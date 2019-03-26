import { expect } from 'chai'
import request from 'supertest'
import app from '../../index'
import { sequelize } from '../models'

describe('Contact API', () => {
  before(done => {
    sequelize.sync({ force: true }).then(() => {
      done()
    })
  })

  after(() => {
    process.exit(0)
  })

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

  it('thows errow with empty body', done => {
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
      phoneNumber: '07rttrttr',
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
      firstName: 'Felistas',
      lastName: 'Waceera',
      phoneNumber: '0700000000',
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
      .put('/api/contact/0700000001')
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
