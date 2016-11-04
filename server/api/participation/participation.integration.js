'use strict';

var app = require('../..');
import request from 'supertest';

var newParticipation;

describe('Participation API:', function() {
  describe('GET /api/participations', function() {
    var participations;

    beforeEach(function(done) {
      request(app)
        .get('/api/participations')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          participations = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      participations.should.be.instanceOf(Array);
    });
  });

  describe('POST /api/participations', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/participations')
        .send({
          name: 'New Participation',
          info: 'This is the brand new participation!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          newParticipation = res.body;
          done();
        });
    });

    it('should respond with the newly created participation', function() {
      newParticipation.name.should.equal('New Participation');
      newParticipation.info.should.equal('This is the brand new participation!!!');
    });
  });

  describe('GET /api/participations/:id', function() {
    var participation;

    beforeEach(function(done) {
      request(app)
        .get(`/api/participations/${newParticipation._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          participation = res.body;
          done();
        });
    });

    afterEach(function() {
      participation = {};
    });

    it('should respond with the requested participation', function() {
      participation.name.should.equal('New Participation');
      participation.info.should.equal('This is the brand new participation!!!');
    });
  });

  describe('PUT /api/participations/:id', function() {
    var updatedParticipation;

    beforeEach(function(done) {
      request(app)
        .put(`/api/participations/${newParticipation._id}`)
        .send({
          name: 'Updated Participation',
          info: 'This is the updated participation!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          updatedParticipation = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedParticipation = {};
    });

    it('should respond with the original participation', function() {
      updatedParticipation.name.should.equal('New Participation');
      updatedParticipation.info.should.equal('This is the brand new participation!!!');
    });

    it('should respond with the updated participation on a subsequent GET', function(done) {
      request(app)
        .get(`/api/participations/${newParticipation._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          let participation = res.body;

          participation.name.should.equal('Updated Participation');
          participation.info.should.equal('This is the updated participation!!!');

          done();
        });
    });
  });

  describe('PATCH /api/participations/:id', function() {
    var patchedParticipation;

    beforeEach(function(done) {
      request(app)
        .patch(`/api/participations/${newParticipation._id}`)
        .send([
          { op: 'replace', path: '/name', value: 'Patched Participation' },
          { op: 'replace', path: '/info', value: 'This is the patched participation!!!' }
        ])
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          patchedParticipation = res.body;
          done();
        });
    });

    afterEach(function() {
      patchedParticipation = {};
    });

    it('should respond with the patched participation', function() {
      patchedParticipation.name.should.equal('Patched Participation');
      patchedParticipation.info.should.equal('This is the patched participation!!!');
    });
  });

  describe('DELETE /api/participations/:id', function() {
    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete(`/api/participations/${newParticipation._id}`)
        .expect(204)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when participation does not exist', function(done) {
      request(app)
        .delete(`/api/participations/${newParticipation._id}`)
        .expect(404)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });
  });
});
