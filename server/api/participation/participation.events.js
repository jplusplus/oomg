/**
 * Participation model events
 */

'use strict';

import {EventEmitter} from 'events';
import Participation from './participation.model';
var ParticipationEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
ParticipationEvents.setMaxListeners(0);

// Model events
var events = {
  save: 'save',
  remove: 'remove'
};

// Register the event emitter to the model events
for(var e in events) {
  let event = events[e];
  Participation.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    ParticipationEvents.emit(event + ':' + doc._id, doc);
    ParticipationEvents.emit(event, doc);
  };
}

export default ParticipationEvents;
