'use strict';

import fs            from 'fs';
import mongoose      from 'mongoose';
import bluebird      from 'bluebird';
import prompt        from 'prompt';
import { argv }      from 'yargs';
import json2csv      from 'json2csv';
import config        from '../config/environment';
// Data model
import Participation from '../api/participation/participation.model';
// Use bluebird as promise
mongoose.Promise = bluebird;
// Connect to MongoDB
mongoose.connect(config.mongo.uri, config.mongo.options);

// CSV mapping of the result properties
const FIELDS = [ 'question', 'answer.isCorrect', 'answer.type',
                 'user.occupation', 'user.age', 'user.fingerprint'];

exports = module.exports = function(resolve, reject) {
  // Override prompt values with argv
  prompt.override = argv
  // Start the prompt
  prompt.message = '';
  prompt.delimiter = '';
  prompt.start();
  prompt.get([{
    name: 'output',
    default: 'export.csv',
    description: "Choose output file path:".magenta
  }], function (err, result) {
    // No error
    if(!err) {
      // Find all
      Participation.find({}).then(function(data) {
        // Close connection
        mongoose.connection.close();
        // Convert the result to CSV
        let csv = json2csv({ data, fields: FIELDS });
        // Save the file
        fs.writeFile(result.output, csv, resolve);
      });
    } else {
      reject(`Export configuration error: ${err}`);
    }
  });
};
