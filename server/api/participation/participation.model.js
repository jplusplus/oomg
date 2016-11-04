'use strict';

import mongoose from 'mongoose';

var ParticipationSchema = new mongoose.Schema({
  name: String,
  info: String,
  active: Boolean
});

export default mongoose.model('Participation', ParticipationSchema);
