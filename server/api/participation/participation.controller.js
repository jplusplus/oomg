/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/participations              ->  index
 * POST    /api/participations              ->  create
 * GET     /api/participations/:id          ->  show
 * PUT     /api/participations/:id          ->  upsert
 * PATCH   /api/participations/:id          ->  patch
 * DELETE  /api/participations/:id          ->  destroy
 */

'use strict';

import jsonpatch from 'fast-json-patch';
import Participation from './participation.model';

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if(entity) {
      return res.status(statusCode).json(entity);
    }
    return null;
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

// Gets a list of Participations
export function index(req, res) {
  return Participation.find().exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Participation in the DB
export function create(req, res) {
  return Participation.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}
