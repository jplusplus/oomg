'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var participationCtrlStub = {
  index: 'participationCtrl.index',
  show: 'participationCtrl.show',
  create: 'participationCtrl.create',
  upsert: 'participationCtrl.upsert',
  patch: 'participationCtrl.patch',
  destroy: 'participationCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var participationIndex = proxyquire('./index.js', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './participation.controller': participationCtrlStub
});

describe('Participation API Router:', function() {
  it('should return an express router instance', function() {
    participationIndex.should.equal(routerStub);
  });

  describe('GET /api/participations', function() {
    it('should route to participation.controller.index', function() {
      routerStub.get
        .withArgs('/', 'participationCtrl.index')
        .should.have.been.calledOnce;
    });
  });

  describe('GET /api/participations/:id', function() {
    it('should route to participation.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'participationCtrl.show')
        .should.have.been.calledOnce;
    });
  });

  describe('POST /api/participations', function() {
    it('should route to participation.controller.create', function() {
      routerStub.post
        .withArgs('/', 'participationCtrl.create')
        .should.have.been.calledOnce;
    });
  });

  describe('PUT /api/participations/:id', function() {
    it('should route to participation.controller.upsert', function() {
      routerStub.put
        .withArgs('/:id', 'participationCtrl.upsert')
        .should.have.been.calledOnce;
    });
  });

  describe('PATCH /api/participations/:id', function() {
    it('should route to participation.controller.patch', function() {
      routerStub.patch
        .withArgs('/:id', 'participationCtrl.patch')
        .should.have.been.calledOnce;
    });
  });

  describe('DELETE /api/participations/:id', function() {
    it('should route to participation.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'participationCtrl.destroy')
        .should.have.been.calledOnce;
    });
  });
});
