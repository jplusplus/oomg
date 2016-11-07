'use strict';

import mongoose from 'mongoose';
import config from '../../config/environment/shared.js';

var ParticipationSchema = new mongoose.Schema({
  question: Number,
  answer: {
    isCorrect: Boolean,
    type:  {
      type: String,
      enum: config.gameConfig.answerTypes
    },
  },
  user: {
    fingerprint: {
      type: String,
      maxlength: 128
    },
    occupation: {
      type:String,
      enum: config.formConfig.occupations
    },
    gender: {
      type:String,
      enum: config.formConfig.genders
    },
    age: {
      type:String,
      enum: config.formConfig.ages
    }
  }
});

export default mongoose.model('Participation', ParticipationSchema);
